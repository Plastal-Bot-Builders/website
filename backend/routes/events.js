import express from 'express';
import Event from '../models/Events.js';
import Registration from '../models/Registration.js';
import { auth, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all events
router.get('/', async (req, res) => {
  try {
    // Filter for upcoming events if not admin
    let query = {};
    if (!req.query.all) {
      query.date = { $gte: new Date() };
    }

    const events = await Event.find(query)
      .sort({ date: 1 })
      .select('-__v');

    res.status(200).json({
      status: 'success',
      data: events
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Get event by ID
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        status: 'error',
        message: 'Event not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: event
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Get event by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const event = await Event.findOne({ slug: req.params.slug });
    if (!event) {
      return res.status(404).json({
        status: 'error',
        message: 'Event not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: event
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Create new event (admin only)
router.post('/', auth, isAdmin, async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    
    res.status(201).json({
      status: 'success',
      data: event
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

// Update event (admin only)
router.put('/:id', auth, isAdmin, async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!event) {
      return res.status(404).json({
        status: 'error',
        message: 'Event not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: event
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

// Delete event (admin only)
router.delete('/:id', auth, isAdmin, async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        status: 'error',
        message: 'Event not found'
      });
    }
    
    // Delete all registrations associated with this event
    await Registration.deleteMany({ event: req.params.id });
    
    res.status(200).json({
      status: 'success',
      message: 'Event and related registrations deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Register for an event
router.post('/:id/register', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        status: 'error',
        message: 'Event not found'
      });
    }
    
    // Check if event is in the past
    if (new Date(event.date) < new Date()) {
      return res.status(400).json({
        status: 'error',
        message: 'Cannot register for past events'
      });
    }
    
    // Check capacity
    if (event.capacity && event.registrations.length >= event.capacity) {
      return res.status(400).json({
        status: 'error',
        message: 'Event has reached full capacity'
      });
    }
    
    // Create registration
    const registration = new Registration({
      ...req.body,
      event: event._id
    });
    
    await registration.save();
    
    // Update event with new registration
    event.registrations.push(registration._id);
    await event.save();
    
    res.status(201).json({
      status: 'success',
      message: 'Registration successful',
      data: registration
    });
  } catch (error) {
    // Handle duplicate registration
    if (error.code === 11000) {
      return res.status(400).json({
        status: 'error',
        message: 'You are already registered for this event'
      });
    }
    
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

// Get registrations for an event (admin only)
router.get('/:id/registrations', auth, isAdmin, async (req, res) => {
  try {
    const registrations = await Registration.find({ event: req.params.id });
    
    res.status(200).json({
      status: 'success',
      data: registrations
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

export default router;
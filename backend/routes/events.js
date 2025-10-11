import express from 'express';
import Event from '../models/Event.js';
import Registration from '../models/Registration.js';

const router = express.Router();

// PUBLIC ROUTES

// GET /api/events - Fetch all upcoming events
router.get('/', async (req, res) => {
  try {
    // Find events where date is >= today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const events = await Event.find({ date: { $gte: today } })
      .sort({ date: 1 })
      .select('-registrations');
    
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error: error.message });
  }
});

// GET /api/events/:slug - Fetch a single event by slug
router.get('/:slug', async (req, res) => {
  try {
    const event = await Event.findOne({ slug: req.params.slug })
      .select('-registrations');
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event', error: error.message });
  }
});

// POST /api/events/:slug/register - Register for an event
router.post('/:slug/register', async (req, res) => {
  try {
    const { fullName, email, phone, institution } = req.body;
    
    // Validate required fields
    if (!fullName || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }
    
    // Find the event
    const event = await Event.findOne({ slug: req.params.slug });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Check if the event is at capacity
    if (event.capacity && event.registrations.length >= event.capacity) {
      return res.status(400).json({ message: 'Event is at full capacity' });
    }
    
    // Check for duplicate registration
    const existingRegistration = await Registration.findOne({
      email: email.toLowerCase(),
      event: event._id
    });
    
    if (existingRegistration) {
      return res.status(400).json({ message: 'You are already registered for this event' });
    }
    
    // Create registration
    const registration = new Registration({
      fullName,
      email: email.toLowerCase(),
      phone,
      institution,
      event: event._id
    });
    
    await registration.save();
    
    // Add registration to event
    event.registrations.push(registration._id);
    await event.save();
    
    res.status(201).json({
      message: 'Registration successful',
      event: event.title
    });
    
  } catch (error) {
    res.status(500).json({ message: 'Error registering for event', error: error.message });
  }
});

// ADMIN ROUTES

// POST /api/events - Create a new event
router.post('/', async (req, res) => {
  try {
    const { title, description, date, location, image, capacity } = req.body;
    
    // Validate required fields
    if (!title || !description || !date || !location) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    // Create event
    const event = new Event({
      title,
      description,
      date,
      location,
      image,
      capacity
    });
    
    await event.save();
    
    res.status(201).json({
      message: 'Event created successfully',
      event
    });
    
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error: error.message });
  }
});

// PATCH /api/events/:id - Update an event
router.patch('/:id', async (req, res) => {
  try {
    const updates = req.body;
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.status(200).json({
      message: 'Event updated successfully',
      event
    });
    
  } catch (error) {
    res.status(500).json({ message: 'Error updating event', error: error.message });
  }
});

// DELETE /api/events/:id - Delete an event
router.delete('/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Delete all registrations for this event
    await Registration.deleteMany({ event: req.params.id });
    
    res.status(200).json({
      message: 'Event deleted successfully'
    });
    
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error: error.message });
  }
});

// GET /api/events/:id/registrations - Get all registrations for an event
router.get('/:id/registrations', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    const registrations = await Registration.find({ event: req.params.id })
      .sort({ timestamp: -1 });
    
    res.status(200).json(registrations);
    
  } catch (error) {
    res.status(500).json({ message: 'Error fetching registrations', error: error.message });
  }
});

export default router;
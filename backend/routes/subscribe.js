import { Router } from 'express';
import Subscriber from '../models/Subscriber.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// GET /api/subscribe — list all subscribers (admin only)
router.get('/', requireAuth, async (_req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    return res.json({
      status: 'success',
      data: subscribers,
      total: subscribers.length
    });
  } catch (err) {
    console.error('List subscribers error:', err);
    return res.status(500).json({ error: 'Failed to load subscribers' });
  }
});

// POST /api/subscribe — newsletter signup
router.post('/', async (req, res) => {
  try {
    const { email } = req.body || {};

    if (!email || typeof email !== 'string' || !email.trim()) {
      return res.status(400).json({ error: 'Email is required' });
    }

    await Subscriber.updateOne(
      { email: email.trim().toLowerCase() },
      { $setOnInsert: { email: email.trim().toLowerCase() } },
      { upsert: true, runValidators: true }
    );

    return res.status(201).json({ message: 'Subscribed successfully' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: 'Please provide a valid email address' });
    }
    console.error('Subscribe error:', err);
    return res.status(500).json({ error: 'Failed to subscribe' });
  }
});

export default router;

import { Router } from 'express';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Limit login attempts to slow down brute-force attacks
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts. Try again in 15 minutes.' }
});

router.get('/login', (_req, res) => {
  res.status(405).json({ error: 'Use POST /api/auth/login with JSON { username, password }' });
});

router.post('/login', loginLimiter, (req, res) => {
  const { username, password } = req.body || {};
  const ADMIN_USER = (process.env.ADMIN_USER || '').trim();
  const ADMIN_PASS = (process.env.ADMIN_PASS || '').trim();
  const JWT_SECRET = (process.env.JWT_SECRET || '').trim();

  if (!JWT_SECRET) return res.status(500).json({ error: 'Missing JWT_SECRET' });
  if (!ADMIN_USER || !ADMIN_PASS) return res.status(500).json({ error: 'Missing admin credentials' });

  const u = (username || '').trim();
  const p = (password || '').trim();

  if (u !== ADMIN_USER || p !== ADMIN_PASS) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ sub: ADMIN_USER, role: 'admin' }, JWT_SECRET, { expiresIn: '8h' });
  return res.json({ token });
});

// GET /api/auth/verify — check whether the provided token is still valid
router.get('/verify', requireAuth, (req, res) => {
  res.json({ authenticated: true, user: { username: req.user.sub, role: req.user.role } });
});

// POST /api/auth/refresh — issue a fresh token for a still-valid session
router.post('/refresh', requireAuth, (req, res) => {
  const JWT_SECRET = (process.env.JWT_SECRET || '').trim();
  if (!JWT_SECRET) return res.status(500).json({ error: 'Missing JWT_SECRET' });

  const token = jwt.sign({ sub: req.user.sub, role: req.user.role }, JWT_SECRET, { expiresIn: '8h' });
  return res.json({ token });
});

export default router;
import { Router } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

router.get('/login', (_req, res) => {
  res.status(405).json({ error: 'Use POST /api/auth/login with JSON { username, password }' });
});

router.post('/login', (req, res) => {
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

export default router;
import { Router } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

/**
 * POST /api/auth/login
 * Body: { username, password }
 * Returns: { token }
 */
router.post('/login', (req, res) => {
  const { username, password } = req.body || {};
  const { ADMIN_USER, ADMIN_PASS, JWT_SECRET } = process.env;

  if (!JWT_SECRET) return res.status(500).json({ error: 'Missing JWT_SECRET' });
  if (!ADMIN_USER || !ADMIN_PASS) return res.status(500).json({ error: 'Missing admin credentials' });
  if (username !== ADMIN_USER || password !== ADMIN_PASS) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ sub: ADMIN_USER, role: 'admin' }, JWT_SECRET, { expiresIn: '8h' });
  return res.json({ token });
});

export default router;
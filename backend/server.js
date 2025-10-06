import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import postsRouter from './routes/posts.js';
import authRouter from './routes/auth.js';
import path from 'path';
import { fileURLToPath } from 'url';
import uploadsRouter from './routes/uploads.js';
import chatRouter from './routes/chat.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();

const app = express();

// Middleware
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));
app.use(
  cors({
    origin: (process.env.CORS_ORIGIN || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean).length
      ? (process.env.CORS_ORIGIN || '').split(',').map(s => s.trim())
      : true
  })
);

// Routes
app.use('/api/posts', postsRouter);
app.use('/posts', postsRouter); // optional alias
app.use('/api/auth', authRouter);
app.use('/api/uploads', uploadsRouter);
app.use('/api/chat', chatRouter);

// Health checks
app.get('/api/health', (_req, res) => res.json({ ok: true }));
// NEW: alias base /api and /health for convenience
app.get('/api', (_req, res) => {
  res.json({
    ok: true,
    service: 'plastalbot-backend',
    endpoints: ['/api/health', '/api/posts', '/api/auth/login']
  });
});
app.get('/health', (_req, res) => res.json({ ok: true }));


// DB + Start
const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not set');
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`API running at http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
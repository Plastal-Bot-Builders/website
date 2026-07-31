import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { honeypot, maxLengths } from './middleware/formGuards.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import postsRouter from './routes/posts.js';
import authRouter from './routes/auth.js';
import uploadsRouter from './routes/uploads.js';
import chatRouter from './routes/chat.js';
import membersRouter from './routes/members.js';
import eventsRouter from './routes/events.js';
import subscribeRouter from './routes/subscribe.js';

// Initialize __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Behind Render/Heroku-style proxies, trust X-Forwarded-For so
// express-rate-limit sees each visitor's real IP
app.set('trust proxy', 1);

// ========== MIDDLEWARE ==========
// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Body parsing — a small cap also limits payload-flood attempts
app.use(express.json({ limit: '200kb' }));
app.use(express.urlencoded({ extended: true, limit: '200kb' }));

// Remove keys containing $ or . from user input so a body like
// { "email": { "$ne": null } } can't become a MongoDB operator (NoSQL injection).
const stripMongoOperators = (value) => {
  if (Array.isArray(value)) return value.map(stripMongoOperators);
  if (value && typeof value === 'object') {
    return Object.entries(value).reduce((clean, [key, val]) => {
      if (key.startsWith('$') || key.includes('.')) return clean;
      clean[key] = stripMongoOperators(val);
      return clean;
    }, {});
  }
  return value;
};
app.use((req, _res, next) => {
  if (req.body) req.body = stripMongoOperators(req.body);
  if (req.params) req.params = stripMongoOperators(req.params);
  next();
});

// Rate limiting for public, unauthenticated write endpoints. Without this,
// the newsletter, membership and event-registration forms can be submitted
// in a loop by a script.
const publicWriteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many submissions from this address. Please try again later.' },
});
const chatLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many chat requests. Please slow down.' },
});

// Security headers on API responses. Set explicitly rather than pulling in
// helmet: this API only returns JSON and uploaded files, so a handful of
// headers covers it without adding a dependency (the frontend's full CSP is
// served by Cloudflare — see public/_headers).
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.removeHeader('X-Powered-By');
  next();
});

// Logging
app.use(morgan('dev'));

// CORS — CORS_ORIGIN accepts a comma-separated list of allowed origins
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:3000')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// ========== API ROUTES ==========
app.use('/api/posts', postsRouter);
app.use('/api/auth', authRouter);
app.use('/api/uploads', uploadsRouter);
app.use('/api/chat', chatLimiter, chatRouter);
// Public registration endpoints are rate limited individually so that
// authenticated admin operations on the same routers stay unthrottled.
const MEMBER_FIELD_LIMITS = {
  fullName: 120, email: 254, phoneNumber: 40, gender: 30, cityCountry: 120,
  occupation: 120, educationalBackground: 200, otherExpertise: 200,
  otherInspiration: 200, motivation: 2000, contribution: 2000,
  experienceDescription: 2000, comments: 2000,
  linkedin: 300, facebook: 300, instagram: 300, twitter: 300, otherSocial: 300,
};

app.use('/api/members/register', publicWriteLimiter, honeypot(), maxLengths(MEMBER_FIELD_LIMITS));
app.use('/api/events/:id/register', publicWriteLimiter, honeypot(), maxLengths({ name: 120, email: 254, phone: 40, notes: 1000 }));

app.use('/api/members', membersRouter);
app.use('/api/events', eventsRouter);
app.use('/api/subscribe', publicWriteLimiter, honeypot(), maxLengths({ email: 254 }), subscribeRouter);

// Legacy routes support
app.use('/posts', postsRouter); // optional alias

// ========== HEALTH CHECKS ==========
app.get('/api/health', (_req, res) => res.json({ 
  status: 'ok',
  uptime: process.uptime()
}));

app.get('/api', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'plastalbot-backend',
    version: '1.0.0',
    endpoints: [
      '/api/health',
      '/api/posts',
      '/api/auth/login',
      '/api/chat',
      '/api/uploads'
    ]
  });
});

app.get('/health', (_req, res) => res.redirect('/api/health'));

// ========== ERROR HANDLING ==========
// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    status: 'error',
    code: 404,
    message: `No route found for ${req.method} ${req.url}`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  
  res.status(err.status || 500).json({ 
    status: 'error',
    code: err.status || 500,
    message: process.env.NODE_ENV === 'development' 
      ? err.message 
      : 'Internal Server Error'
  });
});

// ========== SERVER STARTUP ==========
const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI;

// Validate required environment variables
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not set in environment');
  process.exit(1);
}

// Connect to MongoDB and start server
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`🚀 API running at http://localhost:${PORT}`);
      console.log(`📝 API documentation: http://localhost:${PORT}/api`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import postsRouter from './routes/posts.js';
import authRouter from './routes/auth.js';
import uploadsRouter from './routes/uploads.js';
import chatRouter from './routes/chat.js';
import membersRouter from './routes/members.js';

// Initialize __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// ========== MIDDLEWARE ==========
// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Body parsing
app.use(express.json({ limit: '1mb' }));

// Logging
app.use(morgan('dev'));

// CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// ========== API ROUTES ==========
app.use('/api/posts', postsRouter);
app.use('/api/auth', authRouter);
app.use('/api/uploads', uploadsRouter);
app.use('/api/chat', chatRouter);
app.use('/api/members', membersRouter);

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
import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { requireAuth } from '../middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '..', 'uploads');
fs.mkdirSync(uploadDir, { recursive: true });

// Multer storage config
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname || '').toLowerCase() || '';
    const base = path.basename(file.originalname || 'upload', ext).replace(/[^a-z0-9_-]+/gi, '-').toLowerCase();
    const hash = crypto.randomBytes(6).toString('hex');
    cb(null, `${Date.now()}-${base}-${hash}${ext}`);
  }
});

// Optional: limit size to ~10MB and accept images (incl. HEIC)
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ok = /^image\//.test(file.mimetype) || /(\.heic|\.heif|\.jpg|\.jpeg|\.png|\.gif|\.webp|\.svg)$/i.test(file.originalname || '');
    cb(null, ok);
  }
});

const router = Router();

router.post('/', requireAuth, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const filename = req.file.filename;
  const url = `${req.protocol}://${req.get('host')}/uploads/${filename}`;
  res.json({
    url,
    filename,
    size: req.file.size,
    mime: req.file.mimetype
  });
});

export default router;
import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises'; // Using promises version for cleaner async code
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Constants and path setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

/**
 * Ensure upload directory exists
 */
const initializeUploadDir = async () => {
  try {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    console.log(`✅ Upload directory ready: ${UPLOAD_DIR}`);
  } catch (error) {
    console.error('❌ Failed to create upload directory:', error);
    process.exit(1); // Exit if we can't create the upload directory
  }
};

// Initialize upload directory
initializeUploadDir();

/**
 * Generate secure filename for uploaded files
 */
const generateSecureFilename = (originalFilename) => {
  const ext = path.extname(originalFilename || '').toLowerCase() || '';
  const base = path.basename(originalFilename || 'upload', ext)
    .replace(/[^a-z0-9_-]+/gi, '-')
    .toLowerCase();
  const hash = crypto.randomBytes(6).toString('hex');
  return `${Date.now()}-${base}-${hash}${ext}`;
};

/**
 * Validate file mimetype and extension
 */
const isAllowedFile = (file) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'image/heic'];
  const allowedExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.heic', '.heif'];
  
  const mimeTypeOk = allowedMimes.includes(file.mimetype.toLowerCase());
  const extOk = allowedExts.includes(
    path.extname(file.originalname || '').toLowerCase()
  );
  
  return mimeTypeOk || extOk;
};

// Configure multer storage
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    cb(null, generateSecureFilename(file.originalname));
  }
});

// Configure multer upload
const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (_req, file, cb) => {
    if (isAllowedFile(file)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images are allowed.'), false);
    }
  }
});

/**
 * Upload a file
 * POST /api/uploads
 * Requires authentication
 */
router.post('/', requireAuth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        status: 'error',
        message: 'No file uploaded' 
      });
    }
    
    const { filename, size, mimetype: mime } = req.file;
    const url = `${req.protocol}://${req.get('host')}/uploads/${filename}`;
    
    res.status(201).json({
      status: 'success',
      data: {
        url,
        filename,
        size,
        mime
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      status: 'error',
      message: 'Failed to process upload',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * Delete an uploaded file
 * DELETE /api/uploads/:filename
 * Requires authentication
 */
router.delete('/:filename', requireAuth, async (req, res) => {
  try {
    const filename = req.params.filename;
    
    // Validate filename to prevent directory traversal
    if (!filename || filename.includes('/') || filename.includes('..')) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid filename'
      });
    }
    
    const filePath = path.join(UPLOAD_DIR, filename);
    
    // Check if file exists
    try {
      await fs.access(filePath);
    } catch (error) {
      return res.status(404).json({
        status: 'error',
        message: 'File not found'
      });
    }
    
    // Delete file
    await fs.unlink(filePath);
    
    res.json({
      status: 'success',
      message: 'File deleted successfully'
    });
  } catch (error) {
    console.error('Delete file error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete file',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * List uploaded files
 * GET /api/uploads
 * Requires authentication
 */
router.get('/', requireAuth, async (req, res) => {
  try {
    const files = await fs.readdir(UPLOAD_DIR);
    
    // Get details for each file
    const fileDetails = await Promise.all(
      files.map(async (filename) => {
        try {
          const stats = await fs.stat(path.join(UPLOAD_DIR, filename));
          return {
            filename,
            size: stats.size,
            created: stats.birthtime,
            url: `${req.protocol}://${req.get('host')}/uploads/${filename}`
          };
        } catch (error) {
          return null; // Skip files with errors
        }
      })
    );
    
    // Filter out null entries (files with errors)
    const validFiles = fileDetails.filter(file => file !== null);
    
    res.json({
      status: 'success',
      count: validFiles.length,
      data: validFiles
    });
  } catch (error) {
    console.error('List files error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to list files',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Error handler for multer errors
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({
        status: 'error',
        message: `File too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB`
      });
    }
    return res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
  next(error);
});

export default router;
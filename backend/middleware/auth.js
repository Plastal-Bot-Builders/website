import jwt from 'jsonwebtoken';

export function requireAuth(req, res, next) {
  try {
    // Check for Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ 
        status: 'error',
        message: 'Authentication required. Please provide a token.'
      });
    }
    
    // Extract token
    const token = authHeader.startsWith('Bearer ') 
      ? authHeader.slice(7) 
      : authHeader;
      
    if (!token) {
      return res.status(401).json({ 
        status: 'error',
        message: 'Invalid authorization format. Use Bearer token.'
      });
    }

    // Verify token
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      console.error('Server misconfiguration: JWT_SECRET is missing');
      return res.status(500).json({ 
        status: 'error',
        message: 'Server authentication configuration error'
      });
    }

    // Decode and attach user info
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    console.error('Auth error:', error.name, error.message);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        status: 'error',
        message: 'Token expired. Please log in again.'
      });
    }
    
    return res.status(401).json({ 
      status: 'error',
      message: 'Invalid authentication token'
    });
  }
}
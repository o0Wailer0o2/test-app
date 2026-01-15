import jwt from 'jsonwebtoken';
import pool from '../config/database.js';

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    
    // Check if user is blocked
    try {
      const [users] = await pool.query(
        'SELECT is_blocked FROM users WHERE id = ?',
        [user.id]
      );
      
      if (users.length > 0 && users[0].is_blocked) {
        return res.status(403).json({ message: 'Account has been blocked. Please contact administrator.' });
      }
    } catch (dbError) {
      console.error('Error checking user blocked status:', dbError);
      return res.status(500).json({ message: 'Server error' });
    }
    
    req.user = user;
    next();
  });
};

export const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

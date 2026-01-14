import express from 'express';
import pool from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';
import { generalLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Get current user profile (requires authentication)
router.get('/me', generalLimiter, authenticateToken, async (req, res) => {
  try {
    const [users] = await pool.query(
      `SELECT id, name, email, is_admin, avatar, bio, created_at,
       (SELECT COUNT(*) FROM posts WHERE author_id = ?) as post_count
       FROM users WHERE id = ?`,
      [req.user.id, req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = users[0];
    // Don't send password hash
    delete user.password;

    res.json(user);
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user profile by ID
router.get('/:id', generalLimiter, async (req, res) => {
  try {
    const [users] = await pool.query(
      `SELECT id, name, email, is_admin, avatar, bio, created_at,
       (SELECT COUNT(*) FROM posts WHERE author_id = ?) as post_count
       FROM users WHERE id = ?`,
      [req.params.id, req.params.id]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = users[0];
    // Don't send password hash
    delete user.password;

    res.json(user);
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

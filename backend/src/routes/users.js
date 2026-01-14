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

    res.json(users[0]);
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

    res.json(users[0]);
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get posts by user ID
router.get('/:id/posts', generalLimiter, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const [posts] = await pool.query(
      `SELECT p.*, u.name as author_name,
       (SELECT COUNT(*) FROM comments WHERE post_id = p.id) as comment_count
       FROM posts p
       JOIN users u ON p.author_id = u.id
       WHERE p.author_id = ?
       ORDER BY p.created_at DESC
       LIMIT ? OFFSET ?`,
      [req.params.id, limit, offset]
    );

    const [countResult] = await pool.query(
      'SELECT COUNT(*) as total FROM posts WHERE author_id = ?',
      [req.params.id]
    );
    const total = countResult[0].total;

    res.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get user posts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile (requires authentication and ownership)
router.put('/:id', generalLimiter, authenticateToken, async (req, res) => {
  try {
    const { avatar, bio } = req.body;

    // Check if user is updating their own profile
    if (req.user.id !== parseInt(req.params.id)) {
      return res.status(403).json({ message: 'Not authorized to update this profile' });
    }

    await pool.query(
      'UPDATE users SET avatar = ?, bio = ? WHERE id = ?',
      [avatar || null, bio || null, req.params.id]
    );

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

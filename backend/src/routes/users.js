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
    const { avatar, bio, name, email } = req.body;

    // Check if user is updating their own profile or is admin
    if (req.user.id !== parseInt(req.params.id) && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to update this profile' });
    }

    // Validate name if provided
    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim().length === 0) {
        return res.status(400).json({ message: 'Name cannot be empty' });
      }
      if (name.length > 100) {
        return res.status(400).json({ message: 'Name is too long (max 100 characters)' });
      }
    }

    // Validate email if provided
    if (email !== undefined) {
      if (typeof email !== 'string' || email.trim().length === 0) {
        return res.status(400).json({ message: 'Email cannot be empty' });
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }
      // Check if email is already taken by another user
      const [existingUsers] = await pool.query(
        'SELECT id FROM users WHERE email = ? AND id != ?',
        [email, req.params.id]
      );
      if (existingUsers.length > 0) {
        return res.status(400).json({ message: 'Email is already in use' });
      }
    }

    // Build update query dynamically based on provided fields
    const updates = [];
    const values = [];

    if (avatar !== undefined) {
      updates.push('avatar = ?');
      values.push(avatar || null);
    }
    if (bio !== undefined) {
      updates.push('bio = ?');
      values.push(bio || null);
    }
    if (name !== undefined) {
      updates.push('name = ?');
      values.push(name.trim());
    }
    if (email !== undefined) {
      updates.push('email = ?');
      values.push(email.trim());
    }

    if (updates.length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }

    values.push(req.params.id);
    const query = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;

    await pool.query(query, values);

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all users (admin only)
router.get('/', generalLimiter, authenticateToken, async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const [users] = await pool.query(
      `SELECT u.id, u.name, u.email, u.is_admin, u.avatar, u.bio, u.created_at,
       (SELECT COUNT(*) FROM posts WHERE author_id = u.id) as post_count
       FROM users u
       ORDER BY u.created_at DESC
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    const [countResult] = await pool.query('SELECT COUNT(*) as total FROM users');
    const total = countResult[0].total;

    res.json({
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete user (admin only)
router.delete('/:id', generalLimiter, authenticateToken, async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    // Prevent admin from deleting themselves
    if (req.user.id === parseInt(req.params.id)) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }

    const [users] = await pool.query('SELECT * FROM users WHERE id = ?', [req.params.id]);

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    await pool.query('DELETE FROM users WHERE id = ?', [req.params.id]);

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

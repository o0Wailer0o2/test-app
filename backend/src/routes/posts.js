import express from 'express';
import pool from '../config/database.js';
import { authenticateToken, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all posts (with pagination)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const [posts] = await pool.query(
      `SELECT p.*, u.name as author_name, u.email as author_email,
       (SELECT COUNT(*) FROM comments WHERE post_id = p.id) as comment_count
       FROM posts p
       JOIN users u ON p.author_id = u.id
       ORDER BY p.created_at DESC
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    const [countResult] = await pool.query('SELECT COUNT(*) as total FROM posts');
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
    console.error('Get posts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single post
router.get('/:id', async (req, res) => {
  try {
    const [posts] = await pool.query(
      `SELECT p.*, u.name as author_name, u.email as author_email
       FROM posts p
       JOIN users u ON p.author_id = u.id
       WHERE p.id = ?`,
      [req.params.id]
    );

    if (posts.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(posts[0]);
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create post (requires authentication)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, content, excerpt, category } = req.body;

    const [result] = await pool.query(
      'INSERT INTO posts (title, content, excerpt, category, author_id) VALUES (?, ?, ?, ?, ?)',
      [title, content, excerpt, category, req.user.id]
    );

    res.status(201).json({
      message: 'Post created successfully',
      postId: result.insertId
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update post (requires authentication and ownership)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { title, content, excerpt, category } = req.body;

    // Check if post belongs to user
    const [posts] = await pool.query(
      'SELECT * FROM posts WHERE id = ?',
      [req.params.id]
    );

    if (posts.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (posts[0].author_id !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to edit this post' });
    }

    await pool.query(
      'UPDATE posts SET title = ?, content = ?, excerpt = ?, category = ? WHERE id = ?',
      [title, content, excerpt, category, req.params.id]
    );

    res.json({ message: 'Post updated successfully' });
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete post (requires authentication and ownership)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    // Check if post belongs to user
    const [posts] = await pool.query(
      'SELECT * FROM posts WHERE id = ?',
      [req.params.id]
    );

    if (posts.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (posts[0].author_id !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    await pool.query('DELETE FROM posts WHERE id = ?', [req.params.id]);

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

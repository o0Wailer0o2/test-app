import express from 'express';
import pool from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get comments for a post
router.get('/post/:postId', async (req, res) => {
  try {
    const [comments] = await pool.query(
      `SELECT c.*, u.name as author_name, u.email as author_email
       FROM comments c
       JOIN users u ON c.author_id = u.id
       WHERE c.post_id = ?
       ORDER BY c.created_at DESC`,
      [req.params.postId]
    );

    res.json(comments);
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create comment (requires authentication)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { postId, content } = req.body;

    // Check if post exists
    const [posts] = await pool.query(
      'SELECT * FROM posts WHERE id = ?',
      [postId]
    );

    if (posts.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const [result] = await pool.query(
      'INSERT INTO comments (post_id, author_id, content) VALUES (?, ?, ?)',
      [postId, req.user.id, content]
    );

    res.status(201).json({
      message: 'Comment created successfully',
      commentId: result.insertId
    });
  } catch (error) {
    console.error('Create comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete comment (requires authentication and ownership)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    // Check if comment belongs to user
    const [comments] = await pool.query(
      'SELECT * FROM comments WHERE id = ?',
      [req.params.id]
    );

    if (comments.length === 0) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comments[0].author_id !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    await pool.query('DELETE FROM comments WHERE id = ?', [req.params.id]);

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

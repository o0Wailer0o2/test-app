import express from 'express';
import pool from '../config/database.js';
import { authenticateToken, isAdmin } from '../middleware/auth.js';
import { generalLimiter, createLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Get all tags
router.get('/', generalLimiter, async (req, res) => {
  try {
    const [tags] = await pool.query(
      'SELECT * FROM tags ORDER BY name'
    );
    res.json(tags);
  } catch (error) {
    console.error('Get tags error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get tags for a specific post
router.get('/post/:postId', generalLimiter, async (req, res) => {
  try {
    const [tags] = await pool.query(
      `SELECT t.* FROM tags t
       JOIN post_tags pt ON t.id = pt.tag_id
       WHERE pt.post_id = ?
       ORDER BY t.name`,
      [req.params.postId]
    );
    res.json(tags);
  } catch (error) {
    console.error('Get post tags error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create tag (admin only)
router.post('/', createLimiter, authenticateToken, isAdmin, async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ message: 'Tag name is required' });
    }

    const [result] = await pool.query(
      'INSERT INTO tags (name) VALUES (?)',
      [name.trim()]
    );

    res.status(201).json({
      message: 'Tag created successfully',
      tagId: result.insertId
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Tag already exists' });
    }
    console.error('Create tag error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Assign tag to post (admin only)
router.post('/assign', createLimiter, authenticateToken, isAdmin, async (req, res) => {
  try {
    const { postId, tagId } = req.body;

    // Check if post exists
    const [posts] = await pool.query('SELECT * FROM posts WHERE id = ?', [postId]);
    if (posts.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if tag exists
    const [tags] = await pool.query('SELECT * FROM tags WHERE id = ?', [tagId]);
    if (tags.length === 0) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    // Assign tag to post
    await pool.query(
      'INSERT IGNORE INTO post_tags (post_id, tag_id) VALUES (?, ?)',
      [postId, tagId]
    );

    res.json({ message: 'Tag assigned to post successfully' });
  } catch (error) {
    console.error('Assign tag error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove tag from post (admin only)
router.delete('/assign', generalLimiter, authenticateToken, isAdmin, async (req, res) => {
  try {
    const { postId, tagId } = req.body;

    await pool.query(
      'DELETE FROM post_tags WHERE post_id = ? AND tag_id = ?',
      [postId, tagId]
    );

    res.json({ message: 'Tag removed from post successfully' });
  } catch (error) {
    console.error('Remove tag error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete tag (admin only)
router.delete('/:id', generalLimiter, authenticateToken, isAdmin, async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM tags WHERE id = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    res.json({ message: 'Tag deleted successfully' });
  } catch (error) {
    console.error('Delete tag error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

import express from 'express';
import pool from '../config/database.js';
import { authenticateToken, isAdmin } from '../middleware/auth.js';
import { generalLimiter, createLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Get all categories with post counts
// IMPORTANT: This must be defined BEFORE /:id route to prevent "categories" from being treated as an ID
router.get('/categories', generalLimiter, async (req, res) => {
  try {
    const [categories] = await pool.query(
      `SELECT c.*, COUNT(p.id) as count 
       FROM categories c 
       LEFT JOIN posts p ON c.name = p.category 
       GROUP BY c.id, c.name, c.slug, c.description, c.created_at
       ORDER BY c.name`
    );

    res.json(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get recently viewed posts (based on user views)
// IMPORTANT: This must be defined BEFORE /:id route to prevent "recent" from being treated as an ID
router.get('/recent', generalLimiter, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const sessionId = req.headers['x-session-id'] || req.ip || 'anonymous';
    const userId = req.user?.id || null;
    
    let query;
    let params;
    
    // Get recently viewed posts for this user/session
    if (userId) {
      // Logged in user - check both user_id and session_id
      query = `SELECT DISTINCT p.id, p.title, MAX(pv.viewed_at) as last_viewed
       FROM post_views pv
       JOIN posts p ON pv.post_id = p.id
       WHERE pv.user_id = ? OR pv.session_id = ?
       GROUP BY p.id, p.title
       ORDER BY last_viewed DESC
       LIMIT ?`;
      params = [userId, sessionId, limit];
    } else {
      // Anonymous user - check session_id only
      query = `SELECT DISTINCT p.id, p.title, MAX(pv.viewed_at) as last_viewed
       FROM post_views pv
       JOIN posts p ON pv.post_id = p.id
       WHERE pv.session_id = ?
       GROUP BY p.id, p.title
       ORDER BY last_viewed DESC
       LIMIT ?`;
      params = [sessionId, limit];
    }
    
    const [posts] = await pool.query(query, params);

    // If no viewed posts yet, return most recent posts
    if (posts.length === 0) {
      const [recentPosts] = await pool.query(
        `SELECT p.id, p.title, p.created_at as last_viewed
         FROM posts p
         ORDER BY p.created_at DESC
         LIMIT ?`,
        [limit]
      );
      return res.json(recentPosts);
    }

    res.json(posts);
  } catch (error) {
    console.error('Get recent posts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all posts (with pagination and optional category filter)
router.get('/', generalLimiter, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const category = req.query.category;

    let query = `SELECT p.*, u.name as author_name, u.email as author_email,
       (SELECT COUNT(*) FROM comments WHERE post_id = p.id) as comment_count
       FROM posts p
       JOIN users u ON p.author_id = u.id`;
    
    let countQuery = 'SELECT COUNT(*) as total FROM posts';
    const queryParams = [];
    const countParams = [];

    if (category) {
      query += ' WHERE p.category = ?';
      countQuery += ' WHERE category = ?';
      queryParams.push(category);
      countParams.push(category);
    }

    query += ' ORDER BY p.created_at DESC LIMIT ? OFFSET ?';
    queryParams.push(limit, offset);

    const [posts] = await pool.query(query, queryParams);
    const [countResult] = await pool.query(countQuery, countParams);
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
router.get('/:id', generalLimiter, async (req, res) => {
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

    // Track post view
    // Note: Each view creates a new record for analytics purposes.
    // Consider implementing a cleanup job to remove views older than 30-90 days
    // or aggregate them for long-term storage.
    const userId = req.user?.id || null;
    const sessionId = req.headers['x-session-id'] || req.ip || 'anonymous';
    
    await pool.query(
      'INSERT INTO post_views (post_id, user_id, session_id) VALUES (?, ?, ?)',
      [req.params.id, userId, sessionId]
    );

    res.json(posts[0]);
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create post (requires authentication)
router.post('/', createLimiter, authenticateToken, async (req, res) => {
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
router.put('/:id', generalLimiter, authenticateToken, async (req, res) => {
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
router.delete('/:id', generalLimiter, authenticateToken, async (req, res) => {
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

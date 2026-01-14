import express from 'express';
import pool from '../config/database.js';
import { authenticateToken, isAdmin } from '../middleware/auth.js';
import { generalLimiter, createLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Get all categories with post counts (already exists in posts.js as /api/posts/categories)
// This route is redundant but kept for clarity
router.get('/', generalLimiter, async (req, res) => {
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

// Create category (admin only)
router.post('/', createLimiter, authenticateToken, isAdmin, async (req, res) => {
  try {
    const { name, slug, description } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ message: 'Category name is required' });
    }

    if (!slug || slug.trim() === '') {
      return res.status(400).json({ message: 'Category slug is required' });
    }

    const [result] = await pool.query(
      'INSERT INTO categories (name, slug, description) VALUES (?, ?, ?)',
      [name.trim(), slug.trim(), description?.trim() || '']
    );

    res.status(201).json({
      message: 'Category created successfully',
      categoryId: result.insertId
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Category name or slug already exists' });
    }
    console.error('Create category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update category (admin only)
router.put('/:id', generalLimiter, authenticateToken, isAdmin, async (req, res) => {
  try {
    const { name, slug, description } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ message: 'Category name is required' });
    }

    if (!slug || slug.trim() === '') {
      return res.status(400).json({ message: 'Category slug is required' });
    }

    // Check if category exists
    const [categories] = await pool.query(
      'SELECT * FROM categories WHERE id = ?',
      [req.params.id]
    );

    if (categories.length === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await pool.query(
      'UPDATE categories SET name = ?, slug = ?, description = ? WHERE id = ?',
      [name.trim(), slug.trim(), description?.trim() || '', req.params.id]
    );

    res.json({ message: 'Category updated successfully' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Category name or slug already exists' });
    }
    console.error('Update category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete category (admin only)
router.delete('/:id', generalLimiter, authenticateToken, isAdmin, async (req, res) => {
  try {
    // Check if category exists
    const [categories] = await pool.query(
      'SELECT * FROM categories WHERE id = ?',
      [req.params.id]
    );

    if (categories.length === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Check if any posts are using this category
    const [posts] = await pool.query(
      'SELECT COUNT(*) as count FROM posts WHERE category = ?',
      [categories[0].name]
    );

    if (posts[0].count > 0) {
      return res.status(400).json({ 
        message: `Cannot delete category. ${posts[0].count} post(s) are using this category.`,
        postsCount: posts[0].count
      });
    }

    await pool.query('DELETE FROM categories WHERE id = ?', [req.params.id]);

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

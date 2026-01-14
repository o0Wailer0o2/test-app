import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManageCategories.css';

function ManageCategories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: '', slug: '', description: '' });
  const [editingCategory, setEditingCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    // Check if user is admin
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const userData = JSON.parse(user);
      if (!userData.isAdmin) {
        navigate('/');
        return;
      }
    } catch {
      navigate('/login');
      return;
    }

    fetchCategories();
  }, [navigate]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleNameChange = (value, isEdit = false) => {
    const slug = generateSlug(value);
    if (isEdit && editingCategory) {
      setEditingCategory({ ...editingCategory, name: value, slug });
    } else {
      setNewCategory({ ...newCategory, name: value, slug });
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!newCategory.name.trim()) {
      setError('Category name is required');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newCategory)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to create category');
      }

      setSuccess('Category created successfully!');
      setNewCategory({ name: '', slug: '', description: '' });
      fetchCategories();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!editingCategory.name.trim()) {
      setError('Category name is required');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/categories/${editingCategory.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: editingCategory.name,
          slug: editingCategory.slug,
          description: editingCategory.description
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to update category');
      }

      setSuccess('Category updated successfully!');
      setEditingCategory(null);
      fetchCategories();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteCategory = async (categoryId, postCount) => {
    if (postCount > 0) {
      if (!window.confirm(`This category has ${postCount} post(s). Are you sure you want to try deleting it? (This may fail if posts are using it)`)) {
        return;
      }
    } else if (!window.confirm('Are you sure you want to delete this category?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/categories/${categoryId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete category');
      }

      setSuccess('Category deleted successfully!');
      fetchCategories();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="manage-categories-container"><div className="loading">Loading...</div></div>;
  }

  return (
    <div className="manage-categories-container">
      <div className="manage-categories-wrapper">
        <h1>Manage Categories</h1>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="categories-sections">
          {/* Create New Category Section */}
          <section className="category-section">
            <h2>{editingCategory ? 'Edit Category' : 'Create New Category'}</h2>
            <form onSubmit={editingCategory ? handleUpdateCategory : handleCreateCategory} className="category-form">
              <div className="form-group">
                <label>Category Name *</label>
                <input
                  type="text"
                  value={editingCategory ? editingCategory.name : newCategory.name}
                  onChange={(e) => handleNameChange(e.target.value, !!editingCategory)}
                  placeholder="Enter category name"
                  maxLength="100"
                />
              </div>
              <div className="form-group">
                <label>Slug * (auto-generated)</label>
                <input
                  type="text"
                  value={editingCategory ? editingCategory.slug : newCategory.slug}
                  onChange={(e) => editingCategory 
                    ? setEditingCategory({ ...editingCategory, slug: e.target.value })
                    : setNewCategory({ ...newCategory, slug: e.target.value })
                  }
                  placeholder="category-slug"
                  maxLength="100"
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={editingCategory ? editingCategory.description : newCategory.description}
                  onChange={(e) => editingCategory
                    ? setEditingCategory({ ...editingCategory, description: e.target.value })
                    : setNewCategory({ ...newCategory, description: e.target.value })
                  }
                  placeholder="Enter category description"
                  rows="3"
                />
              </div>
              <div className="form-buttons">
                {editingCategory && (
                  <button 
                    type="button" 
                    onClick={() => {
                      setEditingCategory(null);
                      setError(null);
                    }} 
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                )}
                <button type="submit" className="btn btn-primary">
                  {editingCategory ? 'Update Category' : 'Create Category'}
                </button>
              </div>
            </form>
          </section>

          {/* Existing Categories List */}
          <section className="category-section">
            <h2>Existing Categories ({categories.length})</h2>
            {categories.length === 0 ? (
              <p className="no-categories">No categories created yet.</p>
            ) : (
              <div className="categories-list">
                {categories.map((category) => (
                  <div key={category.id} className="category-item">
                    <div className="category-info">
                      <div className="category-name">{category.name}</div>
                      <div className="category-meta">
                        <span className="category-slug">/{category.slug}</span>
                        {category.count > 0 && (
                          <span className="category-count">{category.count} post(s)</span>
                        )}
                      </div>
                      {category.description && (
                        <div className="category-description">{category.description}</div>
                      )}
                    </div>
                    <div className="category-actions">
                      <button
                        onClick={() => setEditingCategory(category)}
                        className="btn-edit"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id, category.count)}
                        className="btn-delete"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <div className="back-section">
          <button onClick={() => navigate('/')} className="btn btn-secondary">
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default ManageCategories;

import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditPost.css';

function EditPost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Fetch post data and categories
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch post
        const postResponse = await fetch(`http://localhost:3000/api/posts/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!postResponse.ok) {
          throw new Error('Failed to fetch post');
        }

        const post = await postResponse.json();
        setFormData({
          title: post.title,
          content: post.content,
          excerpt: post.excerpt || '',
          category: post.category || ''
        });
        setCurrentImage(post.image);

        // Fetch categories
        const categoriesResponse = await fetch('http://localhost:3000/api/categories');
        if (categoriesResponse.ok) {
          const categoriesData = await categoriesResponse.json();
          setCategories(categoriesData);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setError('Only image files are allowed (jpeg, jpg, png, gif, webp)');
        e.target.value = '';
        return;
      }
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image file size must be less than 5MB');
        e.target.value = '';
        return;
      }
      setImageFile(file);
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      // Create FormData to handle file upload
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('excerpt', formData.excerpt);
      formDataToSend.append('category', formData.category);
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      if (!response.ok) {
        const data = await response.json();
        // Check if the error is related to image upload
        if (data.message && (
          data.message.includes('image') || 
          data.message.includes('upload') || 
          data.message.includes('file')
        )) {
          // Clear the image file so user can select a new one
          setImageFile(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }
        throw new Error(data.message || 'Failed to update post');
      }

      // Navigate to the updated post
      navigate(`/post/${id}`);
    } catch (err) {
      setError(err.message);
      // Scroll to error message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-post-container">
        <div className="loading">Loading post...</div>
      </div>
    );
  }

  return (
    <div className="edit-post-container">
      <div className="edit-post-wrapper">
        <h1>Edit Post</h1>
        
        {error && (
          <div className="alert alert-error">
            {error}
            {error.toLowerCase().includes('image') || 
             error.toLowerCase().includes('upload') || 
             error.toLowerCase().includes('file') ? (
              <div style={{ marginTop: '10px', fontWeight: 'normal' }}>
                Please select a different image and try again.
              </div>
            ) : null}
          </div>
        )}

        <form onSubmit={handleSubmit} className="edit-post-form">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter post title"
              maxLength="500"
            />
          </div>

          <div className="form-group">
            <label htmlFor="excerpt">Excerpt</label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="Brief summary of your post"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="image">Image (Optional)</label>
            {currentImage && (
              <div className="current-image">
                <p>Current image:</p>
                <img src={`http://localhost:3000${currentImage}`} alt="Current post" style={{ maxWidth: '200px', marginBottom: '10px' }} />
              </div>
            )}
            <input
              type="file"
              id="image"
              name="image"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
            />
            <small className="form-help">Max size: 5MB. Allowed formats: jpeg, jpg, png, gif, webp. Leave empty to keep current image.</small>
          </div>

          <div className="form-group">
            <label htmlFor="content">Content *</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              placeholder="Write your post content here..."
              rows="15"
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate(`/post/${id}`)}
              className="btn btn-secondary"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPost;

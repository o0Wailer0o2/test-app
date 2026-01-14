import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManageTags.css';

function ManageTags() {
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [posts, setPosts] = useState([]);
  const [newTagName, setNewTagName] = useState('');
  const [selectedPost, setSelectedPost] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
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
    } catch (e) {
      navigate('/login');
      return;
    }

    fetchTags();
    fetchPosts();
  }, [navigate]);

  const fetchTags = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/tags');
      if (response.ok) {
        const data = await response.json();
        setTags(data);
      }
    } catch (err) {
      console.error('Error fetching tags:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/posts?limit=100');
      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts || []);
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };

  const handleCreateTag = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!newTagName.trim()) {
      setError('Tag name is required');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: newTagName.trim() })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to create tag');
      }

      setSuccess('Tag created successfully!');
      setNewTagName('');
      fetchTags();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteTag = async (tagId) => {
    if (!window.confirm('Are you sure you want to delete this tag? It will be removed from all posts.')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/tags/${tagId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete tag');
      }

      setSuccess('Tag deleted successfully!');
      fetchTags();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAssignTag = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!selectedPost || !selectedTag) {
      setError('Please select both a post and a tag');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/tags/assign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          postId: parseInt(selectedPost), 
          tagId: parseInt(selectedTag) 
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to assign tag');
      }

      setSuccess('Tag assigned to post successfully!');
      setSelectedPost('');
      setSelectedTag('');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="manage-tags-container"><div className="loading">Loading...</div></div>;
  }

  return (
    <div className="manage-tags-container">
      <div className="manage-tags-wrapper">
        <h1>Manage Tags</h1>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="tags-sections">
          {/* Create New Tag Section */}
          <section className="tag-section">
            <h2>Create New Tag</h2>
            <form onSubmit={handleCreateTag} className="tag-form">
              <div className="form-group">
                <input
                  type="text"
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  placeholder="Enter tag name"
                  maxLength="100"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Create Tag
              </button>
            </form>
          </section>

          {/* Assign Tag to Post Section */}
          <section className="tag-section">
            <h2>Assign Tag to Post</h2>
            <form onSubmit={handleAssignTag} className="tag-form">
              <div className="form-group">
                <label>Select Post:</label>
                <select
                  value={selectedPost}
                  onChange={(e) => setSelectedPost(e.target.value)}
                >
                  <option value="">Choose a post</option>
                  {posts.map((post) => (
                    <option key={post.id} value={post.id}>
                      {post.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Select Tag:</label>
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                >
                  <option value="">Choose a tag</option>
                  {tags.map((tag) => (
                    <option key={tag.id} value={tag.id}>
                      {tag.name}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-primary">
                Assign Tag
              </button>
            </form>
          </section>

          {/* Existing Tags List */}
          <section className="tag-section">
            <h2>Existing Tags ({tags.length})</h2>
            {tags.length === 0 ? (
              <p className="no-tags">No tags created yet.</p>
            ) : (
              <div className="tags-list">
                {tags.map((tag) => (
                  <div key={tag.id} className="tag-item">
                    <span className="tag-name">{tag.name}</span>
                    <button
                      onClick={() => handleDeleteTag(tag.id)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
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

export default ManageTags;

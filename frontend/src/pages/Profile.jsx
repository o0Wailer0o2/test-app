import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState({ avatar: '', bio: '' });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          navigate('/login');
          return;
        }

        setLoading(true);
        const response = await fetch('http://localhost:3000/api/users/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('token');
            navigate('/login');
            return;
          }
          throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();
        setUser(data);
        setEditForm({ avatar: data.avatar || '', bio: data.bio || '' });
        setError(null);
        
        // Fetch user's posts
        if (data.id) {
          fetchUserPosts(data.id, token);
        }
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const fetchUserPosts = async (userId, token) => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${userId}/posts?limit=100`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts || []);
      }
    } catch (err) {
      console.error('Error fetching user posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProfile = () => {
    setIsEditingProfile(true);
    setError(null);
    setSuccess(null);
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
    setEditForm({ avatar: user?.avatar || '', bio: user?.bio || '' });
    setError(null);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editForm)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to update profile');
      }

      setSuccess('Profile updated successfully!');
      setUser({ ...user, avatar: editForm.avatar, bio: editForm.bio });
      setIsEditingProfile(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeletePost = async (postId, postTitle) => {
    if (!window.confirm(`Are you sure you want to delete "${postTitle}"?`)) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete post');
      }

      setSuccess('Post deleted successfully!');
      setPosts(posts.filter(post => post.id !== postId));
      setUser({ ...user, post_count: user.post_count - 1 });
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading">Loading profile...</div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="profile-container">
        <div className="error">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/')} className="btn-back">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-container">
        <div className="error">User profile not found</div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-page">
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="profile-header">
          <div className="profile-avatar-large">
            <img 
              src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&size=200&background=3498db&color=fff`} 
              alt={user.name}
            />
          </div>
          <div className="profile-header-info">
            <h1>{user.name}</h1>
            <p className="profile-email">{user.email}</p>
            {user.is_admin && (
              <span className="admin-badge">Admin</span>
            )}
          </div>
        </div>

        <div className="profile-body">
          <div className="profile-section">
            <div className="section-header">
              <h2>About</h2>
              {!isEditingProfile && (
                <button onClick={handleEditProfile} className="btn-edit-small">
                  ✏️ Edit Profile
                </button>
              )}
            </div>
            
            {isEditingProfile ? (
              <form onSubmit={handleSaveProfile} className="edit-profile-form">
                <div className="form-group">
                  <label htmlFor="avatar">Profile Picture URL</label>
                  <input
                    type="text"
                    id="avatar"
                    value={editForm.avatar}
                    onChange={(e) => setEditForm({ ...editForm, avatar: e.target.value })}
                    placeholder="Enter image URL or leave blank for default"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="bio">About / Bio</label>
                  <textarea
                    id="bio"
                    value={editForm.bio}
                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                    placeholder="Tell us about yourself..."
                    rows="4"
                  />
                </div>
                <div className="form-actions">
                  <button type="button" onClick={handleCancelEdit} className="btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <p className="profile-bio">
                {user.bio || 'No bio provided yet. Click edit to add your bio.'}
              </p>
            )}
          </div>

          <div className="profile-section">
            <h2>Statistics</h2>
            <div className="profile-stats-grid">
              <div className="stat-card">
                <div className="stat-value">{user.post_count || 0}</div>
                <div className="stat-label">Posts</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">
                  {new Date(user.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short'
                  })}
                </div>
                <div className="stat-label">Member Since</div>
              </div>
            </div>
          </div>

          {/* My Posts Section */}
          <div className="profile-section">
            <h2>My Posts ({posts.length})</h2>
            {posts.length === 0 ? (
              <p className="no-posts">You haven't created any posts yet.</p>
            ) : (
              <div className="posts-list">
                {posts.map(post => (
                  <div key={post.id} className="post-item">
                    <div className="post-item-info">
                      <h3 className="post-item-title">{post.title}</h3>
                      <div className="post-item-meta">
                        <span className="post-item-category">{post.category || 'Uncategorized'}</span>
                        <span className="post-item-date">
                          {new Date(post.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                        <span className="post-item-comments">
                          💬 {post.comment_count || 0} comments
                        </span>
                      </div>
                    </div>
                    <div className="post-item-actions">
                      <button
                        onClick={() => navigate(`/post/${post.id}`)}
                        className="btn-view"
                      >
                        View
                      </button>
                      <button
                        onClick={() => navigate(`/edit-post/${post.id}`)}
                        className="btn-edit"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id, post.title)}
                        className="btn-delete"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="profile-actions">
            <button onClick={() => navigate('/')} className="btn-secondary">
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

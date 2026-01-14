import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError(null);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading">Loading profile...</div>
      </div>
    );
  }

  if (error) {
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
            <h2>About</h2>
            <p className="profile-bio">
              {user.bio || 'No bio provided yet. Click edit to add your bio.'}
            </p>
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

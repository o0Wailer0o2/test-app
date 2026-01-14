import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProfileCard.css';

function ProfileCard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await fetch('http://localhost:3000/api/users/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  if (loading) {
    return (
      <div className="profile-card">
        <div className="profile-info">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  // If no user is logged in, show guest message
  if (!user) {
    return (
      <div className="profile-card">
        <div className="profile-info">
          <h3>Welcome, Guest!</h3>
          <p className="profile-bio">
            <Link to="/login">Login</Link> to create posts and join our community!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-card">
      <div className="profile-avatar">
        <img 
          src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&size=200&background=3498db&color=fff`} 
          alt={user.name}
        />
      </div>
      <div className="profile-info">
        <h3>{user.name}</h3>
        {user.is_admin && <p className="profile-role">Admin</p>}
        <p className="profile-bio">
          {user.bio || 'No bio provided yet.'}
        </p>
        <div className="profile-stats">
          <div className="stat">
            <span className="stat-number">{user.post_count || 0}</span>
            <span className="stat-label">Posts</span>
          </div>
          <div className="stat">
            <span className="stat-number">
              {new Date(user.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short'
              })}
            </span>
            <span className="stat-label">Joined</span>
          </div>
        </div>
        <Link to="/profile" className="profile-link">View Profile</Link>
      </div>
    </div>
  );
}

export default ProfileCard;

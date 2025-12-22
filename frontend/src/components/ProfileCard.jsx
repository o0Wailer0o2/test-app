import './ProfileCard.css';

function ProfileCard({ user }) {
  return (
    <div className="profile-card">
      <div className="profile-avatar">
        <img 
          src={user?.avatar || 'https://ui-avatars.com/api/?name=John+Doe&size=200&background=3498db&color=fff'} 
          alt={user?.name || 'User'}
        />
      </div>
      <div className="profile-info">
        <h3>{user?.name || 'John Doe'}</h3>
        <p className="profile-role">{user?.role || 'Blogger'}</p>
        <p className="profile-bio">
          {user?.bio || 'Passionate writer sharing insights on technology, programming, and life experiences.'}
        </p>
        <div className="profile-stats">
          <div className="stat">
            <span className="stat-number">{user?.postCount || 42}</span>
            <span className="stat-label">Posts</span>
          </div>
          <div className="stat">
            <span className="stat-number">{user?.followers || 1.2}K</span>
            <span className="stat-label">Followers</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;

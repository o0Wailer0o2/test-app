import { Link } from 'react-router-dom';
import './AdminPanel.css';

function AdminPanel({ isAdmin }) {
  if (!isAdmin) return null;

  return (
    <div className="admin-panel">
      <h3>Admin Panel</h3>
      <div className="admin-links">
        <Link to="/create-post" className="admin-link">
          <span className="admin-icon">➕</span>
          Create New Post
        </Link>
        <Link to="/admin/tags" className="admin-link">
          <span className="admin-icon">🏷️</span>
          Manage Tags
        </Link>
        <Link to="/admin/categories" className="admin-link">
          <span className="admin-icon">🗂️</span>
          Manage Categories
        </Link>
        <Link to="/admin/users" className="admin-link">
          <span className="admin-icon">👥</span>
          Manage Users
        </Link>
      </div>
    </div>
  );
}

export default AdminPanel;

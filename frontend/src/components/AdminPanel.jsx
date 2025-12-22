import { Link } from 'react-router-dom';
import './AdminPanel.css';

function AdminPanel({ isAdmin }) {
  if (!isAdmin) return null;

  return (
    <div className="admin-panel">
      <h3>Admin Panel</h3>
      <div className="admin-links">
        <Link to="/admin/posts" className="admin-link">
          <span className="admin-icon">📝</span>
          Manage Posts
        </Link>
        <Link to="/admin/new-post" className="admin-link">
          <span className="admin-icon">➕</span>
          Add New Post
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

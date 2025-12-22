import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ categories, onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <aside className="sidebar">
      {/* Search */}
      <div className="sidebar-section">
        <h3>Search</h3>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">🔍</button>
        </form>
      </div>

      {/* Categories */}
      <div className="sidebar-section">
        <h3>Categories</h3>
        <ul className="category-list">
          {categories && categories.map((category) => (
            <li key={category.id}>
              <Link to={`/category/${category.slug}`}>
                {category.name}
                <span className="category-count">({category.count})</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Posts */}
      <div className="sidebar-section">
        <h3>Recent Posts</h3>
        <ul className="recent-posts">
          <li>
            <Link to="/post/1">Getting Started with React</Link>
            <span className="recent-date">Dec 20, 2025</span>
          </li>
          <li>
            <Link to="/post/2">Node.js Best Practices</Link>
            <span className="recent-date">Dec 18, 2025</span>
          </li>
          <li>
            <Link to="/post/3">MySQL Optimization Tips</Link>
            <span className="recent-date">Dec 15, 2025</span>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;

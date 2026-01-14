import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ categories, onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/posts/recent?limit=5');
        const data = await response.json();
        setRecentPosts(data || []);
      } catch (error) {
        console.error('Error fetching recent posts:', error);
      }
    };

    fetchRecentPosts();
  }, []);

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
          {recentPosts.map((post) => (
            <li key={post.id}>
              <Link to={`/post/${post.id}`}>{post.title}</Link>
              <span className="recent-date">
                {new Date(post.created_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;

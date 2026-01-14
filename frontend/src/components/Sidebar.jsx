import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchWithSession } from '../utils/session';
import './Sidebar.css';

function Sidebar({ categories, onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [recentPosts, setRecentPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const response = await fetchWithSession('http://localhost:3000/api/posts/recent?limit=5');
        const data = await response.json();
        // Ensure data is an array before setting state
        if (Array.isArray(data)) {
          setRecentPosts(data);
        } else {
          console.error('Recent posts API returned non-array data:', data);
          setRecentPosts([]);
        }
      } catch (error) {
        console.error('Error fetching recent posts:', error);
        setRecentPosts([]);
      }
    };

    fetchRecentPosts();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Navigate to search page with query parameter
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      
      // Also call onSearch if provided (for backward compatibility)
      if (onSearch) {
        onSearch(searchTerm);
      }
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
          {Array.isArray(categories) && categories.length > 0 ? (
            categories.map((category) => (
              <li key={category.id}>
                <Link to={`/category/${category.slug}`}>
                  {category.name}
                  <span className="category-count">({category.count})</span>
                </Link>
              </li>
            ))
          ) : (
            <li className="no-categories">No categories available</li>
          )}
        </ul>
      </div>

      {/* Recent Posts */}
      <div className="sidebar-section">
        <h3>Recent Posts</h3>
        <ul className="recent-posts">
          {Array.isArray(recentPosts) && recentPosts.length > 0 ? (
            recentPosts.map((post) => (
              <li key={post.id}>
                <Link to={`/post/${post.id}`}>{post.title}</Link>
                <span className="recent-date">
                  {new Date(post.last_viewed || post.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </li>
            ))
          ) : (
            <li className="no-posts">No recent posts available</li>
          )}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;

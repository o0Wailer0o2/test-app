import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManagePosts.css';

function ManagePosts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 20;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetchPosts();
  }, [navigate, currentPage]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:3000/api/posts?page=${currentPage}&limit=${postsPerPage}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }

      const data = await response.json();
      setPosts(data.posts || []);
      setTotalPages(data.pagination?.pages || 1);
      setError(null);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError(err.message);
    } finally {
      setLoading(false);
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
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(null), 5000);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading && posts.length === 0) {
    return (
      <div className="manage-posts-container">
        <div className="loading">Loading posts...</div>
      </div>
    );
  }

  return (
    <div className="manage-posts-container">
      <div className="manage-posts-page">
        <div className="page-header">
          <h1>Manage Posts</h1>
          <button onClick={() => navigate('/create-post')} className="btn-create">
            ➕ Create New Post
          </button>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        {posts.length === 0 ? (
          <div className="no-data">
            <p>No posts found.</p>
            <button onClick={() => navigate('/create-post')} className="btn-primary">
              Create Your First Post
            </button>
          </div>
        ) : (
          <>
            <div className="posts-table-wrapper">
              <table className="posts-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>Comments</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map(post => (
                    <tr key={post.id}>
                      <td>{post.id}</td>
                      <td className="post-title">
                        <a href={`/post/${post.id}`} target="_blank" rel="noopener noreferrer">
                          {post.title}
                        </a>
                      </td>
                      <td>{post.author_name}</td>
                      <td>
                        <span className="category-badge">{post.category || 'Uncategorized'}</span>
                      </td>
                      <td className="text-center">{post.comment_count || 0}</td>
                      <td>
                        {new Date(post.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="actions-cell">
                        <button
                          onClick={() => navigate(`/post/${post.id}`)}
                          className="btn-view-small"
                          title="View"
                        >
                          👁️
                        </button>
                        <button
                          onClick={() => navigate(`/edit-post/${post.id}`)}
                          className="btn-edit-small"
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id, post.title)}
                          className="btn-delete-small"
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="page-btn"
                >
                  Previous
                </button>
                <span className="page-info">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="page-btn"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        <div className="page-actions">
          <button onClick={() => navigate('/')} className="btn-secondary">
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default ManagePosts;

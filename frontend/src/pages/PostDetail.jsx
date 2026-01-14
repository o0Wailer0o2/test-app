import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchWithSession } from '../utils/session';
import './PostDetail.css';

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetchWithSession(`http://localhost:3000/api/posts/${id}`);
        
        if (!response.ok) {
          throw new Error('Post not found');
        }
        
        const data = await response.json();
        setPost(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="post-detail-container">
        <div className="loading">Loading post...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="post-detail-container">
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

  if (!post) {
    return (
      <div className="post-detail-container">
        <div className="error">Post not found</div>
      </div>
    );
  }

  return (
    <div className="post-detail-container">
      <article className="post-detail">
        <header className="post-header">
          <div className="post-category-badge">{post.category || 'Uncategorized'}</div>
          <h1 className="post-title">{post.title}</h1>
          <div className="post-meta">
            <span className="post-author">By {post.author_name || 'Unknown'}</span>
            <span className="post-date">
              {new Date(post.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
        </header>

        {post.image && (
          <div className="post-image">
            <img src={post.image} alt={post.title} />
          </div>
        )}

        <div className="post-content">
          {post.content ? (
            // Content contains HTML tags for formatting (h2, h3, etc.)
            // In a production app, use DOMPurify to sanitize HTML before rendering
            <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
          ) : (
            <p>{post.excerpt || 'No content available'}</p>
          )}
        </div>

        <footer className="post-footer">
          <button onClick={() => navigate('/')} className="btn-back">
            ← Back to Home
          </button>
        </footer>
      </article>
    </div>
  );
}

export default PostDetail;

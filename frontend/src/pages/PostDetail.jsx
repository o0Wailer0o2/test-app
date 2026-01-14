import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchWithSession } from '../utils/session';
import './PostDetail.css';

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);
  const [error, setError] = useState(null);
  const [commentError, setCommentError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Error parsing user:', e);
      }
    }
  }, []);

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

  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/comments/post/${id}`);
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  useEffect(() => {
    fetchComments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      navigate('/login');
      return;
    }

    if (!newComment.trim()) {
      setCommentError('Comment cannot be empty');
      return;
    }

    setCommentLoading(true);
    setCommentError(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          postId: id,
          content: newComment
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to post comment');
      }

      // Refresh comments
      await fetchComments();
      setNewComment('');
    } catch (err) {
      setCommentError(err.message);
    } finally {
      setCommentLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete comment');
      }

      // Refresh comments
      await fetchComments();
    } catch (err) {
      console.error('Error deleting comment:', err);
      alert('Failed to delete comment: ' + err.message);
    }
  };

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

      {/* Comments Section */}
      <section className="comments-section">
        <h2 className="comments-title">
          Comments ({comments.length})
        </h2>

        {/* Comment Form - Only for logged in users */}
        {user ? (
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              rows="4"
              disabled={commentLoading}
            />
            {commentError && (
              <div className="comment-error">{commentError}</div>
            )}
            <button 
              type="submit" 
              className="btn-submit-comment"
              disabled={commentLoading}
            >
              {commentLoading ? 'Posting...' : 'Post Comment'}
            </button>
          </form>
        ) : (
          <div className="login-prompt">
            <p>
              Please <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>log in</a> to leave a comment.
            </p>
          </div>
        )}

        {/* Comments List */}
        <div className="comments-list">
          {comments.length === 0 ? (
            <p className="no-comments">No comments yet. Be the first to comment!</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="comment">
                <div className="comment-header">
                  <span className="comment-author">{comment.author_name}</span>
                  <span className="comment-date">
                    {new Date(comment.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <div className="comment-content">{comment.content}</div>
                {(user?.id === comment.author_id || user?.isAdmin) && (
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="btn-delete-comment"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default PostDetail;

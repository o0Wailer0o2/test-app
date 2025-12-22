import { Link } from 'react-router-dom';
import './PostCard.css';

function PostCard({ post }) {
  return (
    <div className="post-card">
      <div className="post-card-image">
        <img 
          src={post.image || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop'} 
          alt={post.title}
        />
        <span className="post-card-category">{post.category}</span>
      </div>
      <div className="post-card-content">
        <h3>{post.title}</h3>
        <p className="post-card-excerpt">{post.excerpt}</p>
        <div className="post-card-meta">
          <span className="post-author">{post.author}</span>
          <span className="post-date">{post.date}</span>
        </div>
        <Link to={`/post/${post.id}`} className="btn-read-post">Read More →</Link>
      </div>
    </div>
  );
}

export default PostCard;

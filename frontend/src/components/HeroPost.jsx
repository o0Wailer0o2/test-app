import { Link } from 'react-router-dom';
import './HeroPost.css';

function HeroPost({ post }) {
  return (
    <div className="hero-post">
      <div className="hero-image">
        <img 
          src={post?.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=600&fit=crop'} 
          alt={post?.title || 'Featured Post'}
        />
        <div className="hero-overlay">
          <div className="hero-content">
            <span className="hero-category">{post?.category || 'Featured'}</span>
            <h1>{post?.title || 'Welcome to My Personal Blog'}</h1>
            <p>{post?.excerpt || 'Discover amazing articles, insights, and stories from our community of writers.'}</p>
            <div className="hero-meta">
              <span className="hero-author">{post?.author || 'Admin'}</span>
              <span className="hero-date">{post?.date || 'December 22, 2025'}</span>
            </div>
            <Link to={`/post/${post?.id || 1}`} className="btn-read-more">Read More</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroPost;

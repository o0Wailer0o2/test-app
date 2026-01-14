import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ isLoggedIn, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/">
            <h1>My Blog</h1>
          </Link>
        </div>
        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          {isLoggedIn ? (
            <>
              <li><Link to="/create-post" className="btn-create-post">Create Post</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><button onClick={onLogout} className="btn-logout">Logout</button></li>
            </>
          ) : (
            <li><Link to="/login" className="btn-login">Login</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

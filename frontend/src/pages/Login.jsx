import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate passwords match for registration
    if (isRegistering && password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    // Mock login - in real app, this would call an API
    onLogin({ name: 'John Doe', email, isAdmin: email === 'admin@blog.com' });
    navigate('/');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>{isRegistering ? 'Create Account' : 'Welcome Back'}</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          {isRegistering && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
              />
            </div>
          )}
          <button type="submit" className="btn-submit">
            {isRegistering ? 'Sign Up' : 'Login'}
          </button>
        </form>
        <p className="toggle-form">
          {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
          <button onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? 'Login' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;

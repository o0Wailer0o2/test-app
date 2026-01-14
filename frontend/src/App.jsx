import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import PostDetail from './pages/PostDetail';
import Profile from './pages/Profile';
import Category from './pages/Category';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  // Load user from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <div className="app">
        <Navbar 
          isLoggedIn={!!user} 
          onLogout={handleLogout}
        />
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                isAdmin={user?.isAdmin}
              />
            } 
          />
          <Route 
            path="/login" 
            element={<Login onLogin={handleLogin} />} 
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route 
            path="/category/:slug" 
            element={<Category isAdmin={user?.isAdmin} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

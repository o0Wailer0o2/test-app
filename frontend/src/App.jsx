import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;

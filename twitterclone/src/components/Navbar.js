

import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Navbar.css';

const Navbar = () => {
  const isLoggedIn = Cookies.get('isLoggedIn') === 'true';

  const handleLogout = () => {
    Cookies.remove('isLoggedIn');
    window.location.href = '/';
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        
          <ul className="navbar-menu">
            <li className="navbar-item">
              <Link to="/home" className="navbar-link">
                Home
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/userprofile" className="navbar-link">
                Following
              </Link>
            </li>
            </ul>
            {isLoggedIn ? (
              <>
            
              <Link to="/home" className="navbar-link">
                <button className="tweet-button">Post</button>
              </Link>
        
           
           
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
           
            </>
        
        ) : (
          <Link to="/" className="navbar-logo">
            Twitter<span>Clone</span>
          </Link>
        )}
      </nav>
    </div>
  );
}

export default Navbar;

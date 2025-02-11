import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Navbar = ({ setShowSignup }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") !== null
  );

  useEffect(() => {
    // Function to check authentication status dynamically
    const checkAuth = () => {
      setIsAuthenticated(localStorage.getItem("token") !== null);
    };

    // Listen for changes in localStorage (for login/logout updates)
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, [localStorage.getItem("token")]);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <i className="fas fa-code code-icon"></i> AlgoNest!
        </Link>
      </div>

      {/* Show Home & Practice only if authenticated */}
      {isAuthenticated ? (
        <div className="nav-links middle">
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/practice" className="nav-link">Practice</Link>
        </div>
      ):<></>}

      <div className="nav-links">
        {isAuthenticated ? (
          <button className="nav-btn profile-btn">
            <Link to="/profile">
              <i className="fas fa-user-circle profile-icon"></i>
            </Link>
          </button>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

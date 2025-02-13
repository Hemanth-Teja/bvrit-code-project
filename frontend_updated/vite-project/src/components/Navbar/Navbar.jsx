import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const isAdmin = true; // Change dynamically based on authentication
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    navigate("/"); // Redirect to Entry page
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">AlgoNest</div>
      <div className="navbar-links">
        <Link to="/home">Home</Link>
        <Link to="/practice">Practice</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        {isAdmin && <Link to="/add-questions">Add Questions</Link>} {/* Admin Only */}
      </div>
      <div className="navbar-profile">
        <Link to="/profile">Profile</Link>
       
      </div>
    </nav>
  );
};

export default Navbar;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaCode } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa";
import { MdAddToQueue } from "react-icons/md";
import { FaUser } from "react-icons/fa";

import "./Navbar.css";

const Navbar = () => {
  const isAdmin = localStorage.getItem("isAdmin"); // Change dynamically based on authentication


  return (
    <>
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
      <nav className="navbar-small-device">
        <div className="navbar-logo">A.N.</div>
        <div className="navbar-links">
          <Link to="/home">
            <FaHome />
          </Link>
          <Link to="/practice">
            <FaCode />
          </Link>
          <Link to="/leaderboard">
            <FaTrophy />
          </Link>
          {isAdmin && (
            <Link to="/add-questions">
              <MdAddToQueue />
            </Link>
          )} {/* Admin Only */}
        </div>
        <div className="navbar-profile">
          <Link to="/profile">
            <FaUser />
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

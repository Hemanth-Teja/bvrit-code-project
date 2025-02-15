import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Profile.css";

function Profile({ setToken, setisAdmin }) {
  const [userData, setUserData] = useState(null);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: token }
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // If there's an error fetching data, redirect to login
        handleLogout();
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    // Clear all auth-related state and storage
    localStorage.removeItem("token");
    setToken(null);  // Reset token state in parent component
    setisAdmin(false);  // Reset admin state in parent component
    navigate("/");  // Redirect to login page
  };

  if (!userData) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  const { user: student } = userData;  // Destructure from the API response
  const aptitudeProgress = ((student.aptitude_solved.length / 50) * 100).toFixed(1);
  const dsaProgress = ((student.dsa_solved.length / 50) * 100).toFixed(1);

  return (
    <div className="profile-container">
      {/* Left Section */}
      <div className="profile-left">
        <div className="profile-avatar-large">
          <span id="profile-letter-large">{student.username[0].toUpperCase()}</span>
        </div>
        
        <div className="progress-section">
          <div className="circle-box">
            <h3>Aptitude Progress</h3>
            <div className="progress-circle" style={{ '--progress': `${aptitudeProgress}%` }}>
              <div className="progress-value">{aptitudeProgress}%</div>
            </div>
          </div>

          <div className="circle-box">
            <h3>DSA Progress</h3>
            <div className="progress-circle" style={{ '--progress': `${dsaProgress}%` }}>
              <div className="progress-value">{dsaProgress}%</div>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button className="logout-btn" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>

      {/* Right Section */}
      <div className="profile-right">
        {/* User Info */}
        <div className="profile-header">
          <h2>Profile Information</h2>
          <div className="info-grid">
          <div className="profile-avatar-small">
          <span id="profile-letter-small">{student.username[0].toUpperCase()}</span>
        </div>
            <div className="info-item">
              <label>Username</label>
              <p>{student.username}</p>
            </div>
            <div className="info-item">
              <label>Student ID</label>
              <p>{student.id}</p>
            </div>
            <div className="info-item">
              <label>Email</label>
              <p>{student.email}</p>
            </div>
            <div className="info-item">
              <label>Contact</label>
              <p>{student.contact_no}</p>
            </div>
            <div className="info-item">
              <label>Parent Contact</label>
              <p>{student.parent_contact_no}</p>
            </div>
          </div>
        </div>

        {/* Solved Problems */}
        <div className="solved-problems">
          <div className="section-header">
            <h3>Solved Problems</h3>
            <div className="filter-buttons">
              <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>All</button>
              <button className={filter === "aptitude" ? "active" : ""} onClick={() => setFilter("aptitude")}>Aptitude</button>
              <button className={filter === "dsa" ? "active" : ""} onClick={() => setFilter("dsa")}>DSA</button>
            </div>
          </div>

          <div className="problems-list">
            {(filter === "all" || filter === "aptitude") && (
              <div className="problem-section">
                {filter !== "all" && <h4>Aptitude Problems</h4>}
                {student.aptitude_solved.map((prob) => (
                  <div key={prob.id} className="problem-card">
                    <div className="problem-info">
                      <span className="problem-id">#{prob.id}</span>
                      <span className="problem-title">{prob.title}</span>
                    </div>
                    <span className={`difficulty-badge ${prob.difficulty.toLowerCase()}`}>
                      {prob.difficulty}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {(filter === "all" || filter === "dsa") && (
              <div className="problem-section">
                {filter !== "all" && <h4>DSA Problems</h4>}
                {student.dsa_solved.map((prob) => (
                  <div key={prob.id} className="problem-card">
                    <div className="problem-info">
                      <span className="problem-id">#{prob.id}</span>
                      <span className="problem-title">{prob.title}</span>
                    </div>
                    <span className={`difficulty-badge ${prob.difficulty.toLowerCase()}`}>
                      {prob.difficulty}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const userData = {
  branch: "Civil",
  year: "2028",
  student: {
    username: "dummy_civil28",
    id: "CIV2801",
    password: "password123",
    email: "dummy28@example.com",
    contact_no: "9876543213",
    parent_contact_no: "9123456792",
    aptitude_solved: [
      { id: 10, title: "Basic Addition", difficulty: "Easy" },
      { id: 14, title: "Percentage Calculation", difficulty: "Medium" }
    ],
    dsa_solved: [
      { id: 12, title: "Reverse a Linked List", difficulty: "Easy" },
      { id: 56, title: "Binary Search", difficulty: "Medium" },
      { id: 89, title: "Graph Traversal", difficulty: "Hard" }
    ],
    labs: {
      lab1: [70],
      lab2: [75],
      lab3: [80],
      lab4: [85]
    }
  }
};

function Profile() {
  const { student } = userData;
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session or token if needed
    localStorage.removeItem("token"); // Example: Remove auth token
    navigate("/"); // Redirect to home page
  };

  return (
    <div className="profile-container">
      {/* Left Section */}
      <div className="profile-left">
        <div className="circle-box">
          <h3>Aptitude Solved</h3>
          <div className="progress-circle">
            <span>{((student.aptitude_solved.length / 50) * 100).toFixed(1)}%</span>
          </div>
        </div>
        <div className="circle-box">
          <h3>DSA Solved</h3>
          <div className="progress-circle">
            <span>{((student.dsa_solved.length / 50) * 100).toFixed(1)}%</span>
          </div>
        </div>
        {/* Logout Button */}
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      {/* Right Section */}
      <div className="profile-right">
        {/* User Info */}
        <div className="profile-header">
          <h2>Profile Info</h2>
          <p><strong>Username:</strong> {student.username}</p>
          <p><strong>ID:</strong> {student.id}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Contact:</strong> {student.contact_no}</p>
          <p><strong>Parent Contact:</strong> {student.parent_contact_no}</p>
        </div>

        {/* Solved Problems */}
        <div className="solved-problems">
          <h3>Solved Problems</h3>
          <div className="filter-buttons">
            <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>All</button>
            <button className={filter === "aptitude" ? "active" : ""} onClick={() => setFilter("aptitude")}>Aptitude</button>
            <button className={filter === "dsa" ? "active" : ""} onClick={() => setFilter("dsa")}>DSA</button>
          </div>

          <div className="solved-list">
            <ul>
              {(filter === "all" || filter === "aptitude") &&
                student.aptitude_solved.map((prob) => (
                  <li key={prob.id} className={`difficulty-${prob.difficulty.toLowerCase()}`}>
                    <span className="prob-id">#{prob.id}</span> {prob.title}
                    <span className="difficulty">{prob.difficulty}</span>
                  </li>
                ))}
              {(filter === "all" || filter === "dsa") &&
                student.dsa_solved.map((prob) => (
                  <li key={prob.id} className={`difficulty-${prob.difficulty.toLowerCase()}`}>
                    <span className="prob-id">#{prob.id}</span> {prob.title}
                    <span className="difficulty">{prob.difficulty}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

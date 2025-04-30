import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Profile.css";
const apiUrl = import.meta.env.API_URL;

function Profile({ setToken, setisAdmin }) {
  const [userData, setUserData] = useState(null);
  const [filter, setFilter] = useState("dsa");
  const [dsaProblems, setDsaProblems] = useState([]);
  const [aptitudeProblems, setAptitudeProblems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${apiUrl}/api/users/profile`, {
          headers: { Authorization: token },
        });
        setUserData(response.data);

        // Fetch latest 5 DSA problem details
        if (response.data.user.dsa_solved.length > 0) {
          const dsaProblemDetails = await fetchDsaProblemDetails(
            response.data.user.dsa_solved.slice(-5) // Get the latest 5 solved problems
          );
          setDsaProblems(dsaProblemDetails);
        }

        // Fetch latest 5 Aptitude problem details
        if (response.data.user.aptitude_solved.length > 0) {
          const aptitudeProblemDetails = await fetchAptitudeProblemDetails(
            response.data.user.aptitude_solved.slice(-5) // Get the latest 5 solved problems
          );
          setAptitudeProblems(aptitudeProblemDetails);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        handleLogout();
      }
    };

    fetchUserData();
  }, []);

  const fetchDsaProblemDetails = async (problemIds) => {
    try {
      const token = localStorage.getItem("token");
      const problemDetails = await Promise.all(
        problemIds.map(async (id) => {
          const response = await axios.get(
            `${apiUrl}/api/update/dsa/question/${id}`,
            { headers: { Authorization: token } }
          );
          return response.data;
        })
      );
      return problemDetails;
    } catch (error) {
      console.error("Error fetching DSA problem details:", error);
      return [];
    }
  };

  const fetchAptitudeProblemDetails = async (problemIds) => {
    try {
      const token = localStorage.getItem("token");
      const problemDetails = await Promise.all(
        problemIds.map(async (id) => {
          try {
            const response = await axios.get(
              `${apiUrl}/api/update/aptitude/question/${id}`,
              { headers: { Authorization: token } }
            );
            return response.data;
          } catch (error) {
            console.error(`Error fetching aptitude problem with ID ${id}:`, error);
            return null;
          }
        })
      );
      return problemDetails.filter((prob) => prob !== null);
    } catch (error) {
      console.error("Error fetching aptitude problem details:", error);
      return [];
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setisAdmin(false);
    navigate("/");
  };

  if (!userData) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  const { user: student } = userData;

  return (
    <div className="profile-container">
      {/* Left Section */}
      <div className="profile-left">
        <div className="profile-avatar-large">
          <span id="profile-letter-large">{student.username[0].toUpperCase()}</span>
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
              <button
                className={filter === "aptitude" ? "active" : ""}
                onClick={() => setFilter("aptitude")}
              >
                Aptitude
              </button>
              <button
                className={filter === "dsa" ? "active" : ""}
                onClick={() => setFilter("dsa")}
              >
                DSA
              </button>
            </div>
          </div>

          <div className="problems-list">
            {filter === "aptitude" && (
              <div className="problem-section">
                {aptitudeProblems.length > 0 ? (
                  aptitudeProblems.map((prob) => (
                    <div key={prob.id} className="problem-card">
                      <div className="problem-info">
                        <span className="problem-id">#{prob.id}</span>
                        <span className="problem-title">{prob.title}</span>
                      </div>
                      <span className={`difficulty-badge ${prob.difficulty.toLowerCase()}`}>
                        {prob.difficulty}
                      </span>
                    </div>
                  ))
                ) : (
                  <p>No aptitude problems solved yet.</p>
                )}
              </div>
            )}

            {filter === "dsa" && (
              <div className="problem-section">
                {dsaProblems.length > 0 ? (
                  dsaProblems.map((prob) => (
                    <div key={prob.id} className="problem-card">
                      <div className="problem-info">
                        <span className="problem-id">#{prob.id}</span>
                        <span className="problem-title">{prob.title}</span>
                      </div>
                      <span className={`difficulty-badge ${prob.difficulty.toLowerCase()}`}>
                        {prob.difficulty}
                      </span>
                    </div>
                  ))
                ) : (
                  <p>No DSA problems solved yet.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
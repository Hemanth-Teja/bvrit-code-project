import React, { useEffect, useState } from "react";
import "./Entry.css";

const Entry = ({ setModal }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated (token exists in localStorage)
    setIsAuthenticated(localStorage.getItem("token") !== null);
  }, []);
   
  return (
    <div className="entry-container">
      <div className="content-wrapper">
        {/* Left Section - Vision */}
        <div className="entry-box vision-box">
          <h2> Our Vision</h2>
          <p>
          To create a powerful coding platform that helps students master Data Structures and Algorithms with ease.
          </p>
          
        </div>

        {/* Right Section - Mission */}
        <div className="entry-box mission-box">
          <h2> Our Mission</h2>
         
          <p>To provide a structured learning experience with high-quality problem sets and an interactive coding environment.</p>
        </div>
      </div>

      {/* Get Started Button (Hidden if authenticated) */}
      {!isAuthenticated && (
        <div className="get-started-container">
          <button className="get-started-btn" onClick={() => setModal("signup")}>
            Get Started
          </button>
        </div>
      )}

      {/* Contact Section (Footer) */}
      <div className="contact-section">
        <p>📧 Email: support@algonest.com</p>
        <p>📞 Phone: +91 9618007625</p>
      </div>
    </div>
  );
};

export default Entry;

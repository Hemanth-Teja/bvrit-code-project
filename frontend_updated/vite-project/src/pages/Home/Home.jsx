import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to AlgoNest</h1>
          <p>Your one-stop platform for DSA and Aptitude preparation</p>
        </div>
      </section>

      <section className="features-section">
        <h2>What We Offer</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>DSA Practice</h3>
            <p>Comprehensive collection of Data Structures and Algorithms problems</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🧮</div>
            <h3>Aptitude Training</h3>
            <p>Curated aptitude questions to enhance your logical thinking</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💻</div>
            <h3>Online Compiler</h3>
            <p>Built-in compiler to test your code instantly</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Progress Tracking</h3>
            <p>Monitor your learning journey with detailed statistics</p>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="stat-card">
          <h3>500+</h3>
          <p>DSA Problems</p>
        </div>
        <div className="stat-card">
          <h3>300+</h3>
          <p>Aptitude Questions</p>
        </div>
        <div className="stat-card">
          <h3>1000+</h3>
          <p>Active Users</p>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Start Your Journey?</h2>
        <p>Begin practicing and improve your skills today!</p>
        <button onClick={()=>{navigate('/practice')}} className="cta-button">Get Started</button>
      </section>
    </div>
  );
}

export default Home;

import React, { useState } from "react";
import "./Entry.css";
import SignIn from "../Auth/Signinpopup";
import Login from "../Auth/Loginpopup";

function Entry({token, setToken, isAdmin, setisAdmin}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="entry-container">
      <div className="entry-content">
        <div className="entry-text">
          <h1>Welcome to AlgoNest</h1>
          <p>Your journey to mastering DSA and Aptitude starts here</p>
          <button className="get-started-btn" onClick={openModal}>
            Get Started
            <span className="btn-arrow">→</span>
          </button>
        </div>
        
        <div className="entry-image">
          <div className="floating-shapes">
            <div className="shape shape-1">🚀</div>
            <div className="shape shape-2">💻</div>
            <div className="shape shape-3">📚</div>
            <div className="shape shape-4">🎯</div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-close-btn">
            <button className="close-btn" onClick={closeModal}>
              <span className="into-mark">×</span>
            </button>
            

            <div className="modal-header">
              {isLogin ? (
                <h2>Welcome Back!</h2>
              ) : (
                <h2>Create Account</h2>
              )}
            </div></div>

            <div className="modal-body">
              {isLogin ? (
                <>
                  <Login token={token} setToken={setToken} isAdmin={isAdmin} setisAdmin={setisAdmin}/>
                  <div className="switch-form">
                    <p>Don't have an account?</p>
                    <button className="switch-btn" onClick={() => setIsLogin(false)}>
                      Sign up
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <SignIn token={token} setToken={setToken} isAdmin={isAdmin} setisAdmin={setisAdmin}/>
                  <div className="switch-form">
                    <p>Already have an account?</p>
                    <button className="switch-btn" onClick={() => setIsLogin(true)}>
                      Login
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Entry;

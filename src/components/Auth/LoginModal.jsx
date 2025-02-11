import React, { useRef, useState } from "react";
import "./Auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

const LoginModal = ({ closeModal, setModal }) => {
  const navigate = useNavigate();
  const modalRef = useRef();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle closing modal when clicking outside
  const handleClose = (e) => {
    if (modalRef.current === e.target) {
      closeModal();
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", formData);
      
      localStorage.setItem("token", response.data.token); // Store JWT token
      toast.success("🎉 Login successful! Redirecting..."); // Show success toast
      closeModal();
      navigate("/home");
    } catch (error) {
      toast.error("❌ Login failed. " + (error.response?.data?.message || "Please try again.")); // Show error toast
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="modal" ref={modalRef} onClick={handleClose}>
      <div className="modal-content">
        <span className="close-btn" onClick={closeModal}>&times;</span>
        <h2>Login</h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="auth-btn">Login</button>
        </form>

        <p>
          Don't have an account? <span onClick={() => setModal("signup")}>Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;

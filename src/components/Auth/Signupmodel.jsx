import axios from "axios";
import React, { useRef, useState } from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

const SignupModal = ({ closeModal, setModal }) => {
    const modalRef = useRef();
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const navigate = useNavigate();

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
        console.log("Submitting Form Data:", formData);
    
        try {
            const response = await axios.post("http://localhost:5000/api/users/register", formData);
            console.log("Signup Successful:", response.data);
    
            localStorage.setItem("token", response.data.token);
            toast.success("🎉 Signup successful! Redirecting..."); // Show success toast
            closeModal();
            navigate("/home");
        } catch (error) {
            console.error("Signup Failed:", error.response?.data || error.message);
            toast.error("❌ Signup failed. " + (error.response?.data?.message || "Please try again.")); // Show error toast
        }
    };

    return (
        <div className="modal" ref={modalRef} onClick={handleClose}>
            <div className="modal-content">
                <span className="close-btn" onClick={closeModal}>&times;</span>
                <h2>Sign Up</h2>

                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" placeholder="Enter your username" value={formData.username} onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required />
                    <button type="submit" className="auth-btn">Sign Up</button>
                </form>

                <p>
                    Already have an account? <span onClick={() => setModal("login")}>Login</span>
                </p>
            </div>
        </div>
    );
};

export default SignupModal;

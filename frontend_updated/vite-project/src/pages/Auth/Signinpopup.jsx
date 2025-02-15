import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function SignIn({ token, setToken, isAdmin, setisAdmin }) {
  const navigate = useNavigate();
  const branches = ["IT", "CSE", "AIDS", "CSM", "CSD"];
  
  const [formData, setFormData] = useState({
    branch: "",
    year: "",
    student: {
      username: "",
      id: "",
      email: "",
      password: "",
      contact_no: "",
      parent_contact_no: "",
    },
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      ...(name in prev.student
        ? { student: { ...prev.student, [name]: value } }
        : { [name]: value }),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    // Validation checks...
    if (!formData.student.email.endsWith("@bvrit.ac.in")) {
      setError("Email must end with '@bvrit.ac.in'.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/users/register", {
        ...formData,
        year: String(formData.year),
      });
      setToken(response.data.token);
      navigate("/Entry");
      setMessage(response.data.message);
    } catch (err) {
      console.error("Registration Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form signup-form">        
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}

        <div className="form-content">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Branch</label>
              <select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select Branch</option>
                {branches.map((branch) => (
                  <option key={branch} value={branch}>{branch}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Year</label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter year"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                type="text"
                name="username"
                value={formData.student.username}
                onChange={handleChange}
                className="form-input"
                placeholder="Choose a username"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Student ID</label>
              <input
                type="text"
                name="id"
                value={formData.student.id}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter student ID"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.student.email}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter email (must end with @bvrit.ac.in)"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                value={formData.student.password}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter strong password"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Contact No</label>
              <input
                type="tel"
                name="contact_no"
                value={formData.student.contact_no}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter contact number"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Parent Contact No</label>
              <input
                type="tel"
                name="parent_contact_no"
                value={formData.student.parent_contact_no}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter parent's contact number"
                required
              />
            </div>
          </div>

          <button type="submit" className="submit-button">
            <span>Create Account</span>
          </button>
        </div>
      </form>
    </div>
  );
}

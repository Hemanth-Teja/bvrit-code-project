import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import './Auth.css';

export default function Login({ token, setToken, isAdmin, setisAdmin }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmitSuccess = () => {
        navigate('/home');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        // Email validation (Must end with "@bvrit.ac.in")
        if (!email.endsWith("@bvrit.ac.in")) {
            setError("Email must end with '@bvrit.ac.in'.");
            setLoading(false);
            return;
        }
        try {
            const response = await axios.post("http://localhost:5000/api/users/login", {
                email,
                password
            });
            // Store token in localStorage
            localStorage.setItem("token", response.data.token);
            setToken(response.data.token);
            localStorage.setItem("isAdmin",response.data.student.isAdmin);
            onSubmitSuccess();
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleLogin} className="auth-form">
                {error && <p className="error-message">{error}</p>}
                
                <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                        className="form-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Password</label>
                    <input
                        className="form-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>

                <button 
                    className={`submit-button ${loading ? 'loading' : ''}`} 
                    type="submit" 
                    disabled={loading}
                >
                    {loading ? (
                        <span className="loading-spinner"></span>
                    ) : (
                        "Login"
                    )}
                </button>
            </form>
        </div>
    );
}




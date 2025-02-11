import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Profile.css";
import questions from "../../data/questions.js";

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token"); // Get token from localStorage
                console.log("token in front end "+ token)
                if (!token) throw new Error("Unauthorized! Please log in.");

                const response = await axios.get("http://localhost:5000/api/users/profile", {
                    headers: { Authorization: token }, // ✅ Send token directly without "Bearer "
                });

                setUser(response.data); // Set user data after fetching
            } catch (error) {
                console.error("Error fetching user data:", error);
                alert(error.response?.data?.message || "Failed to fetch user data");
                localStorage.removeItem("token"); // Remove token if invalid
                navigate("/");
            }
        };

        fetchUserData();
    }, [navigate]);

    // Handle Logout
    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove token on logout
        navigate("/");
    };

    if (!user) return <p > Please wait Loading...</p>;

    return (
        <div className="profile-container">
           <div className="profile-details">
        <h3>User Details</h3>
        <div className="user-info">
            <p><strong>Username:{user.username}</strong></p>
            <p><strong>Email:{user.email}</strong></p>
            <p><strong>Problems Solved:{user.no_of_problems_solved}</strong></p>
            <p><strong>Score:{user.score}</strong></p>
        </div>
            </div>

            {/* Solved Problems Table */}
            <h3>Solved Problems</h3>
            <table className="problems-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Problem Title</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {user.problems_solved.map((problem, index) => {
                        const question = questions.find(q => q.id === problem);
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{question ? question.title : `Problem ${problem}`}</td>
                                <td>
                                    <Link to={`/practice/${problem}`} className="view-btn">
                                        View
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Logout Button */}
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Profile;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useState } from "react";
// import { ToastContainer } from "react-toastify"; // Import ToastContainer
// import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
// import Navbar from "./components/Navbar/Navbar";
// import Entry from "./pages/Entry/Entry";
// import Home from "./pages/Home/Home";
// import Practice from "./pages/Practice/Practice";
// import LoginModal from "./components/Auth/LoginModal";
// import Signupmodel from "./components/Auth/Signupmodel";
// import CodeEditor from "./pages/Code/CodeEditor";
// import Profile from "./pages/Profile/Profile";
// import PrivateRoute from "./components/private";

// function App() {
//   const [modal, setModal] = useState(null); // "login", "signup", or null

//   return (
//     <Router>
//   <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
//       <Navbar setModal={setModal} />
//       <Routes>
//         <Route path="/" element={<Entry setModal={setModal} />} />
//         <Route 
//           path="/home" 
//           element={
//             <PrivateRoute>
//               <Home />
//             </PrivateRoute>
//           } 
//         />
//         <Route 
//           path="/practice" 
//           element={
//             <PrivateRoute>
//               <Practice />

              
//             </PrivateRoute>
//           } 
//         />
//         <Route 
//           path="/practice/:id" 
//           element={
//             <PrivateRoute>
//               <CodeEditor />
//             </PrivateRoute>
//           } 
//         />
//         <Route 
//           path="/profile" 
//           element={
//             <PrivateRoute>
//               <Profile />
//             </PrivateRoute>
//           } 
//         />
//       </Routes>

//       {modal === "login" && <LoginModal closeModal={() => setModal(null)} setModal={setModal} />}
//       {modal === "signup" && <Signupmodel closeModal={() => setModal(null)} setModal={setModal} />}
//     </Router>
//   );
// }

// export default App;
import { useState } from "react";
import axios from "axios";

const App = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

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
            alert("Login successful!");

            // Redirect or do further actions
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleLogin} style={styles.form}>
                <h2>Login</h2>

                {error && <p style={styles.error}>{error}</p>}

                <div style={styles.inputGroup}>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};

// Basic inline styles
const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
    },
    form: {
        padding: "20px",
        backgroundColor: "#fff",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        width: "300px",
        textAlign: "center",
    },
    inputGroup: {
        marginBottom: "15px",
        textAlign: "left",
    },
    error: {
        color: "red",
        fontSize: "14px",
        marginBottom: "10px",
    },
    button: {
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        padding: "10px",
        cursor: "pointer",
        width: "100%",
        borderRadius: "5px",
    },
};

export default App;

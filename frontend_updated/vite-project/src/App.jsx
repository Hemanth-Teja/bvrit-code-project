import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Practice from "./pages/Practice/Practice";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import Profile from "./pages/Profile/Profile";
import CodeEditor from "./pages/CodeEditor/CodeEditor";
import ApptitudeComponent from "./pages/ApptitudeComponent/ApptitudeComponent";
import Entry from "./pages/Entry/Entry";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AddQuestions from "./pages/AddQuestions/AddQuestions";  // Import AddQuestions
import "./App.css";
import { useEffect,useState } from "react";
const isAdmin = true; // Change this dynamically based on authentication

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAdmin, setisAdmin] = useState(false);
 
  // useEffect(() => {
  //   const storedToken = localStorage.getItem("token");
  //   setToken(storedToken);
  // }, []);

  return (
    <Router>
      {(localStorage.getItem("token")) ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/home" element={<PrivateRoute element={<Home />} />} />
            <Route path="/practice" element={<PrivateRoute element={<Practice />} />} />
            <Route path="/leaderboard" element={<PrivateRoute element={<Leaderboard />} />} />
            <Route path="/profile" element={<PrivateRoute element={<Profile setToken={setToken} setisAdmin={setisAdmin} />} />} />
            <Route path="/compiler/:id" element={<PrivateRoute element={<CodeEditor />} />} />
            <Route path="/aptitude/question/:id" element={<PrivateRoute element={<ApptitudeComponent />} />} />
            <Route path="/add-questions" element={<AddQuestions />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Entry token={token} setToken={setToken}  isAdmin={isAdmin} setisAdmin={setisAdmin}/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
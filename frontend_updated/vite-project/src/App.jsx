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

const isAdmin = true; // Change this dynamically based on authentication

function App() {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Entry />} />
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/compiler/:id" element={<CodeEditor />} />
            <Route path="/submission/:id" element={<ApptitudeComponent />} />
            {isAdmin && <Route path="/add-questions" element={<AddQuestions />} />}  Admin Only
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

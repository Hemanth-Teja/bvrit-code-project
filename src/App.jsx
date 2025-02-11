import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import Navbar from "./components/Navbar/Navbar";
import Entry from "./pages/Entry/Entry";
import Home from "./pages/Home/Home";
import Practice from "./pages/Practice/Practice";
import LoginModal from "./components/Auth/LoginModal";
import Signupmodel from "./components/Auth/Signupmodel";
import CodeEditor from "./pages/Code/CodeEditor";
import Profile from "./pages/Profile/Profile";
import PrivateRoute from "./components/private";

function App() {
  const [modal, setModal] = useState(null); // "login", "signup", or null

  return (
    <Router>
  <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <Navbar setModal={setModal} />
      <Routes>
        <Route path="/" element={<Entry setModal={setModal} />} />
        <Route 
          path="/home" 
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/practice" 
          element={
            <PrivateRoute>
              <Practice />

              
            </PrivateRoute>
          } 
        />
        <Route 
          path="/practice/:id" 
          element={
            <PrivateRoute>
              <CodeEditor />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } 
        />
      </Routes>

      {modal === "login" && <LoginModal closeModal={() => setModal(null)} setModal={setModal} />}
      {modal === "signup" && <Signupmodel closeModal={() => setModal(null)} setModal={setModal} />}
    </Router>
  );
}

export default App;

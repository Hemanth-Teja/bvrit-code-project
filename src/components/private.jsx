import { Navigate } from "react-router-dom";

// Function to check if user is authenticated
const isAuthenticated = () => {
    return localStorage.getItem("token") !== null; // Check if token exists
};

const PrivateRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;

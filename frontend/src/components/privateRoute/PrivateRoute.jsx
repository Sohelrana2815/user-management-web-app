import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    // No token => not authenticated => redirect
    return <Navigate to="/login" replace />;
  }
  return children; // Render the protected page
};

export default PrivateRoute;

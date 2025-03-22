import useAuth from "../../hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
  const { loading, currentUser } = useAuth();
  const location = useLocation();
  console.log("Location at private route:", location);

  if (loading) {
    return (
      <span className="loading loading-ring loading-xl text-blue-700"></span>
    );
  }
  if (!currentUser) {
    // Redirect to login page, preserving the location tried to access

    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;

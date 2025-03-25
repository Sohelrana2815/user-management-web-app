import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  // 1. check if we have a user in local storage

  const storedUser = localStorage.getItem("currentUser");

  // 2. If there's no user data, user is not authenticated -> redirect to login page

  if (!storedUser) {
    return <Navigate to="/" replace />;
  }

  //3. Parse user to check status

  const user = JSON.parse(storedUser);

  if (user.status === "blocked") {
    // If user is blocked, redirect to login page

    return <Navigate to="/" replace />;
  }
  // If everything is good, render the protected page
  return children;
};

export default PrivateRoute;

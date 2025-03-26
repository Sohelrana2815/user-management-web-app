import React, { useState, useEffect } from "react";
import { Navigate } from "react-router";
import Swal from "sweetalert2";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!token) {
      const timer = setTimeout(() => {
        setShouldRedirect(true);
      }, 1500); // 1500ms delay (1.5 seconds)
      return () => clearTimeout(timer);
    }
  }, [token]);

  if (!token && shouldRedirect) {
    Swal.fire({
      title: "Blocked!",
      text: "User has been blocked!",
      icon: "success",
    });
    return <Navigate to="/" replace />;
  }

  if (!token) {
    // Optionally, you can render a loading state while waiting
    return <div>Loading...</div>;
  }

  // Render the protected page if authenticated
  return children;
};

export default PrivateRoute;

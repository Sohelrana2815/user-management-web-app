import React from "react";
import { useNavigate } from "react-router";

function LogoutButton() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    // Remove the user doc and token from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <button
      disabled={!token}
      onClick={handleLogout}
      className="btn btn-secondary"
    >
      Logout
    </button>
  );
}

export default LogoutButton;

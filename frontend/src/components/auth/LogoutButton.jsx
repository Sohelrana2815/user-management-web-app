import React from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

function LogoutButton() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to sign out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        // Remove the user doc and token from local storage
        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");
        Swal.fire({
          title: "Logged Out!",
          text: "You’ve been signed out successfully.",
          icon: "success",
        });
        navigate("/");
      }
    });

    // Redirect to login page
  };

  return (
    <button
      disabled={!token}
      onClick={handleLogout}
      className="btn btn-sm md:btn-md btn-secondary"
    >
      Logout
    </button>
  );
}

export default LogoutButton;

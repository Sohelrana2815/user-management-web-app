// Example using React Router for navigation
import { useNavigate } from "react-router";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the user doc from local storage
    localStorage.removeItem("currentUser");

    // Optionally show a confirmation or toast
    console.log("User has been logged out");

    // Redirect to login or home page
    navigate("/");
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;

// src/utils/axiosSecure.js
import axios from "axios";
import Swal from "sweetalert2";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000/api", // Your server's base URL
});

// Request Interceptor: Attach JWT
axiosSecure.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle 401/403
axiosSecure.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      if (status === 401 || status === 403) {
        // Remove token & user from localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");

        // Show a message
        Swal.fire("Session Ended", "Please log in again.", "info");

        // Force redirect to login
        window.location.href = "/"; // or "/login"
      }
    }
    return Promise.reject(error);
  }
);

export default axiosSecure;

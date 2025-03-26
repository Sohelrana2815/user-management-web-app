import axios from "axios";

// Base URL Public API

const BASE_URL = "https://user-management-web-app-server.onrender.com";

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

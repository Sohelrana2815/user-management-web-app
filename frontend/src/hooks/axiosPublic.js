import axios from "axios";

// Base URL Public API

const BASE_URL = "http://localhost:5000";

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

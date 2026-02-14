import axios from "axios";

// Normalize API base URL from env to avoid accidental relative-path requests in production
const rawBaseUrl = (import.meta.env.VITE_API_BASE_URL || "").trim();
const normalizedBaseUrl = rawBaseUrl
  ? /^https?:\/\//i.test(rawBaseUrl)
    ? rawBaseUrl
    : `https://${rawBaseUrl}`
  : "";
const API_BASE_URL = normalizedBaseUrl || "http://localhost:8080";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor to add auth headers
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.username && user.password) {
      const credentials = btoa(`${user.username}:${user.password}`);
      config.headers.Authorization = `Basic ${credentials}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;

import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Your backend API base URL
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor to add the auth token to headers automatically
API.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      // Attach token as Bearer token in Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;

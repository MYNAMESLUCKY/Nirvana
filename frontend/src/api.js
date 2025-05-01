import axios from 'axios';

// Create an Axios instance
const API = axios.create({
  baseURL:'http://localhost:5000/api',
  timeout: 10000, // Timeout after 10 seconds
});

export default API;

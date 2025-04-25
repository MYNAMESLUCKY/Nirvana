// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:5000",  // Replace with your backend URL if it's different
});

// Function to get user profile
export const getProfile = () => api.get("/profile");

// Function to update user profile
export const updateProfile = (data) => api.put("/profile", data);

// Function to upload the avatar
export const uploadAvatar = (formData) => api.post("/upload-avatar", formData);

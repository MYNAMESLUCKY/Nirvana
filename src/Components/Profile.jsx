import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUserEdit, FaCheck, FaTimes, FaCamera } from "react-icons/fa";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Schema validation with Yup
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
});

const ProfilePage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  
  // Initial profile data (replace with dynamic data as needed)
  const initialUserData = {
    name: "John Doe",
    email: "johndoe@example.com",
    profileImage: "/img/default-avatar.jpg"
  };

  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(initialUserData.profileImage);
  const [userData, setUserData] = useState(initialUserData);
  const [isUploading, setIsUploading] = useState(false);

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);

      // Simulate image upload delay (you can replace this with actual API call)
      setTimeout(() => {
        setIsUploading(false);
        toast.success("Profile picture updated!");
      }, 2000);
    }
  };

  const handleSaveProfile = (data) => {
    // Save the updated profile data (you can send data to your backend here)
    const updatedData = { ...data, profileImage };
    setUserData(updatedData);
    toast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-100 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <ToastContainer position="top-right" autoClose={3000} />

      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Your Profile</h2>

      <div className="flex justify-center mb-6 relative">
        <div className="relative w-40 h-40">
          <img
            src={profileImage}
            alt="Profile Avatar"
            className="w-40 h-40 rounded-full border-4 border-gray-300 object-cover"
          />
          <label
            htmlFor="upload-avatar"
            className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer shadow-lg"
          >
            <FaCamera />
          </label>
          <input
            id="upload-avatar"
            type="file"
            accept="image/*"
            onChange={handleProfileImageChange}
            className="hidden"
          />
          {isUploading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center rounded-full text-white text-sm">
              Uploading...
            </div>
          )}
        </div>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit(handleSaveProfile)} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium">Name</label>
            <input
              id="name"
              type="text"
              defaultValue={userData.name}
              {...register("name")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
            <input
              id="email"
              type="email"
              defaultValue={userData.email}
              {...register("email")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>

          <div className="flex justify-between items-center">
            <motion.button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg flex items-center hover:bg-blue-600 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
            >
              <FaCheck className="mr-2" /> Save
            </motion.button>

            <motion.button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg flex items-center hover:bg-gray-600 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
            >
              <FaTimes className="mr-2" /> Cancel
            </motion.button>
          </div>
        </form>
      ) : (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
          <div className="text-lg font-semibold text-gray-800">{userData.name}</div>
          <div className="text-sm text-gray-600 mb-4">{userData.email}</div>

          <motion.button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-500 text-white px-6 py-2 rounded-lg flex items-center hover:bg-yellow-600 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
          >
            <FaUserEdit className="mr-2" /> Edit Profile
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};

export default ProfilePage;

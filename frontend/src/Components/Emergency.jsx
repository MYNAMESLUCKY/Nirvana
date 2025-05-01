import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaExclamationCircle, FaPhoneAlt, FaMapMarkerAlt, FaUserAlt, FaClock, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { motion } from "framer-motion";
import API from "../api";

// Configure Leaflet marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
      when: "beforeChildren",
      duration: 0.6,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const Emergency = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    location: "",
    description: "",
    date: "",
    time: "",
    userId:"",
  });

  const [position, setPosition] = useState(null);
  const [status, setStatus] = useState("idle"); // 'idle', 'processing', 'done'

  // Fetch Current Location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setPosition(coords);
        fetchAddress(coords);
      },
      (err) => console.error("Location Error:", err)
    );
  }, []);

  // Update Date and Time
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setFormData((prev) => ({
        ...prev,
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString(),
      }));
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch Address from Coordinates
  const fetchAddress = async ({ lat, lng }) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await res.json();
      setFormData((prev) => ({ ...prev, location: data.display_name }));
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  // Location Marker Component
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
        fetchAddress(e.latlng);
      },
    });
    return position ? <Marker position={position} /> : null;
  };

  // Handle Form Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("processing");
  
    try {
      const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
      if (!token) {
        alert("You must be logged in to submit an emergency.");
        setStatus("idle");
        return;
      }
  
      const response = await API.post("/emergencies", formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Add the Authorization header
        },
      });
  
      if (response.status === 201) {
        setStatus("done");
        setTimeout(() => {
          setStatus("idle");
          setFormData({
            name: "",
            contact: "",
            location: "",
            description: "",
            date: "",
            time: "",
            userId: "",
          });
        }, 1500);
      }
    } catch (error) {
      console.error("Error submitting emergency:", error);
      alert("Failed to submit the emergency. Please try again.");
      setStatus("idle");
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-white text-black p-4 sm:p-6 md:p-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {status !== "idle" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center flex-col text-white text-center"
        >
          {status === "processing" && (
            <>
              <motion.div className="text-3xl sm:text-5xl font-bold mb-4">
                Hold on…
              </motion.div>
              <motion.div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></motion.div>
            </>
          )}
          {status === "done" && (
            <motion.div className="flex flex-col items-center">
              <FaCheckCircle className="text-green-500 text-6xl mb-4" />
              <div className="text-3xl sm:text-5xl font-bold">Done!</div>
            </motion.div>
          )}
        </motion.div>
      )}

      <motion.div
        className="max-w-xl mx-auto bg-[#0a1f44] text-white rounded-2xl p-6 shadow-xl"
        variants={childVariants}
      >
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaExclamationCircle className="text-orange-500" /> Emergency Alert Form
        </h2>

        {status !== "done" && position && (
          <motion.div className="h-60 w-full mb-4 rounded-md overflow-hidden z-0">
            <MapContainer
              center={position}
              zoom={15}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
              />
              <LocationMarker />
            </MapContainer>
          </motion.div>
        )}

        <motion.form onSubmit={handleSubmit} className="space-y-4">
          <motion.div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">
                <FaCalendarAlt className="inline mr-2 text-orange-400" /> Date
              </label>
              <input
                type="text"
                value={formData.date}
                readOnly
                className="mt-1 w-full px-4 py-2 rounded-md bg-white text-black border border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                <FaClock className="inline mr-2 text-orange-400" /> Time
              </label>
              <input
                type="text"
                value={formData.time}
                readOnly
                className="mt-1 w-full px-4 py-2 rounded-md bg-white text-black border border-gray-300"
              />
            </div>
          </motion.div>

          {[
            ["name", "Name", "Enter your name", <FaUserAlt className="inline mr-2 text-orange-400" />],
            ["contact", "Contact Info", "Phone or Email", <FaPhoneAlt className="inline mr-2 text-orange-400" />],
            ["location", "Location", "Auto-detected or enter manually", <FaMapMarkerAlt className="inline mr-2 text-orange-400" />],
          ].map(([name, label, placeholder, icon]) => (
            <motion.div key={name}>
              <label htmlFor={name} className="block text-sm font-medium">
                {icon} {label}
              </label>
              <input
                type="text"
                name={name}
                id={name}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2 rounded-md bg-white text-black border border-gray-300"
              />
            </motion.div>
          ))}

          <motion.div>
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              placeholder="Describe the emergency situation..."
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
              className="mt-1 w-full px-4 py-2 rounded-md bg-white text-black border border-gray-300"
            ></textarea>
          </motion.div>

          <motion.div>
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md"
            >
              Submit Emergency
            </button>
          </motion.div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default Emergency;
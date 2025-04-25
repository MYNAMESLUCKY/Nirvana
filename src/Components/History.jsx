import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaClock, FaCalendarAlt, FaPhoneAlt, FaUserAlt, FaEye, FaEdit, FaTrash } from "react-icons/fa";

// UI Animations and Dynamic Interactions
const ReportHistory = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("/api/reports");
        const data = await response.json();
        setReports(data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-[#f4f7fc] text-black p-4 sm:p-6 md:p-8"
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">History of Previous Reports</h2>

      {reports.length > 0 ? (
        <div className="space-y-4">
          {reports.map((report) => (
            <motion.div
              key={report._id}
              className="flex flex-col gap-2 p-6 sm:flex-row sm:items-center sm:gap-6 sm:py-4 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {/* Placeholder Image */}
              <img
                className="mx-auto block h-24 w-24 rounded-full sm:mx-0 sm:shrink-0"
                src="/img/placeholder.jpg" // Replace with dynamic image
                alt="User Profile"
              />

              {/* Report Details */}
              <div className="space-y-2 text-center sm:text-left">
                <div className="space-y-0.5">
                  <p className="text-xl font-semibold text-gray-800">{report.name}</p>
                  <p className="font-medium text-gray-500">{report.contact}</p>
                </div>

                {/* Location and Date */}
                <div className="flex items-center text-sm text-gray-500">
                  <FaMapMarkerAlt className="mr-2" />
                  {report.location}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <FaCalendarAlt className="mr-2" />
                  {report.date}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <FaClock className="mr-2" />
                  {report.time}
                </div>

                {/* Description */}
                <p className="mb-4 text-gray-600">{report.description}</p>

                {/* Report Status */}
                <div className="text-sm font-medium text-gray-600">
                  <strong>Status:</strong> <span className="text-green-500">{report.status}</span>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex space-x-4 justify-center sm:justify-start">
                  <motion.button
                    className="flex items-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-all duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaEye className="mr-2" /> View
                  </motion.button>
                  <motion.button
                    className="flex items-center bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md transition-all duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaEdit className="mr-2" /> Edit
                  </motion.button>
                  <motion.button
                    className="flex items-center bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-all duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaTrash className="mr-2" /> Delete
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No previous reports available.</div>
      )}
    </motion.div>
  );
};

export default ReportHistory;

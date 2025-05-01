import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Home, User, History, Siren, Bell } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap"; // Import GSAP

export default function Navbar1() {
  const navigate = useNavigate();
  const welcomeTextRef = useRef(null); // Reference for the welcome text

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Use GSAP to animate the "Welcome to the Website" text
  useEffect(() => {
    gsap.fromTo(
      welcomeTextRef.current, // Targeting the element
      {
        opacity: 0,
        y: 50,
        scale: 0.8,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: "easeOut",
        delay: 0.3,
      }
    );
  }, []);

  return (
    <motion.div
      className="bg-black w-screen h-screen relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Centered Welcome Text */}
      <section className="flex items-center justify-center h-full text-indigo-50">
        <motion.h1
          ref={welcomeTextRef}
          className="inline-block font-bold text-4xl"
          style={{
            background: "linear-gradient(to right, #60a5fa, #BB3E00, #c7d2fe)", // Custom gradient
            backgroundClip: "text",
            color: "transparent",
          }}
        >
        CREATE A SAFE WORLD WITH US 
              AND
      <br></br>EMABARK ON A JOURNEY OF NIRVANA
        </motion.h1>
      </section>
      <div></div>

      {/* Bottom Navbar */}
      <div className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-blue-50 via-white to-blue-50 p-4 shadow-lg z-50 border-t border-blue-200">
        <div className="flex justify-around items-center space-x-4 sm:space-x-8">
          {/* Home */}
          <button
            onClick={() => handleNavigation("/report")}
            className="flex flex-col items-center group transition-transform duration-300 ease-in-out hover:scale-110"
          >
            <div className="relative">
              <Home
                size={28}
                className="text-gray-600 group-hover:text-blue-600 transition-colors"
              />
              <span className="absolute top-[-6px] right-[-6px] bg-blue-500 text-white text-xs rounded-full px-1 shadow-md">
                4
              </span>
            </div>
            <span className="text-xs mt-1 text-gray-500 group-hover:text-blue-600">
              Home
            </span>
          </button>

          {/* Notifications */}
          <button
            onClick={() => handleNavigation("/notifications")}
            className="flex flex-col items-center group transition-transform duration-300 ease-in-out hover:scale-110"
          >
            <div className="relative">
              <Bell
                size={26}
                className="text-gray-600 group-hover:text-yellow-600 transition-colors"
              />
              <span className="absolute top-[-6px] right-[-6px] bg-yellow-500 text-white text-xs rounded-full px-1 shadow-md">
                3
              </span>
            </div>
            <span className="text-xs mt-1 text-gray-500 group-hover:text-yellow-600">
              Alerts
            </span>
          </button>

          {/* Emergency */}
          <button
            onClick={() => handleNavigation("/emergency")}
            className="flex flex-col items-center group transition-transform duration-300 ease-in-out hover:scale-110"
          >
            <Siren
              size={40}
              className="text-gray-600 group-hover:text-red-600 transition-colors"
            />
            <span className="text-xs mt-1 text-gray-500 group-hover:text-red-600">
              Emergency
            </span>
          </button>

          {/* History */}
          <button
            onClick={() => handleNavigation("/history")}
            className="flex flex-col items-center group transition-transform duration-300 ease-in-out hover:scale-110"
          >
            <History
              size={26}
              className="text-gray-600 group-hover:text-green-600 transition-colors"
            />
            <span className="text-xs mt-1 text-gray-500 group-hover:text-green-600">
              History
            </span>
          </button>

          {/* Profile */}
          <button
            onClick={() => handleNavigation("/profile")}
            className="flex flex-col items-center group transition-transform duration-300 ease-in-out hover:scale-110"
          >
            <User
              size={28}
              className="text-gray-600 group-hover:text-purple-600 transition-colors"
            />
            <span className="text-xs mt-1 text-gray-500 group-hover:text-purple-600">
              Profile
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

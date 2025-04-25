import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, User, Wallet, Bell, TriangleAlert, History, Siren } from 'lucide-react';

export default function Navbar1() {
  // Initialize the navigate function from react-router-dom
  const navigate = useNavigate();

  // Handle button clicks and navigate to the respective pages
  const handleReportClick = () => {
    navigate("/report");  // Navigate to the report page
  };

  const handleEmergencyClick = () => {
    navigate("/emergency");  // Navigate to the emergency page
  };

  const handleHistoryClick = () => {
    navigate("/history");  // Navigate to the history page
  };

  const handleProfileClick = () => {
    navigate("/profile");  // Navigate to the profile page
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white p-4 shadow-lg z-50">
      <div className="flex justify-around items-center space-x-6 sm:space-x-12">
        {/* Report Icon */}
        <button 
          onClick={handleReportClick} 
          className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors">
          <Home size={24} />
          <span className="text-xs mt-1">Report</span>
        </button>

        {/* Emergency Icon */}
        <button 
          onClick={handleEmergencyClick} 
          className="flex flex-col items-center text-gray-600 hover:text-red-700 transition-colors">
          <Siren size={30} />
          <span className="text-xs mt-1">Emergency</span>
        </button>

        {/* History Icon */}
        <button 
          onClick={handleHistoryClick} 
          className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors">
          <History size={24} />
          <span className="text-xs mt-1">History</span>
        </button>

        {/* Profile Icon */}
        <button 
          onClick={handleProfileClick} 
          className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors">
          <User size={24} />
          <span className="text-xs mt-1">Profile</span>
        </button>
      </div>
    </div>
  );
}

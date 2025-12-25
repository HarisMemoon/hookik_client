// src/components/TopNavbar.js (UPDATED TO ACCEPT PROPS)
"use client";

import { Search, Bell, HelpCircle, ChevronDown, LogOut } from "lucide-react";
import UserDropdown from "./UserDropdown";

// Define default props to avoid crashing if data is missing during development
export default function TopNavbar({
  adminName = "Admin User",
  adminInitials = "AU",
  adminRole = "admin",
}) {
  const handleLogout = () => {
    // Implement logout logic here (e.g., clearing auth token, redirecting)
    console.log("Logging out...");
  };

  return (
    <header className="flex items-center justify-between h-20 p-6 bg-white border-b border-gray-200 sticky top-0 z-10">
      {/* Left Side: Search Bar (Remains the same) */}
      <div className="flex items-center flex-1 mr-8">
        <div className="relative w-full max-w-xl">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search sub-account..."
            className="w-full h-12 pl-12 pr-4 text-sm border border-gray-300 rounded-full focus:outline-none focus:border-indigo-500 transition-colors text-gray-700 bg-white shadow-sm"
          />
        </div>
      </div>

      {/* Right Side: Icons and User Profile */}
      <div className="flex items-center space-x-6">
        {/* Notification Bell (Themed to match the user icon ring) */}
        <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
          <Bell size={24} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        {/* Help Icon */}
        <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
          <HelpCircle size={24} />
        </button>

        {/* User Profile Dropdown */}
        <div className="flex items-center space-x-2 cursor-pointer group">
          {/* User Image/Avatar - NOW USES DYNAMIC INITIALS */}
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-pink-200 flex items-center justify-center border-2 border-transparent group-hover:border-[#8937ce] transition-colors">
              <span className="text-pink-800 text-base font-semibold">
                {adminInitials}
              </span>
            </div>
            {/* Online status indicator */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border border-white rounded-full"></span>
          </div>

          {/* Dropdown Arrow - Pass the data to the dropdown component */}
          <UserDropdown
            adminName={adminName}
            adminRole={adminRole}
            handleLogout={handleLogout}
          />
        </div>
      </div>
    </header>
  );
}

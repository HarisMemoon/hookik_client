"use client";

import { useState, useRef, useEffect } from "react";
import { LogOut, User, Settings, ChevronDown } from "lucide-react";

export default function UserDropdown({ adminName, adminRole, handleLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function signOutAndRedirect() {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    localStorage.removeItem("admin_role");
    if (handleLogout) handleLogout();
    window.location.href = "/login";
  }

  return (
    <div className="relative" ref={ref}>
      {/* --- Trigger Section --- */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 py-1.5 px-2 rounded-xl hover:bg-gray-50 transition-all duration-200 group focus:outline-none"
      >
        <div className="hidden sm:block text-right">
          <p className="text-sm font-bold text-gray-900 leading-tight">
            {adminName || "Admin User"}
          </p>
          <p className="text-[11px] font-medium text-purple-600 uppercase tracking-wider">
            {adminRole?.replace("_", " ") || "Manager"}
          </p>
        </div>

        <div
          className={`transition-transform duration-200 text-gray-400 group-hover:text-purple-600 ${open ? "rotate-180" : ""}`}
        >
          <ChevronDown size={16} strokeWidth={3} />
        </div>
      </button>

      {/* --- Dropdown Menu --- */}
      <div
        className={`
          absolute right-0 mt-3 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/50
          transition-all duration-200 origin-top-right z-50 overflow-hidden
          ${open ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}
        `}
      >
        {/* User Brief Section (Visible only in dropdown) */}
        <div className="px-4 py-3 bg-gray-50/50 border-b border-gray-100">
          <p className="text-xs text-gray-500 font-medium">Signed in as</p>
          <p className="text-sm font-semibold text-gray-900 truncate">
            {adminName}
          </p>
        </div>

        <div className="p-1.5">
          {/* <button
            className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-gray-700 font-medium rounded-xl hover:bg-purple-50 hover:text-purple-700 transition-colors group"
            onClick={() => alert("Open Account")}
          >
            <div className="p-1.5 bg-gray-100 rounded-lg group-hover:bg-purple-100 transition-colors">
              <User size={16} />
            </div>
            My Profile
          </button>

          <button
            className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-gray-700 font-medium rounded-xl hover:bg-purple-50 hover:text-purple-700 transition-colors group"
            onClick={() => alert("Settings")}
          >
            <div className="p-1.5 bg-gray-100 rounded-lg group-hover:bg-purple-100 transition-colors">
              <Settings size={16} />
            </div>
            Settings
          </button> */}

          {/* <div className="my-1 border-t border-gray-100" /> */}

          <button
            className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-red-600 font-semibold rounded-xl hover:bg-red-50 transition-colors group"
            onClick={signOutAndRedirect}
          >
            <div className="p-1.5 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors">
              <LogOut size={16} />
            </div>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import {
  Search,
  Bell,
  HelpCircle,
  Info,
  History,
  Terminal,
} from "lucide-react";
import UserDropdown from "./UserDropdown";
import useSystemLogs from "@/hooks/useSystemLogs"; // Reusing your existing hook

export default function TopNavbar() {
  const { logs, loading } = useSystemLogs(); // Fetches real system logs
  const [adminData, setAdminData] = useState({
    name: "Admin User",
    initials: "AU",
    role: "Admin",
  });

  // Dropdown States
  const [showNotifications, setShowNotifications] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [hasNewLogs, setHasNewLogs] = useState(false);

  const notifRef = useRef();
  const infoRef = useRef();

  // Load Admin Data & Check for new logs
  useEffect(() => {
    const storedUser = localStorage.getItem("admin_user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const firstName = user.first_name || "Admin";
      const lastName = user.last_name || "User";
      setAdminData({
        name: `${firstName} ${lastName}`,
        initials: `${firstName[0]}${lastName[0]}`.toUpperCase(),
        role: user.role?.replace("_", " ") || "Manager",
      });
    }

    // Badge Logic: If logs count increases, show red dot
    if (logs.length > 0) {
      const lastSeenCount = localStorage.getItem("last_seen_logs_count");
      if (!lastSeenCount || logs.length > parseInt(lastSeenCount)) {
        setHasNewLogs(true);
      }
    }
  }, [logs]);

  // Close dropdowns on click outside
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target))
        setShowNotifications(false);
      if (infoRef.current && !infoRef.current.contains(e.target))
        setShowInfo(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleOpenNotifications = () => {
    setShowNotifications(!showNotifications);
    setHasNewLogs(false);
    localStorage.setItem("last_seen_logs_count", logs.length.toString());
  };

  return (
    <header className="flex items-center justify-between h-20 p-6 bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Search Bar */}
      <div className="flex items-center flex-1 mr-8">
        <div className="relative w-full max-w-xl">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search sub-account..."
            className="w-full h-11 pl-12 pr-4 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-gray-700 bg-gray-50/50"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* --- NOTIFICATIONS DROPDOWN --- */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={handleOpenNotifications}
            className={`relative p-2.5 rounded-xl transition-all ${showNotifications ? "bg-purple-50 text-purple-600" : "text-gray-500 hover:bg-gray-100"}`}
          >
            <Bell size={22} />
            {hasNewLogs && (
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/50 overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
                <span className="text-sm font-bold text-gray-900">
                  System Activity
                </span>
                <History size={14} className="text-gray-400" />
              </div>
              <div className="max-h-80 overflow-y-auto">
                {logs.length > 0 ? (
                  logs.slice(0, 3).map((log, i) => (
                    <div
                      key={i}
                      className="px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                    >
                      <div className="flex gap-3">
                        <div className="mt-1 p-1.5 bg-purple-50 text-purple-600 rounded-lg h-fit">
                          <Terminal size={14} />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-900">
                            {log.action}
                          </p>
                          <p className="text-[11px] text-gray-500 mt-0.5">
                            By {log.admin?.first_name || "System"}
                          </p>
                          <p className="text-[10px] text-gray-400 mt-1">
                            {new Date(log.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-400 text-sm">
                    No recent logs
                  </div>
                )}
              </div>
              <button className="w-full py-3 text-xs font-bold text-purple-600 hover:bg-purple-50 transition-colors border-t border-gray-50">
                View All Logs
              </button>
            </div>
          )}
        </div>

        {/* --- INFO / HELP DROPDOWN --- */}
        <div className="relative" ref={infoRef}>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className={`p-2.5 rounded-xl transition-all ${showInfo ? "bg-blue-50 text-blue-600" : "text-gray-500 hover:bg-gray-100"}`}
          >
            <HelpCircle size={22} />
          </button>

          {showInfo && (
            <div className="absolute right-0 mt-3 w-72 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/50 p-5 z-50">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                  <Info size={20} />
                </div>
                <h3 className="font-bold text-gray-900">Hookik Admin</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Welcome to the central command. Here you can manage creators,
                brands, and oversee the entire Hookik marketplace.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" /> V
                  3.0.1 Stable
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />{" "}
                  Documentation
                </div>
              </div>
            </div>
          )}
        </div>

        {/* --- USER PROFILE --- */}
        <div className="flex items-center space-x-2 pl-2 border-l border-gray-100 group">
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center border-2 border-transparent group-hover:border-purple-600 transition-colors">
            <span className="text-purple-700 text-base font-bold">
              {adminData.initials}
            </span>
          </div>
          <UserDropdown adminName={adminData.name} adminRole={adminData.role} />
        </div>
      </div>
    </header>
  );
}

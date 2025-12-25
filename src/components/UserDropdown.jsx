// src/components/UserDropdown.js (FINALIZED)
"use client";

import { useState, useRef, useEffect } from "react";

export default function UserDropdown({
  adminName,
  adminRole,
  handleLogout, // <-- Accepting the logout function from parent
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(); // Close dropdown when clicking outside

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []); // Signout function (Now just calls the prop function) // We will keep the client-side token clearing here for immediate effect

  function signOutAndRedirect() {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");

    // Call the optional handler from the parent (TopNavbar)
    if (handleLogout) {
      handleLogout();
    }

    window.location.href = "/login"; // Redirect immediately
  }

  return (
    <div className="relative" ref={ref}>
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 focus:outline-none"
      >
        <div className="hidden sm:block text-sm">
          {/* DYNAMIC USER NAME */}
          <p className="font-semibold text-gray-800">{adminName || "Admin"}</p>
          {/* DYNAMIC USER ROLE */}
          <p className="text-xs text-gray-500 -mt-0.5 capitalize">
            {adminRole || "Manager"}
          </p>
        </div>
        <span className="text-xs text-gray-600">▼</span>
      </button>
      {/* Dropdown Menu */}
      <div
        className={`
     absolute right-0 mt-2 w-40 bg-white border rounded shadow
     transition-all duration-200 ease-out
     ${
       open
         ? "opacity-100 visible translate-y-0"
         : "opacity-0 invisible -translate-y-2"
     }
    `}
      >
        <button
          className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 text-black"
          onClick={() => alert("Open Account")}
        >
          My Account
        </button>

        <button
          className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 text-red-600"
          onClick={signOutAndRedirect} // <-- Call the new wrapper function
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

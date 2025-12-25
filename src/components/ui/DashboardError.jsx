// src/components/ui/DashboardError.jsx
"use client";

import { AlertTriangle, Home } from "lucide-react";

// Use a known primary color or the custom PRIMARY constant if available globally
const ERROR_COLOR = "#8937CE";

export default function DashboardError({ message }) {
  return (
    <div className="flex items-center justify-center p-12 bg-gray-50 min-h-screen">
      <div
        className="bg-white p-10 rounded-xl shadow-2xl max-w-lg w-full text-center border-t-4"
        style={{ borderColor: ERROR_COLOR }}
      >
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <AlertTriangle size={48} style={{ color: ERROR_COLOR }} />
        </div>

        {/* Title and Message */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Data Loading Failed
        </h2>

        <p className="text-gray-600 mb-6">
          The dashboard could not load data due to an issue with the backend
          connection or authentication.
        </p>

        {/* Specific Error Detail */}
        <p className="text-sm font-mono bg-red-50 text-red-700 p-3 rounded-md mb-6 border border-red-200">
          Error: {message}
        </p>

        {/* Suggested Action */}
        <div className="space-y-3">
          <p className="text-sm text-gray-500">
            If the error mentions "expired" or "unauthorized," please log out
            and log back in.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-2 px-4 rounded-lg text-sm font-semibold text-white transition-colors"
            style={{ backgroundColor: ERROR_COLOR }}
          >
            Try Reloading Page
          </button>
        </div>
      </div>
    </div>
  );
}

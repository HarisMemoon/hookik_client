// src/components/ui/DashboardLoader.jsx
"use client";

// Assuming PRIMARY is a global constant or easily accessible,
// if not, you can replace it with the hex code like '#8937CE' directly.
const PRIMARY = "#8937CE"; // Use your Hookik primary color

export default function DashboardLoader() {
  return (
    <div className="flex items-center justify-center p-12 min-h-screen bg-gray-50">
      <div className="flex flex-col items-center">
        {/* The Animated Spinner Element */}
        <div
          className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-200"
          style={{ borderTopColor: PRIMARY }} // Apply primary color to the spinner top
        ></div>

        {/* Brand Logo/Text (Optional: Adds context) */}
        <p className="mt-6 text-lg font-semibold text-gray-700">
          Loading Hookik Data...
        </p>
        <p className="text-sm text-gray-500">Fetching latest statistics.</p>
      </div>
    </div>
  );
}

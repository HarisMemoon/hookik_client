"use client";

import { useState } from "react";
import LeftDashboard from "./LeftDashboard";
import TopNavbar from "./TopNavbar";

const DEFAULT_WIDTH = 256; // 64 units * 4px/unit
const COLLAPSED_WIDTH = 72; // 4.5rem * 16px/rem

export default function AdminLayout({ children }) {
  // State to manage the sidebar collapse
  const [isCollapsed, setIsCollapsed] = useState(false); // Calculate the margin based on the state (in pixels for smooth transition)

  const marginLeft = isCollapsed ? COLLAPSED_WIDTH : DEFAULT_WIDTH;

  return (
    <div className="flex min-h-screen">
      {/* 1. Sidebar (Fixed) - Remains outside the main content wrapper */}

      {/* 2. Main Content Area (Dynamic Margin) */}
      <main
        // Apply flex-col to stack Navbar above children vertically
        className="flex-1 flex flex-col transition-all duration-300 ease-in-out"
        style={{ marginLeft: `${marginLeft}px` }} // Apply dynamic margin
      >
        {/* TopNavbar MUST be inside the element with the dynamic margin */}
        {/* Page Content (children) */}
        <div className="flex-1">{children}</div>
      </main>
    </div>
  );
}

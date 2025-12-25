"use client";

import { useState } from "react";
import LeftDashboard from "@/components/LeftDashboard";
import TopNavbar from "@/components/TopNavbar";
import AuthGuard from "@/components/AuthGuard";

const EXPANDED = 256;
const COLLAPSED = 72;
const adminData = {
  name: "Hookik Admin",
  initials: "HA",
  role: "Super Admin",
};
export default function AdminLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const width = isCollapsed ? COLLAPSED : EXPANDED;

  return (
    <AuthGuard>
      <div className="flex min-h-screen">
        <div
          className="fixed left-0 top-0 h-full bg-white shadow-md transition-all duration-300"
          style={{ width }}
        >
          <LeftDashboard
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />
        </div>

        <div
          className="flex-1 flex flex-col transition-all duration-300"
          style={{ marginLeft: width }}
        >
          <TopNavbar
            adminName={adminData.name}
            adminInitials={adminData.initials}
            adminRole={adminData.role}
          />
          <div className="flex-1 ">{children}</div>
        </div>
      </div>
    </AuthGuard>
  );
}

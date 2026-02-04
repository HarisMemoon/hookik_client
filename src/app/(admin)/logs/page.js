"use client";

import { useState } from "react";
import {
  Download,
  ShieldCheck,
  LogIn,
  Activity,
  Globe,
  ShieldAlert,
} from "lucide-react";
import GenericTable from "@/components/GenericTable";

// ============================================================================
// LOGS TABLE CONFIG
// ============================================================================

const logColumns = [
  { header: "Admin", key: "admin" },
  { header: "Action", key: "action" },
  { header: "Target", key: "target" },
  { header: "Time Stamp", key: "timestamp" },
  { header: "IP Address", key: "ipAddress" },
];

const logData = [
  {
    id: 1,
    admin: "Abeeb Adewale",
    action: "Approved Refund",
    target: "ORD-2024-1234",
    timestamp: "2025-12-30 14:22:01",
    ipAddress: "192.168.1.45",
  },
  {
    id: 2,
    admin: "Sarah Johnson",
    action: "Updated Product",
    target: "Wireless Earbuds Pro",
    timestamp: "2025-12-30 13:10:45",
    ipAddress: "41.203.77.12",
  },
  {
    id: 3,
    admin: "Super Admin",
    action: "Revoked API Key",
    target: "hk_test_123890",
    timestamp: "2025-12-30 12:05:12",
    ipAddress: "105.112.34.88",
  },
  {
    id: 4,
    admin: "Abeeb Adewale",
    action: "Changed User Status",
    target: "Brand: FashionHub",
    timestamp: "2025-12-30 11:30:00",
    ipAddress: "192.168.1.45",
  },
];

export default function SystemLogsPage() {
  return (
    <main className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">System Logs</h1>
          <p className="text-gray-600 text-sm">
            Track all administrative activities and system events for auditing
          </p>
        </div>

        {/* 🔹 Export Logs Button */}
        <button className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-purple-700 transition shadow-md shadow-purple-100">
          <Download size={18} />
          Export Logs
        </button>
      </div>

      {/* Logs Table */}
      <div className="mb-12">
        <GenericTable
          title="Activity Logs"
          columns={logColumns}
          showFilter
          data={logData}
          showSearch
          searchPlaceholder="Search logs by admin or target..."
          className="rounded-2xl"
          showActions={false} // Logs usually don't have individual row actions
        />
      </div>

      {/* 🔹 Security Monitoring Section */}
      {/* <section className="mt-12 p-6 border border-gray-200 rounded-2xl">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Security Monitoring
        </h2>

        <div className="flex items-center justify-between p-4 bg-green-50 border border-green-100 rounded-2xl mb-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
              <ShieldCheck size={20} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-green-900">
                System Security: Normal
              </p>
              <p className="text-sm text-green-700">
                No security threats detected in the last 24 hours.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-white border border-green-200 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[11px] font-bold text-green-700 uppercase tracking-wider">
              Active
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white border border-gray-100 rounded-2xl ">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-500 mb-2">
                Failed Login Attempts
              </span>
              <span className="text-3xl font-bold text-red-600 mb-1">12</span>
              <span className="text-xs text-gray-400">Last 24 hours</span>
            </div>
          </div>

          <div className="p-6 bg-white border border-gray-100 rounded-2xl ">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-500 mb-2">
                Success Logins
              </span>
              <span className="text-3xl font-bold text-gray-900 mb-1">156</span>
              <span className="text-xs text-gray-400">Last 24 hours</span>
            </div>
          </div>

          <div className="p-6 bg-white border border-gray-100 rounded-2xl ">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-500 mb-2">
                API Requests
              </span>
              <span className="text-3xl font-bold text-purple-600 mb-1">
                24,000
              </span>
              <span className="text-xs text-gray-400">Last 24 hours</span>
            </div>
          </div>
        </div>
      </section> */}
    </main>
  );
}

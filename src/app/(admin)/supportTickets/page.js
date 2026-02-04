"use client";

import { useSearchParams, usePathname } from "next/navigation";
import { Download, LifeBuoy } from "lucide-react";
import { useState } from "react";
import PillFilterGroup from "@/components/PillFilterGroup";
import GenericTable from "@/components/GenericTable";

// ============================================================================
// CONFIG
// ============================================================================

const DEFAULT_FILTER = "open";

const ticketFilters = [
  { value: "open", label: "Open Tickets" },
  { value: "in_progress", label: "In Progress" },
  { value: "resolved", label: "Resolved" },
];

// ============================================================================
// TABLE DEFINITIONS
// ============================================================================

// -------- Open Tickets --------
const openColumns = [
  { header: "Ticket ID", key: "ticketId" },
  { header: "User", key: "user" },
  { header: "Subject", key: "subject" },
  { header: "Priority", key: "priority" },
  { header: "Status", key: "status" },
  { header: "Date", key: "date" },
];

const openData = Array.from({ length: 4 }).map((_, i) => ({
  id: i + 1,
  ticketId: `TIC-880${i}`,
  user: i % 2 === 0 ? "Abeeb Adewale" : "Jane Doe",
  subject:
    i % 2 === 0
      ? "Payment failure on checkout"
      : "Cannot access storefront settings",
  priority: i === 0 ? "High" : "Medium",
  status: "Open",
  date: "2025-12-29",
}));

// -------- In Progress --------
const inProgressColumns = [
  { header: "Ticket ID", key: "ticketId" },
  { header: "User", key: "user" },
  { header: "Subject", key: "subject" },
  { header: "Priority", key: "priority" },
  { header: "Assigned To", key: "assignedTo" },
  { header: "Last Updated", key: "updatedAt" },
];

const inProgressData = Array.from({ length: 3 }).map((_, i) => ({
  id: i + 10,
  ticketId: `TIC-770${i}`,
  user: "Tunde Ednut",
  subject: "Account verification delay",
  priority: "High",
  assignedTo: "Support Agent Mark",
  updatedAt: "2025-12-30 10:45 AM",
}));

// -------- Resolved --------
const resolvedColumns = [
  { header: "Ticket ID", key: "ticketId" },
  { header: "User", key: "user" },
  { header: "Subject", key: "subject" },
  { header: "Priority", key: "priority" },
  { header: "Resolved By", key: "resolvedBy" },
  { header: "Resolution Date", key: "resolvedAt" },
];

const resolvedData = Array.from({ length: 5 }).map((_, i) => ({
  id: i + 20,
  ticketId: `TIC-660${i}`,
  user: "Sarah Connor",
  subject: "Password reset link not working",
  priority: "Low",
  resolvedBy: "Admin Sarah",
  resolvedAt: "2025-12-28",
}));

// ============================================================================
// DATA MAP
// ============================================================================

const tableMap = {
  open: {
    title: "New Support Requests",
    columns: openColumns,
    data: openData,
    actions: [{ key: "view", label: "View Ticket", variant: "primary" }],
    variant: "buttons",
  },
  in_progress: {
    title: "Tickets Under Review",
    columns: inProgressColumns,
    data: inProgressData,
    actions: [
      { key: "view", label: "View", variant: "edit" }, // Using your wide edit variant style
      { key: "resolve", label: "Resolve", variant: "success" },
    ],
    variant: "buttons",
  },
  resolved: {
    title: "Completed Support Cases",
    columns: resolvedColumns,
    data: resolvedData,
    actions: [{ key: "view", label: "View Details", variant: "primary" }],
    variant: "buttons",
  },
};

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function SupportTicketsPage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get("filter") || DEFAULT_FILTER;

  const pillItems = ticketFilters.map((f) => ({
    ...f,
    href: `${pathname}?filter=${f.value}`,
  }));

  const activeConfig = tableMap[currentFilter] || tableMap.open;

  const handleAction = (action, row) => {
    switch (action) {
      case "resolve":
        console.log("Resolving ticket:", row.ticketId);
        break;
      case "view":
        console.log("Opening ticket viewer for:", row.ticketId);
        break;
      default:
        console.log(`${action} triggered for:`, row);
    }
  };

  return (
    <main className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900 mb-2">
            Support Tickets
          </h1>
          <p className="text-gray-600 text-sm">
            Manage and respond to user support requests across the platform
          </p>
        </div>

        <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition shadow-md shadow-purple-100">
          <Download size={18} />
          Export Tickets
        </button>
      </div>

      {/* Pills */}
      <div className="mb-6">
        <PillFilterGroup active={currentFilter} items={pillItems} />
      </div>

      {/* Table */}
      <GenericTable
        title={activeConfig.title}
        columns={activeConfig.columns}
        data={activeConfig.data}
        showSearch
        searchPlaceholder="Search by Ticket ID or User..."
        actionsVariant={activeConfig.variant}
        rowActions={activeConfig.actions}
        onActionClick={handleAction}
        className="rounded-2xl"
        // Applying custom color rendering for Priority
        customRenderers={{
          priority: (val) => (
            <span
              className={`font-bold ${
                val === "High" ? "text-red-600" : "text-gray-700"
              }`}
            >
              {val}
            </span>
          ),
        }}
      />
    </main>
  );
}

"use client";

import React, { useState } from "react";
import { Search, Eye, Clock, Ticket, Box, Timer, Info } from "lucide-react";
import Dropdown from "@/components/ui/DropDown";
import GenericTable from "@/components/GenericTable";
import TicketViewModal from "@/components/supportTicketsAdminModals/TicketViewModal";
import StatusCapsule from "@/components/ui/StatusCapsule";

// Config for Top Stats
const ticketStats = [
  { label: "Total", value: 5, icon: Box, color: "gray" },
  {
    label: "Open",
    value: 1,
    icon: Info,
    color: "#2B7FFF",
  },
  {
    label: "In Progress",
    value: 2,
    icon: Clock,
    color: "#F0B100",
  },
  {
    label: "Urgent",
    value: 3,
    icon: Info,
    color: "#FB2C36",
  },
  { label: "Avg Response", value: "2.5 hours", icon: null },
  { label: "Avg Resolution", value: "18 hours", icon: null },
  { label: "SLA Breach", value: 7, icon: Timer, color: "#FB2C36" },
];

const ticketColumns = [
  { header: "Ticket ID", key: "id" },
  { header: "User Type", key: "userType" },
  { header: "User Name", key: "userName" },
  { header: "Subject", key: "subject" },
  { header: "Category", key: "category" },
  {
    header: "Priority",
    key: "priority",
    sortable: true,
    render: (_, row) => <StatusCapsule value={row.priority} />,
  },
  {
    header: "Status",
    key: "status",
    sortable: true,
    render: (_, row) => <StatusCapsule value={row.status} />,
  },
  { header: "SLA", key: "sla" },
  { header: "Assigned To", key: "assignedTo" },
  { header: "Created", key: "created" },
];
const filterConfigs = [
  {
    id: "userType",
    label: "All Users",
    options: [
      { label: "All Users", value: "all" },
      { label: "Shoppers", value: "shopper" },
      { label: "Creators", value: "creator" },
      { label: "Brands", value: "brand" },
    ],
  },
  {
    id: "status",
    label: "All Statuses",
    options: [
      { label: "All Statuses", value: "all" },
      { label: "Open", value: "open" },
      { label: "In Progress", value: "in_progress" },
      { label: "Resolved", value: "resolved" },
      { label: "Waiting on User", value: "waiting" },
    ],
  },
  {
    id: "priority",
    label: "All Priorities",
    options: [
      { label: "All Priorities", value: "all" },
      { label: "Low", value: "low" },
      { label: "Normal", value: "normal" },
      { label: "High", value: "high" },
      { label: "Urgent", value: "urgent" },
    ],
  },
  {
    id: "admin",
    label: "All Admins",
    options: [
      { label: "All Admins", value: "all" },
      { label: "Sarah Finance", value: "sarah" },
      { label: "Lisa Catalog", value: "lisa" },
    ],
  },
];

export default function SupportTicketsAdminPage() {
  const [filters, setFilters] = useState({
    userType: "all",
    status: "all",
    priority: "all",
    admin: "all",
  });
  // 2. Add states for modal visibility and data
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleFilterChange = (id, value) => {
    setFilters((prev) => ({ ...prev, [id]: value }));
  };
  const handleActionClick = (key, row) => {
    if (key === "view") {
      setSelectedTicket(row);
      setIsViewModalOpen(true);
    }
  };
  return (
    <main className="p-6 bg-white min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl text-gray-900 font-bold flex items-center gap-2">
          <Ticket size={24} className="text-purple-500" />
          Support Tickets (Admin)
        </h1>
        <p className="text-gray-500 text-sm">
          Manage and resolve issues raised by shoppers, creators, and brands.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-7 gap-4 mb-8">
        {ticketStats.map((stat) => (
          <div
            key={stat.label}
            className={`p-4 border border-gray-100 rounded-2xl bg-white  ${stat.border}`}
          >
            <div className="flex justify-between  items-start mb-2">
              <span className="text-xs font-medium text-gray-500">
                {stat.label}
              </span>
              {/* <span className={stat.color}>{stat.icon}</span> */}
              {stat.icon ? (
                <stat.icon
                  size={22}
                  style={{ color: stat.color, marginTop: 5 }}
                />
              ) : null}
            </div>
            <p className="text-xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap gap-3 mb-6 bg-white p-4 rounded-2xl border border-gray-100">
        <div className="relative flex-1 min-w-[300px] min-h-[40px]">
          <Search
            className="absolute left-3 top-4 -translate-y-1/2 text-gray-400 "
            size={18}
          />
          <input
            className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border border-gray-200 rounded-xl outline-none text-sm text-black font-medium"
            placeholder="Search by ID, subject, or user..."
          />
        </div>
        {/* Custom Dropdowns Replacement */}
        <div className="flex gap-2">
          {filterConfigs.map((config) => (
            <Dropdown
              key={config.id}
              label={config.label}
              options={config.options}
              value={filters[config.id]}
              onChange={(val) => handleFilterChange(config.id, val)}
              className="min-w-[150px]"
            />
          ))}
        </div>
      </div>

      <GenericTable
        columns={ticketColumns}
        data={[
          {
            id: "TKT-SH-001",
            userType: "Shopper",
            userName: "John Doe",
            subject: "Order not delivered",
            category: "Delivery",
            priority: "Normal",
            status: "Open",
            sla: "2h",
            assignedTo: "Unassigned",
            created: "2024-12-22 09:00 AM",
          },
        ]}
        supportAdmin={true}
        iconActions={[{ key: "view", icon: <Eye size={18} /> }]}
        rowActions={[
          { key: "view", label: "View Ticket", icon: <Eye size={16} /> },
        ]}
        // 4. Connect the click handler
        onActionClick={handleActionClick}
        customRenderers={{
          status: (val) => (
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                val === "Open"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {val}
            </span>
          ),
          priority: (val) => (
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                val === "Urgent"
                  ? "bg-red-100 text-red-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {val}
            </span>
          ),
        }}
      />
      <TicketViewModal
        open={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        ticket={selectedTicket}
      />
    </main>
  );
}

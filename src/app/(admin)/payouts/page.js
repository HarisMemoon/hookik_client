"use client";

import { useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";
import PillFilterGroup from "@/components/PillFilterGroup";
import GenericTable from "@/components/GenericTable";
import BulkPayoutModal from "@/components/payoutModals/BulkPayoutModal";
import PayoutHistoryModal from "@/components/payoutModals/PayoutHistoryModal";
import ApprovePayoutModal from "@/components/payoutModals/ApprovePayoutModal";
import PausePayoutModal from "@/components/payoutModals/PausePayoutModal";
import usePayoutList from "@/hooks/usePayoutList";
import StatusCapsule from "@/components/ui/StatusCapsule";

// ============================================================================
// CONFIG
// ============================================================================

const DEFAULT_FILTER = "pending";

const payoutFilters = [
  { value: "pending", label: "Pending Payouts" },
  { value: "completed", label: "Completed" },
  { value: "failed", label: "Failed" },
];

// ============================================================================
// TABLE DEFINITIONS
// ============================================================================

// -------- Pending Payouts --------
const pendingColumns = [
  { header: "Creator/Brand", key: "owner" },
  { header: "Type", key: "type" },
  { header: "Amount", key: "amount" },
  { header: "Method", key: "method" },
  {
    header: "Status",
    key: "status",
    sortable: true,
    render: (_, row) => <StatusCapsule value={row.status} />,
  },
  { header: "Date", key: "date" },
];

const pendingData = Array.from({ length: 2 }).map((_, i) => ({
  id: i + 1,
  owner: i % 2 === 0 ? "Sarah Johnson" : "UrbanWear Co.",
  type: i % 2 === 0 ? "Creator" : "Brand",
  amount: `₦${(Math.random() * 500000 + 50000).toLocaleString()}`,
  method: i % 2 === 0 ? "Bank Transfer" : "PayPal",
  status: "Pending",
  date: "2025-12-28",
}));

// -------- Completed Payouts --------
const completedColumns = [
  { header: "Creator/Brand", key: "owner" },
  { header: "Type", key: "type" },
  { header: "Amount", key: "amount" },
  { header: "Method", key: "method" },
  { header: "Completed Date", key: "date" },
];

const completedData = Array.from({ length: 5 }).map((_, i) => ({
  id: i + 10,
  owner: i % 2 === 0 ? "Michael Chen" : "TechGadgets Ltd",
  type: i % 2 === 0 ? "Creator" : "Brand",
  amount: `₦${(Math.random() * 200000 + 10000).toLocaleString()}`,
  method: "Bank Transfer",
  date: "2025-12-20",
}));

// -------- Failed Payouts --------
const failedColumns = [
  { header: "Creator/Brand", key: "owner" },
  { header: "Type", key: "type" },
  { header: "Amount", key: "amount" },
  {
    header: "Failure Reason",
    key: "reason",
    className: "text-red-600 font-medium",
  },
  { header: "Date", key: "date" },
];

const failedData = Array.from({ length: 3 }).map((_, i) => ({
  id: i + 20,
  owner: "Amina Okoro",
  type: "Creator",
  amount: `₦75,000`,
  reason: i % 2 === 0 ? "Invalid Account Number" : "Bank Network Timeout",
  date: "2025-12-25",
}));

// ============================================================================
// DATA MAP
// ============================================================================

const tableMap = {
  pending: {
    title: "Pending Payout Processing",
    columns: pendingColumns,
    data: pendingData,
    actions: [
      { key: "approve", label: "Approve Payout" },
      { key: "view_history", label: "View History" },
      { key: "pause", label: "Pause", danger: true },
    ],
    variant: "dropdown",
  },
  completed: {
    title: "Successfully Processed Payouts",
    columns: completedColumns,
    data: completedData,
    actions: [{ key: "receipt", label: "View Receipt", variant: "primary" }],
    variant: "buttons",
  },
  failed: {
    title: "Failed Payout Attempts",
    columns: failedColumns,
    data: failedData,
    actions: [{ key: "retry", label: "Retry Payout", variant: "primary" }],
    variant: "buttons",
  },
};

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function PayoutManagementPage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get("filter") || DEFAULT_FILTER;
  const [activeModal, setActiveModal] = useState(null); // 'bulk', 'history', 'approve', 'pause'
  const [selectedRow, setSelectedRow] = useState(null);
  const searchQuery = searchParams.get("search") || ""; // Add this line
  const [refreshKey, setRefreshKey] = useState(0);

  const page = searchParams.get("page") || "1";
  const { payouts, pagination, loading } = usePayoutList(
    {
      filter: currentFilter,
      search: searchQuery,
      page: page,
    },
    refreshKey,
  );
  const tableData = payouts.map((p) => ({
    ...p,
    owner: p.user?.name || "Unknown User", // Assuming backend joins with users table
    type: p.type === "earning_vendor" ? "Brand" : "Creator",
    amount: `₦${Number(p.amount).toLocaleString()}`,
    method: p.type.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    date: new Date(p.created_at).toLocaleDateString(),
    status: p.status.charAt(0).toUpperCase() + p.status.slice(1),
  }));
  const activeConfig = {
    ...tableMap[currentFilter],
    data: tableData,
  };
  const pillItems = payoutFilters.map((f) => ({
    ...f,
    href: `${pathname}?filter=${f.value}`,
  }));
  console.log("payouts", tableData);

  // const activeConfig = tableMap[currentFilter] || tableMap.pending;
  const onSearch = (value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    params.set("page", "1"); // Reset to page 1 on search
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  const handleAction = (action, row) => {
    setSelectedRow(row);
    switch (action) {
      case "approve":
        setActiveModal("approve");
        break;
      case "view_history": // Update your tableMap actions to include this key
        setActiveModal("history");
        break;
      case "pause": // Update your tableMap actions to include this key
        setActiveModal("pause");
        break;
      default:
        console.log(`${action} triggered for:`, row);
    }
  };

  const handleShowBulk = () => {
    setActiveModal("bulk");
  };

  return (
    <main className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payout Management
          </h1>
          <p className="text-gray-600 text-sm">
            Process and manage payouts for creators and brand partners
          </p>
        </div>

        <button
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition shadow-md shadow-purple-100"
          onClick={handleShowBulk}
        >
          Process Bulk Payout
        </button>
      </div>

      {/* Pills */}
      <div className="mb-6">
        <PillFilterGroup active={currentFilter} items={pillItems} />
      </div>

      {/* Table */}
      {/* <GenericTable
        title={activeConfig.title}
        columns={activeConfig.columns}
        data={activeConfig.data}
        showSearch
        searchPlaceholder="Search by name or amount..."
        actionsVariant={activeConfig.variant}
        rowActions={activeConfig.actions}
        onActionClick={handleAction}
        className="rounded-2xl"
      /> */}
      {loading ? (
        <div className="flex justify-center p-20">Loading payouts...</div>
      ) : (
        <GenericTable
          title={activeConfig.title}
          columns={activeConfig.columns}
          data={activeConfig.data}
          // ... other props
          showSearch
          onSearch={onSearch}
          searchPlaceholder="Search by name or amount..."
          actionsVariant={activeConfig.variant}
          rowActions={activeConfig.actions}
          onActionClick={handleAction}
          className="rounded-2xl"
        />
      )}
      {/* Payout Modals */}
      <BulkPayoutModal
        open={activeModal === "bulk"}
        onClose={() => setActiveModal(null)}
        pendingPayouts={pendingData}
      />

      <PayoutHistoryModal
        open={activeModal === "history"}
        onClose={() => setActiveModal(null)}
        user={{ name: selectedRow?.owner }}
      />

      <ApprovePayoutModal
        open={activeModal === "approve"}
        onClose={() => setActiveModal(null)}
        // Pass an empty object as fallback to prevent "undefined" errors
        payout={
          selectedRow
            ? {
                name: selectedRow.owner,
                amount: selectedRow.amount,
                method: selectedRow.method,
              }
            : { name: "", amount: 0, method: "" }
        }
        onApprove={() => {
          console.log("Approved");
          setActiveModal(null);
        }}
      />

      <PausePayoutModal
        open={activeModal === "pause"}
        onClose={() => setActiveModal(null)}
        user={{ name: selectedRow?.owner }}
        onPause={(data) => {
          console.log("Paused", data);
          setActiveModal(null);
        }}
      />
    </main>
  );
}

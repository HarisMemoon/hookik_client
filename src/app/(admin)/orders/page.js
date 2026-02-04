"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Download } from "lucide-react";

import PillFilterGroup from "@/components/PillFilterGroup";
import GenericTable from "@/components/GenericTable";
import ExportModal from "@/components/ExportModal";
import { exportConfigs } from "@/config/exportConfigs";

// Modals
import OrderDetailsModal from "@/components/orderModals/OrderDetailsModal";
import MarkOrderCompleteModal from "@/components/orderModals/MarkOrderCompleteModal";
import ApproveRefundModal from "@/components/orderModals/ApproveFundModal";

// 🔹 Hooks
import useOrderList from "@/hooks/useOrderList";
import StatusCapsule from "@/components/ui/StatusCapsule";
import { handleExport } from "@/lib/services/exportService";

// ============================================================================
// CONFIG
// ============================================================================

const DEFAULT_FILTER = "all";

const orderFilters = [
  { value: "all", label: "All Orders" },
  { value: "inProgress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "disputed", label: "Disputed" },
];

const allOrdersColumns = [
  { header: "Order ID", key: "orderId", sortable: true },
  { header: "Buyer", key: "customer" },
  { header: "Total Amount", key: "amount", sortable: true },
  {
    header: "Status",
    key: "status",
    sortable: true,
    render: (_, row) => <StatusCapsule value={row.status} />,
  },
  { header: "Order Date", key: "date", sortable: true },
];

export default function OrderManagementPage() {
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get("filter") || DEFAULT_FILTER;

  // 🔹 State Management
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);

  const [exportOpen, setExportOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [completeOpen, setCompleteOpen] = useState(false);
  const [refundOpen, setRefundOpen] = useState(false);

  // 🔹 Fetch Real Data
  const { orders, pagination, loading } = useOrderList(
    {
      filter: currentFilter,
      search: searchTerm || null,
      page: currentPage,
      limit: 20,
    },
    refreshKey,
  );
  const onExportData = async (exportOptions) => {
    await handleExport({
      entityType: "orders",
      data: orders,
      format: exportOptions.format,
      fields: exportOptions.fields,
      selections: exportOptions.selections,
      filename: `orders_${new Date().toISOString().split("T")[0]}`,
    });
  };
  // 🔹 Map DB Data to UI Table Format
  const tableData = orders.map((o) => ({
    ...o,
    orderId: o.order_code, // from schema
    customer: o.buyer
      ? `${o.buyer.first_name} ${o.buyer.last_name}`
      : o.name || "Guest",
    amount: `₦${Number(o.grand_total).toLocaleString()}`, // from schema
    status: o.status.charAt(0).toUpperCase() + o.status.slice(1),
    date: new Date(o.created_at).toLocaleDateString(),
  }));
  console.log("Orders:", tableData);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOrderAction = (action, row) => {
    setSelectedOrder(row);
    switch (action) {
      case "view":
        setDetailsOpen(true);
        break;
      case "complete":
        setCompleteOpen(true);
        break;
      case "refund":
        setRefundOpen(true);
        break;
      default:
        break;
    }
  };

  const basePath = "/orders";
  const pillItems = orderFilters.map((f) => ({
    ...f,
    href: `${basePath}?filter=${f.value}`,
  }));

  return (
    <main className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Management
          </h1>
          <p className="text-gray-600 text-sm">
            Monitor, track, and manage all customer orders
          </p>
        </div>

        <button
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg"
          onClick={() => setExportOpen(true)}
        >
          <Download size={18} />
          Export Orders
        </button>
      </div>

      <PillFilterGroup active={currentFilter} items={pillItems} />

      {/* Table */}
      <GenericTable
        title={
          orderFilters.find((f) => f.value === currentFilter)?.label || "Orders"
        }
        columns={allOrdersColumns}
        data={tableData}
        loading={loading}
        showSearch
        onSearchChange={(val) => {
          setSearchTerm(val);
          setCurrentPage(1); // Reset to page 1 on search
        }}
        rowActions={[
          { key: "view", label: "View Details" },
          { key: "complete", label: "Mark Complete" },
          { key: "refund", label: "Approve Refund" },
        ]}
        onActionClick={handleOrderAction}
        pagination={pagination}
        onPageChange={handlePageChange}
      />

      {/* Modals */}
      <OrderDetailsModal
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        order={selectedOrder}
      />

      {/* Completion Workflow */}
      <MarkOrderCompleteModal
        open={completeOpen}
        onClose={() => setCompleteOpen(false)}
        order={selectedOrder}
        onConfirm={(notes) => {
          console.log(
            "Confirming delivery for:",
            selectedOrder?.order_code,
            notes,
          );
          // Here you would call an API like updateOrderStatus(selectedOrder.id, 'delivered')
          setRefreshKey((k) => k + 1); // Trigger re-fetch
          setCompleteOpen(false);
        }}
      />

      {/* Refund Workflow */}
      <ApproveRefundModal
        open={refundOpen}
        onClose={() => setRefundOpen(false)}
        order={selectedOrder}
        onApprove={(refundData) => {
          console.log(
            "Approving Refund for:",
            selectedOrder?.order_code,
            refundData,
          );
          setRefreshKey((k) => k + 1); // Trigger re-fetch
          setRefundOpen(false);
        }}
      />

      <ExportModal
        open={exportOpen}
        onClose={() => setExportOpen(false)}
        title="Export Orders"
        variant="orders"
        config={exportConfigs["orders"]}
        onExport={onExportData}
      />
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Building2, Download } from "lucide-react";
import PillFilterGroup from "@/components/PillFilterGroup";
import GenericTable from "@/components/GenericTable";
import ExportModal from "@/components/ExportModal";
import { exportConfigs } from "@/config/exportConfigs";
import GenericFilterModal from "@/components/GenericFilterModal";
import UserStatusModal from "@/components/userModals/UserStatusModal";
import useStorefrontList from "@/hooks/useStorefrontList";
import StorefrontDetailsModal from "@/components/storefrontModals/StorefrontDetailsModal";
import EditStorefrontModal from "@/components/storefrontModals/EditStorefrontModal";
import StatusCapsule from "@/components/ui/StatusCapsule";
import { updateStorefront } from "@/lib/api/storefronts";
import { handleExport } from "@/lib/services/exportService";

// ============================================================================
// CONFIG
// ============================================================================

const DEFAULT_FILTER = "all";

// Pill filters
const storefrontFilters = [
  { value: "all", label: "All Storefronts" },
  { value: "pending", label: "Pending Approvals" },
  { value: "categories", label: "Categories" },
];

// ============================================================================
// TABLE DEFINITIONS
// ============================================================================

// -------- All Storefronts --------
const allStorefrontColumns = [
  { header: "Creator Name", key: "creatorName", sortable: true },
  {
    header: "Storefront Name",
    key: "name",
    sortable: true,
    render: (_, row) => (
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-purple-100 rounded-lg flex items-center justify-center">
          <Building2 size={18} className="text-purple-600" />
        </div>

        <span className="font-medium text-gray-600 align-center">
          {row.name ? row.name : "Not Available"}
        </span>
      </div>
    ),
  },
  {
    header: "Total Products",
    key: "products",
    sortable: true,
    render: (_, row) => row.owner.total_products || 0,
  },
  {
    header: "Status",
    key: "status",
    sortable: true,
    render: (_, row) => <StatusCapsule value={row.status} />,
  },
];

const allStorefrontData = Array.from({ length: 6 }).map((_, i) => ({
  id: i + 1,
  name: `Storefront ${i + 1}`,
  owner: `Owner ${i + 1}`,
  email: `store${i + 1}@example.com`,
  products: Math.floor(Math.random() * 100),
  status: i % 2 === 0 ? "Active" : "Disabled",
}));

// -------- Pending Approvals --------
const pendingColumns = [
  { header: "Creator Name", key: "name" },
  { header: "Storefront Name", key: "storefrontName" },
  { header: "Products", key: "products" },
  { header: "Submitted Date", key: "date" },
  { header: "Status", key: "category" },
];

const pendingData = Array.from({ length: 6 }).map((_, i) => ({
  id: i + 1,
  name: `Pending Store ${i + 1}`,
  submittedBy: `User ${i + 10}`,
  email: `pending${i + 1}@example.com`,
  date: "2025-01-10",
  category: "General",
}));

// -------- Categories --------
const categoryColumns = [
  { header: "Category Name", key: "name" },
  { header: "Storefronts", key: "stores" },
  { header: "Total Products", key: "active" },
  { header: "Revenue", key: "disabled" },
  { header: "Status", key: "status" },
];

const categoryData = Array.from({ length: 6 }).map((_, i) => ({
  id: i + 1,
  name: `Category ${i + 1}`,
  stores: 20 + i,
  active: 15 + i,
  disabled: 5,
  created: "2024-12-01",
}));

// ============================================================================
// DATA MAP
// ============================================================================

const tableMap = {
  all: {
    title: "All Storefronts",
    columns: allStorefrontColumns,
    data: allStorefrontData,
  },
  pending: {
    title: "Pending Storefront Approvals",
    columns: pendingColumns,
    data: pendingData,
  },
  categories: {
    title: "Storefront Categories",
    columns: categoryColumns,
    data: categoryData,
  },
};
const storefrontFilterFields = [
  {
    label: "Status",
    type: "dropdown",
    key: "status",
    options: [
      { label: "All", value: "all" },
      { label: "Active", value: "active" },
      { label: "Disabled", value: "disabled" },
      { label: "Pending", value: "pending" },
    ],
  },

  // 🔒 Product Range (disabled)
  {
    label: "Product Range",
    type: "range",
    minKey: "minProducts",
    maxKey: "maxProducts",
  },

  // 🔒 Conversion Rate (disabled)
  // {
  //   label: "Conversion Rate (%)",
  //   type: "range",
  //   minKey: "minConversion",
  //   maxKey: "maxConversion",
  //   disabled: true,
  // },

  // {
  //   label: "Category",
  //   type: "dropdown",
  //   key: "category",
  //   options: [
  //     { label: "Fashion", value: "fashion" },
  //     { label: "Electronics", value: "electronics" },
  //     { label: "Lifestyle", value: "lifestyle" },
  //   ],
  // },
];

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function StorefrontManagementPage() {
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get("filter") || DEFAULT_FILTER;

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    category: "",
    minProducts: "",
    maxProducts: "",
    minConversion: "",
    maxConversion: "",
  });
  const [refreshKey, setRefreshKey] = useState(0);
  const [page, setPage] = useState(1);

  // 🔹 FETCH REAL DATA
  const { storefronts, pagination, loading } = useStorefrontList(
    {
      filter: currentFilter,
      search: searchTerm,
      status: filters.status,
      page, // Add pagination state as needed
      minProducts: filters.minProducts, // ⚡ Ensure this matches the controller destructuring
      maxProducts: filters.maxProducts,
    },
    refreshKey,
  );
  useEffect(() => {
    setPage(1);
  }, [currentFilter, searchTerm, filters]);
  const onExportData = async (exportOptions) => {
    await handleExport({
      entityType: "storefront",
      data: storefronts,
      format: exportOptions.format,
      fields: exportOptions.fields,
      selections: exportOptions.selections,
      filename: `storefronts_${new Date().toISOString().split("T")[0]}`,
    });
  };

  const { title, columns, data } = tableMap[currentFilter];
  const [exportOpen, setExportOpen] = useState(false);
  const tableData = storefronts.map((sf) => ({
    ...sf,
    // Map 'name' from DB to 'Creator Name' or 'Storefront Name' based on your column keys
    creatorName: sf.owner
      ? `${sf.owner.first_name} ${sf.owner.last_name}`
      : "Unknown",
    status: sf.is_public ? "Active" : "Disabled",
    products: 0, // You might need a count association for this
  }));
  console.log("store", tableData);

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedStorefront, setSelectedStorefront] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [disableOpen, setDisableOpen] = useState(false);

  const basePath = "/storefronts";
  const pillItems = storefrontFilters.map((f) => ({
    ...f,
    href: `${basePath}?filter=${f.value}`,
  }));
  const rowActionsByFilter = {
    all: [
      { key: "view", label: "View Details" },
      { key: "edit", label: "Edit Info" },
      { key: "disable", label: "Disable", danger: true },
    ],

    pending: [
      { key: "approve", label: "Approve", variant: "success" },
      { key: "reject", label: "Reject" },
    ],

    categories: [{ key: "edit", label: "Edit", variant: "edit" }],
  };
  const actionsVariantByFilter = {
    all: "dropdown",
    pending: "buttons",
    categories: "buttons",
  };
  const handleStorefrontAction = (action, row) => {
    setSelectedStorefront(row);

    switch (action) {
      case "view":
        setDetailsOpen(true);
        break;
      case "edit":
        setEditOpen(true);
        break;
      case "disable":
        setDisableOpen(true); // This opens the UserStatusModal
        break;
      case "approve":
        console.log("Approve storefront:", row);
        break;
      case "reject":
        console.log("Reject storefront:", row);
        break;
      default:
        break;
    }
  };
  const handleStatusUpdate = async (data) => {
    try {
      console.log("Updating storefront status:", data);
      // Example: Call your updateStorefrontStatus API here
      // await updateStorefrontStatus(data.userId, data.action === "activate");

      setRefreshKey((prev) => prev + 1); // Refresh the table data
      setDisableOpen(false);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };
  const handleSaveStorefront = async (formData) => {
    if (!selectedStorefront?.id) return;

    try {
      await updateStorefront(selectedStorefront.id, {
        name: formData.name,
        description: formData.description,
        is_public: formData.is_public,
      });

      setEditOpen(false);
      setSelectedStorefront(null);
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      alert(error.message);
    }
  };

  const rowActions = rowActionsByFilter[currentFilter] || [];
  const actionsVariant = actionsVariantByFilter[currentFilter] || "dropdown";

  return (
    <main className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Storefront Management
          </h1>
          <p className="text-gray-600 text-sm">
            Manage storefronts, approvals, and categories
          </p>
        </div>
        <button
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg"
          onClick={() => setExportOpen(true)}
        >
          <Download size={18} />
          Export Storefronts
        </button>
      </div>

      {/* Pills */}
      <PillFilterGroup active={currentFilter} items={pillItems} />

      {/* Table */}
      <GenericTable
        title={title}
        columns={columns}
        data={tableData}
        showSearch={currentFilter === "all"}
        onSearchChange={(val) => {
          setSearchTerm(val);
          setPage(1); // Reset to page 1 on search
        }}
        showFilter={currentFilter === "all"}
        onFilterClick={() => setShowFilterModal(true)}
        rowActions={rowActions}
        actionsVariant={actionsVariant}
        onActionClick={handleStorefrontAction}
        pagination={pagination}
        onPageChange={(newPage) => setPage(newPage)}
      />
      <GenericFilterModal
        open={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        filters={filters}
        setFilters={setFilters}
        fields={storefrontFilterFields}
        title="Filter Storefronts"
        onApply={() => {
          console.log("Applying storefront filters:", filters);
          setPage(1);
          setShowFilterModal(false);
        }}
      />

      <ExportModal
        open={exportOpen}
        onClose={() => setExportOpen(false)}
        title="Export Storefronts"
        variant="storefronts"
        config={exportConfigs["storefront"]}
        onExport={onExportData}
      />
      {/* Status Modal for Disabling Storefronts */}
      <UserStatusModal
        open={disableOpen}
        onClose={() => setDisableOpen(false)}
        user={selectedStorefront} // Passing storefront here; modal uses user.name
        userType="Storefronts"
        mode="suspend"
        onConfirm={handleStatusUpdate}
      />
      <StorefrontDetailsModal
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        storefront={selectedStorefront}
      />
      <EditStorefrontModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        storefront={selectedStorefront}
        onSave={handleSaveStorefront}
      />
    </main>
  );
}

"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Download } from "lucide-react";
import { exportConfigs } from "@/config/exportConfigs";
import PillFilterGroup from "@/components/PillFilterGroup";
import GenericTable from "@/components/GenericTable";
import ExportModal from "@/components/ExportModal";
import GenericFilterModal from "@/components/GenericFilterModal";
import EditProductModal from "@/components/productModals/EditProductDeatils";
import useProductList from "@/hooks/useProductList";
import UserStatusModal from "@/components/userModals/UserStatusModal";

// ============================================================================
// CONFIG
// ============================================================================

const DEFAULT_FILTER = "all";

const productFilters = [
  { value: "all", label: "All Products" },
  { value: "pending", label: "Pending Approvals" },
  { value: "rejected", label: "Rejected Products" },
];

const allProductColumns = [
  {
    header: "Product Name",
    key: "name",
    sortable: true,
    className: "font-medium text-gray-900",
  },
  { header: "Brand/Owner", key: "owner" },
  { header: "Category", key: "category" },
  { header: "Price", key: "price", sortable: true },
  { header: "Stock", key: "stock" }, // Added to match mapped data
  { header: "Status", key: "status" },
];

const productsFilterFields = [
  {
    label: "Status",
    type: "dropdown",
    key: "status",
    options: [
      { label: "Verified", value: "verified" },
      { label: "Pending", value: "pending" },
      { label: "Suspended", value: "suspended" },
    ],
  },
  {
    label: "Category",
    type: "dropdown",
    key: "category",
    options: [
      { label: "Fashion", value: "fashion" },
      { label: "Electronics", value: "electronics" },
    ],
  },
  {
    label: "Brand",
    type: "dropdown",
    key: "brand",
    options: [
      { label: "Fashion", value: "fashion" },
      { label: "Electronics", value: "electronics" },
    ],
  },
  {
    label: "Price Rate",
    type: "range",
    minKey: "minPrice",
    maxKey: "maxPrice",
    disabled: true,
  },
];

export default function ProductManagementPage() {
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get("filter") || DEFAULT_FILTER;

  // 🔹 1. State for Search and Data Refreshing
  const [searchTerm, setSearchTerm] = useState("");
  const [disableOpen, setDisableOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);
  const [exportOpen, setExportOpen] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isViewOnly, setIsViewOnly] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    category: "",
    brand: "",
    minPrice: "",
    maxPrice: "",
  });

  // 🔹 2. Fetch Real Data using the Hook
  const { products, pagination, loading } = useProductList(
    {
      filter: currentFilter,
      search: searchTerm || null,
      page: currentPage, //
      limit: 20, // Matches your default limit
    },

    refreshKey
  );
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // Scroll to top of table for better UX
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  // 🔹 3. Map Database Data to Table Format
  const tableData = products.map((p) => ({
    ...p,
    owner: p.brandOwner
      ? `${p.brandOwner.first_name} ${p.brandOwner.last_name}`
      : "Unknown",
    price: `₦${Number(p.price).toLocaleString()}`,
    stock: p.quantity,
    status: p.status.charAt(0).toUpperCase() + p.status.slice(1),
  }));

  const handleProductAction = (action, row) => {
    setSelectedProduct(row);
    switch (action) {
      case "edit":
        setIsViewOnly(false);
        setShowEditModal(true);
        break;
      case "view":
        setIsViewOnly(true);
        setShowEditModal(true);
        break;
      case "approve":
        // Logic to call API and setRefreshKey(k => k + 1)
        console.log("Approving product:", row.id);
        break;
      case "delete":
        console.log("Removing product:", row.id);
        setDisableOpen(true);
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
  const basePath = "/products";
  const pillItems = productFilters.map((f) => ({
    ...f,
    href: `${basePath}?filter=${f.value}`,
  }));

  return (
    <main className="p-6 bg-white min-h-screen">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Product Listings
          </h1>
          <p className="text-gray-600 text-sm">
            Review platform product submissions
          </p>
        </div>
        <button
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg"
          onClick={() => setExportOpen(true)}
        >
          <Download size={18} />
          Export Listings
        </button>
      </div>

      <PillFilterGroup active={currentFilter} items={pillItems} />

      <GenericTable
        title={currentFilter === "all" ? "Complete Catalog" : "Review List"}
        columns={allProductColumns}
        data={tableData}
        loading={loading} // 🔹 Table will show loading state
        showSearch
        searchPlaceholder="Search by name or SKU..."
        onSearch={(val) => {
          setSearchTerm(val);
          setCurrentPage(1); // 👈 Reset to page 1 on new search
        }} // 🔹 Connects search bar to state
        showFilter
        onFilterClick={() => setShowFilterModal(true)}
        className="rounded-2xl"
        rowActions={(row) => {
          if (currentFilter === "pending") {
            return [
              { key: "view", label: "Quick View" },
              { key: "approve", label: "Approve Listing" },
              { key: "reject", label: "Reject Listing", danger: true },
            ];
          }
          return [
            { key: "view", label: "View Details" },
            { key: "edit", label: "Edit Product" },
            { key: "delete", label: "Remove Listing", danger: true },
          ];
        }}
        onActionClick={handleProductAction}
        pagination={pagination}
        onPageChange={handlePageChange}
      />

      <GenericFilterModal
        open={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        filters={filters}
        setFilters={setFilters}
        fields={productsFilterFields}
        title="Filter Products"
        onApply={() => {
          setCurrentPage(1);
          setRefreshKey((k) => k + 1);
          setShowFilterModal(false);
        }}
      />

      <ExportModal
        open={exportOpen}
        onClose={() => setExportOpen(false)}
        title="Export Products"
        variant="products"
        config={exportConfigs["productListings"]}
      />

      <EditProductModal
        open={showEditModal}
        isViewOnly={isViewOnly}
        onClose={() => {
          setShowEditModal(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
        onSave={(updatedData) => {
          console.log("Saving product:", updatedData);
          // 🔹 After successful API call:
          // setRefreshKey(k => k + 1);
          setShowEditModal(false);
        }}
      />
      <UserStatusModal
        open={disableOpen}
        onClose={() => setDisableOpen(false)}
        user={selectedProduct} // Passing storefront here; modal uses user.name
        userType="Products"
        mode="suspend"
        onConfirm={handleStatusUpdate}
      />
    </main>
  );
}

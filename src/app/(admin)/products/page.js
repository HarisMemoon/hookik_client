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
import StatusCapsule from "@/components/ui/StatusCapsule";
import { updateProductDetails } from "@/lib/api/products";
import { toast } from "react-hot-toast";
import { handleExport } from "@/lib/services/exportService";
import useCategoryList from "@/hooks/useCategoryList";
import useUserList from "@/hooks/useUserList";

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
  { header: "Brand", key: "owner" },
  {
    header: "Category",
    key: "category",
    render: (_, row) => row.category.name || "Uncategorized",
  },
  { header: "Price", key: "price", sortable: true },
  {
    header: "Status",
    key: "status",
    sortable: true,
    render: (_, row) => <StatusCapsule value={row.status} />,
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
  const {
    products,
    pagination,
    loading: productsLoading,
  } = useProductList(
    {
      filter: currentFilter,
      search: searchTerm || null,
      page: currentPage, //
      limit: 20, // Matches your default limit
      status: filters.status,
      category_id: filters.category, // Pass category ID
      brand_id: filters.brand, // Pass brand user ID
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
    },

    refreshKey,
  );
  const { users: brandsList, loading: userLoading } = useUserList({
    role: "seller",
    limit: 100,
  });
  const { categories, categoriesLoading } = useCategoryList({ limit: 100 });
  const onExportData = async (exportOptions) => {
    await handleExport({
      entityType: "productListings",
      data: products,
      format: exportOptions.format,
      fields: exportOptions.fields,
      selections: exportOptions.selections,
      filename: `products_${new Date().toISOString().split("T")[0]}`,
    });
  };
  console.log("brandsDet", brandsList);

  const initialLoading = categoriesLoading || productsLoading || userLoading;

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
      options: categories.map((c) => ({ label: c.name, value: c.id })),
    },
    {
      label: "Brand",
      type: "dropdown",
      key: "brand",
      // Map fetched sellers to the brand dropdown
      options: brandsList.map((b) => ({
        label: b.business_name || `${b.first_name} ${b.last_name}`,
        value: b.id,
      })),
    },
    {
      label: "Price Rate",
      type: "range",
      minKey: "minPrice",
      maxKey: "maxPrice",
      disabled: false,
    },
  ];
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
  console.log("products:", tableData);

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
  const handleSaveProduct = async (updatedData) => {
    console.log("=== HANDLE SAVE PRODUCT ===");
    console.log("Received updatedData:", updatedData);

    if (!updatedData) {
      toast.error("No data received to update");
      return;
    }

    try {
      const { id, ...dataToUpdate } = updatedData;

      // ✅ Sanitize the price - remove currency symbols and commas
      if (dataToUpdate.price) {
        // Remove currency symbols, commas, and other non-numeric chars except decimal point
        dataToUpdate.price = dataToUpdate.price
          .toString()
          .replace(/[₦$,\s]/g, "") // Remove ₦, $, commas, spaces
          .trim();

        // Convert to number
        dataToUpdate.price = parseFloat(dataToUpdate.price);

        // Validate
        if (isNaN(dataToUpdate.price)) {
          toast.error("Invalid price format");
          return;
        }
      }

      // ✅ Ensure stock is a number
      if (dataToUpdate.stock) {
        dataToUpdate.stock = parseInt(dataToUpdate.stock, 10);
      }

      console.log("Sanitized data:", dataToUpdate);

      if (!id) {
        toast.error("Product ID is missing");
        return;
      }

      await updateProductDetails(id, dataToUpdate);
      toast.success("Product updated successfully!");
      setRefreshKey((prev) => prev + 1);
      setShowEditModal(false);
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error(error.message || "Failed to update product");
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
        loading={initialLoading} // 🔹 Table will show loading state
        showSearch
        searchPlaceholder="Search by name or SKU..."
        onSearchChange={(val) => {
          setSearchTerm(val);
          setCurrentPage(1); // Reset to page 1 on search
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
        onExport={onExportData}
      />

      <EditProductModal
        open={showEditModal}
        isViewOnly={isViewOnly}
        onClose={() => {
          setShowEditModal(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
        onSave={(id, updatedData) => handleSaveProduct(id, updatedData)}
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

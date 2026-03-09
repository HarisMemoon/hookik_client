// src/components/brandModals/BrandProductsModal.jsx
import React, { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import GenericTable from "@/components/GenericTable";
import useProductList from "@/hooks/useProductList";
import StatusCapsule from "@/components/ui/StatusCapsule";
import { Package, CheckCircle, AlertCircle } from "lucide-react";

export default function BrandProductsModal({
  open,
  onClose,
  brand,
  onEditProduct,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const shouldFetch = open && brand?.id;
  // Fetch products specifically for this brand
  const { products, pagination, loading } = useProductList(
    shouldFetch
      ? {
          brand_id: brand.id,
          page: currentPage,
          limit: 10,
        }
      : null,
  );

  // Calculate stats for the top cards based on fetched data
  const stats = {
    total: loading ? 0 : products.length,
    verified: loading
      ? 0
      : products.filter((p) => p.status === "verified").length,
    unverified: loading
      ? 0
      : products.filter((p) => p.status !== "verified").length,
  };

  const columns = [
    {
      header: "Product Name",
      key: "name",
      render: (_, row) => {
        // Extract the first image from the polymorphic images array
        const displayImage =
          row.images && row.images.length > 0 ? row.images[0].image_url : null;

        return (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-gray-50 border border-gray-100 overflow-hidden flex-shrink-0 flex items-center justify-center">
              {displayImage ? (
                <img
                  src={displayImage}
                  alt={row.name}
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-[10px] text-gray-300 font-bold">
                  NO IMG
                </span>
              )}
            </div>
            <span className="font-medium text-gray-900">{row.name}</span>
          </div>
        );
      },
    },
    {
      header: "Parent Category",
      key: "category",
      render: (_, row) => row.category?.name || "N/A",
    },
    {
      header: "Price",
      key: "price",
      render: (val) => `₦${Number(val).toLocaleString()}`,
    },
    { header: "Stock", key: "quantity" },
    {
      header: "Status",
      key: "status",
      render: (val) => <StatusCapsule value={val} />,
    },
  ];
  useEffect(() => {
    if (open) {
      setCurrentPage(1);
    }
  }, [brand?.id, open]);
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`${brand?.business_name || "Brand"} Products`}
      size="lg"
    >
      {" "}
      <div className="max-h-[75vh] overflow-y-auto pr-2">
        <div className="space-y-6">
          {/* Stat Cards Layout from Screenshot */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatMiniCard
              title="All Brand Products"
              value={stats.total}
              icon={<Package className="text-purple-600" />}
              color="bg-purple-50"
            />
            <StatMiniCard
              title="All Verified Brand Products"
              value={stats.verified}
              icon={<CheckCircle className="text-green-600" />}
              color="bg-green-50"
            />
            <StatMiniCard
              title="All Unverified Brand Products"
              value={stats.unverified}
              icon={<AlertCircle className="text-gray-600" />}
              color="bg-gray-50"
            />
          </div>

          {!shouldFetch ? (
            <div className="py-10 text-center text-gray-400 text-sm">
              Loading products...
            </div>
          ) : (
            <GenericTable
              title="Products"
              columns={columns}
              data={products}
              loading={loading}
              pagination={pagination}
              onPageChange={setCurrentPage}
              rowActions={() => [
                { key: "edit", label: "Edit Product" },
                { key: "view", label: "View Details" },
              ]}
              onActionClick={(action, row) => onEditProduct(action, row)}
            />
          )}
        </div>
      </div>
    </Modal>
  );
}

function StatMiniCard({ title, value, icon, color }) {
  return (
    <div className="p-4 rounded-2xl border border-gray-100 flex justify-between items-start bg-white shadow-sm">
      <div>
        <p className="text-xs text-gray-500 font-medium mb-4">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <div className={`p-2 rounded-lg ${color}`}>{icon}</div>
    </div>
  );
}

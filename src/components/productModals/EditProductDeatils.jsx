// src/components/productModals/EditProductModal.js
import React, { useState, useEffect, useRef } from "react";
import Modal from "@/components/ui/Modal";
import Dropdown from "@/components/ui/DropDown";
import useCategoryList from "@/hooks/useCategoryList";
import StatusCapsule from "../ui/StatusCapsule";

export default function EditProductModal({
  open,
  onClose,
  product,
  onSave,
  isViewOnly = false,
}) {
  const [showFullDesc, setShowFullDesc] = useState(false);
  const fileInputRef = useRef(null);
  const { categories, loading } = useCategoryList({ limit: 100 });
  const [formData, setFormData] = useState({
    name: "",
    category_id: "",
    price: "",
    description: "",
    stock: "",
    sku: "",
    status: "",
    image_url: "",
    image_file: null,
  });
  useEffect(() => {
    if (product && open) {
      console.log("Syncing Product Data, Stock:", product);

      setFormData({
        id: product.id,
        name: product.name || "",
        category_id: product.category_id || product.category?.id || "",
        price: product.price || "",
        description: product.description || "",
        stock: product.quantity || "",
        sku: product.sku || "N/A",
        status: product.status || "",
        image_url:
          product.images && product.images.length > 0
            ? product.images[0].image_url
            : "",
        image_file: null,
      });
    }
  }, [product, open]);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image_file: file,
        // Create a local blob URL so the preview updates immediately
        image_url: URL.createObjectURL(file),
      }));
    }
  };
  // 3. Format categories for the Dropdown component
  const categoryOptions = categories.map((cat) => ({
    label: cat.name,
    value: cat.id, // Dropdown will handle numeric IDs as values
  }));

  const footer = (
    <div className="flex justify-end gap-3 w-full">
      <button
        onClick={onClose}
        className="px-6 py-2 text-sm font-medium border border-gray-200 rounded-xl hover:bg-gray-50 transition"
      >
        {isViewOnly ? "Close" : "Cancel"}
      </button>

      {!isViewOnly && (
        <button
          onClick={() => {
            console.log("=== MODAL SAVE CLICKED ===");
            console.log("formData:", formData); // ✅ Add this
            console.log("formData keys:", Object.keys(formData)); // ✅ Add this
            onSave(formData);
          }}
          className="px-6 py-2 text-sm font-medium bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition shadow-md shadow-purple-100"
          disabled={loading}
        >
          {loading ? "Loading..." : "Save Changes"}
        </button>
      )}
    </div>
  );
  console.log(formData);

  // Common input styles based on mode
  const inputStyles = `w-full px-4 py-3 text-sm rounded-xl outline-none transition-all text-black font-medium border ${
    isViewOnly
      ? "bg-gray-100 border-transparent cursor-default"
      : "bg-gray-50 border-gray-100 focus:ring-2 focus:ring-purple-100 focus:border-purple-300"
  }`;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isViewOnly ? "Product Details" : "Edit Product Details"}
      subtitle={
        isViewOnly
          ? `Viewing information for ${product?.name || "this item"}`
          : `Update product information for ${product?.name || "this item"}`
      }
      size="md"
      footer={footer}
    >
      <div className="space-y-5">
        {/* Updated Image Section */}
        {/* Hero Preview Section - Purplish Theme */}
        {/* ========================= */}
        {/* TOP SECTION (View / Edit) */}
        {/* ========================= */}

        {isViewOnly ? (
          /* ================= VIEW MODE (NEW HERO UI) ================= */
          <div className="flex flex-col gap-6 p-6 bg-purple-50/30 rounded-3xl border border-purple-100 mb-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left: Large Image */}
              <div className="w-full md:w-80 h-56 rounded-2xl bg-white border-2 border-white shadow-sm overflow-hidden">
                {formData.image_url ? (
                  <img
                    src={formData.image_url}
                    className="w-full h-full object-cover"
                    alt="Product Preview"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-purple-200 text-3xl font-bold">
                    ?
                  </div>
                )}
              </div>

              {/* Right: Product Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Name + Status */}
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black text-gray-900">
                      {formData.name || "Unnamed Product"}
                    </h2>

                    <StatusCapsule
                      value={formData.status || "pending"}
                      variant="status"
                    />
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-black text-purple-600">
                      {formData.price || 0}
                    </span>
                  </div>

                  {/* Category */}
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Category
                    </p>
                    <p className="text-sm font-bold text-gray-600">
                      {categories.find((c) => c.id === formData.category_id)
                        ?.name || "Uncategorized"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ================= EDIT MODE (OLD COMPACT UI) ================= */
          <div className="flex flex-col gap-4 p-4 bg-purple-50/50 rounded-2xl border border-purple-100 mb-6">
            <label className="block text-xs font-bold text-purple-700 uppercase tracking-tight">
              Product Image
            </label>

            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-xl bg-white border-2 border-white shadow-sm overflow-hidden flex-shrink-0">
                {formData.image_url ? (
                  <img
                    src={formData.image_url}
                    className="w-full h-full object-cover"
                    alt="Preview"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-purple-200 text-2xl">
                    ?
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase">
                  Product Media
                </p>

                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="px-4 py-2 text-xs font-bold bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                  Change Image
                </button>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />

                <p className="text-[9px] text-gray-400 italic">
                  Formats: JPG, PNG. Max 2MB.
                </p>
              </div>
            </div>
          </div>
        )}
        {/* Product Name */}
        {!isViewOnly && (
          <>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Product Name
              </label>
              <input
                type="text"
                readOnly={isViewOnly}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className={inputStyles}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Category
                </label>
                {isViewOnly ? (
                  <div className={inputStyles}>
                    {categories.find((c) => c.id === formData.category_id)
                      ?.name || "N/A"}
                  </div>
                ) : (
                  <Dropdown
                    options={categoryOptions}
                    value={formData.category_id}
                    onChange={(val) =>
                      setFormData({ ...formData, category_id: val })
                    }
                    loading={loading}
                  />
                )}
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Price
                </label>
                <input
                  type="text"
                  readOnly={isViewOnly}
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className={inputStyles}
                />
              </div>
            </div>
          </>
        )}

        {/* Description */}
        <div>
          <label className="block text-[11px] font-black text-purple-700 mb-2 uppercase tracking-widest">
            Product Description
          </label>

          {isViewOnly ? (
            <div className="w-full px-4 py-3 text-sm rounded-2xl bg-purple-50/30 border border-purple-100 text-gray-700 leading-relaxed min-h-[100px]">
              <div className="whitespace-pre-wrap">
                {formData.description?.length > 300 ? (
                  <>
                    {formData.description.substring(0, 300)}...
                    <button
                      type="button"
                      onClick={() => setShowFullDesc(true)}
                      className="ml-2 text-purple-600 font-bold hover:underline cursor-pointer"
                    >
                      Read More
                    </button>
                  </>
                ) : (
                  formData.description || "No description provided."
                )}
              </div>
            </div>
          ) : (
            /* Edit Mode: Clean textarea with hidden scrollbar styling */
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Describe the product details, features, and specifications..."
              className={`${inputStyles} resize-none custom-scrollbar`}
            />
          )}
        </div>

        {/* Stock and SKU Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Stock Quantity
            </label>
            <input
              type="number"
              readOnly={isViewOnly}
              value={formData.stock}
              onChange={(e) =>
                setFormData({ ...formData, stock: e.target.value })
              }
              className={inputStyles}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              SKU
            </label>
            <input
              type="text"
              readOnly={isViewOnly}
              value={formData.sku}
              onChange={(e) =>
                setFormData({ ...formData, sku: e.target.value })
              }
              className={inputStyles}
            />
          </div>
        </div>
      </div>
      <Modal
        open={showFullDesc}
        onClose={() => setShowFullDesc(false)}
        title="Full Description"
        size="md"
      >
        <div className="p-2 text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">
          {formData.description}
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setShowFullDesc(false)}
            className="px-6 py-2 bg-purple-600 text-white rounded-xl font-bold text-sm"
          >
            Close
          </button>
        </div>
      </Modal>
    </Modal>
  );
}

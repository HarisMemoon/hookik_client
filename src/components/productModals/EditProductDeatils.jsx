// src/components/productModals/EditProductModal.js
import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import Dropdown from "@/components/ui/DropDown";
import useCategoryList from "@/hooks/useCategoryList";

export default function EditProductModal({
  open,
  onClose,
  product,
  onSave,
  isViewOnly = false, // New prop to toggle modes
}) {
  const { categories, loading } = useCategoryList({ limit: 100 });
  const [formData, setFormData] = useState({
    name: "",
    category_id: "",
    price: "",
    description: "",
    stock: "",
    sku: "",
    status: "",
  });
  useEffect(() => {
    console.log("=== PRODUCT PROP CHANGED ===");
    console.log("Product received:", product);

    if (product) {
      const newFormData = {
        id: product.id,
        name: product.name || "",
        category_id: product.category_id || product.category?.id || "",
        price: product.price || "",
        description: product.description || "",
        stock: product.stock || product.inventory || "",
        sku: product.sku || "N/A",
        status: product.status || "",
      };

      console.log("Setting formData to:", newFormData);
      setFormData(newFormData);
    }
  }, [product]);
  // Sync state when a product is selected
  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        name: product.name || "",
        // Use category_id for the value, fallback to the object's id
        category_id: product.category_id || product.category?.id || "",
        price: product.price || "",
        description: product.description || "",
        stock: product.stock || product.inventory || "",
        sku: product.sku || "N/A",
        status: product.status || "",
      });
    }
  }, [product]);
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
        {/* Product Name */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Product Name
          </label>
          <input
            type="text"
            readOnly={isViewOnly}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={inputStyles}
          />
        </div>

        {/* Category and Price Grid */}
        {/* Category and Price Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Category
            </label>
            {isViewOnly ? (
              <div className={inputStyles}>
                {/* Find name by ID for view-only mode */}
                {categories.find((c) => c.id === formData.category_id)?.name ||
                  "N/A"}
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

        {/* Description */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            rows={3}
            readOnly={isViewOnly}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className={`${inputStyles} resize-none`}
          />
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
    </Modal>
  );
}

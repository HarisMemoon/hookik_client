// src/components/productModals/EditProductModal.js
import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import Dropdown from "@/components/ui/DropDown";

export default function EditProductModal({
  open,
  onClose,
  product,
  onSave,
  isViewOnly = false, // New prop to toggle modes
}) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    stock: "",
    sku: "",
  });

  // Sync state when a product is selected
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        category: product.category || "Electronics",
        price: product.price || "",
        description: product.description || "",
        stock: product.stock || product.inventory || "", // Map inventory if needed
        sku: product.sku || "N/A",
      });
    }
  }, [product]);

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
          onClick={() => onSave(formData)}
          className="px-6 py-2 text-sm font-medium bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition shadow-md shadow-purple-100"
        >
          Save Changes
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
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Category
            </label>
            {isViewOnly ? (
              <div className={inputStyles}>{formData.category}</div>
            ) : (
              <Dropdown
                options={[
                  { label: "Electronics", value: "Electronics" },
                  { label: "Fashion", value: "Fashion" },
                  { label: "Lifestyle", value: "Lifestyle" },
                  { label: "Beauty", value: "Beauty" },
                ]}
                value={formData.category}
                onChange={(val) => setFormData({ ...formData, category: val })}
              />
            )}
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Price
            </label>
            <input
              type="text" // Use text for viewing currency symbols if needed
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

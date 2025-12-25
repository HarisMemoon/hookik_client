// src/components/userModals/ManageStorefrontModal.js
import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import Dropdown from "@/components/ui/DropDown";

export default function ManageStorefrontModal({ open, onClose, user }) {
  const [formData, setFormData] = useState({
    status: "Active",
    commission: "10",
    name: "",
    categories: [],
    salesLimit: "",
  });

  const categories = ["Fashion & Apparel", "Beauty & Cosmetics", "Electronics"];

  const handleCategoryToggle = (category) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const footer = (
    <div className="flex justify-end gap-3">
      <button
        onClick={onClose}
        className="px-6 py-2 text-sm font-medium border rounded-xl hover:bg-gray-50"
      >
        Cancel
      </button>
      <button className="px-6 py-2 text-sm font-medium bg-purple-600 text-white rounded-xl hover:bg-purple-700">
        Save Changes
      </button>
    </div>
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Manage Storefront"
      subtitle={`Manage storefront settings for ${
        user?.first_name || "Sarah Johnson"
      }`}
      size="md"
      footer={footer}
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase">
              Storefront Status
            </label>
            <Dropdown
              options={[
                { label: "Active", value: "Active" },
                { label: "Disabled", value: "Disabled" },
              ]}
              value={formData.status}
              onChange={(val) => setFormData({ ...formData, status: val })}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase">
              Commission Rate (%)
            </label>
            <input
              type="number"
              value={formData.commission}
              onChange={(e) =>
                setFormData({ ...formData, commission: e.target.value })
              }
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-100 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase">
            Storefront Name
          </label>
          <input
            type="text"
            placeholder="Enter storefront name"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-400"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase">
            Product Categories
          </label>
          <div className="space-y-2">
            {categories.map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-purple-600 cursor-pointer"
                  checked={formData.categories.includes(cat)}
                  onChange={() => handleCategoryToggle(cat)}
                />
                <span className="text-sm text-gray-600 group-hover:text-black">
                  {cat}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase">
            Monthly Sales Limit
          </label>
          <input
            type="text"
            placeholder="No limit"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 outline-none"
          />
        </div>
      </div>
    </Modal>
  );
}

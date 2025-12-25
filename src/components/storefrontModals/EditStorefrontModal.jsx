// src/components/storefrontModals/EditStorefrontModal.js
import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import Dropdown from "@/components/ui/DropDown";

export default function EditStorefrontModal({
  open,
  onClose,
  storefront,
  onSave,
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    commission: "10",
    status: "All status",
    limit: "10",
  });

  useEffect(() => {
    if (storefront) {
      setFormData({
        name: storefront.name || "",
        description: storefront.description || "",
        commission: storefront.commission || "10",
        status: storefront.is_public ? "Active" : "Disabled",
        limit: storefront.products_limit || "10",
      });
    }
  }, [storefront]);

  const footer = (
    <div className="flex justify-end gap-3 w-full">
      <button
        onClick={onClose}
        className="px-6 py-2 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition"
      >
        Cancel
      </button>
      <button
        onClick={() => onSave(formData)}
        className="px-6 py-2 text-sm font-medium bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
      >
        Save Changes
      </button>
    </div>
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Edit Storefront"
      subtitle={`Edit ${
        storefront?.creatorName || "Sarah Johnson"
      }'s storefront settings`}
      size="md"
      footer={footer}
    >
      <div className="space-y-5">
        {/* Storefront Name */}
        <div>
          <label className="block text-md font-bold text-gray-700 mb-2  tracking-wide">
            Storefront Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Sarah Johnson's Store"
            className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-100 outline-none transition-all text-black"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-md font-bold text-gray-700 mb-2  tracking-wide">
            Description
          </label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Enter description..."
            className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-100 outline-none transition-all resize-none text-black"
          />
        </div>

        {/* Commission and Status Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-md font-bold text-gray-700 mb-2  tracking-wide">
              Commission Rate (%)
            </label>
            <input
              type="number"
              value={formData.commission}
              onChange={(e) =>
                setFormData({ ...formData, commission: e.target.value })
              }
              className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-100 outline-none transition-all text-black"
            />
          </div>
          <div>
            <label className="block text-md font-bold text-gray-700 mb-2  tracking-wide">
              Status
            </label>
            <Dropdown
              options={[
                { label: "Active", value: "Active" },
                { label: "Disabled", value: "Disabled" },
                { label: "All status", value: "All status" },
              ]}
              value={formData.status}
              onChange={(val) => setFormData({ ...formData, status: val })}
            />
          </div>
        </div>

        {/* Featured Products Limit */}
        <div>
          <label className="block text-md font-bold text-gray-700 mb-2  tracking-wide">
            Featured Products Limit
          </label>
          <input
            type="number"
            value={formData.limit}
            onChange={(e) =>
              setFormData({ ...formData, limit: e.target.value })
            }
            className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-100 outline-none transition-all text-black"
          />
        </div>
      </div>
    </Modal>
  );
}

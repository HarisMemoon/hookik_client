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
    is_public: "0",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (storefront) {
      setFormData({
        name: storefront.name || "",
        description: storefront.description || "",
        is_public: storefront.is_public ? "1" : "0",
      });
    }
  }, [storefront]);

  const handleSave = () => {
    if (!formData.name.trim()) {
      setError("Storefront name is required");
      return;
    }

    setError("");
    onSave(formData);
  };

  const footer = (
    <div className="flex justify-end gap-3 w-full">
      <button
        onClick={onClose}
        className="px-6 py-2 text-sm font-medium border border-gray-200 rounded-lg"
      >
        Cancel
      </button>
      <button
        onClick={handleSave}
        className="px-6 py-2 text-sm font-medium bg-purple-600 text-white rounded-lg"
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
      subtitle={`Edit ${storefront?.creatorName || "Creator"}'s storefront`}
      size="md"
      footer={footer}
    >
      <div className="space-y-5">
        <div>
          <label className="block text-md font-bold mb-2">
            Storefront Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border rounded-lg"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        <div>
          <label className="block text-md font-bold mb-2">Description</label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full px-4 py-3 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-md font-bold mb-2">Status</label>
          <Dropdown
            options={[
              { label: "Active", value: "1" },
              { label: "Disabled", value: "0" },
            ]}
            value={formData.is_public}
            onChange={(val) => setFormData({ ...formData, is_public: val })}
          />
        </div>
      </div>
    </Modal>
  );
}

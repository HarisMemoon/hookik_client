// src/components/storefrontModals/StorefrontDetailsModal.js
import React from "react";
import Modal from "@/components/ui/Modal";

export default function StorefrontDetailsModal({ open, onClose, storefront }) {
  if (!open || !storefront) return null;

  const footer = (
    <div className="flex justify-end gap-3 w-full">
      <button
        onClick={onClose}
        className="px-6 py-2 text-sm font-medium border border-gray-200 rounded-xl hover:bg-gray-50 transition"
      >
        Close
      </button>
      <button className="px-6 py-2 text-sm font-medium bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition">
        Edit Storefront
      </button>
    </div>
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Storefront Details"
      subtitle={`${storefront.creatorName || "Sarah Johnson"}'s Store`}
      size="md"
      footer={footer}
    >
      <div className="grid grid-cols-2 gap-y-6 py-2 text-black">
        <div>
          <p className="text-lg text-gray-600 mb-1">Creator</p>
          <p className="text-lg font-bold">
            {storefront.creatorName || "Sarah Johnson"}
          </p>
        </div>
        <div>
          <p className="text-lg text-gray-600 mb-1">Total Products</p>
          <p className="text-lg font-bold">{storefront.owner.total_products}</p>
        </div>
        {/* <div>
          <p className="text-lg text-gray-600 mb-1">Conversion Rate</p>
          <p className="text-lg font-bold">8.5%</p>
        </div>
        <div>
          <p className="text-lg text-gray-600 mb-1">Traffic</p>
          <p className="text-lg font-bold">12.5K</p>
        </div> */}
      </div>
    </Modal>
  );
}

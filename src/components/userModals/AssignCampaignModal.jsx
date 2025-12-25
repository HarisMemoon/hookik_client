// src/components/userModals/AssignCampaignModal.js
import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import Dropdown from "@/components/ui/DropDown";

export default function AssignCampaignModal({ open, onClose, user }) {
  const [campaign, setCampaign] = useState("Summer fashion campaign");

  const campaignOptions = [
    { label: "Summer Fashion Collection", value: "Summer fashion campaign" },
    { label: "Tech Gadgets Launch", value: "tech" },
    { label: "Home Décor Sale", value: "decor" },
  ];

  const footer = (
    <div className="flex justify-end gap-3">
      <button
        onClick={onClose}
        className="px-6 py-2 text-sm font-medium border rounded-xl hover:bg-gray-50"
      >
        Cancel
      </button>
      <button className="px-6 py-2 text-sm font-medium bg-purple-600 text-white rounded-xl hover:bg-purple-700">
        Assign Campaign
      </button>
    </div>
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Assign Campaign"
      subtitle={`Assign a campaign to ${user?.first_name || "Sarah Johnson"}`}
      size="md"
      footer={footer}
    >
      <div className="space-y-5">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase">
            Select Campaign
          </label>
          <Dropdown
            options={campaignOptions}
            value={campaign}
            onChange={setCampaign}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase">
            Commission Rate (%)
          </label>
          <input
            type="number"
            defaultValue="10"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-100"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase">
            Campaign Duration
          </label>
          <input
            type="text"
            defaultValue="30 days"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 outline-none"
          />
        </div>
      </div>
    </Modal>
  );
}

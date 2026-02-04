import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import Dropdown from "@/components/ui/DropDown";

export default function PausePayoutModal({ open, onClose, user, onPause }) {
  const [reason, setReason] = useState("");
  const [duration, setDuration] = useState("7 days");

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Pause Payout"
      subtitle={`Temporarily pause payout for ${user?.name}`}
      size="sm"
      footer={
        <div className="flex justify-end gap-3 w-full">
          <button
            onClick={onClose}
            className="px-6 py-2 text-sm font-medium border border-gray-200 rounded-xl hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => onPause({ reason, duration })}
            className="px-6 py-2 text-sm font-medium bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
          >
            Pause Payout
          </button>
        </div>
      }
    >
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Reason for Pausing
          </label>
          <textarea
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter the reason for pausing this payout..."
            className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-50 outline-none transition-all resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Pause Duration
          </label>
          <Dropdown
            options={[
              { label: "7 days", value: "7 days" },
              { label: "14 days", value: "14 days" },
              { label: "30 days", value: "30 days" },
            ]}
            value={duration}
            onChange={setDuration}
          />
        </div>

        <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl">
          <p className="text-xs text-amber-700 font-medium">
            <span className="font-bold">Note:</span> The recipient will be
            notified about the pause.
          </p>
        </div>
      </div>
    </Modal>
  );
}

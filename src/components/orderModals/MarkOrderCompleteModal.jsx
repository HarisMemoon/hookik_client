// src/components/orderModals/MarkOrderCompleteModal.js
import React, { useState } from "react";
import Modal from "@/components/ui/Modal";

export default function MarkOrderCompleteModal({
  open,
  onClose,
  order,
  onConfirm,
}) {
  const [notes, setNotes] = useState("");

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Mark Order as Complete"
      subtitle={`Process completion for #${
        order?.orderId || order?.order_code
      }`}
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
            onClick={() => onConfirm(notes)}
            className="px-6 py-2 text-sm font-medium bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
          >
            Confirm Delivery
          </button>
        </div>
      }
    >
      <div className="space-y-5">
        <div className="p-4 bg-green-50 border border-green-100 rounded-xl">
          <p className="text-[11px] text-green-700 leading-relaxed font-medium">
            Confirming delivery for <b>{order?.customer}</b>. This will update
            the status to "Delivered" and finalize the transaction.
          </p>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Delivery Notes
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g., Package received by customer..."
            className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-purple-100 outline-none transition-all resize-none text-black"
          />
        </div>
      </div>
    </Modal>
  );
}

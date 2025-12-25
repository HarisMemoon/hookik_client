// src/components/orderModals/ApproveFundModal.js
import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import Dropdown from "@/components/ui/DropDown";

export default function ApproveRefundModal({
  open,
  onClose,
  order,
  onApprove,
}) {
  const [reason, setReason] = useState("");
  const [refundType, setRefundType] = useState("Full Refund");

  const displayAmount =
    order?.amount || `₦${Number(order?.grand_total || 0).toLocaleString()}`;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Approve Refund Request"
      subtitle={`Processing refund for #${order?.orderId || order?.order_code}`}
      size="md"
      footer={
        <div className="flex justify-end gap-3 w-full">
          <button
            onClick={onClose}
            className="px-6 py-2 text-sm font-medium border border-gray-200 rounded-xl hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => onApprove({ refundType, reason })}
            className="px-6 py-2 text-sm font-medium bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
          >
            Approve Refund
          </button>
        </div>
      }
    >
      <div className="space-y-5 text-black">
        <div className="space-y-3 pb-4 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500 font-medium">
              Original Amount:
            </p>
            <p className="text-sm font-bold">{displayAmount}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500 font-medium">
              Refundable Amount:
            </p>
            <p className="text-sm font-bold text-purple-600">{displayAmount}</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 font-bold uppercase tracking-tight">
            Refund Type
          </label>
          <Dropdown
            options={[
              { label: "Full Refund", value: "Full Refund" },
              { label: "Partial Refund", value: "Partial" },
            ]}
            value={refundType}
            onChange={setRefundType}
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-tight">
            Approval Reason
          </label>
          <textarea
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Provide reason for approving this refund..."
            className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-100 outline-none transition-all resize-none"
          />
        </div>

        <div className="p-3 bg-orange-50 border border-orange-100 rounded-xl">
          <p className="text-[11px] text-orange-700 leading-relaxed font-medium">
            <b>Note:</b> Refunds are processed back to the original payment
            method through transaction <b>#{order?.transaction_id}</b>.
          </p>
        </div>
      </div>
    </Modal>
  );
}

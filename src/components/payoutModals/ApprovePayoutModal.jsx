import React from "react";
import Modal from "@/components/ui/Modal";

export default function ApprovePayoutModal({
  open,
  onClose,
  payout,
  onApprove,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Approve Payout"
      subtitle={`Approve payout of ₦${payout?.amount.toLocaleString()} to ${
        payout?.name
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
            onClick={onApprove}
            className="px-6 py-2 text-sm font-medium bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
          >
            Approve & Process
          </button>
        </div>
      }
    >
      <div className="space-y-4 bg-blue-50 p-4 rounded-xl border border-blue-100">
        {[
          { label: "Recipient:", value: payout?.name, bold: true },
          {
            label: "Amount:",
            value:
              typeof payout?.amount === "number"
                ? `₦${payout?.amount.toLocaleString()}`
                : payout?.amount || "₦0",
            bold: true,
          },
          {
            label: "Method:",
            value: payout?.method || "Bank Transfer",
            bold: false,
          },
        ].map((item, idx) => (
          <div key={idx} className="flex justify-between items-center">
            <p className="text-sm  font-medium">{item.label}</p>
            <p
              className={`text-sm ${
                item.bold ? "font-bold" : "font-medium"
              } text-blue-900`}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </Modal>
  );
}

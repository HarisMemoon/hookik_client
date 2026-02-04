import React from "react";
import Modal from "@/components/ui/Modal";

export default function BulkPayoutModal({
  open,
  onClose,
  pendingPayouts,
  onProcess,
}) {
  // Add a fallback to 0 and check for existence
  const totalAmount =
    pendingPayouts?.reduce((acc, curr) => {
      // If amount is a string like "₦214,000", strip the symbol and commas
      const val =
        typeof curr.amount === "string"
          ? Number(curr.amount.replace(/[^0-9.-]+/g, ""))
          : curr.amount;
      return acc + (val || 0);
    }, 0) || 0;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Process Bulk Payout"
      subtitle="Process multiple payouts at once"
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
            onClick={onProcess}
            className="px-6 py-2 text-sm font-medium bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
          >
            Process {pendingPayouts?.length || 0} Payouts
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="p-4 bg-purple-50 rounded-xl flex justify-between items-center border-purple-200 border">
          <div className="space-y-1">
            <p className="text-xs text-gray-500 font-medium">
              Total Pending Payouts:
            </p>
            <p className="text-xs text-gray-500 font-medium">Total Amount:</p>
          </div>
          <div className="space-y-1 text-right">
            <p className="text-sm font-bold text-black">
              {pendingPayouts?.length || 0}
            </p>
            <p className="text-sm font-bold text-black">
              ₦{totalAmount.toLocaleString()}
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-3">
            Select Recipients
          </label>
          <div className="space-y-2">
            {pendingPayouts?.map((recipient, idx) => (
              <div
                key={idx}
                className="flex items-center p-4 border border-gray-100 rounded-xl gap-3"
              >
                <input
                  type="checkbox"
                  // Added 'accent-purple-600' to force the checked color
                  // Added 'cursor-pointer' for better UX
                  className="w-4 h-4 rounded border-gray-300 accent-purple-600 cursor-pointer"
                  defaultChecked
                />
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    {recipient.name || recipient.owner}
                  </p>
                  <p className="text-xs text-gray-500">
                    {typeof recipient.amount === "number"
                      ? `₦${recipient.amount.toLocaleString()}`
                      : recipient.amount}{" "}
                    · {recipient.role || recipient.type}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Processing Schedule
          </label>
          <input
            type="text"
            placeholder="Immediate"
            className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none"
          />
        </div>
      </div>
    </Modal>
  );
}

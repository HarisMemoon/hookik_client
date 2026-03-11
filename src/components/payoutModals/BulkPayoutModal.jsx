import React, { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";

export default function BulkPayoutModal({
  open,
  onClose,
  pendingPayouts = [],
  onProcess,
}) {
  const [selectedIds, setSelectedIds] = useState([]);

  // Reset selection when modal opens
  useEffect(() => {
    if (open) {
      setSelectedIds([]);
    }
  }, [open]);

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === pendingPayouts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(pendingPayouts.map((p) => p.id));
    }
  };

  const selectedPayouts = pendingPayouts.filter((p) =>
    selectedIds.includes(p.id),
  );

  const totalAmount =
    selectedPayouts.reduce((acc, curr) => {
      const val =
        typeof curr.amount === "string"
          ? Number(curr.amount.replace(/[^0-9.-]+/g, ""))
          : curr.amount;
      return acc + (val || 0);
    }, 0) || 0;

  const handleProcess = () => {
    if (!selectedIds.length) return;
    onProcess(selectedIds);
  };

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
            disabled={!selectedIds.length}
            onClick={handleProcess}
            className="px-6 py-2 text-sm font-medium bg-purple-600 text-white rounded-xl hover:bg-purple-700 disabled:opacity-40"
          >
            Process {selectedIds.length} Payouts
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Summary */}
        <div className="p-4 bg-purple-50 rounded-xl flex justify-between items-center border-purple-200 border">
          <div>
            <p className="text-xs text-gray-500 font-medium">
              Selected Payouts
            </p>
            <p className="text-xs text-gray-500 font-medium">Total Amount</p>
          </div>

          <div className="text-right">
            <p className="text-sm font-bold">{selectedIds.length}</p>
            <p className="text-sm font-bold">₦{totalAmount.toLocaleString()}</p>
          </div>
        </div>

        {/* Select All */}
        <div className="flex justify-between items-center">
          <label className="text-sm font-bold text-gray-700">
            Select Recipients
          </label>

          <button
            onClick={toggleSelectAll}
            className="text-xs text-purple-600 font-semibold"
          >
            {selectedIds.length === pendingPayouts.length
              ? "Deselect All"
              : "Select All"}
          </button>
        </div>

        {/* Scrollable Recipients List */}
        <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
          {pendingPayouts.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-10">
              No pending payouts
            </p>
          )}

          {pendingPayouts.map((recipient) => {
            const checked = selectedIds.includes(recipient.id);

            return (
              <div
                key={recipient.id}
                className="flex items-center p-4 border border-gray-100 rounded-xl gap-3"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleSelect(recipient.id)}
                  className="w-4 h-4 rounded border-gray-300 accent-purple-600 cursor-pointer"
                />

                <div className="flex flex-col">
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
            );
          })}
        </div>

        {/* Processing Schedule */}
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

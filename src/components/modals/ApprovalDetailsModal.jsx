import React, { useState } from "react";
import GenericConfirmationModal from "./GenericConfirmationModal";
import { PRIMARY } from "@/constants/COLORS";

const ApprovalDetailsModal = ({ isOpen, onClose, item, onApproval }) => {
  const [approvalNotes, setApprovalNotes] = useState("");

  if (!item) return null;

  const title = `Approve ${item.type}`;
  const subtitle = `Review and approve ${item.title}`;

  const handleConfirm = () => {
    onApproval(item, approvalNotes);
    setApprovalNotes("");
    onClose();
  };

  return (
    <GenericConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      confirmText="Confirm Approval"
      confirmButtonClass={PRIMARY}
      onConfirm={handleConfirm}
      confirmButtonStyle={{ backgroundColor: PRIMARY }}
    >
      {/* Subtitle */}
      <p className="text-gray-500 text-sm mb-4">{subtitle}</p>

      {/* Details */}
      <div className="space-y-2 mb-5 text-sm">
        <p>
          <span className="font-semibold text-gray-900">Name:</span>{" "}
          <span className="text-gray-700">{item.title}</span>
        </p>

        <p>
          <span className="font-semibold text-gray-900">Submitted by:</span>{" "}
          <span className="text-gray-700">{item.brand}</span>
        </p>

        <p>
          <span className="font-semibold text-gray-900">Submitted:</span>{" "}
          <span className="text-gray-700">{item.time}</span>
        </p>
      </div>

      {/* Notes */}
      <label
        htmlFor="approval-notes"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Approval Notes (Optional)
      </label>

      <textarea
        id="approval-notes"
        rows="3"
        value={approvalNotes}
        onChange={(e) => setApprovalNotes(e.target.value)}
        placeholder="Add any notes or comments..."
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-gray-800 placeholder-gray-400"
      />
    </GenericConfirmationModal>
  );
};

export default ApprovalDetailsModal;

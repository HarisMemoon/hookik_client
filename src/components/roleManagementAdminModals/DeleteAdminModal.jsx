"use client";

import Modal from "@/components/ui/Modal";

export default function DeleteAdminModal({ open, onClose, onConfirm, admin }) {
  if (!admin) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Delete Admin"
      subtitle="This action cannot be undone"
      size="sm"
      footer={
        <div className="flex gap-3 w-full">
          <button
            onClick={onClose}
            className="flex-1 py-2 border rounded-xl text-sm font-semibold"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 py-2 bg-red-600 text-white rounded-xl text-sm font-semibold"
          >
            Delete
          </button>
        </div>
      }
    >
      <p className="text-sm text-gray-600">
        Are you sure you want to delete{" "}
        <span className="font-semibold">{admin.email}</span>?
      </p>
    </Modal>
  );
}

import Modal from "@/components/ui/Modal";

export default function DeleteRoleModal({ open, onClose, roleName, onDelete }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Delete Role"
      subtitle={`Are you sure you want to delete ${roleName}?`}
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
            onClick={onDelete}
            className="px-6 py-2 text-sm font-medium bg-red-600 text-white rounded-xl hover:bg-red-700 transition flex items-center gap-2"
          >
            Delete Role
          </button>
        </div>
      }
    >
      <div className="space-y-5">
        <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
          <ul className="text-xs text-red-700 space-y-2 font-medium">
            <li>
              <b>Warning:</b> This action cannot be undone.
            </li>
            <li>• 3 members will lose this role</li>
            <li>• All permissions associated with this role will be revoked</li>
          </ul>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">
            Confirm Deletion
          </label>
          <p className="text-xs text-gray-400 mb-2">
            Type <b>{roleName}</b> to confirm
          </p>
          <input
            className="w-full px-4 py-2 text-sm border border-gray-200 rounded-xl outline-none"
            placeholder={`Type "${roleName}" here`}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">
            Reassign Members To
          </label>
          <input
            className="w-full px-4 py-2 text-sm border border-gray-200 rounded-xl outline-none"
            placeholder="Select alternative role..."
          />
        </div>
      </div>
    </Modal>
  );
}

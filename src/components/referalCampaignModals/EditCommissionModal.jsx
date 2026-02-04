import Modal from "@/components/ui/Modal";

export default function EditCommissionModal({
  open,
  onClose,
  participantName,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      size="sm"
      title="Edit Commission Rate"
      subtitle={`Update commission rate for ${participantName}`}
      footer={
        <div className="flex justify-end gap-3 w-full">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-200 rounded-xl text-sm font-medium"
          >
            Cancel
          </button>
          <button className="px-6 py-2 bg-purple-600 text-white rounded-xl text-sm font-medium hover:bg-purple-700">
            Update Rate
          </button>
        </div>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase">
            Current Commission Rate
          </label>
          <input
            disabled
            className="w-full mt-1 p-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-400"
            value="10%"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase">
            New Commission Rate (%)
          </label>
          <input
            className="w-full mt-1 p-3 border border-gray-200 rounded-xl outline-none"
            placeholder="15"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase">
            Reason for Change
          </label>
          <textarea
            rows={3}
            className="w-full mt-1 p-3 border border-gray-200 rounded-xl outline-none resize-none"
            placeholder="Enter reason..."
          />
        </div>
      </div>
    </Modal>
  );
}

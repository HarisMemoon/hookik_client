import Modal from "@/components/ui/Modal";
import { useState } from "react";

export default function ResetLinkModal({ open, onClose, participantName }) {
  const [reason, setReason] = useState("");
  const [isReset, setisReset] = useState(false);

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="sm"
      title="Reset Referral Link"
      subtitle={`Generate a new referral link for ${participantName}`}
      footer={
        <div className="flex justify-end gap-3 w-full">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-200 rounded-xl text-sm font-medium"
          >
            Cancel
          </button>
          <button className="px-6 py-2 bg-purple-600 text-white rounded-xl text-sm font-medium">
            Generate New Link
          </button>
        </div>
      }
    >
      <div className="space-y-5">
        <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl">
          <p className="text-xs text-orange-700 leading-relaxed font-medium">
            <b>Warning:</b> Resetting the referral link will invalidate the old
            link. All existing shares will no longer work.
          </p>
        </div>
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase">
            Current Link
          </label>
          <input
            disabled
            className="w-full mt-1 p-3 bg-gray-50 border border-gray-100 rounded-xl"
            value="https://hookik.com/ref/SARAH2024"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase">
            New Link Code
          </label>
          <input
            className="w-full mt-1 p-3 border border-gray-200 rounded-xl outline-none"
            placeholder="Enter custom code or leave blank"
          />
        </div>
        {/* Reason Field */}
        <div>
          <label className="block text-[13px] font-bold text-gray-500  mb-2 tracking-wider">
            Reason for {isReset ? "disable" : "Reset"}
          </label>
          <textarea
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={`Enter the reason for ${
              isReset ? "suspending" : "reseting"
            } this account...`}
            className="w-full px-4 py-3 text-md border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-100 focus:border-purple-400 outline-none transition-all resize-none bg-white text-gray-900 placeholder:text-gray-400"
          />
        </div>
      </div>
    </Modal>
  );
}

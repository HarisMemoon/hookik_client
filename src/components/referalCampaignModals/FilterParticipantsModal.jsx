import Modal from "@/components/ui/Modal";
import Dropdown from "@/components/ui/DropDown";

export default function FilterParticipantsModal({ open, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Filter Participants"
      size="sm"
      subtitle="Apply filters to narrow down the list"
      footer={
        <div className="flex justify-end gap-3 w-full">
          <button className="px-6 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
            Reset
          </button>
          <button className="px-6 py-2 bg-purple-600 text-white rounded-xl text-sm font-medium">
            Apply Filters
          </button>
        </div>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase">
            Role
          </label>
          <Dropdown
            options={[{ label: "All roles", value: "all" }]}
            value="all"
            onChange={() => {}}
          />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase">
            Status
          </label>
          <Dropdown
            options={[{ label: "All status", value: "all" }]}
            value="all"
            onChange={() => {}}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">
              Referrals Range
            </label>
            <input
              className="w-full mt-1 p-2.5 border border-gray-200 rounded-xl outline-none text-sm"
              placeholder="Min"
            />
          </div>
          <div className="pt-5">
            <input
              className="w-full p-2.5 border border-gray-200 rounded-xl outline-none text-sm"
              placeholder="Max"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">
              Commission Range
            </label>
            <input
              className="w-full mt-1 p-2.5 border border-gray-200 rounded-xl outline-none text-sm"
              placeholder="Min (₦)"
            />
          </div>
          <div className="pt-5">
            <input
              className="w-full p-2.5 border border-gray-200 rounded-xl outline-none text-sm"
              placeholder="Max (₦)"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}

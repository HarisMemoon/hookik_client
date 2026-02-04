import { Search } from "lucide-react";
import Modal from "@/components/ui/Modal";

export default function AssignMembersModal({ open, onClose, roleName }) {
  const members = [
    { name: "John Smith", email: "john@hookik.com", currentRole: "Admin" },
    {
      name: "Sarah Johnson",
      email: "sarah@hookik.com",
      currentRole: "Manager",
    },
    { name: "Mike Chen", email: "mike@hookik.com", currentRole: "Analyst" },
    { name: "Emma Wilson", email: "emma@hookik.com", currentRole: "Support" },
  ];

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Assign Members to Role"
      subtitle={`Add team members to ${roleName}`}
      footer={
        <div className="flex justify-end gap-3 w-full">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-200 rounded-xl text-sm font-medium"
          >
            Cancel
          </button>
          <button className="px-6 py-2 bg-purple-600 text-white rounded-xl text-sm font-semibold">
            Assign Members
          </button>
        </div>
      }
    >
      <div className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">
            Search Team Members
          </label>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={14}
            />
            <input
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none"
              placeholder="Search by name or email..."
            />
          </div>
        </div>

        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          <p className="text-xs font-bold text-gray-500 uppercase">
            Available Members
          </p>
          {members.map((m, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-purple-600 rounded"
                />
                <div>
                  <p className="text-sm font-bold text-gray-800">{m.name}</p>
                  <p className="text-[11px] text-gray-400">{m.email}</p>
                </div>
              </div>
              <span className="text-[10px] font-bold bg-gray-100 px-2 py-1 rounded-md text-gray-600 uppercase">
                {m.currentRole}
              </span>
            </div>
          ))}
        </div>

        <div className="p-4 bg-purple-50 border border-purple-100 rounded-xl">
          <p className="text-[11px] text-purple-700 leading-relaxed font-medium">
            Note: Selected members will be notified via email about their new
            role assignment.
          </p>
        </div>
      </div>
    </Modal>
  );
}

"use client";

import Modal from "@/components/ui/Modal";

/**
 * User Details Modal
 * @param {boolean} open
 * @param {function} onClose
 * @param {object|null} user
 */
export default function UserDetailsModal({ open, onClose, user }) {
  if (!user) return null;

  const formatDate = (date) => {
    if (!date) return "Not available";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const renderField = (label, value) => (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium text-gray-500">{label}</span>
      <span
        className={`text-sm ${
          value == null || value === ""
            ? "text-gray-400 italic"
            : "text-gray-900"
        }`}
      >
        {value ?? "Not provided"}
      </span>
    </div>
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="User Details"
      size="md"
      footer={
        <div className="flex justify-end w-full">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Close
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-semibold text-lg">
            {user.first_name?.[0]}
            {user.last_name?.[0]}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {user.first_name} {user.last_name}
            </h3>
            <p className="text-sm text-gray-500 capitalize">{user.role}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200" />

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-6">
          {renderField(
            "Full Name",
            (user.first_name || "") + " " + (user.last_name || "")
          )}
          {renderField("Email Address", user.email)}
          {renderField("Phone Number", user.phone_number)}
          {renderField("Role", user.role)}
          {renderField("Joined On", formatDate(user.created_at))}
        </div>
      </div>
    </Modal>
  );
}

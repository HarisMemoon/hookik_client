"use client";

import Modal from "@/components/ui/Modal";
import StatusCapsule from "@/components/ui/StatusCapsule";

export default function ViewAdminModal({ open, onClose, admin }) {
  if (!admin) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Admin Details"
      subtitle="View admin account information"
      size="sm"
    >
      <div className="space-y-4 text-sm text-gray-700">
        <div className="flex justify-between">
          <span className="font-semibold">First Name</span>
          <span>{admin.firstName}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold">Last Name</span>
          <span>{admin.lastName}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold">Email</span>
          <span>{admin.email}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold">Role</span>
          <span className="capitalize">{admin.role}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold">Status</span>
          <StatusCapsule value={admin.status} />
        </div>

        <div className="flex justify-between">
          <span className="font-semibold">Created</span>
          <span>{admin.dateCreated}</span>
        </div>

        {admin.permissions?.length > 0 && (
          <div>
            <span className="font-semibold block mb-2">Permissions</span>
            <div className="flex flex-wrap gap-2">
              {admin.permissions.map((p) => (
                <span
                  key={p}
                  className="text-xs bg-gray-100 px-2 py-1 rounded-lg"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

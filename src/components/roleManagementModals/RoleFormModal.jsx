import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import Dropdown from "@/components/ui/DropDown";

export default function RoleFormModal({
  open,
  onClose,
  role = null,
  onSubmit,
}) {
  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    description: "",
    permissions: {
      userManagement: false,
      creatorManagement: false,
      brandManagement: false,
      orders: false,
      payouts: false,
      campaigns: false,
      settings: false,
    },
  });

  useEffect(() => {
    if (role) setFormData({ ...role });
  }, [role]);

  const permissionList = [
    { id: "userManagement", label: "User Management" },
    { id: "creatorManagement", label: "Creator Management" },
    { id: "brandManagement", label: "Brand Management" },
    { id: "orders", label: "Orders" },
    { id: "payouts", label: "Payouts" },
    { id: "campaigns", label: "Campaigns" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={role ? "Edit Role" : "Create New Role"}
      subtitle={
        role
          ? `Update ${role.name} permissions`
          : "Define a new admin role with specific permissions"
      }
      size="md"
      footer={
        <div className="flex justify-end gap-3 w-full">
          <button
            onClick={onClose}
            className="px-6 py-2 text-sm font-medium border border-gray-200 rounded-xl hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit(formData)}
            className="px-6 py-2 text-sm font-medium bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
          >
            {role ? "Save Changes" : "Create Role"}
          </button>
        </div>
      }
    >
      <div className="space-y-5 text-black">
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-tight">
            Role Name
          </label>
          <input
            className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-100 outline-none"
            placeholder="e.g., Marketing Admin"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-tight">
            Access Duration
          </label>
          <Dropdown
            options={[
              { label: "Permanent", value: "Permanent" },
              { label: "6 Months", value: "6 Months" },
              { label: "Temporary", value: "Temporary" },
            ]}
            value={formData.duration}
            onChange={(val) => setFormData({ ...formData, duration: val })}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-tight">
            Permissions
          </label>
          <div className="space-y-3 p-4 border border-gray-100 rounded-2xl bg-white">
            {permissionList.map((perm) => (
              <div key={perm.id} className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">
                  {perm.label}
                </span>
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-purple-600 rounded cursor-pointer"
                  checked={formData.permissions[perm.id]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      permissions: {
                        ...formData.permissions,
                        [perm.id]: e.target.checked,
                      },
                    })
                  }
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-tight">
            Description
          </label>
          <textarea
            rows={3}
            className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none resize-none"
            placeholder="Describe role responsibilities..."
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>
      </div>
    </Modal>
  );
}

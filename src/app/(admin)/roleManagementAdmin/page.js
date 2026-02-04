"use client";

import React, { useState } from "react";
import {
  Plus,
  Eye,
  Trash2,
  ShieldCheck,
  Users,
  SlidersHorizontal,
} from "lucide-react";
import GenericTable from "@/components/GenericTable";
import StatusCapsule from "@/components/ui/StatusCapsule";
import CreateRoleStepperModal from "@/components/roleManagementAdminModals/CreateRoleStepperModal";

// Modals
// import RoleFormModal from "@/components/roleModals/RoleFormModal";
// import AssignMembersModal from "@/components/roleModals/AssignMembersModal";
// import DeleteRoleModal from "@/components/roleModals/DeleteRoleModal";

export default function RoleManagementPage() {
  const [activeModal, setActiveModal] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const roleColumns = [
    {
      header: (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="accent-purple-600"
            checked={selectedIds.length === 2} // ← total rows count
            onChange={(e) => setSelectedIds(e.target.checked ? [1, 2] : [])}
          />
          <span>First name</span>
        </div>
      ),
      key: "firstName",
      render: (val, row) => (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="accent-purple-600"
            checked={selectedIds.includes(row.id)}
            onChange={(e) => {
              setSelectedIds((prev) =>
                e.target.checked
                  ? [...prev, row.id]
                  : prev.filter((id) => id !== row.id)
              );
            }}
          />
          <span>{val}</span>
        </div>
      ),
    },
    { header: "Last name", key: "lastName" },
    { header: "Email", key: "email" },
    { header: "Role", key: "role" },
    { header: "Date created", key: "dateCreated" },
    {
      header: "Status",
      key: "status",
      render: (val) => <StatusCapsule value={val} />,
    },
  ];
  const handleAction = (action, row) => {
    setSelectedRole(row);
    if (action === "delete") setActiveModal("delete");
    if (action === "view") setActiveModal("edit");
  };
  const handleFinalize = (data) => {
    console.log("Saving new Admin:", data);
    // Call your API here
    setIsCreateModalOpen(false);
  };
  return (
    <main className="p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl  text-gray-900">Role Management</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-400 text-gray-700 rounded-xl text-sm font-medium">
            <SlidersHorizontal size={18} /> Filters
          </button>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl text-sm font-semibold shadow-lg shadow-purple-100"
          >
            <Plus size={18} /> Create Role
          </button>
        </div>
      </div>

      <div className="border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-gray-50 flex items-center gap-2">
          <span className="font-bold text-gray-900">Recent Brands</span>
          <span className="bg-green-50 text-green-700 text-[12px] font-bold px-2 py-0.5 rounded-full">
            +2 new roles added
          </span>
        </div>

        <GenericTable
          columns={roleColumns}
          iconActions={[
            { key: "view", icon: <Eye size={18} /> },
            { key: "delete", icon: <Trash2 size={18} />, danger: true },
          ]}
          data={[
            {
              id: 1,
              firstName: "John",
              lastName: "Doe",
              email: "john@email.com",
              role: "Admin",
              dateCreated: "20/01/2025",
              status: "Active",
            },
            {
              id: 2,
              firstName: "John",
              lastName: "Doe",
              email: "john@email.com",
              role: "Finance",
              dateCreated: "20/01/2025",
              status: "Inactive",
            },
          ]}
          roleManagementPage={true}
          rowActions={[
            {
              key: "view",
              label: "View Details",
              icon: <Eye size={18} className="text-gray-400" />,
            },
            {
              key: "delete",
              label: "Delete",
              icon: <Trash2 size={18} className="text-gray-400" />,
            },
          ]}
          onActionClick={handleAction}
        />
      </div>

      {/* Modals Integrated */}
      <CreateRoleStepperModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onComplete={handleFinalize}
      />
      {/* <RoleFormModal
        open={activeModal === "create" || activeModal === "edit"}
        onClose={() => setActiveModal(null)}
        role={activeModal === "edit" ? selectedRole : null}
      />
      <DeleteRoleModal
        open={activeModal === "delete"}
        onClose={() => setActiveModal(null)}
        roleName={selectedRole?.role}
      /> */}
    </main>
  );
}

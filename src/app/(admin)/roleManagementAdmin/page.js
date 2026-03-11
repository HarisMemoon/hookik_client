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
import { createAdminUser, deleteAdminUser } from "@/lib/api/adminUsers";
import useAdminUsers from "@/hooks/useAdminUsers";
import { toast } from "react-hot-toast";
import ViewAdminModal from "@/components/roleManagementAdminModals/ViewAdminModal";
import DeleteAdminModal from "@/components/roleManagementAdminModals/DeleteAdminModal";

// Modals
// import RoleFormModal from "@/components/roleModals/RoleFormModal";
// import AssignMembersModal from "@/components/roleModals/AssignMembersModal";
// import DeleteRoleModal from "@/components/roleModals/DeleteRoleModal";

export default function RoleManagementPage() {
  const currentAdminRole = localStorage.getItem("admin_role");
  const [activeModal, setActiveModal] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const { admins, loading } = useAdminUsers(refreshKey);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const roleMap = {
    "Super Admin": "super_admin",
    "User Management": "moderator",
    "Finance Management": "moderator",
    "Risk Management": "support",
    "Post Management": "moderator",
  };
  const roleLabels = {
    super_admin: "Super Admin",
    moderator: "Moderator",
    support: "Support",
  };
  const roleColumns = [
    {
      header: "First name",
      key: "firstName",
      // Removed the custom render and header that had checkboxes
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

    if (action === "view") {
      setActiveModal("view");
    }

    if (action === "delete") {
      if (currentAdminRole !== "super_admin") {
        toast.error("Only Super Admin can delete admins frontend");
        return;
      }

      setActiveModal("delete");
    }
  };
  const handleFinalize = async (data) => {
    try {
      const payload = {
        ...data,
        role: roleMap[data.role],
      };

      await createAdminUser(payload);

      toast.success("Admin created successfully");

      setIsCreateModalOpen(false);

      setRefreshKey((prev) => prev + 1);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };
  const handleDelete = async () => {
    try {
      await deleteAdminUser(selectedRole.id);

      toast.success("Admin deleted");

      setActiveModal(null);

      setRefreshKey((prev) => prev + 1);
    } catch (err) {
      toast.error("Delete failed");
    }
  };
  return (
    <main className="p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl  text-gray-900">Role Management</h1>
        <div className="flex gap-3">
          {/* <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-400 text-gray-700 rounded-xl text-sm font-medium">
            <SlidersHorizontal size={18} /> Filters
          </button> */}
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
          <span className="font-bold text-gray-900">All Admins</span>
        </div>

        <GenericTable
          columns={roleColumns}
          iconActions={[
            { key: "view", icon: <Eye size={18} /> },
            { key: "delete", icon: <Trash2 size={18} />, danger: true },
          ]}
          data={admins.map((a) => ({
            id: a.id,
            firstName: a.first_name,
            lastName: a.last_name,
            email: a.email,
            role: roleLabels[a.role] || a.role,
            dateCreated: new Date(a.createdAt).toLocaleDateString(),
            status: a.status,
          }))}
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
      <ViewAdminModal
        open={activeModal === "view"}
        onClose={() => setActiveModal(null)}
        admin={selectedRole}
      />

      <DeleteAdminModal
        open={activeModal === "delete"}
        onClose={() => setActiveModal(null)}
        onConfirm={handleDelete}
        admin={selectedRole}
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

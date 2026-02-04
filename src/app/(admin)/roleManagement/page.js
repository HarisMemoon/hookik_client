"use client";

import { useState } from "react";
import { ShieldCheck, Plus, Users } from "lucide-react";
import GenericTable from "@/components/GenericTable";

// Import the Modals
import RoleFormModal from "@/components/roleManagementModals/RoleFormModal";
import SetPermissionsModal from "@/components/roleManagementModals/SetPermissionsModal";
import AssignMembersModal from "@/components/roleManagementModals/AssignMembersModal";
import DeleteRoleModal from "@/components/roleManagementModals/DeleteRoleModal";

// ============================================================================
// TABLE DEFINITIONS
// ============================================================================

const roleColumns = [
  { header: "Role Name", key: "name" },
  { header: "Access Level", key: "level" },
  { header: "Duration", key: "duration" },
  { header: "Members", key: "memberCount" },
  { header: "Status", key: "status" },
];

const roleData = [
  {
    id: 1,
    name: "Super Admin",
    level: "Full System Access",
    duration: "Indefinite",
    memberCount: "2 Users",
    status: "Active",
    permissions: {
      userManagement: true,
      creatorManagement: true,
      brandManagement: true,
      orders: true,
      payouts: true,
      campaigns: true,
      settings: true,
    },
  },
  {
    id: 2,
    name: "Support Lead",
    level: "Customer & Orders Only",
    duration: "Indefinite",
    memberCount: "5 Users",
    status: "Active",
    permissions: {
      userManagement: true,
      creatorManagement: false,
      brandManagement: false,
      orders: true,
      payouts: false,
      campaigns: false,
      settings: false,
    },
  },
  // ... other rows
];

export default function RoleManagementPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  // Modal State Management
  const [activeModal, setActiveModal] = useState(null); // 'create', 'edit', 'permissions', 'members', 'delete'
  const [selectedRole, setSelectedRole] = useState(null);

  const handleAction = (action, row) => {
    setSelectedRole(row);
    switch (action) {
      case "edit":
        setActiveModal("edit");
        break;
      case "permissions":
        setActiveModal("permissions");
        break;
      case "members":
        setActiveModal("members");
        break;
      case "delete":
        setActiveModal("delete");
        break;
      default:
        console.log(`Action ${action} triggered`);
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedRole(null);
  };

  return (
    <main className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900 mb-2">
            Role Access and Management
          </h1>
          <p className="text-gray-600 text-sm">
            Manage admin roles and define specific permissions levels for team
            members
          </p>
        </div>

        <button
          className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-purple-700 transition shadow-md shadow-purple-100"
          onClick={() => setActiveModal("create")}
        >
          <Plus size={18} />
          Create New Role
        </button>
      </div>

      {/* Role Management Table */}
      <GenericTable
        title="Administrative Roles"
        columns={roleColumns}
        data={roleData}
        showSearch
        searchPlaceholder="Search roles..."
        className="rounded-2xl"
        // 🔹 Actions Dropdown Configuration updated to match screenshot requirements
        rowActions={[
          { key: "edit", label: "Edit Role" },
          { key: "members", label: "Assign Members" },
          { key: "permissions", label: "Set Permissions" },
          { key: "delete", label: "Delete Role", danger: true },
        ]}
        onActionClick={handleAction}
        customRenderers={{
          level: (val) => (
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-purple-500" />
              <span className="text-gray-900">{val}</span>
            </div>
          ),
          memberCount: (val) => (
            <div className="flex items-center gap-2">
              <Users size={14} className="text-gray-400" />
              <span>{val}</span>
            </div>
          ),
        }}
      />

      {/* 🔹 MODALS SECTION 🔹 */}

      {/* 1. Create/Edit Role */}
      <RoleFormModal
        open={activeModal === "create" || activeModal === "edit"}
        onClose={closeModal}
        role={activeModal === "edit" ? selectedRole : null}
        onSubmit={(data) => {
          console.log("Submitting role data:", data);
          closeModal();
        }}
      />

      {/* 2. Set Permissions */}
      <SetPermissionsModal
        open={activeModal === "permissions"}
        onClose={closeModal}
        roleName={selectedRole?.name}
        onSave={() => {
          console.log("Permissions updated");
          closeModal();
        }}
      />

      {/* 3. Assign Members */}
      <AssignMembersModal
        open={activeModal === "members"}
        onClose={closeModal}
        roleName={selectedRole?.name}
      />

      {/* 4. Delete Role */}
      <DeleteRoleModal
        open={activeModal === "delete"}
        onClose={closeModal}
        roleName={selectedRole?.name}
        onDelete={() => {
          console.log("Role Deleted");
          closeModal();
        }}
      />
    </main>
  );
}

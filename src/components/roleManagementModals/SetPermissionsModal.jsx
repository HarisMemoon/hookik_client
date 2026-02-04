import Modal from "@/components/ui/Modal";

export default function SetPermissionsModal({ open, onClose, roleName }) {
  const sections = [
    {
      title: "User Management",
      icon: "👥",
      perms: [
        {
          id: "view",
          label: "View Users",
          sub: "Access to view user list and details",
        },
        {
          id: "edit",
          label: "Edit Users",
          sub: "Ability to modify user information",
        },
        {
          id: "suspend",
          label: "Suspend Users",
          sub: "Permission to suspend user accounts",
        },
      ],
    },
    {
      title: "Brand Management",
      icon: "🏢",
      perms: [
        {
          id: "v_brand",
          label: "View Brands",
          sub: "Access to brand information",
        },
        {
          id: "a_brand",
          label: "Approve Brands",
          sub: "Approve new brand applications",
        },
        {
          id: "m_camp",
          label: "Manage Campaigns",
          sub: "Create and manage brand campaigns",
        },
      ],
    },
  ];

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Set Permissions"
      subtitle={`Configure detailed permissions for ${roleName}`}
      footer={
        <div className="flex justify-end gap-3 w-full">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-200 rounded-xl text-sm font-medium"
          >
            Cancel
          </button>
          <button className="px-6 py-2 bg-purple-600 text-white rounded-xl text-sm font-semibold shadow-purple-100 shadow-md">
            Save Permissions
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        {sections.map((section, idx) => (
          <div
            key={idx}
            className="border border-gray-100 rounded-2xl p-5 bg-white shadow-sm"
          >
            <h3 className="text-sm font-bold flex items-center gap-2 mb-4 text-gray-900">
              {section.title}
            </h3>
            <div className="space-y-4">
              {section.perms.map((p) => (
                <div key={p.id} className="flex justify-between items-start">
                  <div className="pr-4">
                    <p className="text-sm font-semibold text-gray-800">
                      {p.label}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{p.sub}</p>
                  </div>
                  {/* Toggle Switch UI */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked={p.id === "view"}
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}

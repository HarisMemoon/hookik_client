"use client";

import Modal from "@/components/ui/Modal";

export default function UserDetailsModal({ open, onClose, user }) {
  if (!user) return null;
  console.log("user:", user);

  const formatDate = (date) => {
    if (!date) return "Not available";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const renderMetric = (label, value, isCurrency = false) => (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium text-gray-500">{label}</span>
      <span className="text-sm font-bold text-gray-900">
        {isCurrency ? `₦${Number(value || 0).toLocaleString()}` : (value ?? 0)}
      </span>
    </div>
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="User Details"
      size="sm" // Increased size to accommodate the table
      footer={
        <div className="flex justify-end gap-3 w-full">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Close
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition">
            Edit User
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold text-gray-900">
              {user.first_name} {user.last_name}
            </h3>
            <p className="text-sm text-gray-500">
              Complete information about {user.first_name}
            </p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
              user.status === "active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {user.status}
          </span>
        </div>

        {/* Info & Metrics Grid */}
        <div className="grid grid-cols-2 gap-y-6 gap-x-12">
          <div className="space-y-4">
            {renderMetric("Full Name", `${user.first_name} ${user.last_name}`)}
            {renderMetric("Email", user.email)}
            {renderMetric("Total Orders", user.total_orders)}
            {renderMetric("Joined Date", formatDate(user.created_at))}
          </div>
          <div className="space-y-4">
            {renderMetric("Status", user.status)}
            {renderMetric("Phone", user.phone_number)}
            {renderMetric("Total Spent", user.total_spent, true)}
            {renderMetric("Wallet Balance", user.wallet_balance, true)}{" "}
            {/* Placeholder */}
          </div>
        </div>

        {/* Recent Order History Section */}
        <div className="mt-8">
          <h4 className="text-md font-bold text-gray-900 mb-4">
            Recent Order History
          </h4>
          <div className="overflow-hidden border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                    Order ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {user.recentOrders && user.recentOrders.length > 0 ? (
                  user.recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        #{order.order_code}
                      </td>

                      <td className="px-4 py-3 text-sm text-gray-500">
                        {new Date(order.created_at).toISOString().split("T")[0]}
                      </td>

                      <td className="px-4 py-3 text-sm text-gray-900">
                        ₦{Number(order.grand_total).toLocaleString()}
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded text-[10px] font-bold uppercase
              ${
                order.status === "paid"
                  ? "bg-green-100 text-green-700"
                  : order.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
              }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-4 py-6 text-sm text-gray-500 text-center"
                    >
                      No recent orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Support Tickets Section */}
        <div className="pt-4">
          <h4 className="text-sm font-medium text-gray-500">Support Tickets</h4>
          <p className="text-sm font-bold text-gray-900">
            3 tickets (2 resolved)
          </p>{" "}
          {/* Placeholder */}
        </div>
      </div>
    </Modal>
  );
}

import React from "react";
import Modal from "@/components/ui/Modal";

export default function PayoutHistoryModal({ open, onClose, user }) {
  const history = [
    {
      date: "2024-10-31",
      amount: 125000,
      method: "Bank Transfer",
      status: "Pending",
    },
    {
      date: "2024-09-30",
      amount: 98000,
      method: "Bank Transfer",
      status: "Completed",
    },
    {
      date: "2024-08-31",
      amount: 112000,
      method: "Bank Transfer",
      status: "Completed",
    },
  ];

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Payout History"
      subtitle={`Complete payout history for ${user?.name}`}
      size="sm"
      footer={
        <div className="flex justify-end w-full">
          <button
            onClick={onClose}
            className="px-6 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition"
          >
            Close
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="overflow-hidden rounded-xl border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className=" border-b border-gray-200">
                <th className="px-4 py-3 text-md  text-gray-900  tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-md  text-gray-900  tracking-wider">
                  Amount
                </th>
                <th className="px-4 py-3 text-md  text-gray-900  tracking-wider">
                  Method
                </th>
                <th className="px-4 py-3 text-md  text-gray-900  tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {history.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 text-sm text-gray-600 font-medium">
                    {row.date}
                  </td>
                  <td className="px-4 py-4 text-sm font-bold text-black">
                    {typeof row.amount === "number"
                      ? `₦${row.amount.toLocaleString()}`
                      : row.amount}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {row.method}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        row.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-gray-50 rounded-xl">
          <p className="text-sm font-bold mb-4">Summary</p>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-gray-500 mb-1 font-medium">
                Total Payouts
              </p>
              <p className="text-lg font-bold">3</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1 font-medium">
                Total Paid
              </p>
              <p className="text-lg font-bold">₦210,000</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1 font-medium">Pending</p>
              <p className="text-lg font-bold text-black">₦125,000</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

// src/components/userModals/BrandWalletModal.js
import React from "react";
import Modal from "@/components/ui/Modal";
import { PRIMARY } from "@/constants/COLORS";

export default function BrandWalletModal({ open, onClose, brand }) {
  if (!open || !brand) return null;

  const footer = (
    <div className="flex justify-end gap-3 w-full">
      <button
        onClick={onClose}
        className="px-6 py-2 text-sm font-medium border border-gray-200 rounded-xl hover:bg-gray-50 transition"
      >
        Close
      </button>
      <button
        className="px-6 py-2 text-sm font-medium  text-white rounded-xl hover:bg-purple-700 transition shadow-md shadow-purple-200"
        style={{ backgroundColor: PRIMARY }}
      >
        Process Withdrawal
      </button>
    </div>
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Brand Wallet"
      subtitle={`Wallet details for ${brand.name || "FashionHub"}`}
      size="md"
      footer={footer}
    >
      <div className="space-y-6">
        {/* Main Balance Card */}
        <div
          className=" rounded-2xl p-6 text-white shadow-lg"
          style={{ backgroundColor: PRIMARY }}
        >
          <p className="text-xs opacity-80 mb-2 font-medium">
            Available Balance
          </p>
          <h2 className="text-3xl font-bold mb-4">₦450,000</h2>
          <p className="text-[10px] opacity-60 font-bold  tracking-widest">
            Last updated: Nov 1, 2024
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Total Earned", val: "₦2,450,000" },
            { label: "Pending", val: "₦125,000" },
            { label: "Withdrawn", val: "₦1,875,000" },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-4 bg-white border border-gray-200 rounded-xl  text-center"
            >
              <p className="text-[16px] text-gray-400   mb-1">{stat.label}</p>
              <p className="text-lg  text-gray-900">{stat.val}</p>
            </div>
          ))}
        </div>

        {/* Recent Transactions */}
        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-3">
            Recent Transactions
          </h4>
          <div className="border border-gray-100 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className=" border-b border-gray-100 text-gray-800">
                <tr>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Amount</th>
                  <th className="px-4 py-3 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-4 py-4 text-gray-900 font-medium">
                    2024-10-28
                  </td>
                  <td className="px-4 py-4 text-gray-500 font-medium">
                    Campaign Payment
                  </td>
                  <td className="px-4 py-4 font-bold text-green-600">
                    +₦125,000
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="px-2.5 py-1 bg-green-500 text-white rounded-md text-[9px] font-bold uppercase">
                      Completed
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-gray-900 font-medium">
                    2024-10-25
                  </td>
                  <td className="px-4 py-4 text-gray-500 font-medium">
                    Withdrawal
                  </td>
                  <td className="px-4 py-4 font-bold text-red-500">
                    -₦200,000
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="px-2.5 py-1 bg-green-500 text-white rounded-md text-[9px] font-bold uppercase">
                      Completed
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Modal>
  );
}

// src/components/userModals/BrandWalletModal.js
import React from "react";
import Modal from "@/components/ui/Modal";
import { PRIMARY } from "@/constants/COLORS";

export default function BrandWalletModal({ open, onClose, brand }) {
  if (!open || !brand) return null;
  console.log("brand", brand);

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
      subtitle={`Wallet details for ${brand.business_name || "FashionHub"}`}
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
          <h2 className="text-3xl font-bold mb-4">
            {brand.wallet_balance
              ? `$ ${brand.wallet_balance}`
              : "No Wallet Yet"}
          </h2>
          <p className="text-[10px] opacity-60 font-bold  tracking-widest">
            Last updated: Nov 1, 2024
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          {[
            {
              label: "Total Earned",
              val: `$ ${brand.brand_wallet.total_earned}`,
            },
            { label: "Pending", val: `$ ${brand.brand_wallet.pending}` },
            { label: "Withdrawn", val: `$ ${brand.brand_wallet.withdrawn}` },
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
              <thead className="border-b border-gray-100 text-gray-800">
                <tr>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Amount</th>
                  <th className="px-4 py-3 font-medium text-right">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {brand.recentTransactions?.length ? (
                  brand.recentTransactions.map((tx) => {
                    const isCredit = [
                      "earning_vendor",
                      "earning_influencer",
                      "credit",
                    ].includes(tx.type);

                    return (
                      <tr key={tx.id}>
                        {/* DATE */}
                        <td className="px-4 py-4 text-gray-900 font-medium">
                          {new Date(tx.created_at).toLocaleDateString()}
                        </td>

                        {/* TYPE */}
                        <td className="px-4 py-4 text-gray-500 font-medium capitalize">
                          {tx.type.replace(/_/g, " ")}
                        </td>

                        {/* AMOUNT */}
                        <td
                          className={`px-4 py-4 font-bold ${
                            isCredit ? "text-green-600" : "text-red-500"
                          }`}
                        >
                          {isCredit ? "+" : "-"}₦
                          {Number(tx.amount).toLocaleString()}
                        </td>

                        {/* STATUS */}
                        <td className="px-4 py-4 text-right">
                          <span
                            className={`px-2.5 py-1 rounded-md text-[9px] font-bold uppercase text-white
                      ${
                        tx.status === "completed"
                          ? "bg-green-500"
                          : tx.status === "pending"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                          >
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-6 text-center text-gray-400 text-xs"
                    >
                      No recent transactions
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Modal>
  );
}

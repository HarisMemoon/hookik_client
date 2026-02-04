// src/components/userModals/BrandDetailsModal.js
import React from "react";
import Modal from "@/components/ui/Modal";
import { PRIMARY } from "@/constants/COLORS";

export default function BrandDetailsModal({ open, onClose, brand }) {
  if (!open || !brand) return null;

  const footer = (
    <div className="flex justify-end gap-3 w-full">
      <button
        onClick={onClose}
        className="px-6 py-2 text-sm font-medium border border-gray-200 rounded-xl hover:bg-gray-50 transition"
      >
        Close
      </button>
      <button className="px-6 py-2 text-sm font-medium bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition">
        Edit Brand
      </button>
    </div>
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Brand Details"
      subtitle={`Complete information about ${brand.business_name || "No Name"}`}
      size="sm"
      footer={footer}
    >
      <div className="space-y-6 max-h-[75vh] overflow-y-auto pr-2 theme-scroll text-black">
        {/* Statistics Grid */}
        <div className="grid grid-cols-2 gap-y-4 border-b border-gray-50 pb-6">
          {[
            { label: "Brand Name", value: brand.business_name || "No Name" },
            { label: "Status", value: brand.status, isStatus: brand.status },
            {
              label: "Total Products",
              value: brand.total_products
                ? brand.total_products
                : "No Products",
            },
            // { label: "Active Campaigns", value: "12" },
            {
              label: "Wallet Balance",
              value: brand.wallet_balance
                ? `$ ${brand.wallet_balance}`
                : "No Wallet",
              isPrice: true,
            },
            { label: "Joined Date", value: brand.created_at.split("T")[0] },
          ].map((item, i) => (
            <div key={i}>
              <p className="text-xs text-gray-600 mb-1">{item.label}</p>
              {item.isStatus ? (
                <span
                  className="px-3 py-1  text-white text-[10px] font-bold rounded-md uppercase"
                  style={{ backgroundColor: "#34D399" }}
                >
                  Active
                </span>
              ) : (
                <p
                  className={`text-sm font-bold ${
                    item.isPrice ? "text-black" : "text-gray-900"
                  }`}
                >
                  {item.value}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Connected Stores */}
        {/* <div>
          <h4 className="text-lg font-bold mb-3">Connected Stores</h4>
          <div className="space-y-3">
            {["Shopify Store", "WooCommerce Store"].map((store, i) => (
              <div
                key={i}
                className="p-4 border border-gray-100 rounded-2xl flex justify-between items-center bg-white "
              >
                <div>
                  <p className="text-md font-bold">{store}</p>
                  <p className="text-[15px] text-gray-400 mt-0.5">
                    Connected on 2023-08-15
                  </p>
                </div>
                <span
                  className="px-3 py-1  text-white text-[10px] font-bold rounded-md uppercase"
                  style={{ backgroundColor: "#34D399" }}
                >
                  Active
                </span>
              </div>
            ))}
          </div>
        </div> */}

        {/* Recently Uploaded Products */}
        <div>
          <h4 className="text-lg font-bold mb-3">Recently Uploaded Products</h4>

          <div className="border border-gray-100 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-gray-100 text-gray-800">
                <tr>
                  <th className="px-4 py-3 font-medium">Product</th>
                  <th className="px-4 py-3 font-medium">Price</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {brand?.recentProducts?.length > 0 ? (
                  brand.recentProducts.map((product) => (
                    <tr key={product.id}>
                      <td className="px-4 py-4 font-bold text-gray-900">
                        {product.name}
                      </td>

                      <td className="px-4 py-4 font-bold">
                        ₦{Number(product.price).toLocaleString()}
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`px-2 py-1 rounded text-[10px] font-bold uppercase
                    ${
                      product.status === "verified"
                        ? "bg-black text-white"
                        : product.status === "pending"
                          ? "bg-gray-100 text-gray-500"
                          : "bg-red-100 text-red-600"
                    }
                  `}
                        >
                          {product.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-4 py-6 text-center text-gray-400 italic"
                    >
                      No products uploaded yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Active Campaigns */}
        {/* <div>
          <h4 className="text-lg font-bold mb-3">Active Campaigns</h4>
          <div className="space-y-3">
            {["Summer Tech Sale", "New Product Launch"].map((camp, i) => (
              <div
                key={i}
                className="p-4 border border-gray-100 rounded-2xl flex justify-between items-center"
              >
                <div>
                  <p className="text-md font-bold">{camp}</p>
                  <p className="text-[15px] text-gray-400 mt-0.5">
                    Ends in 12 days • 45K reach
                  </p>
                </div>
                <span className="px-3 py-1 bg-purple-600 text-white text-[10px] font-bold rounded-md uppercase">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div> */}

        {/* Bank Details */}

        <div className="pt-4">
          <h4 className="text-lg font-bold mb-3">Linked Bank Details</h4>
          {brand.wallet_bank_name ? (
            <div className="p-4 border border-dashed border-gray-200 rounded-2xl ">
              <p className="text-md font-bold">{brand.wallet_bank_name}</p>
              <p className="text-[14px] text-gray-400  mt-1 ">
                Account: {brand.wallet_account_number}
              </p>
              <p className="text-[14px] text-gray-400  mt-1 ">
                Account Name: {brand.wallet_account_name}
              </p>
            </div>
          ) : (
            "No Bank Details Available"
          )}
        </div>
      </div>
    </Modal>
  );
}

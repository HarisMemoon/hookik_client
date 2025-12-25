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
      subtitle={`Complete information about ${brand.name || "FashionHub"}`}
      size="md"
      footer={footer}
    >
      <div className="space-y-6 max-h-[75vh] overflow-y-auto pr-2 theme-scroll text-black">
        {/* Statistics Grid */}
        <div className="grid grid-cols-2 gap-y-4 border-b border-gray-50 pb-6">
          {[
            { label: "Brand Name", value: brand.name || "FashionHub" },
            { label: "Status", value: "Active", isStatus: true },
            { label: "Total Products", value: "245" },
            { label: "Active Campaigns", value: "12" },
            { label: "Wallet Balance", value: "₦450,000", isPrice: true },
            { label: "Joined Date", value: "2023-08-15" },
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
        <div>
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
        </div>

        {/* Recently Uploaded Products */}
        <div>
          <h4 className="text-lg font-bold mb-3">Recently Uploaded Products</h4>
          <div className="border border-gray-100 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className=" border-b border-gray-100 text-gray-800">
                <tr>
                  <th className="px-4 py-3 font-large">Product</th>
                  <th className="px-4 py-3 font-lg">Category</th>
                  <th className="px-4 py-3 font-lg">Price</th>
                  <th className="px-4 py-3 font-lg">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-4 py-4 font-bold text-gray-900">
                    Wireless Earbuds Pro
                  </td>
                  <td className="px-4 py-4 text-gray-500">Electronics</td>
                  <td className="px-4 py-4 font-bold">₦45,000</td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 bg-black text-white rounded text-[10px] font-bold uppercase">
                      Approved
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 font-bold text-gray-900">
                    Smart Watch Ultra
                  </td>
                  <td className="px-4 py-4 text-gray-500">Electronics</td>
                  <td className="px-4 py-4 font-bold">₦89,000</td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-[10px] font-bold uppercase">
                      Pending
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Active Campaigns */}
        <div>
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
        </div>

        {/* Bank Details */}
        <div className="pt-4">
          <h4 className="text-lg font-bold mb-3">Linked Bank Details</h4>
          <div className="p-4 border border-dashed border-gray-200 rounded-2xl ">
            <p className="text-md font-bold">First Bank of Nigeria</p>
            <p className="text-[14px] text-gray-400  mt-1 ">
              Account: ****5678
            </p>
            <p className="text-[14px] text-gray-400  mt-1 ">
              Account Name: FashionHub Limited
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}

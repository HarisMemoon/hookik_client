// src/components/orderModals/OrderDetailsModal.js
import React from "react";
import Modal from "@/components/ui/Modal";

export default function OrderDetailsModal({ open, onClose, order }) {
  if (!open || !order) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Order Details"
      subtitle={`#${order.orderId || order.order_code}`}
      size="md"
      footer={
        <div className="flex justify-end gap-3 w-full">
          <button
            onClick={onClose}
            className="px-6 py-2 text-sm font-medium border border-gray-200 rounded-xl hover:bg-gray-50 transition"
          >
            Close
          </button>
          <button className="px-6 py-2 text-sm font-medium bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition shadow-md shadow-purple-100">
            Update Order
          </button>
        </div>
      }
    >
      <div className="space-y-6 text-black">
        <div className="grid grid-cols-2 gap-y-4">
          <div>
            <p className="text-xs text-gray-400 mb-1 font-medium">Order Code</p>
            <p className="text-sm font-bold">
              {order.orderId || order.order_code}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1 font-medium">Buyer</p>
            <p className="text-sm font-bold">
              {order.customer || "Guest User"}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1 font-medium">Email</p>
            <p className="text-sm font-bold truncate pr-2">
              {order.email || order.buyer?.email || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1 font-medium">Amount</p>
            <p className="text-sm font-bold">
              {order.amount || `₦${Number(order.grand_total).toLocaleString()}`}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1 font-medium">Status</p>
            <span className="px-3 py-1 bg-purple-600 text-white text-[10px] font-bold rounded-md uppercase">
              {order.status}
            </span>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1 font-medium">Date</p>
            <p className="text-sm font-bold">
              {order.date || new Date(order.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400 mb-1 font-medium">
            Shipping Information
          </p>
          <p className="text-sm font-bold">
            Tracking: {order.tracking_number || "Not assigned"}
          </p>
          <p className="text-xs text-gray-500 mt-1 uppercase">
            Method: {order.shipping_type || "Regular"}
          </p>
        </div>
      </div>
    </Modal>
  );
}

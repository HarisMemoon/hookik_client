"use client";

import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import {
  Send,
  Paperclip,
  User,
  Activity,
  CheckCircle,
  RefreshCcw,
  FileText,
  ShoppingCart,
} from "lucide-react";

export default function TicketViewModal({ open, onClose, ticket }) {
  const [activeTab, setActiveTab] = useState("details"); // 'details', 'user', 'actions'
  const [reply, setReply] = useState("");
  const [isInternal, setIsInternal] = useState(false);

  // Sub-components for each tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "details":
        return <TicketMainDetails ticket={ticket} />;
      case "user":
        return <ShopperInformation ticket={ticket} />;
      case "actions":
        return <QuickResolutionActions ticket={ticket} />;
      default:
        return null;
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="sm"
      // Custom Header to match Figma
      customHeader={
        <div className="p-4 border-b border-gray-100">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <ShoppingCart size={22} style={{ color: "blue" }} />
              <h2 className="text-md  text-gray-900 text-[22px] font-medium">
                {ticket?.subject || "Order not delivered"}
              </h2>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-[14px]   tracking-wider">
                {ticket?.priority || "Normal"}
              </span>
              <span className="px-3 py-1 mr-8 bg-blue-100 text-blue-800 rounded-full text-[14px]   tracking-wider">
                {ticket?.status || "Open"}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400">
            <span className="text-gray-500  text-[15px]">
              Ticket ID:{" "}
              <span className="text-gray-500  text-[15px]">
                {ticket?.ticketId || "TKT-SH-001"}
              </span>
              <span className=" ml-4 text-gray-500 font-2xl text-[24px]">
                .
              </span>
            </span>
            <span className="text-gray-500  text-[15px]">
              User:{" "}
              <span className="text-gray-500  text-[15px]">
                {ticket?.userName || "John Doe"}
              </span>
              <span className=" ml-4 text-gray-500 font-2xl text-[24px]">
                .
              </span>
            </span>
            <span className="text-gray-500  text-[15px]">
              Category:{" "}
              <span className="text-gray-500  text-[15px]">
                {ticket?.category || "Delivery"}
              </span>
              <span className=" ml-4 text-gray-500 font-2xl text-[24px]">
                .
              </span>
            </span>
            <span className="text-green-600  text-[15px]">
              SLA:{" "}
              <span className="text-green-600 font-bold">
                {ticket?.sla || "2h"}
              </span>
              <span className=" ml-4 text-gray-500 font-2xl text-[24px]">
                .
              </span>
            </span>
          </div>
        </div>
      }
    >
      <div className="flex flex-col h-full  max-h-[100vh]">
        {/* Tab Navigation */}
        <div className="flex p-1 bg-gray-100 rounded-2xl  mt-4">
          {["details", "user", "actions"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-xs font-bold capitalize rounded-2xl transition-all ${
                activeTab === tab
                  ? "bg-white text-gray-900 "
                  : "text-gray-900 hover:text-purple-600"
              }`}
            >
              {tab === "user"
                ? "User Context"
                : tab === "actions"
                ? "Quick Actions"
                : tab}
            </button>
          ))}
        </div>

        {/* Dynamic Tab Content */}
        <div className="flex-1 overflow-y-auto px-1  py-2">
          {renderTabContent()}
        </div>

        {/* Footer: Chat/Reply Area (Visible in Details Tab) */}
        {activeTab === "details" && (
          <div className="p-1 mt-2 bg-gray-50/30">
            <div className="flex mt-2  gap-5 items-center mb-2">
              <span className="text-xs font-bold text-gray-700">
                Reply to Ticket
              </span>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-purple-600"
                  checked={isInternal}
                  onChange={(e) => setIsInternal(e.target.checked)}
                />
                <span className="text-[12px] text-gray-800 font-sm">
                  Internal note (not visible to user)
                </span>
              </label>
            </div>
            <textarea
              className="w-full p-4 text-sm bg-gray-100 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-purple-100 resize-none min-h-[100px]"
              placeholder="Type your reply to the user..."
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
            <div className="flex gap-2 mt-4">
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-purple-600 text-white rounded-xl text-sm font-bold shadow-md shadow-purple-100">
                <Send size={16} /> Send Reply
              </button>
              <button className="flex items-center justify-center gap-2 px-6 py-2.5 border border-gray-200 bg-white text-gray-700 rounded-xl text-sm font-bold">
                <Paperclip size={16} /> Attach File
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

// --- SUB-COMPONENTS ---

function TicketMainDetails({ ticket }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
            Assign To Admin
          </label>
          <select className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none">
            <option>Unassigned</option>
            <option>John Admin - Operations</option>
            <option>Sarah Finance - Admin</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
            Update Status
          </label>
          <select className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none">
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
            <option>Closed</option>
          </select>
        </div>
      </div>
      <div className="pl-8 pt-4 pb-2 pr-2 border-1 border-gray-200 rounded-2xl bg-gray-50 ">
        <div className="p-4 bg-purple-500 rounded-2xl text-white">
          <p className="text-sm font-sm mb-1">
            My order ORD-001 has not been delivered yet. It has been 5 days.
          </p>
          <div className="flex justify-between items-center mt-3 text-[10px] opacity-80 ">
            <span>{ticket?.userName || "John Doe"}</span>
            <span>2024-12-22 09:00 AM</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShopperInformation({ ticket }) {
  return (
    <div className="space-y-6">
      <div className="p-5 border border-gray-200 rounded-xl bg-white ">
        <h3 className="text-xs font-bold text-gray-900 mb-4 flex items-center gap-2">
          Shopper Information
        </h3>
        <div className="grid grid-cols-2 gap-y-4 text-sm">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase">
              Email
            </p>
            <p className="font-medium text-gray-700">john@example.com</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase">
              Total Orders
            </p>
            <p className="font-medium text-gray-700">12</p>
          </div>
          <div className="col-span-2">
            <p className="text-[10px] font-bold text-gray-400 uppercase">
              Payment Method
            </p>
            <p className="font-medium text-gray-700">Card ending in 1234</p>
          </div>
        </div>
      </div>

      <div className="p-5 border border-gray-200 rounded-xl bg-white ">
        <h3 className="text-xs font-bold text-gray-900 mb-4 flex items-center gap-2">
          Recent Orders
        </h3>
        <div className="space-y-3">
          {[
            {
              id: "ORD-001",
              item: "Samsung Galaxy S23",
              price: "₦250,000",
              status: "Delivered",
            },
            {
              id: "ORD-002",
              item: "Nike Air Max",
              price: "₦45,000",
              status: "In Transit",
            },
          ].map((order) => (
            <div
              key={order.id}
              className="flex justify-between items-center pb-3 border-b border-gray-50 last:border-0 last:pb-0"
            >
              <div>
                <p className="text-[10px] font-bold text-gray-900">
                  {order.id}
                </p>
                <p className="text-xs text-gray-400">{order.item}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-gray-900">{order.price}</p>
                <span
                  className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function QuickResolutionActions() {
  const actions = [
    { label: "Update Order Status", icon: <CheckCircle size={16} /> },
    { label: "Reassign Courier", icon: <RefreshCcw size={16} /> },
    { label: "View Audit Log", icon: <FileText size={16} /> },
  ];

  return (
    <div className="space-y-4">
      <div className="p-5 mt-2 border border-gray-200 rounded-xl bg-white ">
        <h3 className="text-xs font-bold text-gray-900 mb-1">
          Quick Resolution Actions
        </h3>
        <p className="text-[11px] text-gray-400 mb-4 font-medium">
          Take direct actions to resolve this ticket
        </p>
        <div className="space-y-2">
          {actions.map((action, i) => (
            <button
              key={i}
              className="w-full flex items-center gap-3 p-3 border border-gray-100 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 hover:border-purple-200 transition-all text-left"
            >
              <span className="text-gray-400">{action.icon}</span>
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

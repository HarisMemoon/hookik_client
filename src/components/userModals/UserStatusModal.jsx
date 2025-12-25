"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Dropdown from "@/components/ui/DropDown"; // Using your elegant dropdown

export default function UserStatusModal({
  open,
  onClose,
  user,
  mode = "suspend",
  userType = "buyers", // "buyers" | "creators" | "brands" | "storefronts"
  onConfirm,
}) {
  const [reason, setReason] = useState("");
  const [duration, setDuration] = useState("7 days");

  const isSuspend = mode === "suspend";

  // Only show duration for Brands and Creators during suspension
  const showDuration =
    isSuspend && (userType === "creators" || userType === "brands");

  const handleConfirm = () => {
    onConfirm?.({
      userId: user?.id,
      reason,
      duration: showDuration ? duration : null,
      action: mode,
    });
    setReason(""); // Reset on close
    onClose();
  };

  const durationOptions = [
    { label: "24 Hours", value: "24 hours" },
    { label: "7 Days", value: "7 days" },
    { label: "30 Days", value: "30 days" },
    { label: "Indefinite", value: "indefinite" },
  ];

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        isSuspend
          ? `Suspend ${userType.slice(0, -1)}`
          : `Activate ${userType.slice(0, -1)}`
      }
      subtitle={
        isSuspend
          ? `Are you sure you want to suspend this ${userType.slice(
              0,
              -1
            )}? All active campaigns and listings will be paused.`
          : `This will restore full access for the ${userType.slice(0, -1)}.`
      }
      size="sm"
      footer={
        <div className="flex justify-end gap-3 w-full">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            className={`px-5 py-2 text-sm font-medium text-white rounded-xl transition shadow-sm ${
              isSuspend
                ? "bg-red-600 hover:bg-red-700 shadow-red-100"
                : "bg-green-600 hover:bg-green-700 shadow-green-100"
            }`}
          >
            {isSuspend ? "Confirm Suspension" : "Activate User"}
          </button>
        </div>
      }
    >
      <div className="space-y-5">
        {/* User Info Card */}
        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
          <p className="text-[12px]  text-gray-500  mb-1 tracking-wider">
            Target Account
          </p>
          <p className="text-sm font-bold text-gray-900">
            {user?.name || `${user?.first_name} ${user?.last_name}`}
          </p>
        </div>

        {/* Reason Field */}
        <div>
          <label className="block text-[13px] font-bold text-gray-500  mb-2 tracking-wider">
            Reason for {isSuspend ? "Suspension" : "Activation"}
          </label>
          <textarea
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={`Enter the reason for ${
              isSuspend ? "suspending" : "activating"
            } this account...`}
            className="w-full px-4 py-3 text-md border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-100 focus:border-purple-400 outline-none transition-all resize-none bg-white text-gray-900 placeholder:text-gray-400"
          />
        </div>

        {/* Conditional Duration Field */}
        {showDuration && (
          <div>
            <label className="block text-[13px] font-bold text-gray-500  mb-2 tracking-wider">
              Suspension Duration
            </label>
            <Dropdown
              options={durationOptions}
              value={duration}
              onChange={setDuration}
            />
          </div>
        )}

        {/* Warning Note for Suspension */}
        {isSuspend && (
          <div className="p-3 bg-red-50 rounded-xl border border-red-100">
            <p className="text-[11px] text-red-700 leading-relaxed font-medium">
              <span className="font-bold">Warning:</span> This will pause all
              active campaigns and hide all products from the marketplace
              immediately.
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
}

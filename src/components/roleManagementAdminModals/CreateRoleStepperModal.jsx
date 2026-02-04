"use client";

import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import Dropdown from "@/components/ui/DropDown";
import { Check } from "lucide-react";

export default function CreateRoleStepperModal({ open, onClose, onComplete }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "User Management",
    permissions: [],
    duration: "Permanent",
  });

  // Permission Options from your screenshots
  const permissionOptions = {
    "User Management": ["Manage Buyers", "Manage Creators", "Manage Brands"],
    "Finance Management": [
      "Approve Payouts",
      "View Transactions",
      "Disapprove Payouts",
    ],
    "Risk Management": [
      "Review Fraudulent Activities",
      "Suspend Users",
      "Compliance Check",
    ],
    "Post Management": [
      "Approve/Reject Post",
      "Modify Post Budgets",
      "Review Post",
    ],
    "Super Admin": ["Full System Access", "Manage Admin Roles", "System Logs"],
  };

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);

  const togglePermission = (perm) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(perm)
        ? prev.permissions.filter((p) => p !== perm)
        : [...prev.permissions, perm],
    }));
  };

  // --- STEP CONTENT RENDERING ---
  const renderStepContent = () => {
    if (step === 1) {
      return (
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[12px] font-bold text-gray-800 ">
                First Name
              </label>
              <input
                className="w-full p-2.5 border border-gray-200 rounded-xl outline-none text-sm text-black"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
            </div>
            <div className="space-y-1">
              <label className="text-[12px] font-bold text-gray-800 ">
                Last Name
              </label>
              <input
                className="w-full p-2.5 border border-gray-200 rounded-xl outline-none text-sm text-black"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[12px] font-bold text-gray-800 ">
              Email
            </label>
            <input
              className="w-full p-2.5 border border-gray-200 rounded-xl outline-none text-sm text-black"
              placeholder="Enter user email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="space-y-1">
            <label className="text-[12px] font-bold text-gray-800 ">Role</label>
            <Dropdown
              options={Object.keys(permissionOptions).map((k) => ({
                label: k,
                value: k,
              }))}
              value={formData.role}
              onChange={(v) => {
                // Reset permissions when role changes
                setFormData({ ...formData, role: v, permissions: [] });
              }}
            />
          </div>
        </div>
      );
    }

    if (step === 2) {
      return (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2">
            {formData.role}
          </h3>
          <div className="space-y-3">
            {permissionOptions[formData.role]?.map((perm) => (
              <div
                key={perm}
                onClick={() => togglePermission(perm)}
                className="flex items-center justify-between p-3 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-medium text-gray-700">
                  {perm}
                </span>
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                    formData.permissions.includes(perm)
                      ? "bg-purple-600 border-purple-600"
                      : "border-gray-300"
                  }`}
                >
                  {formData.permissions.includes(perm) && (
                    <Check size={12} className="text-white" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (step === 3) {
      return (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2">
            Set Duration
          </h3>
          <div className="space-y-2">
            {["Permanent", "7 Days", "30 Days", "Custom"].map((d) => (
              <label
                key={d}
                className="flex items-center gap-3 p-3 border border-gray-50 rounded-xl cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="radio"
                  name="duration"
                  className="accent-purple-600 w-4 h-4"
                  checked={formData.duration === d}
                  onChange={() => setFormData({ ...formData, duration: d })}
                />
                <span className="text-sm font-medium text-gray-800">{d}</span>
              </label>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        setStep(1); // Reset step on close
        onClose();
      }}
      title={step === 1 ? "Create Admin User" : "Set Permissions"}
      subtitle={
        step === 1
          ? "Define a new admin role with specific permissions"
          : `Configure access for ${formData.firstName}`
      }
      size="sm"
      footer={
        <div className="flex gap-3 w-full">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100 transition"
            >
              Back
            </button>
          )}
          <button
            onClick={step === 3 ? () => onComplete(formData) : handleNext}
            className="flex-[2] bg-purple-600 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-purple-700 transition shadow-md shadow-purple-100"
          >
            {step === 3 ? "Add Role" : "Continue"}
          </button>
        </div>
      }
    >
      <div className="min-h-[320px]">{renderStepContent()}</div>
    </Modal>
  );
}

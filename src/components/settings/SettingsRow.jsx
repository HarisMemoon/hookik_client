// src/components/settings/SettingsRow.js
"use client";

import React from "react";
import Dropdown from "@/components/ui/DropDown";

export default function SettingsRow({
  label,
  subtext,
  type = "toggle", // "toggle" | "dropdown"
  value,
  onChange,
  options = [],
}) {
  return (
    <div className="flex items-center justify-between py-5 border-b border-gray-50 last:border-0 group">
      {/* Left side: Label and Subtext */}
      <div className="max-w-[70%]">
        <h4 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
          {label}
        </h4>
        <p className="text-xs text-gray-500 leading-relaxed">{subtext}</p>
      </div>

      {/* Right side: Input Control */}
      <div className="flex-shrink-0 ml-4">
        {type === "toggle" ? (
          <button
            onClick={() => onChange(!value)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-100 ${
              value ? "bg-purple-600" : "bg-gray-200"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                value ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        ) : (
          <div className="w-48">
            <Dropdown options={options} value={value} onChange={onChange} />
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { X } from "lucide-react";

export default function TableFilterDropdown({
  options = [],
  selected = [],
  onToggle,
  onClose,
}) {
  return (
    <div className="absolute right-0 z-30 mt-2 w-50 rounded-xl border bg-white shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <span className="text-sm font-semibold text-gray-900">
          Filter Options
        </span>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-700 transition"
        >
          <X size={16} />
        </button>
      </div>

      {/* Filter List */}
      <div className="p-3 max-h-64 overflow-y-auto">
        {options.length === 0 ? (
          <p className="text-sm text-gray-500 px-2 py-3">
            No filters available
          </p>
        ) : (
          options.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 transition"
            >
              <input
                type="checkbox"
                checked={selected.includes(option.value)}
                onChange={() => onToggle(option.value)}
                className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm text-gray-800">{option.label}</span>
            </label>
          ))
        )}
      </div>
    </div>
  );
}

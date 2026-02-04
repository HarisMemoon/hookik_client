"use client";

import Modal from "@/components/ui/Modal";
import Dropdown from "@/components/ui/DropDown";

export default function GenericFilterModal({
  open,
  onClose,
  filters,
  setFilters,
  onApply,
  fields = [],
  title = "Filter",
}) {
  const updateFilter = (key, value) => {
    // If field is disabled, don't allow updates
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    const cleared = {};
    fields.forEach((field) => {
      // Don't clear fields that are disabled/locked
      if (field.disabled) {
        if (field.type === "range") {
          cleared[field.minKey] = filters[field.minKey];
          cleared[field.maxKey] = filters[field.maxKey];
        } else {
          cleared[field.key] = filters[field.key];
        }
      } else {
        if (field.type === "range") {
          cleared[field.minKey] = "";
          cleared[field.maxKey] = "";
        } else {
          cleared[field.key] = "";
        }
      }
    });
    setFilters(cleared);
  };

  return (
    <Modal
      open={open}
      title={title}
      subtitle="Narrow down your results with specific criteria"
      onClose={onClose}
      size="md"
      footer={
        <div className="flex justify-between items-center w-full">
          <button
            onClick={resetFilters}
            className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-black transition"
          >
            Reset All
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onApply();
              }}
              className="px-6 py-2 text-sm font-medium bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition shadow-md shadow-purple-200"
            >
              Apply Filters
            </button>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {fields.map((field, index) => (
          // Use a combination of label and index to ensure unique keys
          <div key={`${field.label}-${index}`}>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              {field.label}
            </label>

            {field.type === "dropdown" && (
              <div
                className={
                  field.disabled ? "pointer-events-none opacity-60" : ""
                }
              >
                <Dropdown
                  options={field.options}
                  value={filters[field.key] || ""}
                  onChange={(val) => updateFilter(field.key, val)}
                  label={`Select ${field.label}`}
                />
              </div>
            )}

            {field.type === "range" && (
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Min"
                  // FIX 1: Ensure value is never undefined
                  value={filters[field.minKey] || ""}
                  onChange={(e) => updateFilter(field.minKey, e.target.value)}
                  // FIX 2: Explicitly cast to boolean
                  disabled={Boolean(field.disabled)}
                  className={`w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm transition-all outline-none 
                    ${
                      field.disabled
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-100"
                        : "bg-white text-gray-900 focus:ring-2 focus:ring-purple-100 focus:border-purple-400"
                    }`}
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters[field.maxKey] || ""}
                  onChange={(e) => updateFilter(field.maxKey, e.target.value)}
                  disabled={Boolean(field.disabled)}
                  className={`w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm transition-all outline-none 
                    ${
                      field.disabled
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-100"
                        : "bg-white text-gray-900 focus:ring-2 focus:ring-purple-100 focus:border-purple-400"
                    }`}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </Modal>
  );
}

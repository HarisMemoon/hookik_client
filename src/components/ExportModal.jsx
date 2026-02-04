// src/components/ExportModal.jsx
"use client";

import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal.jsx";
import { Download } from "lucide-react";
import Dropdown from "./ui/DropDown.jsx";

export default function ExportModal({
  open,
  onClose,
  onExport,
  title = "Export Data",
  config = {},
}) {
  const [exportFormat, setExportFormat] = useState("csv");
  const [checkboxes, setCheckboxes] = useState({});
  const [selectValues, setSelectValues] = useState({});

  // ✅ Sync state whenever the config changes
  useEffect(() => {
    if (config.checkboxes) {
      setCheckboxes(config.checkboxes);
    } else {
      setCheckboxes({}); // ✅ Explicitly set to empty if no checkboxes
    }

    if (config.selectDefaults) {
      setSelectValues(config.selectDefaults);
    }
  }, [config]);

  const handleCheckboxToggle = (key) => {
    setCheckboxes((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleExport = () => {
    console.log("=== EXPORT MODAL DEBUG ===");
    console.log("Checkboxes:", checkboxes);
    console.log("Select Values:", selectValues);

    onExport({
      format: exportFormat,
      selections: selectValues,
      fields: checkboxes, // This will be empty {} for dropdown-only configs
    });
    onClose();
  };

  // ✅ Check if we have any checkboxes
  const hasCheckboxes = Object.keys(checkboxes).length > 0;

  return (
    <Modal
      open={open}
      title={title}
      subtitle="Customize your export parameters"
      onClose={onClose}
      size="md"
      footer={
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium border border-gray-200 rounded-xl hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-6 py-2 text-sm bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition shadow-md shadow-purple-200"
          >
            <Download size={16} />
            Export
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* 1. Format Selection */}
        <div>
          <label className="mb-2 block text-md font-semibold text-gray-900 tracking-wider text-[11px]">
            Export Format
          </label>
          <Dropdown
            options={[
              { label: "CSV", value: "csv" },
              { label: "Excel", value: "xlsx" },
              { label: "PDF", value: "pdf" },
            ]}
            value={exportFormat}
            onChange={setExportFormat}
          />
        </div>

        {/* 2. Dynamic Dropdowns - Show BEFORE checkboxes */}
        {config.selects?.map((select) => (
          <div key={select.key}>
            <label className="mb-2 block text-sm font-semibold text-gray-900 uppercase tracking-wider text-[11px]">
              {select.label}
            </label>
            <Dropdown
              options={select.options}
              value={selectValues[select.key] || ""}
              onChange={(val) => {
                console.log(`Dropdown ${select.key} changed to:`, val);
                setSelectValues((p) => ({ ...p, [select.key]: val }));
              }}
            />
          </div>
        ))}

        {/* 3. Dynamic Checkboxes - Only show if they exist */}
        {hasCheckboxes && (
          <div>
            <label className="block text-sm font-semibold text-gray-900 uppercase tracking-wider text-[11px] mb-4">
              Select Fields to Include
            </label>
            <div className="grid grid-cols-2 gap-y-3 gap-x-4">
              {Object.entries(checkboxes).map(([key, value]) => (
                <label
                  key={key}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => handleCheckboxToggle(key)}
                    className="w-4 h-4 accent-purple-600 cursor-pointer rounded border-gray-300 focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-black transition-colors">
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())
                      .trim()}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

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
  config = {}, // Expects { checkboxes: {}, selects: [], selectDefaults: {} }
}) {
  const [exportFormat, setExportFormat] = useState("csv");
  const [checkboxes, setCheckboxes] = useState({});
  const [selectValues, setSelectValues] = useState({});

  // 🔹 CRITICAL: Sync state whenever the config changes (e.g., switching tabs)
  useEffect(() => {
    if (config.checkboxes) setCheckboxes(config.checkboxes);
    if (config.selectDefaults) setSelectValues(config.selectDefaults);
  }, [config]);

  const handleCheckboxToggle = (key) => {
    setCheckboxes((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleExport = () => {
    onExport({
      format: exportFormat,
      selections: selectValues,
      fields: checkboxes,
    });
    onClose();
  };

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
        {/* 1. Format Selection (Generic for all) */}
        <div>
          <label className="mb-2 block text-md font-semibold text-gray-900  tracking-wider text-[11px]">
            Export Format
          </label>
          <Dropdown
            options={[
              { label: "CSV ", value: "csv" },
              { label: "Excel ", value: "xlsx" },
              { label: "PDF ", value: "pdf" },
            ]}
            value={exportFormat}
            onChange={setExportFormat}
          />
        </div>

        {/* 3. Dynamic Checkboxes (Varies by Creator/Brand/Buyer) */}
        {Object.keys(checkboxes).length > 0 && (
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
        {/* 2. Dynamic Dropdowns (Varies by Creator/Brand/Buyer) */}
        {config.selects?.map((select) => (
          <div key={select.key}>
            <label className="mb-2 block text-sm font-semibold text-gray-900 uppercase tracking-wider text-[11px]">
              {select.label}
            </label>
            <Dropdown
              options={select.options}
              value={selectValues[select.key] || ""}
              onChange={(val) =>
                setSelectValues((p) => ({ ...p, [select.key]: val }))
              }
            />
          </div>
        ))}
      </div>
    </Modal>
  );
}

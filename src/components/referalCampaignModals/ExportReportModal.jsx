import Modal from "@/components/ui/Modal";
import Dropdown from "@/components/ui/DropDown";
import { useState } from "react";
import { Upload } from "lucide-react";

export default function ExportReportModal({ open, onClose }) {
  const [exportData, setExportData] = useState({
    status: "all",
    range: "7days",
    format: "csv",
  });

  return (
    <Modal
      open={open}
      size="sm"
      onClose={onClose}
      title="Export Report"
      subtitle="Generate and export referral report"
      footer={
        <div className="flex justify-end gap-3 w-full">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-200 rounded-xl text-sm font-medium"
          >
            Cancel
          </button>
          <button className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-xl text-sm font-medium">
            <Upload size={16} /> Export Report
          </button>
        </div>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase">
            Order Status
          </label>
          <Dropdown
            options={[{ label: "All participants", value: "all" }]}
            value={exportData.status}
            onChange={(v) => setExportData({ ...exportData, status: v })}
          />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase">
            Date Range
          </label>
          <Dropdown
            options={[{ label: "Last 7 days", value: "7days" }]}
            value={exportData.range}
            onChange={(v) => setExportData({ ...exportData, range: v })}
          />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase">
            Export Format
          </label>
          <Dropdown
            options={[{ label: "CSV", value: "csv" }]}
            value={exportData.format}
            onChange={(v) => setExportData({ ...exportData, format: v })}
          />
        </div>
      </div>
    </Modal>
  );
}

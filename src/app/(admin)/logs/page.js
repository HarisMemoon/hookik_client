"use client";

import useSystemLogs from "@/hooks/useSystemLogs";
import GenericTable from "@/components/GenericTable";
import { Download } from "lucide-react";
import ExportModal from "@/components/ExportModal";
import { useState } from "react";
import { handleExport } from "@/lib/services/exportService";

const logColumns = [
  {
    header: "Admin",
    key: "admin",
    render: (_, row) =>
      `${row.admin?.first_name || "System"} ${row.admin?.last_name || ""}`,
  },
  { header: "Action", key: "action" },
  { header: "Target", key: "target_type" },
  { header: "Target ID", key: "target_id" },
  {
    header: "Time Stamp",
    key: "timestamp",
    render: (val, row) => new Date(row.createdAt).toLocaleString(),
  },
];

export default function SystemLogsPage() {
  const { logs, loading } = useSystemLogs();
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // ✅ 1. Define Export Configuration for Logs
  const exportConfig = {
    selects: [
      {
        label: "Time Range",
        key: "range",
        options: [
          { label: "All Time", value: "all" },
          { label: "Last 7 Days", value: "7d" },
          { label: "Last 30 Days", value: "30d" },
        ],
      },
    ],
    selectDefaults: { range: "all" },
    checkboxes: {
      adminName: true,
      action: true,
      targetType: true,
      timestamp: true,
      details: false, // Optional JSON data
    },
  };

  const onExportData = async (exportOptions) => {
    // 1. Define the config that matches your FIELD_MAPPINGS
    const entityType = "systemLogs";

    // 2. Call the utility
    await handleExport({
      entityType: entityType,
      data: logs, // Pass the raw array from useSystemLogs
      format: exportOptions.format,
      fields: exportOptions.fields,
      selections: exportOptions.selections,
      filename: `system_logs_${new Date().toISOString().split("T")[0]}`,
    });
  };
  return (
    <main className="p-6 bg-white min-h-screen">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">System Logs</h1>
          <p className="text-gray-600 text-sm">
            Track administrative activities
          </p>
        </div>
        <button
          className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-purple-700 transition"
          onClick={() => setIsExportModalOpen(true)}
        >
          <Download size={18} /> Export Logs
        </button>
      </div>

      {/* Scrollable Container */}
      <div className="w-full overflow-hidden border border-gray-100 rounded-2xl shadow-sm">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-10 text-center">Loading logs...</div>
          ) : (
            <GenericTable
              title="Activity Logs"
              columns={logColumns}
              data={logs}
              searchPlaceholder="Search logs..."
              className="min-w-[800px]" // Force a minimum width to trigger scroll on small screens
              showActions={false}
            />
          )}
        </div>
      </div>
      <ExportModal
        open={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={onExportData}
        title="Export System Logs"
        config={exportConfig}
      />
    </main>
  );
}

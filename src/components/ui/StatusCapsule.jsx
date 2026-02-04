"use client";

import clsx from "clsx";

/**
 * StatusCapsule
 *
 * @param {string} value - text inside capsule (e.g. "waiting", "urgent", "Normal")
 * @param {string} variant - semantic type (status, priority, role, etc.)
 */
export default function StatusCapsule({ value, variant = "status" }) {
  // 1. Enhanced Normalization
  // Converts "waiting" to "Waiting On User" (via mapping) or "urgent" to "Urgent"
  const normalize = (val) => {
    if (!val) return "";

    // Handle specific mapping for "waiting" -> "Waiting On User"
    if (val.toLowerCase() === "waiting") return "Waiting On User";
    if (val.toLowerCase() === "in_progress") return "In Progress";

    return val
      .split(/[\s_]+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const normalizedValue = normalize(value);

  const styles = {
    status: {
      Active: "bg-green-100 text-green-700",
      Verified: "bg-blue-100 text-blue-700",
      Pending: "bg-yellow-100 text-yellow-700",
      Open: "bg-blue-50 text-blue-600",
      "In Progress": "bg-purple-100 text-purple-700",
      "Waiting On User": "bg-orange-100 text-orange-700", // New style
      Resolved: "bg-green-100 text-green-700",
      Inactive: "bg-orange-100 text-orange-700",
      Disabled: "bg-red-100 text-red-700",
    },
    priority: {
      Urgent: "bg-red-100 text-red-700", // New: High urgency
      High: "bg-orange-100 text-orange-700",
      Normal: "bg-purple-100 text-gray-700", // New: Default priority
      Medium: "bg-yellow-100 text-yellow-700",
      Low: "bg-green-100 text-green-700",
    },
    role: {
      Admin: "bg-purple-100 text-purple-700",
      Finance: "bg-blue-100 text-blue-700",
      User: "bg-gray-100 text-gray-700",
    },
  };

  const className =
    styles[variant]?.[normalizedValue] ?? "bg-gray-100 text-gray-600";

  return (
    <span
      className={clsx(
        "inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap uppercase tracking-tight",
        className
      )}
    >
      {normalizedValue}
    </span>
  );
}

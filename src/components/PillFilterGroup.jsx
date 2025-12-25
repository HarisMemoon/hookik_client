"use client";

import Link from "next/link";

/**
 * Generic pill-based filter/navigation component
 *
 * Supports two modes:
 * 1. Link-based (Next.js routing) - Pass href in items
 * 2. Callback-based (state management) - Pass onChange prop
 *
 * @param {Array<{
 *   value: string,
 *   label: string,
 *   href?: string
 * }>} items - Filter items to display
 * @param {string} active - Currently active filter value
 * @param {function} [onChange] - Optional callback when filter changes (for non-link mode)
 */
export default function PillFilterGroup({ items, active, onChange }) {
  const handleClick = (e, item) => {
    // If onChange is provided and no href, use callback mode
    if (onChange && !item.href) {
      e.preventDefault();
      onChange(item.value);
    }
  };

  return (
    <div className="inline-flex items-center gap-1 bg-gray-100 p-1.5 rounded-full mb-5">
      {items.map((item) => {
        const isActive = active === item.value;

        // Use Link component if href is provided, otherwise use button
        if (item.href) {
          return (
            <Link
              key={item.value}
              href={item.href}
              className={`
                px-4 py-1.5 text-sm font-medium rounded-full
                transition-all duration-200 ease-in-out
                ${
                  isActive
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:bg-gray-200/50 hover:text-gray-900"
                }
              `}
            >
              {item.label}
            </Link>
          );
        }

        return (
          <button
            key={item.value}
            onClick={(e) => handleClick(e, item)}
            className={`
              px-4 py-1.5 text-sm font-medium rounded-full
              transition-all duration-200 ease-in-out
              ${
                isActive
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:bg-gray-200/50 hover:text-gray-900"
              }
            `}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { MoreVertical, Search, Filter } from "lucide-react";

export default function GenericTable({
  title,
  columns,
  data,
  onActionClick,
  showSearch = false,
  showFilter = false,
  searchPlaceholder = "Search...",
  rowActions,
  onFilterClick,
  searchableKeys,
  customRenderers = {},
  className = "",
  pagination,
  onPageChange,
  showActions = true,
  actionsVariant = "dropdown",
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [menu, setMenu] = useState(null);
  const menuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const defaultRenderers = {
    status: (value) => {
      const statusColors = {
        Active: "bg-green-50 text-green-700 border-green-100",
        Suspended: "bg-red-50 text-red-700 border-red-100",
        Pending: "bg-gray-50 text-gray-600 border-gray-100",
      };
      return (
        <span
          className={`px-2.5 py-1 text-xs font-semibold rounded-lg border ${
            statusColors[value] || "bg-gray-50 text-gray-600 border-gray-100"
          }`}
        >
          {value}
        </span>
      );
    },
  };

  const renderers = { ...defaultRenderers, ...customRenderers };

  // const filteredData = useMemo(() => {
  //   if (!searchTerm.trim()) return data;
  //   const keys = searchableKeys || columns.map((c) => c.key);
  //   return data.filter((row) =>
  //     keys.some((k) =>
  //       String(row[k] ?? "")
  //         .toLowerCase()
  //         .includes(searchTerm.toLowerCase())
  //     )
  //   );
  // }, [data, searchTerm, searchableKeys, columns]);
  const filteredData = data;

  return (
    <div
      className={`bg-white rounded-2xl border border-gray-200  overflow-hidden ${className}`}
    >
      {/* Header with Search & Filter */}
      {(title || showSearch || showFilter) && (
        <div className="px-6 py-5 ">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {title && (
              <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            )}

            <div className="flex items-center gap-3">
              {showSearch && (
                <div className="relative group">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors"
                    size={18}
                  />
                  <input
                    className="pl-10 pr-4 py-2.5 w-64 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all placeholder:text-gray-500"
                    placeholder={searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                    }}
                  />
                </div>
              )}
              {showFilter && (
                <button
                  onClick={onFilterClick}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
                >
                  <Filter size={16} className="text-gray-500" />
                  Filter
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto relative">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50/50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-4 text-left text-[11px]  text-gray-700  tracking-wider"
                >
                  {col.header}
                </th>
              ))}
              {showActions && (
                <th className="px-6 py-4 text-center text-[11px]  text-gray-700  tracking-wider">
                  Action
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {filteredData.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50/50 transition-colors group"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-6 py-4 text-sm font-medium text-gray-700"
                  >
                    {col.render
                      ? col.render(item[col.key], item, renderers)
                      : item[col.key] ?? (
                          <span className="italic text-gray-300">
                            Not provided
                          </span>
                        )}
                  </td>
                ))}

                {showActions && (
                  <td className="px-6 py-4 text-center">
                    {/* DROPDOWN VARIANT */}
                    {actionsVariant === "dropdown" && (
                      <div className="flex justify-center">
                        <button
                          onClick={(e) => {
                            const rect =
                              e.currentTarget.getBoundingClientRect();
                            setMenu({
                              item,
                              x: rect.right - 180,
                              y: rect.bottom + 8,
                            });
                          }}
                          className="p-2 rounded-xl text-gray-800 hover:text-purple-600 hover:bg-purple-50 transition-all"
                        >
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    )}

                    {/* BUTTONS VARIANT */}
                    {actionsVariant === "buttons" && (
                      <div className="flex justify-center gap-2">
                        {(typeof rowActions === "function"
                          ? rowActions(item)
                          : rowActions
                        ).map((action) => (
                          <button
                            key={action.key}
                            onClick={() => onActionClick(action.key, item)}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                              action.variant === "success"
                                ? "bg-purple-500 text-white hover:bg-purple-600"
                                : action.variant === "edit"
                                ? "bg-gray-50 text-black hover:text-white hover:bg-purple-600 text-lg w-20"
                                : action.variant === "primary"
                                ? "bg-purple-600 text-white hover:bg-purple-700"
                                : action.danger
                                ? "bg-red-50 text-red-600 hover:bg-red-100"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                            }`}
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Action Dropdown Menu */}
        {menu && actionsVariant === "dropdown" && (
          <div
            ref={menuRef}
            className="fixed z-[100] bg-white border border-gray-100 rounded-2xl shadow-2xl w-48 p-1.5 animate-in fade-in zoom-in-95 duration-100"
            style={{ top: menu.y, left: menu.x }}
          >
            {(typeof rowActions === "function"
              ? rowActions(menu.item)
              : rowActions
            ).map((action) => (
              <button
                key={action.key}
                onClick={() => {
                  setMenu(null);
                  onActionClick(action.key, menu.item);
                }}
                className={`flex w-full px-3 py-2.5 text-left text-sm font-medium rounded-xl transition-colors ${
                  action.danger
                    ? "text-red-600 hover:bg-red-50"
                    : "text-gray-700 hover:bg-gray-50 hover:text-black"
                }`}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
            <p className="text-sm text-gray-800">
              Page {pagination.currentPage} of {pagination.totalPages}
            </p>

            <div className="flex gap-2">
              <button
                disabled={pagination.currentPage === 1}
                onClick={() => onPageChange(pagination.currentPage - 1)}
                className="px-3 py-1.5 text-sm border text-gray-800 disabled:border-gray-400 rounded-lg disabled:opacity-50"
              >
                Previous
              </button>

              <button
                disabled={pagination.currentPage === pagination.totalPages}
                onClick={() => onPageChange(pagination.currentPage + 1)}
                className="px-3 py-1.5 text-sm border text-gray-800 rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

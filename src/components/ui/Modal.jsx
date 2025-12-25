"use client";

import { X } from "lucide-react";

export default function Modal({
  open,
  title,
  subtitle,
  children,
  onClose,
  footer,
  size = "md",
}) {
  if (!open) return null;

  const sizeMap = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative w-full ${sizeMap[size]} mx-4 bg-white rounded-xl shadow-2xl`}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-black">{title}</h3>
              {subtitle && (
                <p className="mt-0.5 text-sm text-gray-500">{subtitle}</p>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-md hover:bg-gray-100 transition"
              aria-label="Close modal"
            >
              <X size={18} className="text-black" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 text-sm text-gray-700">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl text-black">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

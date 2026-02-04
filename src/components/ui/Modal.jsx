"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

export default function Modal({
  open,
  title,
  subtitle,
  children,
  onClose,
  footer,
  size = "md",
  customHeader,
}) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
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
        {/* Header Logic */}
        {customHeader ? (
          <div className="relative">
            {/* 🔹 Render the complex header passed from the page */}
            {customHeader}

            {/* Absolute positioned close button for custom headers */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-100 transition z-10"
              aria-label="Close modal"
            >
              <X size={18} className="text-gray-400" />
            </button>
          </div>
        ) : (
          /* 🔹 Default Standard Header */
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                {subtitle && (
                  <p className="mt-0.5 text-sm text-gray-500">{subtitle}</p>
                )}
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-md hover:bg-gray-100 transition"
                aria-label="Close modal"
              >
                <X size={18} className="text-gray-400" />
              </button>
            </div>
          </div>
        )}

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

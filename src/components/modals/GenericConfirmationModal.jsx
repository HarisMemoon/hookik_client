import React from "react";

const GenericConfirmationModal = ({
  isOpen,
  onClose,
  title,
  children,
  confirmText,
  onConfirm,
  confirmButtonClass = "bg-purple-600 hover:bg-purple-700",
  cancelText = "Cancel",
  confirmButtonStyle,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg mx-4 p-6 bg-white rounded-xl shadow-xl animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="text-gray-700 text-sm">{children}</div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 transition"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-sm font-medium rounded-md text-white ${confirmButtonClass} transition`}
            style={confirmButtonStyle}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenericConfirmationModal;

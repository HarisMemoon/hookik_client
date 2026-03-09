"use client";
import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

/**
 * Reusable Phone Input with Country Search
 * Optimized for the Hookik Admin theme
 */
export default function CustomPhoneInput({
  value,
  onChange,
  label,
  className = "",
}) {
  const labelStyles =
    "block text-xs font-bold text-gray-500 mb-1 uppercase tracking-tight";

  return (
    <div className={`w-full ${className}`}>
      {label && <label className={labelStyles}>{label}</label>}
      <PhoneInput
        country={"ng"} // Default to Nigeria
        enableSearch={true}
        value={value}
        onChange={onChange}
        placeholder="+234 000 000 0000"
        // Container styling
        containerClass="!w-full"
        // Input field styling (Matching your inputStyles)
        inputClass="!w-full !h-[40px] !rounded-lg !border-gray-300 !text-black !text-sm !font-medium focus:!border-purple-500 focus:!ring-1 focus:!ring-purple-500"
        // Flag dropdown styling
        buttonClass="!border-gray-300 !rounded-l-lg !bg-white hover:!bg-gray-50"
        dropdownClass="!rounded-xl !shadow-2xl !border-gray-100 !text-black"
        searchClass="!bg-gray-50 !p-2 !rounded-lg !mx-2 !mt-2 !mb-1 !border-gray-200"
        // This ensures the search bar from your screenshot 220650 works well
        searchPlaceholder="Search country..."
      />
    </div>
  );
}

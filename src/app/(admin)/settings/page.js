"use client";

import { useSearchParams, usePathname } from "next/navigation";
import {
  Download,
  ShieldAlert,
  Key,
  Users,
  Settings as SettingsIcon,
} from "lucide-react";
import { useState } from "react";
import PillFilterGroup from "@/components/PillFilterGroup";
import GenericTable from "@/components/GenericTable";
import SettingsRow from "@/components/settings/SettingsRow";
import { PRIMARY } from "@/constants/COLORS";

// ============================================================================
// CONFIG
// ============================================================================

const DEFAULT_FILTER = "platform";

const settingsFilters = [
  { value: "platform", label: "Platform Settings" },
  { value: "payment", label: "Payment Gateway" },
  { value: "notifications", label: "Notifications" },
  { value: "team", label: "Team Management" },
  { value: "commission", label: "Commission" },
];

// ============================================================================
// TABLE DEFINITIONS
// ============================================================================

// -------- Team Management --------
const teamColumns = [
  { header: "Name", key: "name" },
  { header: "Email", key: "email" },
  { header: "Role", key: "role" },
  { header: "Status", key: "status" },
  { header: "Last Active", key: "lastActive" },
];

const teamData = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@hookik.com",
    role: "Super Admin",
    status: "Active",
    lastActive: "2 mins ago",
  },
  {
    id: 2,
    name: "Sarah Support",
    email: "sarah@hookik.com",
    role: "Support Lead",
    status: "Active",
    lastActive: "1 hour ago",
  },
  {
    id: 3,
    name: "Mark Editor",
    email: "mark@hookik.com",
    role: "Content Manager",
    status: "Inactive",
    lastActive: "2 days ago",
  },
];

// -------- API Keys --------
const apiColumns = [
  { header: "Key Name", key: "name" },
  { header: "API Key", key: "apiKey" },
  { header: "Created", key: "created" },
  { header: "Last Used", key: "lastUsed" },
  { header: "Status", key: "status" },
];

const apiData = [
  {
    id: 1,
    name: "Production Web",
    apiKey: "hk_live_982347623hjkshd98",
    created: "2025-10-12",
    lastUsed: "Today",
    status: "Active",
  },
  {
    id: 2,
    name: "Mobile App Testing",
    apiKey: "hk_test_123890askdjh123",
    created: "2025-11-05",
    lastUsed: "Yesterday",
    status: "Active",
  },
];

export default function SettingsPage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get("filter") || DEFAULT_FILTER;

  const pillItems = settingsFilters.map((f) => ({
    ...f,
    href: `${pathname}?filter=${f.value}`,
  }));

  const handleAction = (action, row) => {
    console.log(`${action} triggered for:`, row);
  };

  return (
    <main className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600 text-sm">
            Configure your platform, manage team access, and API credentials
          </p>
        </div>
      </div>

      {/* Pills */}
      <div className="mb-8">
        <PillFilterGroup active={currentFilter} items={pillItems} />
      </div>

      {/* Conditional Content Rendering */}
      <div className="space-y-6">
        {/* Empty States for Platform, Payment, Notifications */}

        {currentFilter === "platform" && (
          <section className="p-8 border border-gray-200 rounded-3xl bg-white">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Platform Settings
              </h2>
            </div>

            <div className="space-y-2">
              <SettingsRow
                label="Maintainance Mode"
                subtext="Enable to put the platform in maintainance mode"
                type="toggle"
                value={false}
                onChange={(val) => console.log("SMS Toggle:", val)}
              />
              <SettingsRow
                label="Auto Approve Payouts"
                subtext="Automatically approve new product listings"
                type="toggle"
                value={true}
                onChange={(val) => console.log("SMS Toggle:", val)}
              />

              <SettingsRow
                label="Platform Currency"
                type="dropdown"
                value="Nigerian Naira (NGN)"
                options={[
                  { label: "Nigerian Naira (NGN)", value: "NGN" },
                  { label: "Daily Summary", value: "Daily" },
                  { label: "Weekly Digest", value: "Weekly" },
                ]}
                onChange={(val) => console.log("Frequency Change:", val)}
              />
            </div>
          </section>
        )}
        {currentFilter === "payment" && (
          <section className="p-8 border border-gray-200 rounded-3xl bg-white">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Payment Gateway Configuration
              </h2>
            </div>

            <div className="space-y-2">
              <SettingsRow
                label="Payment Gateway"
                type="dropdown"
                value="Paystack"
                options={[
                  { label: "Paystack", value: "paystack" },
                  { label: "Daily Summary", value: "Daily" },
                  { label: "Weekly Digest", value: "Weekly" },
                ]}
                onChange={(val) => console.log("Frequency Change:", val)}
              />
              <SettingsRow
                label="Transaction Fees (%)"
                type="dropdown"
                value="2.5"
                options={[
                  { label: "2.5", value: "2.5" },
                  { label: "Daily Summary", value: "Daily" },
                  { label: "Weekly Digest", value: "Weekly" },
                ]}
                onChange={(val) => console.log("Frequency Change:", val)}
              />

              <SettingsRow
                label="Enable wallet payments"
                subtext="Allow Users to pay via their Wallet balance"
                type="toggle"
                value={false}
                onChange={(val) => console.log("SMS Toggle:", val)}
              />
            </div>
          </section>
        )}
        {currentFilter === "notifications" && (
          <section className="p-8 border border-gray-200 rounded-3xl bg-white">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Notification Preferences
              </h2>
            </div>

            <div className="space-y-2">
              <SettingsRow
                label="Email Notifications"
                subtext="Receive Admin notifications via Email"
                type="toggle"
                value={true}
                onChange={(val) => console.log("Email Toggle:", val)}
              />
              <SettingsRow
                label="Order Alerts"
                subtext="Get Notified about new orders"
                type="toggle"
                value={false}
                onChange={(val) => console.log("SMS Toggle:", val)}
              />

              <SettingsRow
                label="Dispute Alerts"
                subtext="Get Notified about other disputes"
                type="toggle"
                value={false}
                onChange={(val) => console.log("SMS Toggle:", val)}
              />
            </div>
          </section>
        )}
        {/* Team Management Table */}
        {currentFilter === "team" && (
          <GenericTable
            title="Team Access Control"
            columns={teamColumns}
            data={teamData}
            showSearch
            rowActions={[
              { key: "edit", label: "Change Role" },
              { key: "suspend", label: "Suspend Access", danger: true },
            ]}
            onActionClick={handleAction}
            className="rounded-2xl"
          />
        )}
        {/* API Keys Table with Security Notice */}
        {currentFilter === "commission" && (
          <div className="space-y-6">
            {/* Creator Commission Rates Section */}
            <section className="p-8 border border-gray-200 rounded-3xl bg-white ">
              <div className="mb-8">
                <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
                  <span className="text-purple-700">%</span> Creator Commission
                  Rates
                </h2>
                <p className="text-sm text-gray-500">
                  Set commission rates for creators when they make sales through
                  campaigns
                </p>
              </div>

              <div className="grid grid-cols-3 gap-8 mb-8">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
                    Default Rate (%)
                  </label>
                  <div className="relative">
                    <input
                      className="w-full p-3 bg-gray-100 text-black border border-gray-200 rounded-xl text-sm outline-none"
                      defaultValue="10"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                      %
                    </span>
                  </div>
                  <p className="mt-1.5 text-[10px] text-gray-400">
                    Standard commission for all creators
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
                    Minimum Rate (%)
                  </label>
                  <div className="relative">
                    <input
                      className="w-full p-3 bg-gray-100 text-black border border-gray-200 rounded-xl text-sm outline-none"
                      defaultValue="5"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                      %
                    </span>
                  </div>
                  <p className="mt-1.5 text-[10px] text-gray-400">
                    Lowest allowable commission
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
                    Maximum Rate (%)
                  </label>
                  <div className="relative">
                    <input
                      className="w-full p-3 bg-gray-100 text-black border border-gray-200 rounded-xl text-sm outline-none"
                      defaultValue="30"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                      %
                    </span>
                  </div>
                  <p className="mt-1.5 text-[10px] text-gray-400">
                    Highest allowable commission
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <button className="bg-purple-600 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-purple-700 transition">
                  Save Creator Settings
                </button>
              </div>
            </section>

            {/* Brand Platform Fees Section */}
            <section className="p-8 border border-gray-200 rounded-3xl bg-white ">
              <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-900">
                  Brand Platform Fees
                </h2>
                <p className="text-sm text-gray-500">
                  Set platform fees and processing charges for brands
                </p>
              </div>

              <div className="grid grid-cols-3 gap-8 mb-8">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
                    Platform Fee (%)
                  </label>
                  <div className="relative">
                    <input
                      className="w-full p-3 bg-gray-100 text-black border border-gray-200 rounded-xl text-sm outline-none"
                      defaultValue="5"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                      %
                    </span>
                  </div>
                  <p className="mt-1.5 text-[10px] text-gray-400">
                    Fee charged on each sale
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
                    Payment Processing (%)
                  </label>
                  <div className="relative">
                    <input
                      className="w-full p-3 bg-gray-100 text-black border border-gray-200 rounded-xl text-sm outline-none"
                      defaultValue="2.5"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                      %
                    </span>
                  </div>
                  <p className="mt-1.5 text-[10px] text-gray-400">
                    Payment gateway charges
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
                    Minimum Fee (₦)
                  </label>
                  <input
                    className="w-full p-3 bg-gray-100 text-black border border-gray-200 rounded-xl text-sm outline-none"
                    defaultValue="100"
                  />
                  <p className="mt-1.5 text-[10px] text-gray-400">
                    Minimum fee per transaction
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <p className="text-sm font-bold text-gray-900">
                    Volume-Based Pricing
                  </p>
                  {/* Custom Toggle Switch Placeholder */}
                  <div className="w-10 h-5 bg-gray-200 rounded-full relative cursor-pointer">
                    <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full "></div>
                  </div>
                </div>
                <button className="bg-purple-600 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-purple-700 transition">
                  Save Brand Settings
                </button>
              </div>
            </section>

            {/* General Platform Settings Section */}
            <section className="p-8 border border-gray-200 rounded-3xl bg-white ">
              <div className="mb-8">
                <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
                  <SettingsIcon size={18} style={{ color: PRIMARY }} /> General
                  Platform Settings
                </h2>
                <p className="text-sm text-gray-500">
                  Configure general platform settings and preferences
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
                    Platform Name
                  </label>
                  <input
                    className="w-full p-3 bg-gray-100 text-black border border-gray-200 rounded-xl text-sm outline-none"
                    defaultValue="Hookik"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
                    Default Currency
                  </label>
                  <input
                    className="w-full p-3 bg-gray-100 text-black border border-gray-200 rounded-xl text-sm outline-none"
                    defaultValue="NGN"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
                    Tax Rate (%)
                  </label>
                  <input
                    className="w-full p-3 bg-gray-100 text-black border border-gray-200 rounded-xl text-sm outline-none"
                    defaultValue="7.5"
                  />
                </div>
              </div>

              <div className="space-y-4 border-t border-gray-50 pt-8">
                <h3 className="text-xs font-bold text-gray-400 uppercase">
                  Auto-Approval Settings
                </h3>
                {[
                  {
                    label: "Auto-approve Products",
                    sub: "Automatically approve new product listings",
                  },
                  {
                    label: "Auto-approve Brands",
                    sub: "Automatically approve new brand registrations",
                  },
                  {
                    label: "Auto-approve Creators",
                    sub: "Automatically approve new creator registrations",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-bold text-gray-900">
                        {item.label}
                      </p>
                      <p className="text-[10px] text-gray-400">{item.sub}</p>
                    </div>
                    {/* Toggle Switch */}
                    <div className="w-10 h-5 bg-gray-200 rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-3 h-3 bg-purple-600 rounded-full "></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-8">
                <button className="bg-purple-600 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-purple-700 transition">
                  Save Platform Settings
                </button>
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}

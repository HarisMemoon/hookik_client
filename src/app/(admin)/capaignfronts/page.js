"use client";

import { useSearchParams, usePathname } from "next/navigation";
import { Download } from "lucide-react";
import PillFilterGroup from "@/components/PillFilterGroup";
import GenericTable from "@/components/GenericTable";

// ============================================================================
// CONFIG
// ============================================================================

const DEFAULT_FILTER = "all";

const campaignFilters = [
  { value: "all", label: "All Campaigns" },
  { value: "brand", label: "Brand Campaigns" },
  { value: "referral", label: "Hookik Referral" },
  { value: "creator", label: "Creator Campaign" },
];

// ============================================================================
// TABLE DEFINITIONS
// ============================================================================

// -------- All Campaigns (4 + status + date) --------
const allCampaignColumns = [
  { header: "Campaign Name", key: "name" },
  { header: "Owner", key: "owner" },
  { header: "Budget", key: "budget" },
  { header: "Reach", key: "reach" },
  { header: "Status", key: "status" },
  { header: "Start Date", key: "date" },
];

const allCampaignData = Array.from({ length: 6 }).map((_, i) => ({
  id: i + 1,
  name: `Campaign ${i + 1}`,
  owner: `Brand ${i + 1}`,
  budget: `$${(Math.random() * 5000).toFixed(0)}`,
  reach: `${1000 + i * 250}`,
  status: i % 2 === 0 ? "Active" : "Paused",
  date: "2025-01-10",
}));

// -------- Brand Campaigns (4 + status + date) --------
const brandCampaignColumns = [
  { header: "Campaign Name", key: "name" },
  { header: "Brand", key: "brand" },
  { header: "Total Products", key: "products" },
  { header: "Spend", key: "spend" },
  { header: "Status", key: "status" },
  { header: "Created Date", key: "date" },
];

const brandCampaignData = Array.from({ length: 6 }).map((_, i) => ({
  id: i + 1,
  name: `Brand Campaign ${i + 1}`,
  brand: `Brand ${i + 2}`,
  products: 10 + i,
  spend: `$${(Math.random() * 3000).toFixed(0)}`,
  status: "Active",
  date: "2025-01-11",
}));

// -------- Hookik Referral (3 + status + date) --------
const referralCampaignColumns = [
  { header: "Campaign Name", key: "name" },
  { header: "Referral Type", key: "type" },
  { header: "Total Conversions", key: "conversions" },
  { header: "Status", key: "status" },
  { header: "Launch Date", key: "date" },
];

const referralCampaignData = Array.from({ length: 6 }).map((_, i) => ({
  id: i + 1,
  name: `Referral Campaign ${i + 1}`,
  type: "User Invite",
  conversions: 50 + i * 5,
  status: "Active",
  date: "2025-01-12",
}));

// -------- Creator Campaign (3 + status + date) --------
const creatorCampaignColumns = [
  { header: "Campaign Name", key: "name" },
  { header: "Creator", key: "creator" },
  { header: "Engagement Rate", key: "engagement" },
  { header: "Status", key: "status" },
  { header: "Start Date", key: "date" },
];

const creatorCampaignData = Array.from({ length: 6 }).map((_, i) => ({
  id: i + 1,
  name: `Creator Campaign ${i + 1}`,
  creator: `Creator ${i + 1}`,
  engagement: `${(Math.random() * 10).toFixed(1)}%`,
  status: i % 2 === 0 ? "Active" : "Completed",
  date: "2025-01-13",
}));

// ============================================================================
// DATA MAP
// ============================================================================

const tableMap = {
  all: {
    title: "All Campaigns",
    columns: allCampaignColumns,
    data: allCampaignData,
  },
  brand: {
    title: "Brand Campaigns",
    columns: brandCampaignColumns,
    data: brandCampaignData,
  },
  referral: {
    title: "Hookik Referral Campaigns",
    columns: referralCampaignColumns,
    data: referralCampaignData,
  },
  creator: {
    title: "Creator Campaigns",
    columns: creatorCampaignColumns,
    data: creatorCampaignData,
  },
};

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function CampaignManagementPage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentFilter = searchParams.get("filter") || DEFAULT_FILTER;

  const pillItems = campaignFilters.map((f) => ({
    ...f,
    href: `${pathname}?filter=${f.value}`,
  }));
  const { title, columns, data } = tableMap[currentFilter];

  return (
    <main className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Campaign Management
          </h1>
          <p className="text-gray-600 text-sm">
            Manage brand, referral, and creator campaigns
          </p>
        </div>

        <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg">
          <Download size={18} />
          Export Campaigns
        </button>
      </div>

      {/* Pills */}
      <PillFilterGroup active={currentFilter} items={pillItems} />

      {/* Table */}
      <GenericTable
        title={title}
        columns={columns}
        data={data}
        showSearch
        rowActions={[
          { key: "view", label: "View Details" },
          { key: "edit", label: "Edit Campaign" },
          { key: "disable", label: "Disable Campaign", danger: true },
        ]}
        onActionClick={(action, row) => {
          console.log("Campaign action:", action, row);
        }}
      />
    </main>
  );
}

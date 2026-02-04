"use client";

import React, { useState } from "react";
import { Upload, Users, Wallet, TrendingUp } from "lucide-react";
import StatCard from "@/components/StatCard";
import GenericTable from "@/components/GenericTable";

// Modals
import ExportReportModal from "@/components/referalCampaignModals/ExportReportModal";
import FilterParticipantsModal from "@/components/referalCampaignModals/FilterParticipantsModal";
import ReferralStatsModal from "@/components/referalCampaignModals/ReferralStatsModal";
import EditCommissionModal from "@/components/referalCampaignModals/EditCommissionModal";
import ResetLinkModal from "@/components/referalCampaignModals/ResetLinkModal";
import StatusCapsule from "@/components/ui/StatusCapsule";

export default function ReferralManagementPage() {
  const [activeModal, setActiveModal] = useState(null);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const referralStats = [
    {
      title: "Total Participants",
      value: "4,245",
      description: "+18.3%",
      bgColor: { bgColor: "#EFF6FF", textColor: "text-blue-600" },
      CardIcon: Users,
    },
    {
      title: "Total Referrals",
      value: "15,678",
      description: "+22.1%",
      bgColor: { bgColor: "#FDF2F8", textColor: "text-pink-600" },
      CardIcon: Wallet,
    },
    {
      title: "Wallet",
      value: "₦1.8M",
      description: "56% utilization",
      bgColor: { bgColor: "#FFF7ED", textColor: "text-orange-600" },
      CardIcon: TrendingUp,
    },
  ];

  const participantColumns = [
    { header: "Participant", key: "participant" },
    { header: "Role", key: "role" },
    { header: "Total Referrals", key: "totalReferrals" },
    { header: "Commission Earned", key: "commissionEarned" },
    { header: "Wallet Usage", key: "walletUsage" },
    {
      header: "Status",
      key: "status",
      sortable: true,
      render: (_, row) => <StatusCapsule value={row.status} />,
    },
  ];

  const handleAction = (action, row) => {
    setSelectedParticipant(row);
    setActiveModal(action);
  };

  return (
    <main className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Referral Management
          </h1>
          <p className="text-gray-600 text-sm">Manage Hookik referral</p>
        </div>
        <button
          onClick={() => setActiveModal("export")}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
        >
          <Upload size={18} /> Export Report
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {referralStats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Table Section - Now matches Order Management Style */}
      <GenericTable
        title="Referral Participants"
        showFilter
        onFilterClick={() => setActiveModal("filter")}
        columns={participantColumns}
        data={[
          {
            id: 1,
            participant: "Sarah Johnson",
            role: "Creator",
            totalReferrals: 145,
            commissionEarned: "₦72,500",
            walletUsage: "₦32,000",
            status: "Active",
          },
          {
            id: 2,
            participant: "FashionHub",
            role: "Brand",
            totalReferrals: 89,
            commissionEarned: "₦44,500",
            walletUsage: "₦18,000",
            status: "Active",
          },
        ]}
        showSearch
        onSearch={(val) => setSearchTerm(val)}
        // Row actions updated to button style like Orders
        rowActions={[
          { key: "stats", label: "View Stats" },
          { key: "edit", label: "Edit Commission" },
          { key: "reset", label: "Reset Link" },
        ]}
        onActionClick={handleAction}
        customRenderers={{
          status: (val) => (
            <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-bold">
              {val}
            </span>
          ),
        }}
      />

      {/* Important Notes Area */}
      {/* <div className="mt-8 p-6 bg-gray-50 rounded-3xl border border-gray-100 relative overflow-hidden">
        <h3 className="font-bold mb-4">Important Notes</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>• Commission is stored in Referral Wallet</li>
          <li>• Can be used for payments inside Hookik platform</li>
          <li>• Referral wallet balance is not withdrawable</li>
          <li>• All referral campaigns are controlled by Hookik</li>
        </ul>
        <div className="absolute right-12 bottom-4 w-24 h-24 opacity-20">
          <img src="/e-badge.png" alt="Decoration" />
        </div>
      </div> */}

      {/* Modals Rendering */}
      <ExportReportModal
        open={activeModal === "export"}
        onClose={() => setActiveModal(null)}
      />
      <FilterParticipantsModal
        open={activeModal === "filter"}
        onClose={() => setActiveModal(null)}
      />
      {selectedParticipant && (
        <>
          <ReferralStatsModal
            open={activeModal === "stats"}
            onClose={() => setActiveModal(null)}
            data={selectedParticipant}
          />
          <EditCommissionModal
            open={activeModal === "edit"}
            onClose={() => setActiveModal(null)}
            participantName={selectedParticipant.participant}
          />
          <ResetLinkModal
            open={activeModal === "reset"}
            onClose={() => setActiveModal(null)}
            participantName={selectedParticipant.participant}
          />
        </>
      )}
    </main>
  );
}

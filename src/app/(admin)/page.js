"use client";

import StatCard from "../../components/StatCard";
import UserGrowthLineChart from "../../components/charts/LineChart";
import RevenuePieChart from "../../components/charts/PieChart";
import TopCreatorsBarChart from "../../components/charts/BarChart";
import DashboardError from "@/components/ui/DashboardError";
import DashboardLoader from "@/components/ui/DashboardLoader";
import { PRIMARY, STAT_CARD_COLORS } from "../../constants/COLORS";
import { Users, Store, DollarSign, Clock, Building2, Star } from "lucide-react";
import { useState } from "react";
import ApprovalDetailsModal from "@/components/modals/ApprovalDetailsModal";
import useDashboard from "@/hooks/useDashboard";
import moment from "moment"; // Assuming you have moment or date-fns for time ago formatting

// --- Placeholder Data Definitions (Removed or simplified) ---
const recentCampaigns = [
  /* Hardcoded list for now, pending Campaign model data */
];
const activePayouts = [
  /* Hardcoded list for now, pending Campaign model data */
];
// We will replace pendingApprovals below with fetched data

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const {
    loading,
    error, // New
    stats,
    userGrowth,
    revenueBreakdown, // Fetched data
    pendingApprovals,
    topCreators,
    monthlyEngagement, // Fetched data

    activePayouts,
    // The following were used in backend query but may not be needed directly on frontend
    // recentStorefronts,
    // recentSuppliers,
  } = useDashboard();

  if (loading) {
    return <DashboardLoader />;
  }

  if (error) {
    // --- REPLACE THE OLD ERROR MESSAGE WITH THE COMPONENT ---
    return <DashboardError message={error} />;
  }

  // --- DYNAMIC STAT CARD DATA ASSEMBLY ---
  const StatData = [
    {
      title: "Total Users",
      value: stats?.totalUsers?.toLocaleString() || "0",
      description: "Total accounts on platform",
      bgColor: STAT_CARD_COLORS.BLUE_CYAN,
      Icon: Users,
    },
    {
      title: "Total Brands",
      value: stats?.totalCustomers?.toLocaleString() || "0",
      description: "Brands using the platform",
      bgColor: STAT_CARD_COLORS.LIGHT_PURPLE,
      Icon: Building2,
    },

    {
      title: "Total Influencers",
      value: stats?.totalInfluencers?.toLocaleString() || "0",
      // Calculate total pending items
      // value:
      //   pendingApprovals?.products?.length +
      //     pendingApprovals?.storefronts?.length || 0,
      description: "Total influencers onboarded",
      bgColor: STAT_CARD_COLORS.LIGHT_YELLOW,
      Icon: Star,
    },
    {
      title: "Active Storefronts",
      value: stats?.activeSuppliers?.toLocaleString() || "0",
      description: "Publicly visible storefronts",
      bgColor: STAT_CARD_COLORS.LIGHT_GREEN,
      Icon: Store,
    },

    {
      title: "Total Sales Volume",
      value: `$${(stats?.totalSalesVolume || 0).toLocaleString()}`,
      description: "Gross revenue from completed orders",
      bgColor: STAT_CARD_COLORS.LIGHT_PINK,
      Icon: DollarSign,
    },
    {
      title: "Pending Payouts",
      value: `$${(stats?.pendingPayouts || 0).toLocaleString()}`,
      description: "Funds awaiting transfer to users",
      bgColor: STAT_CARD_COLORS.DEEPER_YELLOW,
      Icon: Clock,
    },
  ];

  // Combine fetched pending items for display
  const combinedPendingApprovals = [
    ...(pendingApprovals?.products || []).map((p) => ({
      type: "Product",
      time: moment(p.createdAt).fromNow(),
      title: p.name,
      brand: `Brand ID: ${p.brand_id}`, // Replace with actual name later
      itemData: p,
    })),
    ...(pendingApprovals?.storefronts || []).map((s) => ({
      type: "Storefront",
      time: moment(s.createdAt).fromNow(),
      title: s.name,
      brand: `User ID: ${s.user_id}`, // Replace with actual user name later
      itemData: s,
    })),
  ];

  // Function to open the modal
  const handleApproveClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  // Function to handle the final approval action (Needs API call to backend)
  const handleFinalApproval = (itemData, notes) => {
    // **TODO: Implement API call here to approve the item via a protected Admin API**
    console.log(
      `Final approval for ${itemData.type} ID ${itemData.itemData.id}. Notes: ${notes}`,
    );
    // After API call, you would refetch the dashboard data here.
    alert(`Approved ${itemData.title}! Needs API implementation.`);
  };

  // NOTE: Charts still need data formatting to match chart library input (e.g., Recharts)

  return (
    <main className="p-8 bg-white min-h-screen">
      {/* 1. Dashboard Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome to Hookik Super Admin</p>
      </div>

      {/* 2. Top-Level Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {StatData.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={String(stat.value)}
            description={stat.description}
            bgColor={stat.bgColor}
            CardIcon={stat.Icon}
          />
        ))}
      </div>

      {/* 3. Charts and Analytics Section (User Growth & Revenue) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* User Growth Over Time */}
        <div className="p-6 bg-white rounded-2xl border border-gray-200">
          {/* FIX APPLIED HERE */}
          <h3 className="text-lg  mb-4 text-black">User Growth Over Time</h3>
          <div className="h-72">
            <UserGrowthLineChart data={userGrowth} />
          </div>
        </div>

        {/* Revenue Breakdown by Type */}
        <div className="p-6 bg-white rounded-2xl border border-gray-200">
          {/* FIX APPLIED HERE */}
          <h3 className="text-lg  mb-4 text-black">
            Revenue Breakdown by Type
          </h3>
          <div className="h-72">
            <RevenuePieChart data={revenueBreakdown} />
          </div>
        </div>
      </div>

      {/* 4. Bottom Section (More charts/data widgets) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Creators */}
        <div className="p-6 bg-white rounded-2xl border border-gray-200">
          {/* FIX APPLIED HERE */}
          <h3 className="text-lg  mb-4 text-black">Top Performing Creators</h3>
          <div className="h-72">
            <TopCreatorsBarChart data={topCreators} />
          </div>
        </div>

        {/* === CARD 3: Active Payouts === */}
        {/* ------------------------------------------------------------------ */}
        <div className="p-6 bg-white rounded-2xl border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Active Payouts
          </h3>

          <div className="space-y-4">
            {activePayouts.length > 0 ? (
              activePayouts.slice(0, 4).map((payout, idx) => {
                // ... (Payout mapping logic remains the same) ...
                // Logic should be fully dynamic now.
                let badgeStyle = "text-gray-700 bg-gray-100";
                if (payout.status === "pending") {
                  badgeStyle = "text-yellow-700 bg-yellow-100";
                } else if (payout.status === "completed") {
                  badgeStyle = "text-green-700 bg-green-100";
                } else if (payout.status === "processing") {
                  badgeStyle = "text-blue-700 bg-blue-100";
                }

                const fullName = `${payout.User.first_name} ${payout.User.last_name}`;
                const roleDisplay =
                  payout.User.role.charAt(0).toUpperCase() +
                  payout.User.role.slice(1);

                return (
                  <div
                    key={idx}
                    className={`flex justify-between items-center pb-3 ${
                      idx !== Math.min(activePayouts.length, 4) - 1
                        ? "border-b border-gray-100"
                        : ""
                    }`}
                  >
                    <div>
                      <p className="font-medium text-sm text-gray-800">
                        {fullName}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {roleDisplay}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-sm text-gray-800">
                        {/* Format Amount as Naira */}$
                        {parseFloat(payout.amount).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}
                      </p>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${badgeStyle}`}
                      >
                        {/* Display status (pending, processing, etc.) */}
                        {payout.status}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-gray-500 pt-2 text-center">
                No active payout transactions currently.
              </p>
            )}
          </div>

          <button className="mt-4 w-full py-2 text-sm text-gray-600 border border-gray-300 rounded-2xl hover:bg-gray-50 transition-colors">
            View All Payouts
          </button>
        </div>
      </div>

      {/* 5. Bottom Section: Recent Activities & Payouts */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 mt-8">
        <div className="p-6 bg-white rounded-2xl border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Recent Campaigns Created
          </h3>
          <div className="space-y-4">
            {recentCampaigns.slice(0, 4).map((c, idx) => (
              <div
                key={idx}
                className={`flex justify-between items-center pb-2 ${
                  idx !== Math.min(recentCampaigns.length, 4) - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
              >
                <div>
                  <p className="font-medium text-sm text-gray-800">{c.title}</p>
                  <p className="text-xs text-gray-500">{c.brand}</p>
                </div>

                <div className="flex flex-col items-end">
                  {c.type === "solid" ? (
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: c.color }}
                    >
                      {c.status}
                    </span>
                  ) : (
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.color}`}
                    >
                      {c.status}
                    </span>
                  )}

                  <p className="text-xs text-gray-500 mt-0.5">
                    {c.reach} reach
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full py-2 text-sm text-gray-600 border border-gray-300 rounded-2xl hover:bg-gray-50 transition-colors">
            View All Campaigns
          </button>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Latest Approvals Pending ({combinedPendingApprovals.length})
          </h3>

          <div className="space-y-4">
            {combinedPendingApprovals.length > 0 ? (
              combinedPendingApprovals.slice(0, 4).map((item, idx) => (
                <div
                  key={idx}
                  className={`pb-4 ${
                    idx !== Math.min(combinedPendingApprovals.length, 4) - 1
                      ? "border-b border-gray-100"
                      : ""
                  }`}
                >
                  <p className="text-xs text-gray-500 mb-1">
                    {item.type} <span className="float-right">{item.time}</span>
                  </p>

                  <p className="font-semibold text-gray-800">{item.title}</p>
                  <p className="text-sm text-gray-600 mb-2">{item.brand}</p>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleApproveClick(item)}
                      className="px-3 py-1 text-xs text-white rounded-md"
                      style={{ backgroundColor: PRIMARY }}
                    >
                      Approve
                    </button>
                    <button className="px-3 py-1 text-xs text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
                      Review
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 pt-2">
                No pending items to review. 🎉
              </p>
            )}
          </div>

          {selectedItem && (
            <ApprovalDetailsModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              item={selectedItem}
              onApproval={handleFinalApproval}
            />
          )}

          <button className="mt-4 w-full py-2 text-sm text-gray-600 border border-gray-300 rounded-2xl hover:bg-gray-50 transition-colors">
            View All Listings
          </button>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Active Payouts
          </h3>

          <div className="space-y-4">
            {activePayouts.length > 0 ? (
              activePayouts.slice(0, 4).map((payout, idx) => {
                let badgeStyle = "text-gray-700 bg-gray-100";
                if (payout.status === "pending") {
                  badgeStyle = "text-yellow-700 bg-yellow-100";
                } else if (payout.status === "completed") {
                  badgeStyle = "text-green-700 bg-green-100";
                } else if (payout.status === "processing") {
                  badgeStyle = "text-blue-700 bg-blue-100";
                }

                const fullName = `${payout.User.first_name} ${payout.User.last_name}`;
                const roleDisplay =
                  payout.User.role.charAt(0).toUpperCase() +
                  payout.User.role.slice(1);

                return (
                  <div
                    key={idx}
                    className={`flex justify-between items-center pb-3 ${
                      idx !== Math.min(activePayouts.length, 4) - 1
                        ? "border-b border-gray-100"
                        : ""
                    }`}
                  >
                    <div>
                      <p className="font-medium text-sm text-gray-800">
                        {fullName}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {roleDisplay}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-sm text-gray-800">
                        {parseFloat(payout.amount).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}
                      </p>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${badgeStyle}`}
                      >
                        {payout.status}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-gray-500 pt-2 text-center">
                No active payout transactions currently.
              </p>
            )}
          </div>

          <button className="mt-4 w-full py-2 text-sm text-gray-600 border border-gray-300 rounded-2xl hover:bg-gray-50 transition-colors">
            View All Payouts
          </button>
        </div>
      </div> */}

      {/* 6. Quick Actions Section */}

      <div className="p-6 w-full lg:w-1/2 mr-auto bg-white rounded-2xl border border-gray-200 mt-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Quick Actions
        </h3>
        <div className="flex flex-wrap gap-4">
          {/* Button 2: Create Admin Role */}
          <button className="px-4 py-2 text-sm text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-300 transition-colors">
            Create Admin Role
          </button>

          {/* Button 3: View Top Storefronts */}
          <button className="px-4 py-2 text-sm text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-300 transition-colors">
            View Top Storefronts
          </button>

          {/* Button 4: Generate Reports */}
          <button className="px-4 py-2 text-sm text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-300 transition-colors">
            Generate Reports
          </button>

          {/* Button 5: Process Payouts */}
          <button className="px-4 py-2 text-sm text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-300 transition-colors">
            Process Payouts
          </button>
        </div>
      </div>
    </main>
  );
}

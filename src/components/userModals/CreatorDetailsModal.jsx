import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import StatusCapsule from "../ui/StatusCapsule";
import AddUserModal from "./AddUserModal";

export default function CreatorProfileModal({ open, onClose, creator }) {
  if (!open || !creator) return null;

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleOpenEdit = () => {
    setIsEditModalOpen(true);
  };

  const performanceMetrics = [
    { label: "Conversion Rate", value: "8.5%", progress: 85 },
    { label: "Engagement Rate", value: "12.3%", progress: 70 },
    { label: "Customer Satisfaction", value: "94%", progress: 94 },
  ];

  const recentCampaigns = [
    {
      name: "Summer Fashion Collection",
      type: "Brand",
      revenue: "₦125,000",
      status: "Active",
    },
    {
      name: "Tech Gadgets Launch",
      type: "Product",
      revenue: "₦89,500",
      status: "Completed",
    },
  ];

  const recommendations = [
    { name: "FashionHub", match: "95% compatibility match" },
    { name: "BeautyPro", match: "88% compatibility match" },
  ];
  const labelStyles =
    "text-[12px] font-black text-gray-400  tracking-widest mb-1";

  const footer = (
    <div className="flex justify-end gap-3 w-full">
      <button
        onClick={onClose}
        className="px-6 py-2 text-sm font-medium border border-gray-200 rounded-xl hover:bg-gray-50 transition"
      >
        Close
      </button>
      <button
        className="px-6 py-2 text-sm font-medium bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
        onClick={handleOpenEdit}
      >
        Edit Profile
      </button>
    </div>
  );

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        title="Creator Profile"
        subtitle={`Basic Info `}
        size="md"
        footer={footer}
      >
        {/* 🔧 Removed internal scroll — smoother UX */}
        <div className="max-h-[70vh] overflow-y-auto  pr-2 space-y-6 theme-scroll">
          <div className="space-y-6 mr-5">
            {/* Header Grid Info */}
            <div className="space-y-6">
              {/* Header: Profile Picture & Identity */}
              <div className="flex items-center gap-4 bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-white shadow-sm bg-purple-50 flex items-center justify-center">
                  {creator.profile_picture ? (
                    <img
                      src={creator.profile_picture}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-purple-300 text-3xl font-black">
                      {creator.first_name?.charAt(0)}
                      {creator.last_name?.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-900 leading-tight">
                    {creator.first_name} {creator.last_name}
                  </h3>
                  <p className="text-sm font-medium text-purple-600">
                    Hookik {creator.role || "Influencer"}
                  </p>
                </div>
              </div>

              {/* Main Information Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 px-1">
                <div>
                  <p className={labelStyles}>Email Address</p>
                  <p className="text-sm font-bold text-gray-800 truncate">
                    {creator.email}
                  </p>
                </div>

                <div>
                  <p className={labelStyles}>Total Sales</p>
                  <p className="text-sm font-black text-gray-900">
                    {Number(creator.total_sales || 0).toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className={labelStyles}>Date Joined</p>
                  <p className="text-sm font-bold text-gray-800">
                    {new Date(creator.created_at).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div>
                  <p className={labelStyles}>Country</p>
                  <p className="text-sm font-bold text-gray-800">
                    {creator.country || "Not Provided"}
                  </p>
                </div>

                <div>
                  <p className={labelStyles}>City</p>
                  <p className="text-sm font-bold text-gray-800">
                    {creator.city || "Not Provided"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400 mb-0.5">
                    Storefront Status
                  </p>

                  {creator.storefront == "No Store" ? (
                    <StatusCapsule value="disabled" />
                  ) : (
                    <StatusCapsule value="active" />
                  )}
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            {/* <div>
            <h4 className="text-sm font-bold text-gray-900 mb-4">
              Performance Metrics
            </h4>
            <div className="space-y-4">
              {performanceMetrics.map((metric) => (
                <div key={metric.label}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-gray-600 font-medium">
                      {metric.label}
                    </span>
                    <span className="text-gray-900 font-bold">
                      {metric.value}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-purple-50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-600 rounded-full"
                      style={{ width: `${metric.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div> */}

            {/* Recent Campaigns */}
            {/* <div>
            <h4 className="text-sm font-bold text-gray-900 mb-3">
              Recent Campaigns
            </h4>
            <div className="border border-gray-100 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 border-b border-gray-100 text-gray-500">
                  <tr>
                    <th className="px-4 py-3 font-medium">Campaign</th>
                    <th className="px-4 py-3 font-medium text-center">Type</th>
                    <th className="px-4 py-3 font-medium text-center">
                      Revenue
                    </th>
                    <th className="px-4 py-3 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentCampaigns.map((camp) => (
                    <tr key={camp.name}>
                      <td className="px-4 py-3 font-semibold text-gray-900">
                        {camp.name}
                      </td>
                      <td className="px-4 py-3 text-center text-gray-500">
                        {camp.type}
                      </td>
                      <td className="px-4 py-3 text-center font-bold text-gray-900">
                        {camp.revenue}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            camp.status === "Active"
                              ? "bg-black text-white"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {camp.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div> */}

            {/* AI Recommendations */}
            {/* <div>
            <h4 className="text-sm font-bold text-gray-900 mb-3">
              AI-Recommended Brand Collaborations
            </h4>
            <div className="space-y-3">
              {recommendations.map((brand) => (
                <div
                  key={brand.name}
                  className="flex items-center justify-between p-4 bg-purple-50 border border-purple-100 rounded-2xl shadow-sm"
                >
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      {brand.name}
                    </p>
                    <p className="text-xs text-purple-600 font-medium">
                      {brand.match}
                    </p>
                  </div>
                  <button className="px-4 py-1.5 bg-purple-600 text-white text-xs font-bold rounded-lg hover:bg-purple-700 transition shadow-sm shadow-purple-200">
                    Connect
                  </button>
                </div>
              ))}
            </div>
          </div> */}

            {/* Referral Balance */}
            {/* <div className="pt-4 border-t border-gray-50">
            <p className="text-xs text-gray-400 mb-0.5">
              Referral Wallet Balance
            </p>
            <p className="text-lg font-bold text-gray-900">₦125,000</p>
          </div> */}
          </div>
        </div>
      </Modal>
      <AddUserModal
        open={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setRefreshKey((prev) => prev + 1);
        }}
        user={creator}
        role="influencer"
        type="edit"
      />
    </>
  );
}

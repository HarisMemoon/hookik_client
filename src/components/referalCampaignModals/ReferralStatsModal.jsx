import Modal from "@/components/ui/Modal";
import { Upload } from "lucide-react";

export default function ReferralStatsModal({ open, onClose, data }) {
  const stats = [
    { label: "Total Referrals", value: data?.totalReferrals || 0 },
    { label: "Commission Earned", value: data?.commissionEarned || "₦0" },
    { label: "Wallet Usage", value: data?.walletUsage || "₦0" },
  ];

  const monthlyData = [
    {
      month: "October 2024",
      referrals: 45,
      commission: "₦22,500",
      conversion: "68%",
    },
    {
      month: "September 2024",
      referrals: 38,
      commission: "₦19,000",
      conversion: "65%",
    },
  ];

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Referral Statistics"
      subtitle={`Detailed referral stats for ${data?.participant}`}
      size="md"
      footer={
        <div className="flex justify-end gap-3 w-full">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-200 rounded-xl text-sm font-medium"
          >
            Close
          </button>
          <button className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-xl text-sm font-medium">
            <Upload size={16} /> Export Stats
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="p-4 bg-gray-50 border border-gray-100 rounded-2xl"
            >
              <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">
                {stat.label}
              </p>
              <p className="text-lg font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Monthly Breakdown Table */}
        <div>
          <h3 className="text-sm font-bold mb-3">Monthly Breakdown</h3>
          <div className="border border-gray-100 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500 font-medium">
                <tr>
                  <th className="px-4 py-3">Month</th>
                  <th className="px-4 py-3">Referrals</th>
                  <th className="px-4 py-3">Commission</th>
                  <th className="px-4 py-3">Conversion Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {monthlyData.map((row, i) => (
                  <tr key={i} className="text-gray-700">
                    <td className="px-4 py-3 font-medium">{row.month}</td>
                    <td className="px-4 py-3">{row.referrals}</td>
                    <td className="px-4 py-3">{row.commission}</td>
                    <td className="px-4 py-3">{row.conversion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Modal>
  );
}

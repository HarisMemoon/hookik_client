// src/components/charts/AreaChart.js (FINALIZED)
"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ACTIVE_COLOR = "#8937ce";

// Helper to format month strings (e.g., "2024-05" -> "May 24")
const formatMonth = (month) => {
  const [year, m] = month.split("-");
  const date = new Date(year, m - 1);
  return date.toLocaleString("default", { month: "short", year: "2-digit" });
};

export default function EngagementAreaChart({ data }) {
  // ACCEPT DATA PROP

  // Transform data: map month format and use total_orders as the data key
  const chartData =
    data?.map((item) => ({
      name: formatMonth(item.month),
      orders: parseInt(item.total_orders), // orders = total engagement proxy
    })) || [];

  if (chartData.length === 0) {
    return (
      <div className="text-center pt-10 text-gray-500">
        No engagement data available.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={chartData} // USE DYNAMIC DATA
        margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ccc" />
        <XAxis
          dataKey="name"
          stroke="#666"
          tickLine={false}
          axisLine={false}
          fontSize={12}
        />
        <YAxis
          dataKey="orders"
          stroke="#666"
          tickLine={false}
          axisLine={false}
          fontSize={12}
          tickFormatter={(value) => value.toLocaleString()}
        />
        <Tooltip />

        <Area
          type="monotone"
          dataKey="orders" // USE DYNAMIC DATA KEY
          stroke={ACTIVE_COLOR}
          fillOpacity={0.5}
          fill={`url(#colorEngagement)`}
          strokeWidth={2}
        />

        <defs>
          <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={ACTIVE_COLOR} stopOpacity={0.8} />
            <stop offset="95%" stopColor={ACTIVE_COLOR} stopOpacity={0} />
          </linearGradient>
        </defs>
        {/* <text
          x="50%"
          y="100%"
          textAnchor="middle"
          dominantBaseline="hanging"
          fontSize={12}
          fill="#666"
        >
          Total Orders Placed Monthly
        </text> */}
      </AreaChart>
    </ResponsiveContainer>
  );
}

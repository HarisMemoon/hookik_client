// src/components/charts/BarChart.js (FINALIZED)
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ACTIVE_COLOR = "#8937ce";

export default function TopCreatorsBarChart({ data }) {
  // ACCEPT DATA PROP

  const chartData = data || []; // Use dynamic data

  // Ensure chart is not rendered if data is empty
  if (chartData.length === 0) {
    return (
      <div className="text-center pt-10 text-gray-500">
        No creator sales data available.
      </div>
    );
  }

  const maxSales = chartData.reduce(
    (max, item) => Math.max(max, item.sales),
    0
  );
  const yAxisDomainMax = maxSales + maxSales * 0.1;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData} // USE DYNAMIC DATA
        margin={{ top: 5, right: 30, left: -20, bottom: 5 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          horizontal={true}
          vertical={false}
          stroke="#ccc"
        />

        <XAxis
          dataKey="name"
          stroke="#666"
          tickLine={false}
          axisLine={false}
          fontSize={12}
        />

        <YAxis
          stroke="#666"
          tickLine={false}
          axisLine={false}
          fontSize={12}
          tickFormatter={(value) => `${value / 1000}k`}
          domain={[0, yAxisDomainMax]}
        />

        <Tooltip
          formatter={(value) => [`₦${value.toLocaleString()}`, "Sales"]}
        />

        <Bar dataKey="sales" fill={ACTIVE_COLOR} radius={[4, 4, 0, 0]} />
        {/* <text
          x="50%"
          y="95%"
          textAnchor="middle"
          dominantBaseline="hanging"
          fontSize={12}
          fill="#666"
        >
          Sales Volume by Creator
        </text> */}
      </BarChart>
    </ResponsiveContainer>
  );
}

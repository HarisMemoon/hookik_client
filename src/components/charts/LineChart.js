// src/components/charts/LineChart.js
"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend, // We need the Legend component now
} from "recharts";

// Data colors (Use your primary color and variants for brand and influencer)
const TOTAL_COLOR = "#8937ce"; // Primary color
const BRAND_COLOR = "#a0a0a0"; // Gray/Neutral for Brands
const INFLUENCER_COLOR = "#2ecc71"; // Green/Success for Influencers

// Helper function to transform the raw backend data array
const transformData = (rawData) => {
  if (!rawData || rawData.length === 0) return [];

  return rawData.map((item) => {
    const [year, month] = item.month.split("-");
    const date = new Date(year, month - 1); // Month is 0-indexed in JS Date

    return {
      name: date.toLocaleString("default", { month: "short" }), // e.g., 'Jan', 'Feb'
      Total: item.total_count,
      Brands: parseInt(item.brand_count),
      Influencers: parseInt(item.influencer_count),
    };
  });
};

export default function UserGrowthLineChart({ data }) {
  // --- USE DYNAMIC DATA HERE ---
  const chartData = transformData(data);

  // Find the maximum value to dynamically set the Y-Axis domain
  const maxTotal = chartData.reduce(
    (max, item) => Math.max(max, item.Total),
    0
  );
  const yAxisDomainMax = maxTotal + maxTotal * 0.15; // Add 15% buffer

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={chartData} // <-- USING DYNAMIC DATA
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
          stroke="#666"
          tickLine={false}
          axisLine={false}
          fontSize={12}
          domain={[0, yAxisDomainMax]} // Dynamic Domain
        />

        <Tooltip formatter={(value, name) => [value.toLocaleString(), name]} />

        {/* New: Display the legend for the different lines */}
        <Legend wrapperStyle={{ fontSize: 12 }} />

        {/* Line 1: Total Users (Primary/Dominant) */}
        <Line
          type="monotone"
          dataKey="Total"
          stroke={TOTAL_COLOR}
          strokeWidth={3}
          dot={{ r: 4, fill: TOTAL_COLOR }}
          activeDot={{ r: 6 }}
        />

        {/* Line 2: Brands */}
        <Line
          type="monotone"
          dataKey="Brands"
          stroke={BRAND_COLOR}
          strokeWidth={2}
          dot={false}
        />

        {/* Line 3: Influencers */}
        <Line
          type="monotone"
          dataKey="Influencers"
          stroke={INFLUENCER_COLOR}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

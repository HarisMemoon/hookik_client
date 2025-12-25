// src/components/charts/PieChart.js (FINALIZED to support 3 slices)
"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

// Define COLORS for the three slices
const COLORS = ["#8937ce", "#ffcc00", "#ff4d4f"];

// Map backend types (including the calculated 'platform_fee') to business names and colors
const colorMap = {
  // Slice 1: Vendor Revenue (The revenue retained by the brand/seller)
  earning_vendor: { name: "Storefront Revenue", color: COLORS[0] }, // Slice 2: Influencer Commission (Revenue generated via campaigns)
  earning_influencer: { name: "Campaign Commissions", color: COLORS[1] },

  // Slice 3: Platform Fee (Calculated in the backend as the residual gross revenue)
  // This represents your desired "Direct Sales" or platform cut.
  platform_fee: { name: " Direct Sales", color: COLORS[2] },
};

// Custom Label component (Shows percentage inside the slice)
const CustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
  const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);
  const percentage = `${(percent * 100).toFixed(0)}%`;

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12}
    >
      {percentage}
    </text>
  );
};

export default function RevenuePieChart({ data }) {
  // 1. Transform and clean the data
  const chartData = (data || [])
    .map((item) => ({
      name: colorMap[item.type]?.name || item.type, // Map type to user-friendly name
      value: parseFloat(item.totalAmount), // Value must be numeric
      originalType: item.type, // Keep original type for cell coloring lookup
    }))
    .filter((item) => item.value > 0); // Only show slices with positive revenue // Calculate total amount for Tooltip percentage calculation

  const totalAmount = chartData.reduce((sum, item) => sum + item.value, 0);

  if (chartData.length === 0) {
    return (
      <div className="text-center pt-10 text-gray-500">
        No completed revenue data available.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          labelLine={false}
          label={CustomLabel} // Shows percentage
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`} // Look up color based on the original type (platform_fee, earning_vendor, etc.)
              fill={colorMap[entry.originalType]?.color}
            />
          ))}
        </Pie>

        <Tooltip
          formatter={(value, name) => [
            // Display amount in Naira
            `₦${value.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`, // Display name and percentage
            `${name} (${((value / totalAmount) * 100).toFixed(1)}%)`,
          ]}
        />

        <Legend
          layout="horizontal"
          align="center" // Centering the legend below the chart
          verticalAlign="bottom"
          wrapperStyle={{ fontSize: 12, paddingTop: "10px" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

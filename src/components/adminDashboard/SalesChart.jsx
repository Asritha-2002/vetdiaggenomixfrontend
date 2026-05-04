import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const timeframes = [
  { key: "week", label: "Week" },
  { key: "month", label: "Month" },
  { key: "year", label: "Year" },
];

const subtitles = {
  week: "This week's revenue trend",
  month: "Monthly revenue overview",
  year: "Yearly revenue performance",
};

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-white border rounded-xl px-3 py-2 shadow">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-bold text-gray-900">
        ₹{payload[0].value.toLocaleString()}
      </p>
    </div>
  );
}

export default function SalesChart({ data }) {
  const [activeTimeframe, setActiveTimeframe] = useState("week");

  const chartData = data?.[activeTimeframe] ?? [];

  return (
    <div className="bg-white rounded-2xl p-6 shadow">

      {/* HEADER */}
      <div className="flex flex-col gap-2 md:justify-between mb-5">
        <div>
          <h3 className="text-xl font-bold">Sales Analytics</h3>
          <p className="text-gray-500 text-sm">
            {subtitles[activeTimeframe]}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-100 p-1 rounded-lg">
          {timeframes.map((tf) => (
            <button
              key={tf.key}
              onClick={() => setActiveTimeframe(tf.key)}
              className={`px-4 py-1 rounded-lg text-sm ${
                activeTimeframe === tf.key
                  ? "bg-blue-600 text-white"
                  : "text-gray-600"
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>

      {/* CHART */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <CartesianGrid vertical={true} horizontal={false} strokeDasharray="3 3" />

            <XAxis dataKey="label" />
            <YAxis
  tickFormatter={(value) =>
    `₹${(value / 1000).toFixed(0)}k`
  }
/>

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              fill="#93c5fd"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
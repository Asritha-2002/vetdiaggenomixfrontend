import React from "react";

/* ---------------- STATUS STYLES ---------------- */
const statusStyles = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  processing: "bg-blue-100 text-blue-800 border-blue-200",
  shipped: "bg-violet-100 text-violet-800 border-violet-200",
  delivered: "bg-emerald-100 text-emerald-800 border-emerald-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
  "refund-completed": "bg-orange-100 text-orange-800 border-orange-200",
  completed: "bg-emerald-100 text-emerald-800 border-emerald-200",
  failed: "bg-red-100 text-red-800 border-red-200",
};

/* ---------------- ORDER STATUS BADGE ---------------- */
export default function OrderStatusbadge({ status }) {
  const normalized = status || "pending";

  const label = normalized
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const style =
    statusStyles[normalized] || statusStyles.pending;

  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors ${style}`}
    >
      {label}
    </span>
  );
}
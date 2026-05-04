import React, { useMemo } from "react";
import {
  ShoppingCart,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
  Package,
  RotateCcw
} from "lucide-react";

/**
 * UI CONFIG (only allowed statuses)
 */
const STATS_CONFIG = [
  {
    key: "total",
    label: "Total Orders",
    icon: ShoppingCart,
    className: "bg-secondary text-secondary-foreground border-border",
  },
  {
    key: "pending",
    label: "Pending",
    icon: Clock,
    className: "bg-amber-50 text-amber-600 border-amber-200",
  },
  {
    key: "processing",
    label: "Processing",
    icon: Package,
    className: "bg-blue-50 text-blue-600 border-blue-200",
  },
  {
    key: "shipped",
    label: "Shipped",
    icon: Truck,
    className: "bg-violet-50 text-violet-600 border-violet-200",
  },
  {
    key: "delivered",
    label: "Delivered",
    icon: CheckCircle,
    className: "bg-emerald-50 text-emerald-600 border-emerald-200",
  },
  {
    key: "cancelled",
    label: "Cancelled",
    icon: XCircle,
    className: "bg-red-50 text-red-600 border-red-200",
  },
  {
  key: "refunded",
  label: "Refunded",
  icon: RotateCcw,
  className: "bg-orange-50 text-orange-600 border-orange-200",
}
];

export default function OrderStatsCards({
  orders = [],
  pageCount = 0,
}) {
  /**
   * CLEAN STATUS COUNTS (ONLY ALLOWED VALUES)
   */
  const statusCounts = useMemo(() => {
    const counts = {
      pending: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0,
      "refund-completed": 0,
    };

    orders.forEach((order) => {
      const status = order.status?.toLowerCase()?.trim();

      if (counts.hasOwnProperty(status)) {
        counts[status]++;
      }
    });

    return counts;
  }, [orders]);

  /**
   * FINAL VALUES
   */
  const values = {
    total: orders.length,
    pending: statusCounts.pending,
    processing: statusCounts.processing,
    shipped: statusCounts.shipped,
    delivered: statusCounts.delivered,
    cancelled: statusCounts.cancelled,
    refunded: statusCounts["refund-completed"],
  };

 return (
 <div className="flex flex-wrap justify-start gap-3 w-full">
  {STATS_CONFIG.map(({ key, label, icon: Icon, className }) => (
    <div
      key={key}
      className={`
        ${className}
        w-[calc(50%-6px)] sm:w-[calc(33.33%-8px)] md:w-[calc(16.66%-10px)]
        min-w-[120px] 
        rounded-2xl p-4 border border-opacity-20
        text-center transition-all duration-300
        hover:shadow-lg hover:-translate-y-1
        bg-white/50 backdrop-blur-sm
      `}
    >
      <div className="flex justify-center mb-2">
        <Icon className="w-5 h-5 opacity-90" />
      </div>

      <p className="text-2xl font-extrabold tracking-tight">
        {values[key] || 0}
      </p>

      <p className="text-[11px] uppercase font-bold tracking-wider opacity-70 mt-0.5">
        {label}
      </p>
    </div>
  ))}
</div>
);
}
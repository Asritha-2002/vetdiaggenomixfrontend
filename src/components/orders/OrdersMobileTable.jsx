import React from "react";
import { Eye, User, Package } from "lucide-react";
import { format } from "date-fns";
import CallInvoice from "../CallInvoice";

const orderStatuses = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
  "refund-completed",
];

const paymentStatuses = ["pending", "completed", "failed"];

export default function OrdersMobileTable({
  orders = [],
  onViewOrder,
  onStatusChange,
  onPaymentStatusChange,
}) {
  if (!orders.length) {
    return (
      <div className="text-center p-6 text-gray-500">
        No orders found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order._id}
          className="border border-gray-300 rounded-xl p-4 bg-white shadow-sm"
        >
          {/* ORDER ID */}
          <div className="flex justify-between items-center">
            <span className="bg-gray-200 px-2 py-1 rounded text-xs font-mono">
              {order._id?.slice(-6)}
            </span>

            <button
              onClick={() => onViewOrder(order)}
              className="flex items-center gap-1 text-blue-600 text-xs"
            >
              <Eye className="w-4 h-4" />
              View
            </button>
          </div>

          {/* CUSTOMER */}
          <div className="flex items-center gap-2 mt-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-sm">
                {order.user?.name || "User"}
              </p>
              <p className="text-xs text-gray-500">
                {order.user?.email || ""}
              </p>
            </div>
          </div>

          {/* ITEMS + TOTAL */}
          <div className="flex justify-between mt-3">
            <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-xs">
              <Package className="w-3 h-3" />
              {order.items?.length || 0} items
            </div>

            <span className="font-semibold text-green-600 text-sm">
              ₹{order.totalAmount}
            </span>
          </div>

          {/* PAYMENT METHOD */}
          <div className="mt-3 text-xs">
            <span className="bg-gray-100 px-2 py-1 rounded">
              {order.payment?.method || "COD"}
            </span>
          </div>

          {/* PAYMENT STATUS */}
          <div className="mt-3">
            <p className="text-xs text-gray-500 mb-1">Payment Status</p>
            <select
              value={order.payment?.status}
              onChange={(e) =>
                onPaymentStatusChange(order._id, e.target.value)
              }
              className="w-full border border-gray-400 rounded px-2 py-1 text-xs"
            >
              {paymentStatuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* ORDER STATUS */}
          <div className="mt-3">
            <p className="text-xs text-gray-500 mb-1">Order Status</p>
            <select
              value={order.status}
              onChange={(e) =>
                onStatusChange(order, e.target.value)
              }
              className="w-full border border-gray-400 rounded px-2 py-1 text-xs"
            >
              {orderStatuses.map((s) => (
                <option key={s} value={s}>
                  {s === "refund-completed" ? "Refunded" : s}
                </option>
              ))}
            </select>
          </div>

          {/* DATE */}
          <div className="mt-3 text-xs text-gray-600">
            {order.createdAt
              ? format(new Date(order.createdAt), "dd MMM yyyy")
              : "-"}
          </div>

          {/* INVOICE */}
          <div className="mt-3">
            {order.payment?.status === "completed" ? (
              <CallInvoice orderId={order._id} />
            ) : order.payment?.status === "failed" ? (
              <span className="text-xs text-red-600 font-medium">
                Payment Failed
              </span>
            ) : (
              <span className="text-xs text-yellow-600 font-medium">
                Payment Pending
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
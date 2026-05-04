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

export default function OrdersTable({
  orders = [],
  onViewOrder,
  onStatusChange,
  onPaymentStatusChange,
}) {
  return (
    <div className="overflow-x-auto w-full">
     <table className="w-max min-w-full text-sm border border-gray-400 rounded-lg whitespace-nowrap">

        {/* HEADER */}
        <thead className="bg-gray-100 text-xs uppercase">
          <tr>
            <th className="p-3 text-left">Order ID</th>
            <th className="p-3 text-left">Customer</th>
            <th className="p-3 text-left">Items</th>
            <th className="p-3 text-left">Total</th>
            <th className="p-3 text-left">Payment</th>
            <th className="p-3 text-left">Pay Status</th>
            <th className="p-3 text-left">Order Status</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Invoice</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="10" className="text-center p-6 text-gray-500">
                No orders found
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr
                key={order._id}
                className="border border-gray-300 hover:bg-gray-50 transition"
              >

                {/* ORDER ID */}
                <td className="p-3">
                  <span className="bg-gray-200 px-2 py-1 rounded text-xs font-mono">
                    {order._id?.slice(-6)}
                  </span>
                </td>

                {/* CUSTOMER */}
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        
                        {order.user?.name || "User"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {order.user?.email || ""}
                      </p>
                    </div>
                  </div>
                </td>

                {/* ITEMS */}
                <td className="p-3">
                  <div className="inline-flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-xs">
                    <Package className="w-3 h-3" />
                    {order.items?.length || 0} items
                  </div>
                </td>

                {/* TOTAL */}
                <td className="p-3 font-semibold text-green-600">
                  ₹{order.totalAmount}
                </td>

                {/* PAYMENT METHOD */}
                <td className="p-3">
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                    {order.payment?.method || "COD"}
                  </span>
                </td>

                {/* PAYMENT STATUS */}
                <td className="p-3">
                  <select
                    value={order.payment?.status}
                    onChange={(e) =>
                      onPaymentStatusChange(order._id, e.target.value)
                    }
                    className="border border-gray-500 rounded px-2 py-1 text-xs"
                  >
                    {paymentStatuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>

                {/* ORDER STATUS */}
                <td className="p-3">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      onStatusChange(order, e.target.value)
                    }
                    className="border border-gray-500 rounded px-2 py-1 text-xs"
                  >
                    {orderStatuses.map((s) => (
                      <option key={s} value={s}>
  {s === "refund-completed" ? "Refunded" : s}
</option>
                    ))}
                  </select>
                </td>

                {/* DATE */}
                <td className="p-3 text-xs text-gray-600">
                  {order.createdAt
                    ? format(new Date(order.createdAt), "dd MMM yyyy")
                    : "-"}
                </td>

                <td className="p-3">
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
                </td>

                {/* ACTIONS */}
                <td className="p-3">
                  <button
                    onClick={() => onViewOrder(order)}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-xs"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                </td>

              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
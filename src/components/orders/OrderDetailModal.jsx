import React from "react";
import {
  X,
  Truck,
  Package,
  User,
  MapPin,
  CreditCard,
  Calculator,
  Gift,
  FileText,
  BookOpen,
  RotateCcw,
} from "lucide-react";
import { format } from "date-fns";
import CallInvoice from "../CallInvoice";

/* ---------------- STATUS BADGE ---------------- */
const statusColors = {
  pending: "bg-amber-100 text-amber-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-violet-100 text-violet-800",
  delivered: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-red-100 text-red-800",
  "refund-completed": "bg-orange-100 text-orange-800",
};

const StatusBadge = ({ status }) => {
  const label = (status || "pending")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <span
      className={`px-2 py-1 text-xs font-semibold rounded-md ${
        statusColors[status] || statusColors.pending
      }`}
    >
      {label}
    </span>
  );
};

/* ---------------- INFO BLOCK ---------------- */
const InfoCard = ({ icon: Icon, title, children }) => (
  <div className="bg-white border border-gray-300 rounded-xl p-4 shadow-sm">
    <div className="flex items-center gap-2 mb-3">
      <Icon className="w-6 h-6 text-gray-600 bg-gray-200/50 rounded p-1" />
      <h3 className="font-semibold text-gray-800">{title}</h3>
    </div>
    {children}
  </div>
);

/* ---------------- MODAL ---------------- */
export default function OrderDetailModal({ order, open, onClose }) {
  if (!open || !order) return null;
  const getStatusStyles = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "failed":
        return "bg-red-100 text-red-700";
      case "pending":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* modal */}
      <div className="relative bg-white w-full max-w-6xl max-h-[95vh] rounded-xl shadow-xl flex flex-col overflow-hidden">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-[#4368e1] to-[#7748d1] text-white p-5 flex justify-between items-start">
          <div className="flex gap-2">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <FileText className="w-8 h-8 bg-gray-200/50 p-1 rounded" />
            </h2>
            <div>
              Order #{order?._id || order?.id}
              <p className="text-sm opacity-80">
                {order?.createdAt &&
                  format(new Date(order.createdAt), "MMM dd, yyyy hh:mm a")}
              </p>
            </div>
          </div>

          <button onClick={onClose}>
            <X className="w-8 h-8 cursor pointer hover:bg-gray-200/50 rounded p-1" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-5 overflow-y-auto space-y-5">
          {/* TOP SUMMARY */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 border border-gray-300 rounded-lg">
              <p className="text-xs text-gray-500">Status</p>
              <StatusBadge status={order?.status} />
            </div>

            <div className="p-3 border border-gray-300 rounded-lg flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-500">Total Items</p>
                <p className="font-bold">{order?.items?.length || 0}</p>
              </div>
              <Package className="w-5 h-5 text-gray-500" />
            </div>

            <div className="p-3 border border-gray-300 rounded-lg flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-500">Total</p>
                <p className="font-bold text-green-600">
                  ₹{order?.totalAmount?.toFixed(2)}
                </p>
              </div>
              <Calculator className="w-5 h-5 text-gray-500" />
            </div>

            <div className="p-3 border border-gray-300 rounded-lg flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-500">Payment</p>
                <p className="font-medium">{order?.payment?.method || "N/A"}</p>
              </div>
              <CreditCard className="w-5 h-5 text-gray-500" />
            </div>
          </div>

          {/* CUSTOMER */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* 80% width */}
            <div className="lg:col-span-3">
              <InfoCard
                icon={User}
                title="Customer Information"
                className="bg-gray-200/50 rounded p-1"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <p className="flex flex-col">
                    <span className="text-gray-500 text-xs font-medium">
                      Name
                    </span>
                    <span className="font-semibold">{order?.user?.name}</span>
                  </p>
                  <p className="flex flex-col">
                    <span className="text-gray-500 text-xs font-medium">
                      Email
                    </span>
                    <span className="font-semibold">{order?.user?.email}</span>
                  </p>
                  <p className="flex flex-col">
                    <span className="text-gray-500 text-xs font-medium">
                      Phone
                    </span>
                    <span className="font-semibold">
                      +91 {order?.shipping?.address?.contactNumber}
                    </span>
                  </p>
                  <p className="flex flex-col">
                    <span className="text-gray-500 text-xs font-medium">
                      Customet ID
                    </span>
                    <span className="font-semibold">{order?.user?._id}</span>
                  </p>
                </div>
              </InfoCard>
            </div>

            {/* 20% width (for future card) */}
            <div className="lg:col-span-2">
              <InfoCard icon={CreditCard} title="Payment Details">
                <div className="text-sm space-y-1">
                  <p className="flex justify-between">
                    <span className="text-gray-500">Method</span>
                    <span className="font-medium">
                      {order?.payment?.method}
                    </span>
                  </p>
                  <p className="flex justify-between items-center">
                    <span className="text-gray-500">Status</span>

                    <span
                      className={`px-2 py-0.5 rounded text-xs font-semibold capitalize ${getStatusStyles(
                        order?.payment?.status,
                      )}`}
                    >
                      {order?.payment?.status}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-500">Order ID</span>
                    <span className="font-medium">
                      {order?.payment?.razorpayOrderId}
                    </span>
                  </p>
                </div>
              </InfoCard>
            </div>
          </div>

          {/* SHIPPING */}

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* 80% width */}
            <div className="lg:col-span-3">
              <InfoCard icon={MapPin} title="Shipping Address">
                <p className="text-sm bg-gray-200 p-4 rounded-md">
                  {/* {console.log(order?.shipping?.address)} */}
                  {order?.shipping?.address?.street},{" "}
                  {order?.shipping?.address?.city},{" "}
                  {order?.shipping?.address?.state},{" "}
                  {order?.shipping?.address?.zipCode}
                </p>
              </InfoCard>
            </div>
            <div className="lg:col-span-2">
              <InfoCard icon={Calculator} title="Summary">
                <div className="text-sm space-y-1">
                  <p className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-medium">
                      ₹{order?.charges?.subtotal?.toLocaleString("en-IN")}
                    </span>
                  </p>

                  <p className="flex justify-between">
                    <span className="text-gray-500">GST</span>
                    <span className="font-medium">
                      ₹{order?.charges?.gst?.toLocaleString("en-IN")}
                    </span>
                  </p>

                  <p className="flex justify-between">
                    <span className="text-gray-500">Delivery</span>
                    <span className="font-medium">
                      ₹{order?.charges?.deliveryCharge?.toLocaleString("en-IN")}
                    </span>
                  </p>

                  <p className="flex justify-between">
                    <span className="text-gray-500">Voucher discount</span>
                    <span className="font-medium">
                      ₹{order?.charges?.paymentCharge?.toLocaleString("en-IN")}
                    </span>
                  </p>

                  <hr className="font-bold text-green-600 text-lg" />
                  <p className="flex justify-between font-bold text-green-600 text-lg">
                    <span className="text-gray-500">Total</span>
                    <span>₹{order?.totalAmount?.toLocaleString("en-IN")}</span>
                  </p>
                </div>
              </InfoCard>
            </div>
          </div>

          {/* REFUND */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* 80% width */}
            <div className="lg:col-span-3">
              {
                order?.shipping?.deliveryPartner &&(
                  <InfoCard icon={Truck} title="Shipping Partner">
                    <div className="flex justify-between bg-[#f5f3ff] p-2 rounded-md">
                      <div>
                        <p className="text-gray-500 text-sm">Partner</p>
                        <p>{order?.shipping?.deliveryPartner?.name}</p>
                    
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Tracking ID</p>
                        <p>{order?.shipping?.deliveryPartner?.trackingId}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Est. Delivery</p>
                       <p>
  {order?.shipping?.deliveryPartner?.estimatedDelivery &&
    new Date(order.shipping.deliveryPartner.estimatedDelivery).toLocaleDateString("en-GB")}
</p>
                      </div>
                    </div>

                  </InfoCard>
                )
              }

            </div>
            <div className="lg:col-span-3">
                      {order?.refundDetails?.reason && (
            <InfoCard icon={RotateCcw} title="Refunded">
  <div className="space-y-3 text-sm">

    {/* Reason */}
    <div className="flex justify-between">
      <span className="text-gray-500">Reason</span>
      <span className="font-medium capitalize">
        {order?.refundDetails?.reason?.replaceAll("-", " ")}
      </span>
    </div>

    {/* Amount */}
    <div className="flex justify-between">
      <span className="text-gray-500">Amount</span>
      <span className="font-semibold text-green-600">
        ₹{order?.refundDetails?.refundAmount?.toLocaleString("en-IN")}
      </span>
    </div>

    {/* Status badge */}
    <div className="flex justify-between items-center">
      <span className="text-gray-500">Status</span>
      <span className="px-2 py-0.5 text-xs font-semibold rounded bg-green-100 text-green-700 border border-green-200">
        Refunded
      </span>
    </div>

  </div>
</InfoCard>
          )}
            </div>

            
            </div>

          {/*  */}
        </div>
      </div>
    </div>
  );
}

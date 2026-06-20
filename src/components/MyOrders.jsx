import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_ORDERS_URL;
const BASE_URL2 = import.meta.env.VITE_BASE_URL;
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CallInvoice from "./CallInvoice";
import { RotateCw } from "lucide-react";
import { Check, X } from "lucide-react";

const CancelModal = ({ open, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    reason: "",
    notes: "",
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg w-full max-w-md p-5 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-red-600">Cancel Order</h2>
          <button onClick={() => onClose()} className="text-gray-500">
            ✕
          </button>
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();

            // ✅ wait for parent API call
            const success = await onSubmit({
              ...form,
              cancelledAt: new Date(),
            });

            // ✅ reset only if success
            if (success) {
              setForm({
                reason: "",
                notes: "",
              });
            }
          }}
          className="space-y-3"
        >
          <select
            required
            value={form.reason}
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
            className="w-full border p-2 rounded"
          >
            <option value="">Select reason</option>
            <option value="customer-request">I changed my mind</option>
            <option value="out-of-stock">Ordered by mistake</option>
            <option value="payment-issue">Found better price</option>
            <option value="shipping-issue">Wrong address</option>
            <option value="quality-issue">Payment issue</option>
            <option value="other">Other</option>
          </select>

          <textarea
            placeholder="Notes"
            className="w-full border p-2 rounded"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => onClose()}
              className="border px-3 py-1 rounded"
            >
              Close
            </button>

            <button
              type="submit"
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const formatDate = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const StatusIndicator = ({ status, date }) => {
  const statusConfig = {
    cancelled: { text: `Cancelled`, color: "text-red-600", bg: "bg-red-600" },
    "refund-completed": {
    text: `Refund Completed`,
    color: "text-purple-600",
    bg: "bg-purple-600",
  },
  pending: {
    text: `Payment pending`,
    color: "text-gray-600",
    bg: "bg-purple-600",
  },
    delivered: {
      text: `Delivered on ${formatDate(date)}`,
      color: "text-green-600",
      bg: "bg-green-600",
    },
    shipped: {
      text: `Deliver by ${formatDate(date)}`,
      color: "text-orange-500",
      bg: "bg-orange-500",
    },
    processing: {
      text: `Deliver by ${formatDate(date)}`,
      color: "text-gray-500",
      bg: "bg-gray-500",
    },

  };

  const config = statusConfig[status] || {
    text: "",
    color: "text-gray-500",
    bg: "bg-gray-500",
  };

  return (
    <div className={`flex items-center gap-2 text-sm ${config.color}`}>
      <div className={`w-2 h-2 rounded-full ${config.bg}`}></div>
      <span>{config.text}</span>
    </div>
  );
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelOrderId, setCancelOrderId] = useState(null);
  const navigate = useNavigate();

  // ✅ REVIEW STATE
  const [reviewData, setReviewData] = useState({
    orderId: null,
    rating: 0,
    review: "",
  });

  const [reviews, setReviews] = useState({});

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/my-order`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ✅ FETCH REVIEW WHEN ORDER SELECTED
  useEffect(() => {
    if (!selectedOrder) return;

    const fetchReview = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL2}/order-reviews/my/${selectedOrder._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        const review = res.data.review;

        if (review) {
          setReviews((prev) => ({
            ...prev,
            [selectedOrder._id]: review,
          }));
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchReview();
  }, [selectedOrder]);

  const filterOrders = () => {
    if (activeTab === "all") return orders;
    if (activeTab === "cancelled") {
    return orders.filter(
      (order) =>
        order.status === "cancelled" ||
        order.status === "refund-completed"
    );
  }
    return orders.filter((order) => order.status === activeTab);
  };

  const getExpectedDelivery = (createdAt) => {
    const date = new Date(createdAt);
    date.setDate(date.getDate() + 5);
    return date;
  };

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getReturnPolicyDate = (deliveryDate) => {
    const date = new Date(deliveryDate);
    date.setDate(date.getDate() + 5);
    return date;
  };

  const getRefundDate = (cancelDate) => {
    const date = new Date(cancelDate);
    date.setDate(date.getDate() + 5);
    return date;
  };

  const handleCancelOrder = async (data) => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/cancel/${cancelOrderId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      toast.success(res.data.message || "Order cancelled successfully");

      setShowCancelModal(false);
      setCancelOrderId(null);
      fetchOrders();
      setSelectedOrder(null);

      return true; // ✅ important
    } catch (err) {
      console.error(err);

      toast.error(err.response?.data?.message || "Failed to cancel order");

      return false; // ❌ important
    }
  };

  // ✅ SUBMIT REVIEW
  const handleSubmitReview = async (orderId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${BASE_URL2}/order-reviews`,
        {
          orderId,
          rating: reviewData.rating,
          review: reviewData.review,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // store review
      setReviews((prev) => ({
        ...prev,
        [orderId]: res.data.review,
      }));

      // reset
      setReviewData({
        orderId: null,
        rating: 0,
        review: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-2 min-h-[400px]">
      {selectedOrder ? (
        (() => {
          const order = selectedOrder;
          const item = order.items?.[0];

          const deliveryDate =
            order.deliveryPartner?.estimatedDelivery ||
            getExpectedDelivery(order.createdAt);

          return (
            <div>
              <div
                className="flex items-center gap-2 mb-3 cursor-pointer"
                onClick={() => setSelectedOrder(null)}
              >
                <span className="text-2xl mb-1">‹</span>
                <p className="font-semibold text">Order ID: {order._id}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* LEFT */}
                <div className="md:col-span-2 border border-gray-400 rounded p-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-300 pb-4 gap-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <img
                        src={item?.imageUrl}
                        className="w-20 h-20 flex-shrink-0"
                      />

                      <div className="flex flex-col justify-between">
                        <div>
                          <h3 className="text-[#b50b0b] font-semibold">
                            {item?.name}
                          </h3>
                          <p className="text-sm">Qty: {item?.quantity}</p>
                        </div>

                        <div>
                          <p className="font-semibold">
                            ₹
                            {order.charges?.totalAmount?.toLocaleString(
                              "en-IN",
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      className="bg-[#b50b0b] text-white px-4 py-2 rounded cursor-pointer self-start sm:self-auto flex items-center gap-2"
                      onClick={() => navigate(`/product/${item?.book?._id}`)}
                    >
                      <RotateCw size={16} />
                      Reorder
                    </button>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-semibold mb-3">Order Status:</h4>

                    <div className="relative">
                      {/* LINE */}
                      

                      {/* ORDER PLACED */}
                      <div className="flex items-center gap-3 mb-4 relative">
                        <Check size={20} color="white" className="bg-green-500 rounded-full p-1" />
                        <p>
  {order?.payment?.status === "pending"
    ? "Payment Pending"
    : order?.payment?.status === "failed"
    ? "Payment Failed"
    : `Order Placed on ${formatDate(order.createdAt)}`}
</p>
                      </div>

                      {/* SHIPPED */}
                      {(order.status === "shipped") && (
                        <div className="flex items-center gap-3 mb-4 relative">
                          <Check size={20} color="white" className="bg-orange-500 rounded-full p-1" />
                          <p>Shipped on {formatDate(order.updatedAt)}</p>
                        </div>
                      )}

                      {/* DELIVERED */}
                      {order.status === "delivered" && (
                        <div className="flex items-center gap-3 mb-4 relative">
                          <Check size={20} color="white" className="bg-green-500 rounded-full p-1" />
                          <p>Delivered on {formatDate(order.updatedAt)}</p>
                        </div>
                      )}

                      {/* CANCELLED */}
                      {order.status === "cancelled" && (
                        <div className="flex items-center gap-3 mb-4 relative">
                          <X size={18} color="white" className="bg-red-600 rounded-full p-1" />
                          <p>Cancelled on {formatDate(order.updatedAt)}</p>
                        </div>
                      )}
                      {order.status === "refund-completed" && (
  <div className="flex items-center gap-3 mb-4 relative">
    <RotateCw size={20} color="white" className="bg-purple-600 rounded-full p-1" />
    <p>Refund issued on {formatDate(order.updatedAt)}</p>
  </div>
)}
                    </div>

                    {/* EXTRA INFO */}
                    {order.status === "delivered" && (
                      <p className="text-xs text-gray-500 mt-2">
                        Return Policy ends on{" "}
                        {formatDate(getReturnPolicyDate(deliveryDate))}
                      </p>
                    )}

                    {order.status === "cancelled" && (
                      <p className="text-xs text-gray-500 mt-2">
                        Refund amount credited by{" "}
                        {formatDate(getRefundDate(order.updatedAt))}
                      </p>
                    )}

                    {(order.status === "processing" ||
                      order.status === "shipped") && (
                      <>
                        <p className="text-sm mt-2">
                          Expected Delivery will be on{" "}
                          {formatDate(deliveryDate)}
                        </p>

                        <button
                          onClick={() => {
                            setCancelOrderId(order._id);
                            setShowCancelModal(true);
                          }}
                          className="mt-2 text-sm underline text-gray-600 hover:text-red-600"
                        >
                          Cancel Order
                        </button>
                      </>
                    )}
                  </div>

                  <div className="mt-6 border-t border-gray-300 pt-4">
                    <h4 className="text-[#b50b0b] font-semibold mb-2">
                      Delivery Details:
                    </h4>

                    <p>{order.shipping?.address?.street}</p>
                    <p>
                      {order.shipping?.address?.city},{" "}
                      {order.shipping?.address?.state}
                    </p>
                    <p>{order.shipping?.address?.zipCode}</p>
                    <p>{order.shipping?.address?.country}</p>
                    <p>+91 {order.shipping?.address?.contactNumber}</p>
                  </div>
                </div>

                {/* RIGHT */}
                {order?.payment?.status === "completed" && (
                <div className="border border-gray-400 rounded p-4 h-auto self-start">
                  <h4 className="font-semibold mb-2">Order Summary</h4>
                  <div className="border-b border-gray-400"></div>

                  <div className="flex justify-between my-2">
                    <span>Amount Paid</span>
                    <span className="font-semibold ">
                      ₹{order.charges?.totalAmount?.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div>
                    <CallInvoice orderId={order._id} />
                  </div>

                  {/* REVIEW */}
                  {order.status === "delivered" && (
                    <div className="mt-6">
                      {reviews[order._id] ? (
                        <>
                          <h3 className="font-bold text-xl">Your Review</h3>
                          <div className="flex gap-1 my-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span key={star}>
                                {reviews[order._id].rating >= star ? "⭐" : "☆"}
                              </span>
                            ))}
                          </div>
                          <p>{reviews[order._id].review}</p>
                        </>
                      ) : (
                        <div className="border border-gray-300 px-4 py-3 rounded">
                          <h3 className="font-bold text-md">
                            Write Your Review
                          </h3>

                          <div className="flex gap-1 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                className="cursor-pointer text-xl"
                                onClick={() =>
                                  setReviewData({
                                    ...reviewData,
                                    rating: star,
                                    orderId: order._id,
                                  })
                                }
                              >
                                {reviewData.rating >= star ? "⭐" : "☆"}
                              </span>
                            ))}
                          </div>

                          <textarea
                            className="w-full border border-gray-300 rounded-md p-2 text-[10px]"
                            value={
                              reviewData.orderId === order._id
                                ? reviewData.review
                                : ""
                            }
                            onChange={(e) =>
                              setReviewData({
                                ...reviewData,
                                review: e.target.value,
                                orderId: order._id,
                              })
                            }
                            placeholder="Type your review..................."
                          />

                          <button
                            onClick={() => handleSubmitReview(order._id)}
                            className="w-full bg-[#b50b0b] text-white py-2 mt-2 rounded "
                          >
                            Submit
                          </button>
                          
                        </div>
                      )}
                    </div>
                  )}
                </div>
                )}
              </div>
            </div>
          );
        })()
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">My Orders</h2>

          <div className="flex gap-6 border-b mb-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
            {["all", "processing", "delivered", "shipped", "cancelled"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 flex-shrink-0 ${
                    activeTab === tab
                      ? "border-b-2 border-[#b50b0b] text-[#b50b0b]"
                      : "text-gray-500"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ),
            )}
          </div>

          <div className="space-y-4">

            {filterOrders().length === 0 ? (
    <div className="border border-gray-300 rounded-lg p-6 text-center text-gray-500">
      No orders found
    </div>
  ) : (
            filterOrders().map((order) => {
              const item = order.items?.[0];

              const deliveryDate =
                order.deliveryPartner?.estimatedDelivery ||
                getExpectedDelivery(order.createdAt);

              return (
                <div
                  key={order._id}
                  className="flex flex-col sm:flex-row sm:justify-between border border-gray-400 rounded-lg p-4 gap-4"
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    <img
                      src={item?.imageUrl}
                      className="w-20 h-20 rounded flex-shrink-0"
                    />

                    <div className="flex flex-col justify-between">
                      <div>
                        <h3 className="text-[#b50b0b] font-semibold">
                          {item?.name}
                        </h3>

                        <p className="text-sm">
                          <span className="font-semibold">Order ID:</span>

                          <span className="sm:ml-2 break-all text-gray-700 text-[10px] sm:text-xs md:text-sm lg:text-base">
                            {order._id}
                          </span>
                        </p>
                      </div>

                      <StatusIndicator
                        status={order.status}
                        date={
                          order.status === "cancelled"
                            ? order.updatedAt
                            : deliveryDate
                        }
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text font-semibold underline italic cursor-pointer self-start sm:self-center"
                  >
                    View Details →
                  </button>
                </div>
              );
            })
          )}
          </div>
        </>
      )}
      <CancelModal
        open={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onSubmit={handleCancelOrder}
      />
    </div>
  );
};

export default MyOrders;

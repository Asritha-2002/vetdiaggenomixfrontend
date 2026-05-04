import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { ShoppingCart, Search } from "lucide-react";
import { useLocation } from "react-router-dom";

import OrderStatsCards from "../components/orders/OrderStatsCards";
import OrdersTable from "../components/orders/OrdersTable";
import OrdersMobileTable from "../components/orders/OrdersMobileTable";
import OrderPagination from "../components/appointments/OrderPagination";
import OrderDetailModal from "../components/orders/OrderDetailModal";
import ShippingModal from "../components/orders/ShippingModal";
import CancellationModal from "../components/orders/CancellationModal";
import RefundModal from "../components/orders/RefundModal"

import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_ORDERS_URL;
const PAGE_SIZE = 10;

const AdminOrders = () => {

const location = useLocation();
const queryParams = new URLSearchParams(location.search);
const userId = queryParams.get("userId");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);

  // View Modal
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ Shipping Modal
  const [shippingModalOpen, setShippingModalOpen] = useState(false);
  const [selectedOrderForShipping, setSelectedOrderForShipping] = useState(null);

  // ✅ Cancellation Modal
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedOrderForCancel, setSelectedOrderForCancel] = useState(null);

  //refund

  const [refundModalOpen, setRefundModalOpen] = useState(false);
const [selectedOrderForRefund, setSelectedOrderForRefund] = useState(null);

  // ---------------- FETCH ORDERS ----------------
  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${BASE_URL}/my-orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setOrders(res.data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  useEffect(() => {
  if (!userId || !orders.length) return;

  const userOrder = orders.find(
    (order) => order.user?._id === userId
  );

  if (userOrder) {
    setSelectedOrder(userOrder);
    setIsModalOpen(true);
  }
}, [userId, orders]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  // ---------------- FILTER ----------------
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const term = search.toLowerCase();

      const matchesSearch =
        !term ||
        order._id?.toLowerCase().includes(term) ||
        order.user?.name?.toLowerCase().includes(term) ||
        order.user?.email?.toLowerCase().includes(term);

      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  // ---------------- PAGINATION ----------------
  const totalPages = Math.ceil(filteredOrders.length / PAGE_SIZE);

  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredOrders.slice(start, start + PAGE_SIZE);
  }, [filteredOrders, currentPage]);

  // ---------------- VIEW ORDER ----------------
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  // ---------------- API ----------------
  const updateOrderStatus = async (orderId, data) => {
    if (!orderId) {
      toast.error("Order ID missing");
      return false;
    }

    try {
      await axios.patch(`${BASE_URL}/${orderId}/status`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success(`Order updated to ${data.status}`);
      fetchOrders();
      return true;
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Update failed");
      return false;
    }
  };

  // ---------------- STATUS CHANGE ----------------
  const handleStatusChange = (order, newStatus) => {
    if (!order?._id) {
      toast.error("Invalid order");
      return;
    }

    // ✅ SHIPPED → open modal
    if (newStatus === "shipped") {
      setSelectedOrderForShipping(order);
      setShippingModalOpen(true);
      return;
    }

    // ✅ CANCELLED → open modal
    if (newStatus === "cancelled") {
      setSelectedOrderForCancel(order);
      setCancelModalOpen(true);
      return;
    }

    if (newStatus === "refund-completed") {
    setSelectedOrderForRefund(order);
    setRefundModalOpen(true);
    return;
  }

    // ✅ Others → direct update (pending, processing, delivered)
    updateOrderStatus(order._id, { status: newStatus });
  };

  // ---------------- SHIPPING SUBMIT ----------------
  const handleShippingSubmit = async (formData) => {
    if (!selectedOrderForShipping?._id) {
      toast.error("Order not found");
      return;
    }

    const success = await updateOrderStatus(
      selectedOrderForShipping._id,
      {
        status: "shipped",
        shippingDetails: formData,
      }
    );

    if (success) {
      setShippingModalOpen(false);
      setSelectedOrderForShipping(null);
    }
  };

  // ---------------- CANCEL SUBMIT ----------------
  const handleCancelSubmit = async (formData) => {
    if (!selectedOrderForCancel?._id) {
      toast.error("Order not found");
      return;
    }

    const success = await updateOrderStatus(
      selectedOrderForCancel._id,
      {
        status: "cancelled",
        cancellationDetails: formData,
      }
    );

    if (success) {
      setCancelModalOpen(false);
      setSelectedOrderForCancel(null);
    }
  };
const handleRefundSubmit = async (formData) => {
  if (!selectedOrderForRefund?._id) return;

  const success = await updateOrderStatus(
    selectedOrderForRefund._id,
    {
      status: "refund-completed",
      refundDetails: formData,
    }
  );

  if (success) {
    setRefundModalOpen(false);
    setSelectedOrderForRefund(null);
  }
};
  

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">

      {/* HEADER */}
     <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center mb-6 gap-6">

  {/* LEFT SIDE - Fixed width container */}
  <div className="flex items-center gap-4 flex-shrink-0">
    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
      <ShoppingCart className="text-white w-6 h-6" />
    </div>

    <div>
      <h1 className="text-2xl font-bold">Orders</h1>
      <p className="text-sm text-muted-foreground">
        Manage orders & shipping
      </p>
    </div>
  </div>

  {/* RIGHT SIDE - Responsive Wrapping Stats */}
  {!loading && (
    <div className="w-full">
  <OrderStatsCards orders={orders} />
</div>
  )}

</div>

      {/* SEARCH */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input
            className="w-full border border-gray-400 pl-10 py-2 rounded-md"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="border border-gray-400 px-3 py-2 rounded-md"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
          <option value="refund-completed">Refunded</option>
        </select>
      </div>

      {/* TABLE */}


      {!loading && (
        <div className="">
     {/* MOBILE + TABLET */}
<div className="block lg:hidden">
  <OrdersMobileTable
    orders={paginatedOrders}
    onViewOrder={handleViewOrder}
    onStatusChange={handleStatusChange}
  />
</div>

{/* DESKTOP ONLY */}
<div className="hidden lg:block w-full">
  
  <div className="w-full overflow-x-auto">
    
    <div className="w-max min-w-full">
      <OrdersTable
        orders={paginatedOrders}
        onViewOrder={handleViewOrder}
        onStatusChange={handleStatusChange}
      />
    </div>

  </div>
</div>
          <OrderPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalOrders={filteredOrders.length}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {/* MODALS */}
      <OrderDetailModal
        order={selectedOrder}
        open={isModalOpen}
        onClose={handleCloseModal}
      />

      <ShippingModal
        open={shippingModalOpen}
        onClose={() => setShippingModalOpen(false)}
        onSubmit={handleShippingSubmit}
      />

      <CancellationModal
        open={cancelModalOpen}
        onClose={()=>setCancelModalOpen(false)}
        onSubmit={handleCancelSubmit}
      />

      <RefundModal
  open={refundModalOpen}
  onClose={() => setRefundModalOpen(false)}
  onSubmit={handleRefundSubmit}
/>
    </div>
  );
};

export default AdminOrders;
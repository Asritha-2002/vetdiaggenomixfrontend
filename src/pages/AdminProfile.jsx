import React, { useEffect, useState } from "react";
import axios from "axios";
import StatsCard from "../components/adminDashboard/StatsCard";
import SalesChart from "../components/adminDashboard/SalesChart"; // 👈 ADD THIS
import { FaExclamationTriangle } from "react-icons/fa";

import {
  ShoppingBag,
  IndianRupee,
  Users,
  BookOpen,
  Clock,
  Truck,
  TrendingUp,
  XCircle,
} from "lucide-react";
import TopProducts from "../components/adminDashboard/TopProducts";

const BASE_URL = import.meta.env.VITE_BASE_URL_ADMIN;

const AdminProfile = () => {
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState({
    week: [],
    month: [],
    year: [],
  });

  const [loading, setLoading] = useState(true);
  const [topProducts, setTopProducts] = useState([]);
  const [error, setError] = useState("");

  // ================= FETCH STATS =================
  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${BASE_URL}/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStats(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Stats error");
    }
  };

  // ================= FETCH ANALYTICS =================
  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem("token");

      const [weekRes, monthRes, yearRes] = await Promise.all([
        axios.get(`${BASE_URL}/stats/timeframe/week`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${BASE_URL}/stats/timeframe/month`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${BASE_URL}/stats/timeframe/year`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setChartData({
        week: weekRes.data.data,
        month: monthRes.data.data,
        year: yearRes.data.data,
      });
    } catch (err) {
      console.error("Chart error:", err);
    }
  };

  // ================= INIT =================
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchStats();
      await fetchAnalytics();
      setLoading(false);
    };

    load();
  }, []);

useEffect(() => {
  const fetchTopProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BASE_URL}/stats/top-products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTopProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchTopProducts();
}, []);
const handleRetry = async () => {
  try {
    setLoading(true);
    setError(""); // ✅ clear previous error

    await fetchStats();
    await fetchAnalytics();

    // ✅ also refetch top products
    const token = localStorage.getItem("token");
    const res = await axios.get(`${BASE_URL}/stats/top-products`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTopProducts(res.data);

  } catch (err) {
    setError(err.response?.data?.message || "Retry failed");
  } finally {
    setLoading(false);
  }
};

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-500 rounded-full animate-ping mx-auto"></div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">
            Loading appointments...
          </p>
        </div>
      </div>
    );
  }

  // ================= ERROR =================
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-red-100 mb-4">
                  <FaExclamationTriangle className="text-red-500 text-3xl" />
                </div>
      
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Unable to Load dashboard
                </h2>
      
                <p className="text-gray-500 mb-6">{error}</p>
      
                <button
  onClick={handleRetry}
  className="px-6 py-3 text-white rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transition"
>
  Try Again
</button>
              </div>
            </div>
    );
  }

  // ================= UI =================
  return (
   <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8">

  {/* STATS GRID */}
  <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">

    <StatsCard
      title="Total Orders"
      value={stats.totalOrders || 0}
      icon={ShoppingBag}
      gradient="bg-blue-500"
    />

    <StatsCard
      title="Total Revenue"
      value={`₹${stats.totalRevenue || 0}`}
      subtitle={`This Week: ₹${stats.thisWeek?.revenue || 0}`}
      icon={IndianRupee}
      gradient="bg-emerald-500"
    />

    <StatsCard
      title="Total Users"
      value={stats.totalUsers || 0}
      // subtitle={`New Today: ${stats.today?.newUsers || 0}`}
      icon={Users}
      gradient="bg-violet-500"
    />

    <StatsCard
      title="Total Products"
      value={stats.totalBooks || 0}
      icon={BookOpen}
      gradient="bg-orange-500"
    />

    <StatsCard
      title="Pending Orders"
      value={stats.pendingOrders || 0}
      icon={Clock}
      gradient="bg-yellow-500"
    />

    <StatsCard
      title="Delivered Orders"
      value={stats.deliveredOrders || 0}
      icon={Truck}
      gradient="bg-green-500"
    />

    <StatsCard
      title="This Week Revenue"
      value={`₹${stats.thisWeek?.revenue || 0}`}
      icon={TrendingUp}
      gradient="bg-indigo-500"
    />

    <StatsCard
      title="Out of Stock"
      value={stats.inventory?.outOfStock || 0}
      icon={XCircle}
      gradient="bg-red-500"
      badge={
        stats.inventory?.outOfStock > 0 && (
          <span className="text-[10px] sm:text-xs px-2 py-1 bg-red-50 text-red-500 rounded-full flex items-center gap-1">
            <FaExclamationTriangle />
            Alert
          </span>
        )
      }
    />
  </div>

  {/* SALES CHART */}
  <div className="mt-6 sm:mt-8 md:mt-10 w-full overflow-x-auto">
    <div className="min-w-[300px] sm:min-w-full">
      <SalesChart data={chartData} />
    </div>
  </div>

  {/* TOP PRODUCTS */}
  <div className="bg-[#FFFFFF] mt-4 sm:mt-6 rounded-xl w-full overflow-x-auto">
    <div className="min-w-[300px] sm:min-w-full">
      <TopProducts books={topProducts} />
    </div>
  </div>

</div>
  );
};

export default AdminProfile;
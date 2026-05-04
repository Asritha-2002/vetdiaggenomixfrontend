import React, { useState } from "react";
const BASE_URL = import.meta.env.VITE_ORDERS_URL;
import toast from "react-hot-toast";
import { Download } from "lucide-react";

const AdminCallInvoice = ({ orderId }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    const token = localStorage.getItem("token");

    try {
      setLoading(true);

      const res = await fetch(
        `${BASE_URL}/${orderId}/invoices`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error("Invoice generation failed");
      }

      const pdfUrl = data.invoice.url;

      if (!pdfUrl) {
        throw new Error("Invoice URL not found");
      }

      window.open(pdfUrl, "_blank");

    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
  <button
    onClick={handleClick}
    disabled={loading}
    style={{
      padding: "10px 15px",
      background: loading ? "#ccc" : "white",
      color: loading ? "#666" : "#b50b0b",
      border: "1px solid #b50b0b",
      borderRadius: "5px",
      cursor: loading ? "not-allowed" : "pointer",
      transition: "0.2s ease",
      display: "flex",
      alignItems: "center",
      gap: "6px", // space between icon & text
    }}
  >
    {/* ICON */}
    <Download size={16} color={loading ? "#666" : "#b50b0b"} />

    {/* TEXT */}
    {loading ? "Downloading..." : "Download Invoice"}
  </button>
</div>
  );
};

export default AdminCallInvoice;
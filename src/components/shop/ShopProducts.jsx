import React from "react";
import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ShopProducts = ({ products = [] }) => {
  // ✅ Group products by category
  const groupedProducts = products.reduce((acc, item) => {
    const category = item.category || "Uncategorized";

    if (!acc[category]) {
      acc[category] = [];
    }

    acc[category].push(item);

    return acc;
  }, {});
  const navigate=useNavigate()

  return (
    <div id="products-section">
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-12">

        {/* Render Categories */}
        {Object.entries(groupedProducts).map(([category, items]) => (
          <div key={category} className="mb-3">

            {/* Category Title */}
            <h2 className="text-left text-2xl font-bold mb-6 text-black">
              For {category}s
            </h2>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-8">
              {items.map((item) => (
                <div
  key={item._id}
  className={`relative bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col transition-all hover:shadow-md ${
    item.stock === 0 ? "opacity-70 pointer-events-none" : ""
  }`}
>
                  {/* Product Image */}
                  <div className="w-full h-48 bg-gray-50 rounded-xl mb-4 overflow-hidden relative">
  <img
    src={item.images?.[0]?.url || item.images?.[0]}
    alt={item.title}
    className="w-full h-full object-cover"
  />

  {/* ✅ OUT OF STOCK UI */}
  {item.stock === 0 && (
    <>
      <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] z-10"></div>

      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="border border-red-400 text-red-600 font-semibold px-6 py-2 rounded bg-white shadow">
          Upcoming kit
        </div>
      </div>
    </>
  )}
</div>

                  {/* Title & Price */}
                 {/* Title and Price Row */}
<div className="flex justify-between items-start gap-2 mb-1">
  {/* Title: Left aligned, takes up remaining space, allows wrapping */}
  <h3 className="text-[16px] font-bold text-[#1a1a1a] leading-[1.2] flex-1">
    {item.title}
  </h3>

  {/* Price: Right aligned, specific width to prevent jumping, styled like the image */}
  <div className="flex flex-col items-end text-right min-w-[70px]">
    <div className="flex items-start">
      <span className="text-[14px] font-bold mt-0.5 mr-1">₹</span>
      <span className="text-[18px] font-bold tracking-tight">
        {Number(item.price).toLocaleString("en-IN")}
      </span>
    </div>
  </div>
</div>


                  {/* Subtitle */}
                  <p className="text-sm text-gray-600 mb-3">
                    Rapid Test Kit
                  </p>

                  {/* Features */}
                  <ul className="space-y-1.5 mb-6 flex-grow">
                    {item.productDetails?.slice(0, 3).map((detail, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-[12px] text-gray-700"
                      >
                        <span className="text-green-500 font-bold">✔</span>
                        <span className="line-clamp-1">
                          {detail.value || detail.label}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Buttons */}
                  <div className="flex gap-2">
                    <button 
                    onClick={() => navigate(`/product/${item._id}`)}
                    className="flex-grow bg-[#b50b0b] hover:bg-red-700 text-white text-sm font-bold py-2 rounded transition-colors">
                      View details
                    </button>
                    <button className="p-2.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
  <ShoppingBag size={18} className="text-gray-600" />
</button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default ShopProducts;
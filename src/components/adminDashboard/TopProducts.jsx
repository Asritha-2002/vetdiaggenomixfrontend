import React from "react";
import { motion } from "framer-motion";

export default function TopProducts({
  books = [],
  title = "Top Products",
  subtitle = "Best sellers this month",
}) {
  if (!books.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card rounded-2xl p-3 sm:p-4 md:p-6 shadow-sm w-full min-w-0"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6 gap-2">
        <div className="min-w-0">
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-card-foreground truncate">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground truncate">
            {subtitle}
          </p>
        </div>
      </div>

      {/* List */}
      <div className="space-y-2 sm:space-y-3">
        {books.map((book, index) => {
          const maxPurchases = books[0]?.statistics?.purchases || 1;
          const percentage = Math.round(
            (book.statistics.purchases / maxPurchases) * 100
          );

          return (
            <motion.div
              key={book._id || index}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="flex items-center gap-2 sm:gap-3 md:gap-4 p-2 sm:p-3 rounded-xl hover:bg-gray-50 transition-colors w-full min-w-0"
            >
              {/* Rank */}
              <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white text-xs sm:text-sm font-bold">
                #{index + 1}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-semibold text-card-foreground truncate">
                  {book.title}
                </p>

                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-violet-500 via-purple-500 to-blue-500 rounded-full"
                    />
                  </div>

                  <span className="text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
                    {book.statistics.purchases} sold
                  </span>
                </div>
              </div>

              {/* Price */}
              <p className="text-xs sm:text-sm md:text-base font-bold text-emerald-600 flex-shrink-0">
                ₹{book.price.toLocaleString()}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
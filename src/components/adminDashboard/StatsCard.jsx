import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  gradient = "bg-blue-500",
  growth,
  badge,
  delay = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative w-full min-w-0 bg-white rounded-2xl p-3 sm:p-4 md:p-6 shadow-sm hover:shadow-xl transition-all overflow-hidden"
    >
      {/* Background glow */}
      <div className={`absolute -top-10 -right-10 w-24 sm:w-32 h-24 sm:h-32 ${gradient} opacity-10 rounded-full`} />

      <div className="relative z-10 min-w-0">
        {/* Top Row */}
        <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4 min-w-0">
          
          {/* Icon */}
          <div className={`flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 ${gradient} rounded-xl flex items-center justify-center text-white`}>
            <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>

          {/* Growth */}
          {growth !== undefined && (
            <div
              className={`flex-shrink-0 flex items-center gap-1 text-[10px] sm:text-xs font-semibold px-2 py-1 rounded-full ${
                growth >= 0
                  ? "text-green-600 bg-green-50"
                  : "text-red-600 bg-red-50"
              }`}
            >
              {growth >= 0 ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {growth > 0 ? "+" : ""}
              {growth}%
            </div>
          )}

          {/* Badge */}
          {badge && <div className="flex-shrink-0">{badge}</div>}
        </div>

        {/* Content */}
        <h3 className="text-gray-500 text-xs sm:text-sm truncate">
          {title}
        </h3>

        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mt-1 truncate">
          {value}
        </h2>

        {subtitle && (
          <p className="text-[10px] sm:text-xs text-gray-400 mt-1 sm:mt-2 truncate">
            {subtitle}
          </p>
        )}
      </div>
    </motion.div>
  );
}
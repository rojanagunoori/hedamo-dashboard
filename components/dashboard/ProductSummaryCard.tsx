import React from "react";

interface ProductSummaryCardProps {
  title: string;
  value: string | number;
}

export default function ProductSummaryCard({
  title,
  value,
}: ProductSummaryCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow hover:shadow-lg transition-all duration-300">
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
        {value}
      </h3>
    </div>
  );
}

"use client";
import React from "react";
import ScoreGauge from "@/components/charts/ScoreGauge";
import ProductSummaryCard from "@/components/dashboard/ProductSummaryCard";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Hedamo Transparency Overview</h1>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProductSummaryCard title="Total Products" value="24" />
        <ProductSummaryCard title="Average Score" value="78" />
        <ProductSummaryCard title="Pending Reviews" value="5" />
      </div>

      {/* Score Gauge */}
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow">
        <h2 className="text-lg font-semibold mb-4">AI Transparency Index</h2>
        <ScoreGauge score={78} />
      </div>
    </div>
  );
}

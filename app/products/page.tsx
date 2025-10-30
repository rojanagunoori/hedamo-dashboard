"use client";
import React from "react";
import Link from "next/link";
import mockProducts from "@/app/api/mock-data";

export default function ProductsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Product Catalog</h1>
      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow rounded-xl">
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-gray-500 border-b dark:border-gray-700">
              <th className="p-4">Product Name</th>
              <th className="p-4">Transparency Score</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockProducts.map((p) => (
              <tr key={p.productName} className="border-b dark:border-gray-700">
                <td className="p-4 font-medium">{p.productName}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      p.score >= 80
                        ? "bg-green-500"
                        : p.score >= 50
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {p.score}
                  </span>
                </td>
                <td className="p-4">{p.flags.length > 0 ? "Review Needed" : "Verified"}</td>
                <td className="p-4">
                  <Link
                    href={`/products/${encodeURIComponent(p.productName)}`}
                    className="text-blue-600 hover:underline"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

"use client";
import { useParams } from "next/navigation";
import mockProducts from "@/app/api/mock-data";

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = mockProducts.find((p) => p.productName === id);

  if (!product) return <p>Product not found.</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">{product.productName}</h1>
      <p className="text-gray-600 dark:text-gray-400">{product.explanation}</p>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl">
        <h2 className="font-semibold mb-2">AI Suggestions</h2>
        <ul className="list-disc list-inside space-y-1">
          {product.suggestions.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl">
        <h2 className="font-semibold mb-2">Risk Flags</h2>
        <div className="flex flex-wrap gap-2">
          {product.flags.map((f, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm"
            >
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

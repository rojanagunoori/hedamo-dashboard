"use client"
import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"

const MOCK_PRODUCTS = [
  {
    id: "p1",
    productName: "Organic Herbal Tea",
    score: 72,
    status: "Published",
    explanation: "Moderate transparency. Missing sourcing details for 2 ingredients.",
    suggestions: ["Add sourcing details for green tea leaves.", "Include certification ID for 'organic' claim.", "Clarify packaging recyclability."],
    flags: ["Incomplete sourcing", "Unverified organic claim"],
  },
  {
    id: "p2",
    productName: "Sustainably Sourced Olive Oil",
    score: 88,
    status: "Published",
    explanation: "High transparency. All certifications present.",
    suggestions: ["Add batch-level traceability docs."],
    flags: [],
  },
]

export default function ProductPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    if (id) {
      // Decode URL and match product by name
      const decoded = decodeURIComponent(id)
      const found = MOCK_PRODUCTS.find(
        (p) => p.productName.toLowerCase() === decoded.toLowerCase()
      )
      setProduct(found)
    }
  }, [id])

  if (!product) {
    return <div className="p-6">Product not found.</div>
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-2">{product.productName}</h1>
      <div className="text-gray-600 mb-4">{product.explanation}</div>
      <div className="mb-4">Score: {product.score} / 100</div>
      <div>Status: {product.status}</div>

      <h3 className="mt-6 font-medium">Suggestions</h3>
      <ul className="list-disc ml-5 text-sm">
        {product.suggestions.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>

      <h3 className="mt-6 font-medium">Flags</h3>
      <ul className="list-disc ml-5 text-sm">
        {product.flags.length ? product.flags.map((f, i) => <li key={i}>{f}</li>) : <li>None</li>}
      </ul>
    </div>
  )
}

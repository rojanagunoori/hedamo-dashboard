const mockProducts = [
  {
    productName: "Organic Herbal Tea",
    score: 72,
    explanation: "Moderate transparency. Missing sourcing details for 2 ingredients.",
    suggestions: [
      "Add sourcing details for green tea leaves.",
      "Include certification ID for 'organic' claim.",
      "Clarify packaging recyclability."
    ],
    flags: ["Incomplete sourcing", "Unverified organic claim"]
  },
  {
    productName: "Cold Pressed Coconut Oil",
    score: 88,
    explanation: "Good transparency. Lacks supplier certifications for packaging.",
    suggestions: ["Add packaging supplier certification details."],
    flags: []
  }
];

export default mockProducts;

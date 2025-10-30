"use client";
import React from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from "recharts";

interface ScoreGaugeProps {
  score: number;
}

export default function ScoreGauge({ score }: ScoreGaugeProps) {
  const data = [
    {
      name: "Transparency",
      value: score,
      fill:
        score >= 80
          ? "#22c55e" // green
          : score >= 60
          ? "#eab308" // yellow
          : "#ef4444", // red
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-40 h-40">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="70%"
            outerRadius="100%"
            barSize={15}
            data={data}
            startAngle={180}
            endAngle={0}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar
              minAngle={15}
              clockWise
              dataKey="value"
              cornerRadius={10}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xl font-semibold mt-2">{score}%</p>
      <p className="text-sm text-gray-500">Transparency Score</p>
    </div>
  );
}

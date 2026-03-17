"use client";

import Card, { CardContent, CardHeader } from "@/components/ui/Card";

interface SimilarityBreakdownProps {
  breakdown: {
    greeks: number;
    volatility: number;
    sentiment: number;
    market: number;
  };
  overall: number;
}

export default function SimilarityBreakdown({ breakdown, overall }: SimilarityBreakdownProps) {
  const dimensions = [
    { label: "Greeks Profile", key: "greeks" as const, weight: 30, color: "bg-blue-500" },
    { label: "Volatility Regime", key: "volatility" as const, weight: 30, color: "bg-purple-500" },
    { label: "Sentiment", key: "sentiment" as const, weight: 25, color: "bg-amber-500" },
    { label: "Market Context", key: "market" as const, weight: 15, color: "bg-emerald-500" },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Similarity Breakdown</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Overall:</span>
            <span
              className={`text-xl font-bold ${
                overall >= 70
                  ? "text-green-600"
                  : overall >= 50
                  ? "text-yellow-600"
                  : "text-gray-500"
              }`}
            >
              {Math.round(overall)}%
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {dimensions.map((dim) => {
            const score = breakdown[dim.key];
            return (
              <div key={dim.key}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">{dim.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">Weight: {dim.weight}%</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {Math.round(score)}/100
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${dim.color} transition-all duration-500`}
                    style={{ width: `${Math.min(100, score)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

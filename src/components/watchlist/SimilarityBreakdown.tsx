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

const dimensionIcons = {
  greeks: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.745 3A23.933 23.933 0 003 12c0 3.183.62 6.22 1.745 9M19.5 3c.967 2.78 1.5 5.817 1.5 9s-.533 6.22-1.5 9" />
    </svg>
  ),
  volatility: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),
  sentiment: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  ),
  market: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  ),
};

export default function SimilarityBreakdown({ breakdown, overall }: SimilarityBreakdownProps) {
  const dimensions = [
    { label: "Greeks Profile", key: "greeks" as const, weight: 30, color: "bg-blue-500" },
    { label: "Volatility Regime", key: "volatility" as const, weight: 30, color: "bg-purple-500" },
    { label: "Sentiment", key: "sentiment" as const, weight: 25, color: "bg-amber-500" },
    { label: "Market Context", key: "market" as const, weight: 15, color: "bg-emerald-500" },
  ];

  const overallColor =
    overall >= 70 ? "text-green-600" : overall >= 50 ? "text-yellow-600" : "text-gray-500";

  const conicGradient = `conic-gradient(${
    overall >= 70 ? "#22c55e" : overall >= 50 ? "#eab308" : "#9ca3af"
  } ${overall * 3.6}deg, #e5e7eb ${overall * 3.6}deg)`;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Similarity Breakdown</h2>
          {/* Circular gauge */}
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: conicGradient }}
            >
              <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
                <span className={`text-sm font-bold ${overallColor}`}>
                  {Math.round(overall)}%
                </span>
              </div>
            </div>
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
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">{dimensionIcons[dim.key]}</span>
                    <span className="text-sm font-medium text-gray-700">{dim.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">Weight: {dim.weight}%</span>
                    <span className="text-sm font-semibold font-mono text-gray-900">
                      {Math.round(score)}/100
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
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

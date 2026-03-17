"use client";

import Link from "next/link";
import Card, { CardContent } from "@/components/ui/Card";
import { formatPercent, getTimeframeLabel } from "@/lib/utils";

interface MatchInsightCardProps {
  scenarioId: string;
  scenarioTitle: string;
  company: string;
  similarity: number;
  outcomeData: {
    actualDirection: string;
    priceMoves: Record<string, number>;
    optimalStrategies: string[];
    optimalTimeframe: string;
    bestContractReturn: number;
    explanation: string;
  };
}

export default function MatchInsightCard({
  scenarioId,
  scenarioTitle,
  company,
  similarity,
  outcomeData,
}: MatchInsightCardProps) {
  const directionColor =
    outcomeData.actualDirection === "bullish"
      ? "text-green-600"
      : outcomeData.actualDirection === "bearish"
      ? "text-red-600"
      : "text-gray-600";

  const directionBg =
    outcomeData.actualDirection === "bullish"
      ? "bg-green-50 border-green-200"
      : outcomeData.actualDirection === "bearish"
      ? "bg-red-50 border-red-200"
      : "bg-gray-50 border-gray-200";

  const directionArrow =
    outcomeData.actualDirection === "bullish"
      ? "↑"
      : outcomeData.actualDirection === "bearish"
      ? "↓"
      : "→";

  return (
    <Card>
      <CardContent className="p-4">
        <div className={`rounded-lg border p-4 mb-4 ${directionBg}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className={`text-2xl ${directionColor}`}>{directionArrow}</span>
              <div>
                <p className={`font-semibold ${directionColor}`}>
                  Historical outcome was {outcomeData.actualDirection}
                </p>
                <p className="text-xs text-gray-500">
                  Based on {company} — {scenarioTitle}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Match</p>
              <p className="text-lg font-bold">{Math.round(similarity)}%</p>
            </div>
          </div>

          {/* Price moves */}
          <div className="grid grid-cols-3 gap-3 mt-3">
            {Object.entries(outcomeData.priceMoves).map(([tf, move]) => (
              <div key={tf} className="text-center">
                <p className="text-xs text-gray-500">{getTimeframeLabel(tf)}</p>
                <p
                  className={`text-sm font-bold ${
                    (move as number) >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {formatPercent(move as number)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Strategies */}
        <div className="mb-3">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            Optimal Strategies
          </p>
          <div className="flex flex-wrap gap-1.5">
            {outcomeData.optimalStrategies.map((s) => (
              <span
                key={s}
                className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-medium"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Best Return</p>
            <p className="text-lg font-bold text-gray-900">
              {outcomeData.bestContractReturn}%
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Optimal Timeframe</p>
            <p className="text-sm font-semibold text-gray-900">
              {getTimeframeLabel(outcomeData.optimalTimeframe)}
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-600 line-clamp-3 mb-3">
          {outcomeData.explanation}
        </p>

        <Link
          href={`/scenarios/${scenarioId}`}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          View Full Scenario Analysis &rarr;
        </Link>
      </CardContent>
    </Card>
  );
}

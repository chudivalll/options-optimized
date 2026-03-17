"use client";

import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { getCategoryLabel } from "@/lib/utils";

interface MatchResult {
  scenarioId: string;
  scenarioSlug: string;
  scenarioTitle: string;
  company: string;
  companyName: string;
  category: string;
  similarity: number;
  breakdown: {
    greeks: number;
    volatility: number;
    sentiment: number;
    market: number;
  };
  outcomeData: {
    actualDirection: string;
    bestContractReturn: number;
    optimalStrategies: string[];
  };
}

export default function PatternMatchList({ matches }: { matches: MatchResult[] }) {
  return (
    <div className="space-y-4">
      {matches.map((match, idx) => (
        <div
          key={match.scenarioId}
          className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-gray-400">#{idx + 1}</span>
                <Link
                  href={`/scenarios/${match.scenarioId}`}
                  className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                >
                  {match.scenarioTitle}
                </Link>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm text-gray-500">{match.company} ({match.companyName})</span>
                <Badge variant="info">{getCategoryLabel(match.category)}</Badge>
              </div>

              {/* Similarity breakdown bar */}
              <div className="space-y-1.5">
                <BreakdownRow label="Greeks" score={match.breakdown.greeks} weight={30} />
                <BreakdownRow label="Volatility" score={match.breakdown.volatility} weight={30} />
                <BreakdownRow label="Sentiment" score={match.breakdown.sentiment} weight={25} />
                <BreakdownRow label="Market" score={match.breakdown.market} weight={15} />
              </div>
            </div>

            <div className="text-center flex-shrink-0">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold text-white ${
                  match.similarity >= 70
                    ? "bg-green-500"
                    : match.similarity >= 50
                    ? "bg-yellow-500"
                    : "bg-gray-400"
                }`}
              >
                {Math.round(match.similarity)}
              </div>
              <p className="text-xs text-gray-500 mt-1">Match %</p>
            </div>
          </div>

          {/* Outcome insight */}
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <span className="text-gray-500">Outcome:</span>
                <span
                  className={`font-medium ${
                    match.outcomeData.actualDirection === "bullish"
                      ? "text-green-600"
                      : match.outcomeData.actualDirection === "bearish"
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
                >
                  {match.outcomeData.actualDirection === "bullish"
                    ? "Bullish"
                    : match.outcomeData.actualDirection === "bearish"
                    ? "Bearish"
                    : "Neutral"}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-gray-500">Best Return:</span>
                <span className="font-medium text-gray-900">
                  {match.outcomeData.bestContractReturn}%
                </span>
              </div>
              <Link
                href={`/scenarios/${match.scenarioId}`}
                className="ml-auto text-blue-600 hover:text-blue-700 font-medium"
              >
                View Scenario &rarr;
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function BreakdownRow({ label, score, weight }: { label: string; score: number; weight: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500 w-20">{label} ({weight}%)</span>
      <div className="flex-1 bg-gray-100 rounded-full h-1.5">
        <div
          className={`h-1.5 rounded-full ${
            score >= 70
              ? "bg-green-500"
              : score >= 50
              ? "bg-yellow-500"
              : "bg-gray-400"
          }`}
          style={{ width: `${Math.min(100, score)}%` }}
        />
      </div>
      <span className="text-xs font-medium text-gray-600 w-8 text-right">
        {Math.round(score)}
      </span>
    </div>
  );
}

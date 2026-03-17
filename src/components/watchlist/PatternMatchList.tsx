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
      {matches.map((match, idx) => {
        const outcomeBorder =
          match.outcomeData.actualDirection === "bullish"
            ? "border-l-green-400"
            : match.outcomeData.actualDirection === "bearish"
            ? "border-l-red-400"
            : "border-l-gray-300";

        return (
          <div
            key={match.scenarioId}
            className={`bg-white rounded-xl border border-gray-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 border-l-4 ${outcomeBorder}`}
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
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold text-white ring-2 ring-offset-2 ${
                    match.similarity >= 70
                      ? "bg-gradient-to-br from-green-400 to-green-600 ring-green-300"
                      : match.similarity >= 50
                      ? "bg-gradient-to-br from-yellow-400 to-yellow-600 ring-yellow-300"
                      : "bg-gradient-to-br from-gray-300 to-gray-500 ring-gray-300"
                  }`}
                >
                  {Math.round(match.similarity)}
                </div>
                <p className="text-xs text-gray-500 mt-1.5">Match %</p>
              </div>
            </div>

            {/* Outcome insight */}
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-500">Outcome:</span>
                  <span
                    className={`font-medium flex items-center gap-1 ${
                      match.outcomeData.actualDirection === "bullish"
                        ? "text-green-600"
                        : match.outcomeData.actualDirection === "bearish"
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    {match.outcomeData.actualDirection === "bullish" ? (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    ) : match.outcomeData.actualDirection === "bearish" ? (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
                      </svg>
                    ) : null}
                    {match.outcomeData.actualDirection === "bullish"
                      ? "Bullish"
                      : match.outcomeData.actualDirection === "bearish"
                      ? "Bearish"
                      : "Neutral"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-500">Best Return:</span>
                  <span className="font-medium text-gray-900 font-mono">
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
        );
      })}
    </div>
  );
}

function BreakdownRow({ label, score, weight }: { label: string; score: number; weight: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500 w-20">{label} ({weight}%)</span>
      <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-2.5 rounded-full transition-all duration-500 ${
            score >= 70
              ? "bg-gradient-to-r from-green-400 to-green-500"
              : score >= 50
              ? "bg-gradient-to-r from-yellow-400 to-yellow-500"
              : "bg-gradient-to-r from-gray-300 to-gray-400"
          }`}
          style={{ width: `${Math.min(100, score)}%` }}
        />
      </div>
      <span className="text-xs font-medium font-mono text-gray-600 w-8 text-right">
        {Math.round(score)}
      </span>
    </div>
  );
}

"use client";

import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { formatCurrency, formatPercent } from "@/lib/utils";

interface SnapshotItem {
  ticker: string;
  companyName: string;
  sector: string;
  stockPrice: number;
  priceChange30d: number;
  exchange: string;
  volatilityData: string;
}

export default function TickerGrid({ snapshots }: { snapshots: SnapshotItem[] }) {
  if (snapshots.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No tickers match your filters.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {snapshots.map((s) => {
        const vol = JSON.parse(s.volatilityData);
        const isPositive = s.priceChange30d >= 0;
        return (
          <Link
            key={s.ticker}
            href={`/watchlist/${s.ticker}`}
            className={`bg-white rounded-xl border border-gray-200/60 p-4 hover:shadow-lg hover:-translate-y-0.5 hover:border-blue-200/60 transition-all duration-200 group border-l-4 ${
              isPositive ? "border-l-green-400" : "border-l-red-400"
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {s.ticker}
                  </span>
                  {isPositive ? (
                    <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
                    </svg>
                  )}
                </div>
                <p className="text-sm text-gray-500">{s.companyName}</p>
              </div>
              <Badge variant="info">{s.sector}</Badge>
            </div>

            <div className="flex justify-between items-end">
              <div>
                <p className="text-lg font-semibold text-gray-900 font-mono">
                  {formatCurrency(s.stockPrice)}
                </p>
                <p
                  className={`text-sm font-medium font-mono ${
                    isPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {formatPercent(s.priceChange30d)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">IV Rank</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-12 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-1.5 rounded-full ${
                        vol.ivRank > 70
                          ? "bg-gradient-to-r from-orange-400 to-red-500"
                          : vol.ivRank > 40
                          ? "bg-gradient-to-r from-yellow-400 to-yellow-500"
                          : "bg-gradient-to-r from-green-400 to-green-500"
                      }`}
                      style={{ width: `${vol.ivRank}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium font-mono text-gray-600">{vol.ivRank}</span>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

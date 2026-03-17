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
        return (
          <Link
            key={s.ticker}
            href={`/watchlist/${s.ticker}`}
            className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md hover:border-blue-200 transition-all group"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {s.ticker}
                </span>
                <p className="text-sm text-gray-500">{s.companyName}</p>
              </div>
              <Badge variant="info">{s.sector}</Badge>
            </div>

            <div className="flex justify-between items-end">
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  {formatCurrency(s.stockPrice)}
                </p>
                <p
                  className={`text-sm font-medium ${
                    s.priceChange30d >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {formatPercent(s.priceChange30d)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">IV Rank</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-12 bg-gray-200 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${
                        vol.ivRank > 70
                          ? "bg-red-500"
                          : vol.ivRank > 40
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                      style={{ width: `${vol.ivRank}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-600">{vol.ivRank}</span>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

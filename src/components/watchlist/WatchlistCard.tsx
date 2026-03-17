"use client";

import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { formatCurrency, formatPercent } from "@/lib/utils";

interface WatchlistCardProps {
  ticker: string;
  companyName: string;
  sector: string;
  stockPrice: number;
  priceChange30d: number;
  topMatchScore?: number;
  topMatchName?: string;
  onRemove: (ticker: string) => void;
}

export default function WatchlistCard({
  ticker,
  companyName,
  sector,
  stockPrice,
  priceChange30d,
  topMatchScore,
  topMatchName,
  onRemove,
}: WatchlistCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex justify-between items-start mb-3">
        <Link href={`/watchlist/${ticker}`} className="group">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              {ticker}
            </span>
            <Badge variant="info">{sector}</Badge>
          </div>
          <p className="text-sm text-gray-500 mt-0.5">{companyName}</p>
        </Link>
        <button
          onClick={(e) => {
            e.preventDefault();
            onRemove(ticker);
          }}
          className="text-gray-400 hover:text-red-500 transition-colors p-1"
          title="Remove from watchlist"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex justify-between items-end">
        <div>
          <p className="text-lg font-semibold text-gray-900 font-mono">
            {formatCurrency(stockPrice)}
          </p>
          <p
            className={`text-sm font-medium font-mono ${
              priceChange30d >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {formatPercent(priceChange30d)}
          </p>
        </div>

        {topMatchScore !== undefined && (
          <Link href={`/watchlist/${ticker}`}>
            <div className="text-right">
              <div className="flex items-center gap-1.5">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white ring-2 ring-offset-2 ${
                    topMatchScore >= 70
                      ? "bg-gradient-to-br from-green-400 to-green-600 ring-green-300"
                      : topMatchScore >= 50
                      ? "bg-gradient-to-br from-yellow-400 to-yellow-600 ring-yellow-300"
                      : "bg-gradient-to-br from-gray-300 to-gray-500 ring-gray-300"
                  }`}
                >
                  {Math.round(topMatchScore)}
                </div>
              </div>
              {topMatchName && (
                <p className="text-xs text-gray-500 mt-1.5 max-w-[120px] truncate">
                  {topMatchName}
                </p>
              )}
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

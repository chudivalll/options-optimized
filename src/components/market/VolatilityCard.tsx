"use client";

import Card, { CardContent, CardHeader } from "@/components/ui/Card";
import { DataItem } from "./MarketDataCard";

interface VolatilityData {
  iv30: number;
  iv60: number;
  hv30: number;
  ivRank: number;
  ivPercentile: number;
}

export default function VolatilityCard({ data }: { data: VolatilityData }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full" />
          <h2 className="text-lg font-semibold">Volatility</h2>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <DataItem label="IV (30-day)" value={`${data.iv30}%`} />
          <DataItem label="IV (60-day)" value={`${data.iv60}%`} />
          <DataItem label="HV (30-day)" value={`${data.hv30}%`} />
          <DataItem label="IV Rank" value={`${data.ivRank}`} />
          <DataItem label="IV Percentile" value={`${data.ivPercentile}`} />
        </div>
        {/* IV Rank gauge */}
        <div className="mt-5">
          <div className="flex justify-between text-xs text-gray-500 mb-1.5">
            <span>Low IV</span>
            <span>High IV</span>
          </div>
          <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className={`h-4 rounded-full transition-all duration-500 ${
                data.ivRank > 70
                  ? "bg-gradient-to-r from-orange-400 to-red-500"
                  : data.ivRank > 40
                  ? "bg-gradient-to-r from-yellow-400 to-yellow-500"
                  : "bg-gradient-to-r from-green-400 to-green-500"
              }`}
              style={{ width: `${data.ivRank}%` }}
            />
            {/* Position marker */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full border-2 border-gray-700 shadow-sm"
              style={{ left: `calc(${data.ivRank}% - 6px)` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1.5 text-center font-mono">
            IV Rank: {data.ivRank}/100
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

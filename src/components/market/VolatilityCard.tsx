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
        <h2 className="text-lg font-semibold">Volatility</h2>
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
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Low IV</span>
            <span>High IV</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${
                data.ivRank > 70
                  ? "bg-red-500"
                  : data.ivRank > 40
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
              style={{ width: `${data.ivRank}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1 text-center">
            IV Rank: {data.ivRank}/100
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

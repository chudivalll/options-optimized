"use client";

import Card, { CardContent, CardHeader } from "@/components/ui/Card";
import { formatPercent, formatCurrency } from "@/lib/utils";

interface MarketData {
  stockPrice: number;
  priceChange30d: number;
  marketCap: string;
  sector: string;
  sectorPerformance?: number;
  spyPerformance?: number;
}

export default function MarketDataCard({ data }: { data: MarketData }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full" />
          <h2 className="text-lg font-semibold">Market Data</h2>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <DataItem
            label="Stock Price"
            value={formatCurrency(data.stockPrice)}
          />
          <DataItem
            label="30-Day Change"
            value={formatPercent(data.priceChange30d)}
            color={data.priceChange30d >= 0}
          />
          <DataItem label="Market Cap" value={data.marketCap} />
          <DataItem label="Sector" value={data.sector} />
          {data.sectorPerformance !== undefined && (
            <DataItem
              label="Sector Perf."
              value={formatPercent(data.sectorPerformance)}
              color={data.sectorPerformance >= 0}
            />
          )}
          {data.spyPerformance !== undefined && (
            <DataItem
              label="SPY Perf."
              value={formatPercent(data.spyPerformance)}
              color={data.spyPerformance >= 0}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function DataItem({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color?: boolean;
}) {
  const borderColor =
    color === undefined
      ? "border-blue-200"
      : color
      ? "border-green-300"
      : "border-red-300";

  return (
    <div className={`border-l-2 ${borderColor} pl-3`}>
      <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
      <p
        className={`text-sm font-semibold font-mono ${
          color === undefined
            ? "text-gray-900"
            : color
            ? "text-green-600"
            : "text-red-600"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

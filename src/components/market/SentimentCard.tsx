"use client";

import Card, { CardContent, CardHeader } from "@/components/ui/Card";
import { DataItem } from "./MarketDataCard";

interface SentimentData {
  headlines: string[];
  analystRating: string;
  putCallRatio: number;
}

export default function SentimentCard({ data }: { data: SentimentData }) {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">Sentiment</h2>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 mb-4">
          {data.headlines.map((h, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">&#8226;</span>
              <p className="text-sm text-gray-700">{h}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-6">
          <DataItem label="Analyst Rating" value={data.analystRating} />
          <DataItem label="Put/Call Ratio" value={data.putCallRatio.toFixed(2)} />
        </div>
      </CardContent>
    </Card>
  );
}

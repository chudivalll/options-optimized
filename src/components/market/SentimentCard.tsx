"use client";

import Card, { CardContent, CardHeader } from "@/components/ui/Card";

interface SentimentData {
  headlines: string[];
  analystRating: string;
  putCallRatio: number;
}

export default function SentimentCard({ data }: { data: SentimentData }) {
  const ratingColor =
    data.analystRating.toLowerCase().includes("buy")
      ? "success" as const
      : data.analystRating.toLowerCase().includes("sell")
      ? "danger" as const
      : "warning" as const;

  const ratingBg =
    ratingColor === "success"
      ? "bg-green-50 text-green-700 border-green-200"
      : ratingColor === "danger"
      ? "bg-red-50 text-red-700 border-red-200"
      : "bg-yellow-50 text-yellow-700 border-yellow-200";

  const pcrLabel =
    data.putCallRatio > 1.2
      ? { text: "Bearish", color: "text-red-600" }
      : data.putCallRatio < 0.8
      ? { text: "Bullish", color: "text-green-600" }
      : { text: "Neutral", color: "text-gray-600" };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 bg-gradient-to-b from-amber-500 to-amber-600 rounded-full" />
          <h2 className="text-lg font-semibold">Sentiment</h2>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2.5 mb-4">
          {data.headlines.map((h, i) => (
            <div key={i} className="flex items-start gap-2 border-l-2 border-gray-200 pl-3">
              <svg className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
              </svg>
              <p className="text-sm text-gray-700">{h}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-6">
          <div className="border-l-2 border-blue-200 pl-3">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Analyst Rating</p>
            <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${ratingBg}`}>
              {data.analystRating}
            </span>
          </div>
          <div className="border-l-2 border-blue-200 pl-3">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Put/Call Ratio</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm font-semibold font-mono text-gray-900">{data.putCallRatio.toFixed(2)}</span>
              <span className={`text-xs font-medium ${pcrLabel.color}`}>{pcrLabel.text}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

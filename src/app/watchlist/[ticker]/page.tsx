"use client";

import { useState, useEffect, use } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import MarketDataCard from "@/components/market/MarketDataCard";
import GreeksTable from "@/components/market/GreeksTable";
import VolatilityCard from "@/components/market/VolatilityCard";
import SentimentCard from "@/components/market/SentimentCard";
import PatternMatchList from "@/components/watchlist/PatternMatchList";
import SimilarityBreakdown from "@/components/watchlist/SimilarityBreakdown";
import MatchInsightCard from "@/components/watchlist/MatchInsightCard";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

interface SnapshotData {
  ticker: string;
  companyName: string;
  exchange: string;
  sector: string;
  stockPrice: number;
  priceChange30d: number;
  marketCap: string;
  sectorPerformance: number;
  spyPerformance: number;
  greeksData: string;
  volatilityData: string;
  sentimentData: string;
  snapshotDate: string;
}

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
    priceMoves: Record<string, number>;
    optimalStrategies: string[];
    optimalTimeframe: string;
    bestContractReturn: number;
    explanation: string;
  };
}

export default function TickerDetailPage({
  params,
}: {
  params: Promise<{ ticker: string }>;
}) {
  const { ticker } = use(params);
  const { data: session } = useSession();
  const [snapshot, setSnapshot] = useState<SnapshotData | null>(null);
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [matchLoading, setMatchLoading] = useState(true);
  const [onWatchlist, setOnWatchlist] = useState(false);
  const [addingToWatchlist, setAddingToWatchlist] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<number>(0);

  useEffect(() => {
    // Fetch snapshot data
    fetch(`/api/snapshots/${ticker}`)
      .then((r) => r.json())
      .then((data) => {
        if (!data.error) setSnapshot(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // Fetch pattern matches
    fetch(`/api/pattern-match/${ticker}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.matches) setMatches(data.matches);
        setMatchLoading(false);
      })
      .catch(() => setMatchLoading(false));

    // Check if on watchlist
    if (session) {
      fetch("/api/watchlist")
        .then((r) => r.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setOnWatchlist(data.some((item: { ticker: string }) => item.ticker === ticker.toUpperCase()));
          }
        })
        .catch(() => {});
    }
  }, [ticker, session]);

  async function handleAddToWatchlist() {
    setAddingToWatchlist(true);
    const res = await fetch("/api/watchlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ticker }),
    });
    if (res.ok) {
      setOnWatchlist(true);
    }
    setAddingToWatchlist(false);
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-32" />
          <div className="h-48 bg-gray-200 rounded-xl" />
          <div className="h-48 bg-gray-200 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!snapshot) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <p className="text-gray-500">Ticker not found.</p>
        <Link href="/scanner" className="text-blue-600 hover:text-blue-700 text-sm mt-2 inline-block">
          &larr; Back to Scanner
        </Link>
      </div>
    );
  }

  const greeksData = JSON.parse(snapshot.greeksData);
  const volatilityData = JSON.parse(snapshot.volatilityData);
  const sentimentData = JSON.parse(snapshot.sentimentData);
  const topMatch = matches[selectedMatch];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/watchlist"
        className="text-sm text-blue-600 hover:text-blue-700 mb-4 inline-block"
      >
        &larr; Back to Watchlist
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-3xl font-bold text-gray-900">{snapshot.ticker}</span>
            <span className="text-lg text-gray-500">{snapshot.companyName}</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="info">{snapshot.sector}</Badge>
            <Badge variant="info">{snapshot.exchange}</Badge>
            <span className="text-sm text-gray-500">
              Snapshot: {new Date(snapshot.snapshotDate).toLocaleDateString()}
            </span>
          </div>
        </div>

        {session && !onWatchlist && (
          <Button
            onClick={handleAddToWatchlist}
            disabled={addingToWatchlist}
            variant="outline"
          >
            {addingToWatchlist ? "Adding..." : "+ Watchlist"}
          </Button>
        )}
        {onWatchlist && (
          <span className="text-sm text-green-600 font-medium px-3 py-1.5 bg-green-50 rounded-lg">
            On Watchlist
          </span>
        )}
      </div>

      {/* Market data sections */}
      <div className="space-y-6 mb-8">
        <MarketDataCard
          data={{
            stockPrice: snapshot.stockPrice,
            priceChange30d: snapshot.priceChange30d,
            marketCap: snapshot.marketCap,
            sector: snapshot.sector,
            sectorPerformance: snapshot.sectorPerformance,
            spyPerformance: snapshot.spyPerformance,
          }}
        />
        <GreeksTable contracts={greeksData.contracts} />
        <VolatilityCard data={volatilityData} />
        <SentimentCard data={sentimentData} />
      </div>

      {/* Pattern Matches */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Historical Pattern Matches</h2>
        <p className="text-gray-500 text-sm mb-4">
          How this ticker&apos;s current setup compares to historical scenarios.
          Higher scores indicate stronger similarity.
        </p>

        {matchLoading ? (
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl" />
            ))}
          </div>
        ) : matches.length > 0 ? (
          <div className="space-y-6">
            {/* Top match insight */}
            {topMatch && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
                  Top Match Insight
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <MatchInsightCard
                    scenarioId={topMatch.scenarioId}
                    scenarioTitle={topMatch.scenarioTitle}
                    company={topMatch.company}
                    similarity={topMatch.similarity}
                    outcomeData={topMatch.outcomeData}
                  />
                  <SimilarityBreakdown
                    breakdown={topMatch.breakdown}
                    overall={topMatch.similarity}
                  />
                </div>
              </div>
            )}

            {/* Match selector tabs */}
            {matches.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {matches.slice(0, 5).map((m, idx) => (
                  <button
                    key={m.scenarioId}
                    onClick={() => setSelectedMatch(idx)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                      selectedMatch === idx
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    #{idx + 1} {m.company} ({Math.round(m.similarity)}%)
                  </button>
                ))}
              </div>
            )}

            {/* All matches list */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
                All Matches Ranked
              </h3>
              <PatternMatchList matches={matches} />
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No pattern matches found.</p>
        )}
      </div>
    </div>
  );
}

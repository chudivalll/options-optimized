"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import WatchlistCard from "@/components/watchlist/WatchlistCard";
import AddTickerModal from "@/components/watchlist/AddTickerModal";
import Button from "@/components/ui/Button";

interface WatchlistItemData {
  id: string;
  ticker: string;
  notes: string | null;
  snapshot: {
    companyName: string;
    sector: string;
    stockPrice: number;
    priceChange30d: number;
  } | null;
}

interface MatchData {
  ticker: string;
  matches: { similarity: number; scenarioTitle: string }[];
}

export default function WatchlistPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [items, setItems] = useState<WatchlistItemData[]>([]);
  const [matchScores, setMatchScores] = useState<Record<string, MatchData>>({});
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchWatchlist = useCallback(async () => {
    const res = await fetch("/api/watchlist");
    if (res.ok) {
      const data = await res.json();
      setItems(data);
      // Fetch top match for each ticker
      for (const item of data) {
        fetch(`/api/pattern-match/${item.ticker}`)
          .then((r) => r.json())
          .then((matchData) => {
            setMatchScores((prev) => ({
              ...prev,
              [item.ticker]: matchData,
            }));
          })
          .catch(() => {});
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
    if (status === "authenticated") {
      fetchWatchlist();
    }
  }, [status, router, fetchWatchlist]);

  async function handleAdd(ticker: string) {
    const res = await fetch("/api/watchlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ticker }),
    });
    if (res.ok) {
      fetchWatchlist();
    }
  }

  async function handleRemove(ticker: string) {
    const res = await fetch(`/api/watchlist?ticker=${ticker}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setItems((prev) => prev.filter((i) => i.ticker !== ticker));
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-48" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Your Watchlist</h1>
          <p className="text-gray-500 mt-1">
            Track tickers and discover historical pattern matches
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>+ Add Ticker</Button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <div className="text-4xl mb-3">&#128200;</div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Your watchlist is empty
          </h2>
          <p className="text-gray-500 mb-4">
            Add tickers to track them and discover which historical scenarios they match.
          </p>
          <Button onClick={() => setShowAddModal(true)}>Add Your First Ticker</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item) => {
            const topMatch = matchScores[item.ticker]?.matches?.[0];
            return (
              <WatchlistCard
                key={item.ticker}
                ticker={item.ticker}
                companyName={item.snapshot?.companyName || ""}
                sector={item.snapshot?.sector || ""}
                stockPrice={item.snapshot?.stockPrice || 0}
                priceChange30d={item.snapshot?.priceChange30d || 0}
                topMatchScore={topMatch?.similarity}
                topMatchName={topMatch?.scenarioTitle}
                onRemove={handleRemove}
              />
            );
          })}
        </div>
      )}

      <AddTickerModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAdd}
        existingTickers={items.map((i) => i.ticker)}
      />
    </div>
  );
}

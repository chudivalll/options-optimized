"use client";

import { useState, useEffect } from "react";
import Badge from "@/components/ui/Badge";
import { formatCurrency, formatPercent } from "@/lib/utils";

interface Snapshot {
  ticker: string;
  companyName: string;
  sector: string;
  stockPrice: number;
  priceChange30d: number;
}

interface AddTickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (ticker: string) => void;
  existingTickers: string[];
}

export default function AddTickerModal({
  isOpen,
  onClose,
  onAdd,
  existingTickers,
}: AddTickerModalProps) {
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetch("/api/snapshots")
        .then((r) => r.json())
        .then((data) => {
          setSnapshots(data.snapshots || []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = snapshots.filter(
    (s) =>
      !existingTickers.includes(s.ticker) &&
      (s.ticker.toLowerCase().includes(search.toLowerCase()) ||
        s.companyName.toLowerCase().includes(search.toLowerCase()) ||
        s.sector.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl max-w-lg w-full mx-4 max-h-[80vh] flex flex-col animate-scale-in">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-gray-900">Add to Watchlist</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              placeholder="Search by ticker, name, or sector..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-colors"
              autoFocus
            />
          </div>
        </div>

        <div className="overflow-y-auto flex-1 p-2">
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading tickers...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {search ? "No matching tickers found" : "All tickers are on your watchlist"}
            </div>
          ) : (
            <div className="space-y-1">
              {filtered.map((s) => (
                <button
                  key={s.ticker}
                  onClick={() => {
                    onAdd(s.ticker);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">{s.ticker}</span>
                        <Badge variant="info">{s.sector}</Badge>
                      </div>
                      <p className="text-sm text-gray-500">{s.companyName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium font-mono text-gray-900">
                      {formatCurrency(s.stockPrice)}
                    </p>
                    <p
                      className={`text-xs font-medium font-mono ${
                        s.priceChange30d >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {formatPercent(s.priceChange30d)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

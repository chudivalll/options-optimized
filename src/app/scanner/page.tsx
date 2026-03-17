"use client";

import { useState, useEffect } from "react";
import TickerGrid from "@/components/scanner/TickerGrid";
import FilterBar from "@/components/scanner/FilterBar";

interface SnapshotItem {
  ticker: string;
  companyName: string;
  sector: string;
  stockPrice: number;
  priceChange30d: number;
  exchange: string;
  volatilityData: string;
}

export default function ScannerPage() {
  const [snapshots, setSnapshots] = useState<SnapshotItem[]>([]);
  const [sectors, setSectors] = useState<string[]>([]);
  const [selectedSector, setSelectedSector] = useState("");
  const [sortBy, setSortBy] = useState("ticker");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedSector) params.set("sector", selectedSector);
    if (sortBy) params.set("sort", sortBy);

    fetch(`/api/snapshots?${params}`)
      .then((r) => r.json())
      .then((data) => {
        setSnapshots(data.snapshots || []);
        if (data.sectors) setSectors(data.sectors);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [selectedSector, sortBy]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Market Scanner</h1>
        <p className="text-gray-500 mt-1">
          Browse available ticker snapshots. Click any ticker to see its full data and historical pattern matches.
        </p>
      </div>

      <div className="mb-6">
        <FilterBar
          sectors={sectors}
          selectedSector={selectedSector}
          sortBy={sortBy}
          onSectorChange={setSelectedSector}
          onSortChange={setSortBy}
        />
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-500">
          {loading ? "Loading..." : `${snapshots.length} ticker${snapshots.length !== 1 ? "s" : ""} found`}
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <TickerGrid snapshots={snapshots} />
      )}
    </div>
  );
}

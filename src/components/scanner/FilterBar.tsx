"use client";

interface FilterBarProps {
  sectors: string[];
  selectedSector: string;
  sortBy: string;
  onSectorChange: (sector: string) => void;
  onSortChange: (sort: string) => void;
}

export default function FilterBar({
  sectors,
  selectedSector,
  sortBy,
  onSectorChange,
  onSortChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Sector filter */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-600">Sector:</label>
        <select
          value={selectedSector}
          onChange={(e) => onSectorChange(e.target.value)}
          className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        >
          <option value="">All Sectors</option>
          {sectors.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Sort */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-600">Sort:</label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        >
          <option value="ticker">Ticker (A-Z)</option>
          <option value="price">Price (High-Low)</option>
          <option value="change">30d Change</option>
          <option value="sector">Sector</option>
        </select>
      </div>
    </div>
  );
}

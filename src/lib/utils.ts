export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatPercent(value: number): string {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}%`;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case "beginner":
      return "text-green-600 bg-green-100";
    case "intermediate":
      return "text-yellow-600 bg-yellow-100";
    case "advanced":
      return "text-red-600 bg-red-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    pandemic: "Pandemic",
    earnings: "Earnings",
    fed: "Fed Policy",
    crisis: "Crisis",
    momentum: "Momentum",
    sector: "Sector",
  };
  return labels[category] || category;
}

export function getStrategyLabel(strategy: string): string {
  const labels: Record<string, string> = {
    buy_calls: "Buy Calls",
    buy_puts: "Buy Puts",
    sell_calls: "Sell Calls",
    sell_puts: "Sell Puts",
    bull_spread: "Bull Spread",
    bear_spread: "Bear Spread",
    straddle: "Straddle",
    strangle: "Strangle",
  };
  return labels[strategy] || strategy;
}

export function getDirectionLabel(direction: string): string {
  const labels: Record<string, string> = {
    bullish: "Bullish",
    bearish: "Bearish",
    neutral: "Neutral",
  };
  return labels[direction] || direction;
}

export function getTimeframeLabel(timeframe: string): string {
  const labels: Record<string, string> = {
    "1_week": "1 Week",
    "1_month": "1 Month",
    "3_months": "3 Months",
  };
  return labels[timeframe] || timeframe;
}

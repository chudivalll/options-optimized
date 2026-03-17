interface OutcomeData {
  actualDirection: "bullish" | "bearish" | "neutral";
  priceMoves: {
    "1_week": number;
    "1_month": number;
    "3_months": number;
  };
  optimalStrategies: string[];
  optimalTimeframe: "1_week" | "1_month" | "3_months";
}

interface PredictionInput {
  direction: string;
  strategy: string;
  timeframe: string;
  confidence: number;
}

export interface ScoreBreakdown {
  direction: number;
  strategy: number;
  timeframe: number;
  confidence: number;
  total: number;
  maxScore: number;
}

const PROFITABLE_STRATEGIES: Record<string, string[]> = {
  bullish: ["buy_calls", "bull_spread", "sell_puts"],
  bearish: ["buy_puts", "bear_spread", "sell_calls"],
  neutral: ["straddle", "strangle", "sell_calls", "sell_puts"],
};

export function calculateScore(
  prediction: PredictionInput,
  outcome: OutcomeData
): ScoreBreakdown {
  const directionScore = scoreDirection(prediction.direction, outcome);
  const strategyScore = scoreStrategy(prediction.strategy, outcome);
  const timeframeScore = scoreTimeframe(prediction.timeframe, outcome.optimalTimeframe);
  const confidenceModifier = scoreConfidence(
    prediction.confidence,
    directionScore > 0
  );

  const total = directionScore + strategyScore + timeframeScore + confidenceModifier;

  return {
    direction: directionScore,
    strategy: strategyScore,
    timeframe: timeframeScore,
    confidence: confidenceModifier,
    total: Math.max(0, total),
    maxScore: 100,
  };
}

function scoreDirection(predicted: string, outcome: OutcomeData): number {
  const actual = outcome.actualDirection;
  const maxMove = Math.max(
    Math.abs(outcome.priceMoves["1_week"]),
    Math.abs(outcome.priceMoves["1_month"]),
    Math.abs(outcome.priceMoves["3_months"])
  );

  if (predicted === actual) return 40;
  if (predicted === "neutral" && maxMove < 5) return 20;
  if (actual === "neutral" && predicted !== actual) return 10;
  return 0;
}

function scoreStrategy(predicted: string, outcome: OutcomeData): number {
  if (outcome.optimalStrategies.includes(predicted)) return 35;

  const profitableForDirection = PROFITABLE_STRATEGIES[outcome.actualDirection] || [];
  if (profitableForDirection.includes(predicted)) return 20;

  // Check if it would have been at least somewhat profitable
  const allProfitable = [
    ...profitableForDirection,
    ...(outcome.optimalStrategies || []),
  ];
  if (allProfitable.includes(predicted)) return 10;

  return 0;
}

function scoreTimeframe(predicted: string, optimal: string): number {
  const tiers = ["1_week", "1_month", "3_months"];
  const predictedIdx = tiers.indexOf(predicted);
  const optimalIdx = tiers.indexOf(optimal);

  if (predictedIdx === -1 || optimalIdx === -1) return 0;
  if (predictedIdx === optimalIdx) return 15;
  if (Math.abs(predictedIdx - optimalIdx) === 1) return 8;
  return 0;
}

function scoreConfidence(confidence: number, correct: boolean): number {
  if (confidence >= 4) return correct ? 10 : -10;
  if (confidence <= 2) return correct ? 2 : -2;
  return 0;
}

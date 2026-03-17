// Pattern Matching Engine
// Compares a TickerSnapshot against historical Scenarios using weighted multi-dimensional similarity

export interface ContractData {
  type: string;
  strike: number;
  expiration: string;
  premium: number;
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
  iv: number;
}

export interface GreeksData {
  contracts: ContractData[];
}

export interface VolatilityData {
  iv30: number;
  iv60: number;
  hv30: number;
  ivRank: number;
  ivPercentile: number;
}

export interface SentimentData {
  headlines: string[];
  analystRating: string;
  putCallRatio: number;
}

export interface MarketContext {
  priceChange30d: number;
  sector: string;
  sectorPerformance: number;
  spyPerformance: number;
}

export interface SnapshotForMatching {
  ticker: string;
  greeksData: GreeksData;
  volatilityData: VolatilityData;
  sentimentData: SentimentData;
  market: MarketContext;
}

export interface ScenarioForMatching {
  id: string;
  slug: string;
  title: string;
  company: string;
  companyName: string;
  category: string;
  greeksData: GreeksData;
  volatilityData: VolatilityData;
  sentimentData: SentimentData;
  market: MarketContext;
  outcomeData: {
    actualDirection: string;
    priceMoves: Record<string, number>;
    optimalStrategies: string[];
    optimalTimeframe: string;
    bestContractReturn: number;
    explanation: string;
  };
}

export interface PatternMatchResult {
  scenarioId: string;
  scenarioSlug: string;
  scenarioTitle: string;
  company: string;
  companyName: string;
  category: string;
  similarity: number; // 0-100
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

// Weights for each dimension
const WEIGHTS = {
  greeks: 0.30,
  volatility: 0.30,
  sentiment: 0.25,
  market: 0.15,
};

// ---- Greeks Dimension (30%) ----
function scoreGreeks(snapshot: GreeksData, scenario: GreeksData): number {
  const snapAvg = averageGreeks(snapshot.contracts);
  const scenAvg = averageGreeks(scenario.contracts);

  // Compare average absolute delta
  const deltaSim = 1 - Math.min(1, Math.abs(snapAvg.avgAbsDelta - scenAvg.avgAbsDelta) / 0.5);
  // Compare average gamma
  const gammaSim = 1 - Math.min(1, Math.abs(snapAvg.avgGamma - scenAvg.avgGamma) / 0.05);
  // Compare average absolute theta
  const thetaSim = 1 - Math.min(1, Math.abs(snapAvg.avgAbsTheta - scenAvg.avgAbsTheta) / 1.0);
  // Compare average vega
  const vegaSim = 1 - Math.min(1, Math.abs(snapAvg.avgVega - scenAvg.avgVega) / 0.3);
  // Compare average IV across contracts
  const ivSim = 1 - Math.min(1, Math.abs(snapAvg.avgIV - scenAvg.avgIV) / 0.8);
  // Compare put/call mix (ratio of puts to total)
  const putRatioSim = 1 - Math.min(1, Math.abs(snapAvg.putRatio - scenAvg.putRatio) / 1.0);

  return (deltaSim * 0.2 + gammaSim * 0.15 + thetaSim * 0.1 + vegaSim * 0.15 + ivSim * 0.25 + putRatioSim * 0.15) * 100;
}

function averageGreeks(contracts: ContractData[]) {
  if (contracts.length === 0) {
    return { avgAbsDelta: 0, avgGamma: 0, avgAbsTheta: 0, avgVega: 0, avgIV: 0, putRatio: 0 };
  }
  const n = contracts.length;
  const puts = contracts.filter(c => c.type === "put").length;
  return {
    avgAbsDelta: contracts.reduce((s, c) => s + Math.abs(c.delta), 0) / n,
    avgGamma: contracts.reduce((s, c) => s + c.gamma, 0) / n,
    avgAbsTheta: contracts.reduce((s, c) => s + Math.abs(c.theta), 0) / n,
    avgVega: contracts.reduce((s, c) => s + c.vega, 0) / n,
    avgIV: contracts.reduce((s, c) => s + c.iv, 0) / n,
    putRatio: puts / n,
  };
}

// ---- Volatility Dimension (30%) ----
function scoreVolatility(snapshot: VolatilityData, scenario: VolatilityData): number {
  // IV30 similarity — normalized by max observed IV range (~120%)
  const iv30Sim = 1 - Math.min(1, Math.abs(snapshot.iv30 - scenario.iv30) / 80);
  // IV60 similarity
  const iv60Sim = 1 - Math.min(1, Math.abs(snapshot.iv60 - scenario.iv60) / 80);
  // HV30 similarity
  const hv30Sim = 1 - Math.min(1, Math.abs(snapshot.hv30 - scenario.hv30) / 60);
  // IV Rank similarity (0-100 scale)
  const ivRankSim = 1 - Math.abs(snapshot.ivRank - scenario.ivRank) / 100;
  // IV Percentile similarity (0-100 scale)
  const ivPctSim = 1 - Math.abs(snapshot.ivPercentile - scenario.ivPercentile) / 100;
  // IV-HV spread similarity (measures richness of options)
  const snapSpread = snapshot.iv30 - snapshot.hv30;
  const scenSpread = scenario.iv30 - scenario.hv30;
  const spreadSim = 1 - Math.min(1, Math.abs(snapSpread - scenSpread) / 30);

  return (iv30Sim * 0.25 + iv60Sim * 0.15 + hv30Sim * 0.15 + ivRankSim * 0.2 + ivPctSim * 0.1 + spreadSim * 0.15) * 100;
}

// ---- Sentiment Dimension (25%) ----
function scoreSentiment(snapshot: SentimentData, scenario: SentimentData): number {
  // Put/Call ratio similarity
  const pcrDiff = Math.abs(snapshot.putCallRatio - scenario.putCallRatio);
  const pcrSim = 1 - Math.min(1, pcrDiff / 0.8);

  // Analyst rating similarity
  const ratingScore = analystRatingScore(snapshot.analystRating);
  const scenRatingScore = analystRatingScore(scenario.analystRating);
  const ratingSim = 1 - Math.abs(ratingScore - scenRatingScore) / 4;

  // Headline sentiment similarity
  const snapSentiment = averageHeadlineSentiment(snapshot.headlines);
  const scenSentiment = averageHeadlineSentiment(scenario.headlines);
  const headlineSim = 1 - Math.min(1, Math.abs(snapSentiment - scenSentiment) / 2);

  return (pcrSim * 0.40 + ratingSim * 0.30 + headlineSim * 0.30) * 100;
}

function analystRatingScore(rating: string): number {
  const map: Record<string, number> = {
    "Strong Buy": 4,
    "Buy": 3,
    "Hold": 2,
    "Sell": 1,
    "Strong Sell": 0,
  };
  return map[rating] ?? 2;
}

function averageHeadlineSentiment(headlines: string[]): number {
  if (headlines.length === 0) return 0;

  const positiveWords = [
    "beats", "surges", "rally", "record", "strong", "raises", "boost",
    "growth", "outperform", "accelerates", "expands", "wins", "upgraded",
    "demand", "bullish", "optimism", "profits", "revenue",
  ];
  const negativeWords = [
    "plunge", "crash", "fears", "concerns", "decline", "losses", "warns",
    "struggles", "cut", "slows", "falls", "pressure", "risk", "crisis",
    "sell", "headwinds", "weakness", "stall", "hit", "scrutiny",
    "restrict", "recession", "inverted", "stress", "uncertainty",
  ];

  let totalScore = 0;
  for (const headline of headlines) {
    const lower = headline.toLowerCase();
    let score = 0;
    for (const word of positiveWords) {
      if (lower.includes(word)) score += 1;
    }
    for (const word of negativeWords) {
      if (lower.includes(word)) score -= 1;
    }
    totalScore += score;
  }

  return totalScore / headlines.length;
}

// ---- Market Context Dimension (15%) ----
function scoreMarket(snapshot: MarketContext, scenario: MarketContext): number {
  // Price momentum similarity
  const momentumDiff = Math.abs(snapshot.priceChange30d - scenario.priceChange30d);
  const momentumSim = 1 - Math.min(1, momentumDiff / 50);

  // Direction alignment (both positive or both negative)
  const directionMatch =
    (snapshot.priceChange30d >= 0) === (scenario.priceChange30d >= 0) ? 1 : 0.3;

  // Relative performance similarity (sector vs SPY spread)
  const snapRelPerf = snapshot.sectorPerformance - snapshot.spyPerformance;
  const scenRelPerf = scenario.sectorPerformance - scenario.spyPerformance;
  const relPerfSim = 1 - Math.min(1, Math.abs(snapRelPerf - scenRelPerf) / 20);

  // Sector similarity bonus
  const sectorSim = sectorSimilarity(snapshot.sector, scenario.sector);

  return (momentumSim * 0.30 + directionMatch * 0.20 + relPerfSim * 0.20 + sectorSim * 0.30) * 100;
}

function sectorSimilarity(a: string, b: string): number {
  const la = a.toLowerCase();
  const lb = b.toLowerCase();

  // Exact match
  if (la === lb) return 1.0;

  // Sector groupings
  const groups: string[][] = [
    ["airlines", "aerospace & defense", "travel & leisure"],
    ["technology", "communication services", "fintech"],
    ["financial services", "banking"],
    ["energy"],
    ["entertainment", "specialty retail"],
    ["automotive"],
    ["e-commerce"],
  ];

  for (const group of groups) {
    const aIn = group.some(g => la.includes(g) || g.includes(la));
    const bIn = group.some(g => lb.includes(g) || g.includes(lb));
    if (aIn && bIn) return 0.7;
  }

  return 0.2;
}

// ---- Main Function ----
export function findPatternMatches(
  snapshot: SnapshotForMatching,
  scenarios: ScenarioForMatching[]
): PatternMatchResult[] {
  const results: PatternMatchResult[] = [];

  for (const scenario of scenarios) {
    const greeksScore = scoreGreeks(snapshot.greeksData, scenario.greeksData);
    const volatilityScore = scoreVolatility(snapshot.volatilityData, scenario.volatilityData);
    const sentimentScore = scoreSentiment(snapshot.sentimentData, scenario.sentimentData);
    const marketScore = scoreMarket(snapshot.market, scenario.market);

    const similarity =
      greeksScore * WEIGHTS.greeks +
      volatilityScore * WEIGHTS.volatility +
      sentimentScore * WEIGHTS.sentiment +
      marketScore * WEIGHTS.market;

    results.push({
      scenarioId: scenario.id,
      scenarioSlug: scenario.slug,
      scenarioTitle: scenario.title,
      company: scenario.company,
      companyName: scenario.companyName,
      category: scenario.category,
      similarity: Math.round(similarity * 10) / 10,
      breakdown: {
        greeks: Math.round(greeksScore * 10) / 10,
        volatility: Math.round(volatilityScore * 10) / 10,
        sentiment: Math.round(sentimentScore * 10) / 10,
        market: Math.round(marketScore * 10) / 10,
      },
      outcomeData: scenario.outcomeData,
    });
  }

  // Sort by similarity descending
  results.sort((a, b) => b.similarity - a.similarity);

  return results;
}

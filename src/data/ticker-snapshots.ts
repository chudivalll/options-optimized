// 20 curated ticker snapshots with market data designed to match various historical scenarios
// Each snapshot mirrors the data shape used by scenarios (greeksData, volatilityData, sentimentData)

export interface TickerSnapshotData {
  ticker: string;
  companyName: string;
  exchange: string;
  sector: string;
  stockPrice: number;
  priceChange30d: number;
  marketCap: string;
  sectorPerformance: number;
  spyPerformance: number;
  greeksData: {
    contracts: {
      type: string;
      strike: number;
      expiration: string;
      premium: number;
      delta: number;
      gamma: number;
      theta: number;
      vega: number;
      iv: number;
    }[];
  };
  volatilityData: {
    iv30: number;
    iv60: number;
    hv30: number;
    ivRank: number;
    ivPercentile: number;
  };
  sentimentData: {
    headlines: string[];
    analystRating: string;
    putCallRatio: number;
  };
  snapshotDate: string;
}

export const tickerSnapshots: TickerSnapshotData[] = [
  // ========== UAL — HIGH match to covid-airlines ==========
  {
    ticker: "UAL",
    companyName: "United Airlines Holdings",
    exchange: "NASDAQ",
    sector: "Airlines",
    stockPrice: 89.45,
    priceChange30d: 3.2,
    marketCap: "29.3B",
    sectorPerformance: -1.8,
    spyPerformance: 2.9,
    greeksData: {
      contracts: [
        { type: "put", strike: 85, expiration: "2024-04-19", premium: 1.12, delta: -0.20, gamma: 0.03, theta: -0.05, vega: 0.07, iv: 0.33 },
        { type: "put", strike: 75, expiration: "2024-04-19", premium: 0.38, delta: -0.09, gamma: 0.02, theta: -0.03, vega: 0.04, iv: 0.35 },
        { type: "call", strike: 95, expiration: "2024-04-19", premium: 0.92, delta: 0.24, gamma: 0.03, theta: -0.05, vega: 0.07, iv: 0.32 },
        { type: "put", strike: 70, expiration: "2024-05-17", premium: 0.65, delta: -0.09, gamma: 0.01, theta: -0.02, vega: 0.05, iv: 0.34 },
      ],
    },
    volatilityData: { iv30: 31.8, iv60: 29.2, hv30: 21.5, ivRank: 43, ivPercentile: 50 },
    sentimentData: {
      headlines: [
        "United Airlines beats Q4 earnings estimates, raises 2024 guidance",
        "New respiratory virus variant spreading in Asia raises travel concerns",
        "U.S. airlines report record holiday travel demand",
        "WHO monitors emerging pathogen; airlines assess potential impact",
      ],
      analystRating: "Buy",
      putCallRatio: 0.80,
    },
    snapshotDate: "2024-03-15",
  },

  // ========== AAL — MODERATE match to covid-airlines ==========
  {
    ticker: "AAL",
    companyName: "American Airlines Group",
    exchange: "NASDAQ",
    sector: "Airlines",
    stockPrice: 14.82,
    priceChange30d: -2.1,
    marketCap: "9.7B",
    sectorPerformance: -1.8,
    spyPerformance: 2.9,
    greeksData: {
      contracts: [
        { type: "put", strike: 13, expiration: "2024-04-19", premium: 0.45, delta: -0.22, gamma: 0.06, theta: -0.03, vega: 0.02, iv: 0.42 },
        { type: "put", strike: 12, expiration: "2024-04-19", premium: 0.28, delta: -0.14, gamma: 0.05, theta: -0.02, vega: 0.02, iv: 0.44 },
        { type: "call", strike: 16, expiration: "2024-04-19", premium: 0.38, delta: 0.25, gamma: 0.06, theta: -0.03, vega: 0.02, iv: 0.40 },
        { type: "put", strike: 11, expiration: "2024-05-17", premium: 0.35, delta: -0.12, gamma: 0.03, theta: -0.01, vega: 0.02, iv: 0.43 },
      ],
    },
    volatilityData: { iv30: 40.2, iv60: 37.8, hv30: 32.4, ivRank: 55, ivPercentile: 58 },
    sentimentData: {
      headlines: [
        "American Airlines struggles with debt load despite revenue recovery",
        "Budget airlines face margin pressure as fuel costs rise",
        "Travel demand remains strong but airline stocks lag broader market",
        "AAL credit rating upgraded by Moody's on improved cash flow",
      ],
      analystRating: "Hold",
      putCallRatio: 0.92,
    },
    snapshotDate: "2024-03-15",
  },

  // ========== AMC — HIGH match to gme-squeeze ==========
  {
    ticker: "AMC",
    companyName: "AMC Entertainment Holdings",
    exchange: "NYSE",
    sector: "Entertainment",
    stockPrice: 5.24,
    priceChange30d: 48.6,
    marketCap: "1.2B",
    sectorPerformance: 2.1,
    spyPerformance: 1.5,
    greeksData: {
      contracts: [
        { type: "call", strike: 7, expiration: "2024-04-19", premium: 0.52, delta: 0.30, gamma: 0.08, theta: -0.08, vega: 0.02, iv: 1.18 },
        { type: "call", strike: 10, expiration: "2024-05-17", premium: 0.35, delta: 0.16, gamma: 0.04, theta: -0.04, vega: 0.02, iv: 1.28 },
        { type: "call", strike: 15, expiration: "2024-05-17", premium: 0.12, delta: 0.06, gamma: 0.02, theta: -0.02, vega: 0.01, iv: 1.42 },
        { type: "put", strike: 3, expiration: "2024-04-19", premium: 0.18, delta: -0.14, gamma: 0.06, theta: -0.05, vega: 0.01, iv: 1.12 },
      ],
    },
    volatilityData: { iv30: 102.8, iv60: 96.4, hv30: 80.2, ivRank: 76, ivPercentile: 83 },
    sentimentData: {
      headlines: [
        "AMC shares surge as retail traders rally on social media",
        "Short interest in AMC exceeds 20% of float amid meme stock revival",
        "AMC CEO announces new share offering, drawing mixed reactions",
        "Reddit forums buzz with AMC squeeze thesis as options activity spikes",
      ],
      analystRating: "Sell",
      putCallRatio: 0.43,
    },
    snapshotDate: "2024-03-15",
  },

  // ========== ROKU — MODERATE match to netflix-earnings ==========
  {
    ticker: "ROKU",
    companyName: "Roku Inc.",
    exchange: "NASDAQ",
    sector: "Communication Services",
    stockPrice: 62.35,
    priceChange30d: -7.8,
    marketCap: "8.9B",
    sectorPerformance: -3.8,
    spyPerformance: -1.8,
    greeksData: {
      contracts: [
        { type: "put", strike: 58, expiration: "2024-04-19", premium: 2.85, delta: -0.32, gamma: 0.01, theta: -0.12, vega: 0.08, iv: 0.60 },
        { type: "put", strike: 50, expiration: "2024-05-17", premium: 2.10, delta: -0.20, gamma: 0.006, theta: -0.07, vega: 0.08, iv: 0.58 },
        { type: "call", strike: 68, expiration: "2024-04-19", premium: 2.15, delta: 0.30, gamma: 0.01, theta: -0.11, vega: 0.08, iv: 0.62 },
        { type: "put", strike: 45, expiration: "2024-05-17", premium: 1.25, delta: -0.12, gamma: 0.004, theta: -0.04, vega: 0.06, iv: 0.60 },
      ],
    },
    volatilityData: { iv30: 58.6, iv60: 50.2, hv30: 42.8, ivRank: 68, ivPercentile: 72 },
    sentimentData: {
      headlines: [
        "Roku faces headwinds as streaming ad market softens",
        "Streaming platform competition intensifies; Roku active accounts stall",
        "Analysts cut Roku price targets ahead of earnings report",
        "Connected TV ad spend growth slows, impacting Roku revenue outlook",
      ],
      analystRating: "Hold",
      putCallRatio: 1.08,
    },
    snapshotDate: "2024-03-15",
  },

  // ========== BAC — HIGH match to fed-rate-banks ==========
  {
    ticker: "BAC",
    companyName: "Bank of America Corp.",
    exchange: "NYSE",
    sector: "Financial Services",
    stockPrice: 34.56,
    priceChange30d: -4.8,
    marketCap: "273B",
    sectorPerformance: 2.0,
    spyPerformance: -5.8,
    greeksData: {
      contracts: [
        { type: "call", strike: 37, expiration: "2024-04-19", premium: 0.62, delta: 0.24, gamma: 0.04, theta: -0.03, vega: 0.04, iv: 0.33 },
        { type: "put", strike: 32, expiration: "2024-04-19", premium: 0.55, delta: -0.22, gamma: 0.04, theta: -0.02, vega: 0.04, iv: 0.32 },
        { type: "call", strike: 36, expiration: "2024-06-21", premium: 1.45, delta: 0.38, gamma: 0.02, theta: -0.02, vega: 0.06, iv: 0.31 },
        { type: "put", strike: 30, expiration: "2024-06-21", premium: 1.05, delta: -0.21, gamma: 0.02, theta: -0.01, vega: 0.05, iv: 0.32 },
      ],
    },
    volatilityData: { iv30: 33.5, iv60: 31.8, hv30: 27.4, ivRank: 53, ivPercentile: 58 },
    sentimentData: {
      headlines: [
        "Fed signals continued rate path amid persistent inflation data",
        "Bank of America sees net interest income boost from higher rates",
        "Yield curve remains inverted as recession indicators flash warnings",
        "BAC reports strong Q4 but builds reserves for potential loan losses",
      ],
      analystRating: "Buy",
      putCallRatio: 0.72,
    },
    snapshotDate: "2024-03-15",
  },

  // ========== GS — MODERATE match to fed-rate-banks ==========
  {
    ticker: "GS",
    companyName: "Goldman Sachs Group",
    exchange: "NYSE",
    sector: "Financial Services",
    stockPrice: 385.20,
    priceChange30d: -3.1,
    marketCap: "128B",
    sectorPerformance: 2.0,
    spyPerformance: -5.8,
    greeksData: {
      contracts: [
        { type: "call", strike: 400, expiration: "2024-04-19", premium: 6.85, delta: 0.28, gamma: 0.002, theta: -0.25, vega: 0.42, iv: 0.28 },
        { type: "put", strike: 370, expiration: "2024-04-19", premium: 5.40, delta: -0.20, gamma: 0.002, theta: -0.20, vega: 0.38, iv: 0.27 },
        { type: "call", strike: 395, expiration: "2024-06-21", premium: 12.50, delta: 0.35, gamma: 0.001, theta: -0.15, vega: 0.58, iv: 0.27 },
        { type: "put", strike: 360, expiration: "2024-06-21", premium: 9.80, delta: -0.20, gamma: 0.001, theta: -0.12, vega: 0.50, iv: 0.28 },
      ],
    },
    volatilityData: { iv30: 28.4, iv60: 26.8, hv30: 23.2, ivRank: 42, ivPercentile: 48 },
    sentimentData: {
      headlines: [
        "Goldman Sachs pivots back to core trading business under Solomon",
        "Investment banks see M&A pipeline building as rate uncertainty persists",
        "Goldman consumer banking retreat raises questions about growth strategy",
        "Financial sector outperforms as rate hike expectations solidify",
      ],
      analystRating: "Buy",
      putCallRatio: 0.68,
    },
    snapshotDate: "2024-03-15",
  },

  // ========== MSFT — MODERATE match to apple-launch ==========
  {
    ticker: "MSFT",
    companyName: "Microsoft Corp.",
    exchange: "NASDAQ",
    sector: "Technology",
    stockPrice: 415.80,
    priceChange30d: 3.8,
    marketCap: "3.09T",
    sectorPerformance: 1.8,
    spyPerformance: -0.8,
    greeksData: {
      contracts: [
        { type: "call", strike: 430, expiration: "2024-04-19", premium: 5.20, delta: 0.32, gamma: 0.002, theta: -0.18, vega: 0.35, iv: 0.34 },
        { type: "put", strike: 400, expiration: "2024-04-19", premium: 4.15, delta: -0.28, gamma: 0.002, theta: -0.16, vega: 0.32, iv: 0.33 },
        { type: "call", strike: 440, expiration: "2024-04-19", premium: 2.10, delta: 0.16, gamma: 0.001, theta: -0.12, vega: 0.22, iv: 0.35 },
        { type: "put", strike: 390, expiration: "2024-04-19", premium: 2.45, delta: -0.14, gamma: 0.001, theta: -0.10, vega: 0.20, iv: 0.34 },
      ],
    },
    volatilityData: { iv30: 33.8, iv60: 29.5, hv30: 24.2, ivRank: 46, ivPercentile: 44 },
    sentimentData: {
      headlines: [
        "Microsoft Copilot AI integration drives enterprise adoption surge",
        "Azure cloud revenue growth accelerates to 29% year-over-year",
        "Microsoft Surface and Xbox hardware refresh expected at spring event",
        "Analysts debate if AI revenue justifies MSFT premium valuation",
      ],
      analystRating: "Buy",
      putCallRatio: 0.60,
    },
    snapshotDate: "2024-03-15",
  },

  // ========== LUV — MODERATE match to boeing-max ==========
  {
    ticker: "LUV",
    companyName: "Southwest Airlines Co.",
    exchange: "NYSE",
    sector: "Airlines",
    stockPrice: 29.85,
    priceChange30d: 7.2,
    marketCap: "17.8B",
    sectorPerformance: 4.8,
    spyPerformance: 4.2,
    greeksData: {
      contracts: [
        { type: "put", strike: 28, expiration: "2024-04-19", premium: 0.65, delta: -0.22, gamma: 0.04, theta: -0.03, vega: 0.03, iv: 0.26 },
        { type: "put", strike: 26, expiration: "2024-04-19", premium: 0.30, delta: -0.11, gamma: 0.03, theta: -0.02, vega: 0.02, iv: 0.27 },
        { type: "call", strike: 32, expiration: "2024-04-19", premium: 0.55, delta: 0.28, gamma: 0.04, theta: -0.03, vega: 0.03, iv: 0.25 },
        { type: "put", strike: 24, expiration: "2024-06-21", premium: 0.45, delta: -0.11, gamma: 0.02, theta: -0.01, vega: 0.03, iv: 0.27 },
      ],
    },
    volatilityData: { iv30: 26.8, iv60: 24.5, hv30: 22.1, ivRank: 38, ivPercentile: 40 },
    sentimentData: {
      headlines: [
        "Southwest Airlines fleet expansion hindered by Boeing delivery delays",
        "LUV announces operational overhaul after holiday meltdown scrutiny",
        "Boeing quality concerns ripple through airline supply chain",
        "Southwest reports strong bookings despite fleet constraints",
      ],
      analystRating: "Buy",
      putCallRatio: 0.65,
    },
    snapshotDate: "2024-03-15",
  },

  // ========== CVX — HIGH match to oil-crash-energy ==========
  {
    ticker: "CVX",
    companyName: "Chevron Corp.",
    exchange: "NYSE",
    sector: "Energy",
    stockPrice: 148.90,
    priceChange30d: -13.2,
    marketCap: "283B",
    sectorPerformance: -14.5,
    spyPerformance: -7.5,
    greeksData: {
      contracts: [
        { type: "put", strike: 140, expiration: "2024-04-19", premium: 3.45, delta: -0.28, gamma: 0.006, theta: -0.08, vega: 0.15, iv: 0.43 },
        { type: "put", strike: 130, expiration: "2024-04-19", premium: 1.65, delta: -0.14, gamma: 0.004, theta: -0.05, vega: 0.10, iv: 0.45 },
        { type: "put", strike: 135, expiration: "2024-05-17", premium: 3.20, delta: -0.23, gamma: 0.004, theta: -0.05, vega: 0.16, iv: 0.42 },
        { type: "call", strike: 155, expiration: "2024-04-19", premium: 2.10, delta: 0.20, gamma: 0.005, theta: -0.07, vega: 0.13, iv: 0.41 },
      ],
    },
    volatilityData: { iv30: 41.2, iv60: 37.8, hv30: 29.6, ivRank: 80, ivPercentile: 86 },
    sentimentData: {
      headlines: [
        "Oil prices plunge as OPEC+ compliance falters amid demand concerns",
        "Energy stocks lead market selloff as crude falls below $70",
        "Chevron cuts capital spending outlook as commodity prices weaken",
        "Global recession fears weigh on energy sector demand outlook",
      ],
      analystRating: "Hold",
      putCallRatio: 1.05,
    },
    snapshotDate: "2024-03-15",
  },

  // ========== SLB — MODERATE match to oil-crash-energy ==========
  {
    ticker: "SLB",
    companyName: "Schlumberger Ltd.",
    exchange: "NYSE",
    sector: "Energy",
    stockPrice: 48.62,
    priceChange30d: -10.5,
    marketCap: "69.5B",
    sectorPerformance: -14.5,
    spyPerformance: -7.5,
    greeksData: {
      contracts: [
        { type: "put", strike: 45, expiration: "2024-04-19", premium: 1.15, delta: -0.25, gamma: 0.02, theta: -0.04, vega: 0.05, iv: 0.38 },
        { type: "put", strike: 42, expiration: "2024-04-19", premium: 0.62, delta: -0.14, gamma: 0.02, theta: -0.03, vega: 0.04, iv: 0.40 },
        { type: "put", strike: 43, expiration: "2024-05-17", premium: 1.35, delta: -0.22, gamma: 0.01, theta: -0.02, vega: 0.06, iv: 0.38 },
        { type: "call", strike: 52, expiration: "2024-04-19", premium: 0.85, delta: 0.22, gamma: 0.02, theta: -0.04, vega: 0.05, iv: 0.37 },
      ],
    },
    volatilityData: { iv30: 36.5, iv60: 33.8, hv30: 28.2, ivRank: 65, ivPercentile: 70 },
    sentimentData: {
      headlines: [
        "Oilfield services companies face margin pressure as drilling slows",
        "SLB international revenue growth offsets North American weakness",
        "Energy services sector braces for lower activity as oil prices decline",
        "Schlumberger digital transformation investments show early returns",
      ],
      analystRating: "Hold",
      putCallRatio: 0.95,
    },
    snapshotDate: "2024-03-15",
  },

  // ========== DOCU — HIGH match to zoom-pandemic ==========
  {
    ticker: "DOCU",
    companyName: "DocuSign Inc.",
    exchange: "NASDAQ",
    sector: "Technology",
    stockPrice: 58.40,
    priceChange30d: 11.5,
    marketCap: "11.9B",
    sectorPerformance: 5.2,
    spyPerformance: 3.5,
    greeksData: {
      contracts: [
        { type: "call", strike: 65, expiration: "2024-04-19", premium: 2.05, delta: 0.26, gamma: 0.02, theta: -0.10, vega: 0.05, iv: 0.54 },
        { type: "call", strike: 72, expiration: "2024-05-17", premium: 1.65, delta: 0.20, gamma: 0.01, theta: -0.06, vega: 0.06, iv: 0.56 },
        { type: "call", strike: 85, expiration: "2024-06-21", premium: 0.95, delta: 0.15, gamma: 0.006, theta: -0.04, vega: 0.07, iv: 0.58 },
        { type: "put", strike: 50, expiration: "2024-04-19", premium: 1.10, delta: -0.18, gamma: 0.01, theta: -0.08, vega: 0.04, iv: 0.52 },
      ],
    },
    volatilityData: { iv30: 53.5, iv60: 51.2, hv30: 47.8, ivRank: 40, ivPercentile: 43 },
    sentimentData: {
      headlines: [
        "DocuSign sees renewed enterprise demand as digital workflow adoption accelerates",
        "Remote work normalization drives steady growth for e-signature platforms",
        "DOCU beats revenue estimates as AI-powered contract features gain traction",
        "Tech companies with remote-work tailwinds outperform broader sector",
      ],
      analystRating: "Hold",
      putCallRatio: 0.56,
    },
    snapshotDate: "2024-03-15",
  },

  // ========== SHOP — MODERATE match to zoom-pandemic ==========
  {
    ticker: "SHOP",
    companyName: "Shopify Inc.",
    exchange: "NYSE",
    sector: "Technology",
    stockPrice: 78.50,
    priceChange30d: 8.5,
    marketCap: "99.2B",
    sectorPerformance: 5.2,
    spyPerformance: 3.5,
    greeksData: {
      contracts: [
        { type: "call", strike: 85, expiration: "2024-04-19", premium: 2.80, delta: 0.28, gamma: 0.01, theta: -0.10, vega: 0.08, iv: 0.50 },
        { type: "call", strike: 95, expiration: "2024-05-17", premium: 2.05, delta: 0.18, gamma: 0.006, theta: -0.06, vega: 0.08, iv: 0.52 },
        { type: "call", strike: 110, expiration: "2024-06-21", premium: 1.40, delta: 0.14, gamma: 0.004, theta: -0.04, vega: 0.08, iv: 0.53 },
        { type: "put", strike: 68, expiration: "2024-04-19", premium: 1.45, delta: -0.18, gamma: 0.008, theta: -0.08, vega: 0.06, iv: 0.48 },
      ],
    },
    volatilityData: { iv30: 48.2, iv60: 45.5, hv30: 40.8, ivRank: 38, ivPercentile: 42 },
    sentimentData: {
      headlines: [
        "Shopify merchant growth re-accelerates as e-commerce penetration climbs",
        "Online retail adoption continues steady rise boosting platform stocks",
        "SHOP expands point-of-sale offering to capture omnichannel retail trend",
        "E-commerce enablers see tailwinds from small business digital transformation",
      ],
      analystRating: "Buy",
      putCallRatio: 0.62,
    },
    snapshotDate: "2024-03-15",
  },

  // ========== TSLA — MODERATE match to gme-squeeze ==========
  {
    ticker: "TSLA",
    companyName: "Tesla Inc.",
    exchange: "NASDAQ",
    sector: "Automotive",
    stockPrice: 178.25,
    priceChange30d: 22.4,
    marketCap: "567B",
    sectorPerformance: 3.8,
    spyPerformance: 1.5,
    greeksData: {
      contracts: [
        { type: "call", strike: 200, expiration: "2024-04-19", premium: 5.80, delta: 0.28, gamma: 0.004, theta: -0.18, vega: 0.22, iv: 0.72 },
        { type: "call", strike: 225, expiration: "2024-05-17", premium: 4.25, delta: 0.18, gamma: 0.002, theta: -0.10, vega: 0.22, iv: 0.75 },
        { type: "call", strike: 250, expiration: "2024-05-17", premium: 2.10, delta: 0.10, gamma: 0.001, theta: -0.06, vega: 0.16, iv: 0.78 },
        { type: "put", strike: 155, expiration: "2024-04-19", premium: 3.20, delta: -0.16, gamma: 0.003, theta: -0.12, vega: 0.18, iv: 0.70 },
      ],
    },
    volatilityData: { iv30: 72.4, iv60: 68.2, hv30: 58.5, ivRank: 58, ivPercentile: 62 },
    sentimentData: {
      headlines: [
        "Tesla shares surge as retail investors pile into call options",
        "TSLA short interest remains elevated at 3.2% amid volatile trading",
        "Elon Musk tweets send Tesla stock on wild intraday swings",
        "Options market makers struggle with Tesla gamma exposure as calls dominate",
      ],
      analystRating: "Hold",
      putCallRatio: 0.48,
    },
    snapshotDate: "2024-03-15",
  },

  // ========== META — MODERATE match to netflix-earnings ==========
  {
    ticker: "META",
    companyName: "Meta Platforms Inc.",
    exchange: "NASDAQ",
    sector: "Communication Services",
    stockPrice: 495.20,
    priceChange30d: -5.5,
    marketCap: "1.26T",
    sectorPerformance: -3.8,
    spyPerformance: -1.8,
    greeksData: {
      contracts: [
        { type: "put", strike: 475, expiration: "2024-04-19", premium: 12.50, delta: -0.30, gamma: 0.001, theta: -0.55, vega: 0.48, iv: 0.48 },
        { type: "put", strike: 450, expiration: "2024-05-17", premium: 10.80, delta: -0.20, gamma: 0.0008, theta: -0.32, vega: 0.52, iv: 0.46 },
        { type: "call", strike: 520, expiration: "2024-04-19", premium: 9.20, delta: 0.28, gamma: 0.001, theta: -0.50, vega: 0.46, iv: 0.50 },
        { type: "put", strike: 420, expiration: "2024-05-17", premium: 6.15, delta: -0.12, gamma: 0.0005, theta: -0.20, vega: 0.38, iv: 0.48 },
      ],
    },
    volatilityData: { iv30: 46.8, iv60: 42.5, hv30: 35.4, ivRank: 58, ivPercentile: 62 },
    sentimentData: {
      headlines: [
        "Meta Reality Labs losses mount as metaverse spending questioned",
        "Digital ad market faces headwinds from economic uncertainty",
        "META earnings preview: can AI investments drive next leg of growth?",
        "Social media engagement plateaus as TikTok competition intensifies",
      ],
      analystRating: "Hold",
      putCallRatio: 0.88,
    },
    snapshotDate: "2024-03-15",
  },

  // ========== WFC — MODERATE match to fed-rate-banks ==========
  {
    ticker: "WFC",
    companyName: "Wells Fargo & Co.",
    exchange: "NYSE",
    sector: "Financial Services",
    stockPrice: 52.18,
    priceChange30d: -3.8,
    marketCap: "183B",
    sectorPerformance: 2.0,
    spyPerformance: -5.8,
    greeksData: {
      contracts: [
        { type: "call", strike: 55, expiration: "2024-04-19", premium: 0.95, delta: 0.26, gamma: 0.03, theta: -0.04, vega: 0.05, iv: 0.30 },
        { type: "put", strike: 48, expiration: "2024-04-19", premium: 0.72, delta: -0.20, gamma: 0.03, theta: -0.03, vega: 0.05, iv: 0.29 },
        { type: "call", strike: 54, expiration: "2024-06-21", premium: 2.20, delta: 0.36, gamma: 0.02, theta: -0.02, vega: 0.08, iv: 0.29 },
        { type: "put", strike: 46, expiration: "2024-06-21", premium: 1.85, delta: -0.22, gamma: 0.01, theta: -0.02, vega: 0.07, iv: 0.30 },
      ],
    },
    volatilityData: { iv30: 30.2, iv60: 28.5, hv30: 25.8, ivRank: 48, ivPercentile: 52 },
    sentimentData: {
      headlines: [
        "Wells Fargo benefits from higher rates but faces regulatory overhang",
        "Regional bank stress could spread to larger institutions, analysts warn",
        "WFC asset cap remains in place; Fed signals no timeline for removal",
        "Banks brace for commercial real estate losses as rates stay elevated",
      ],
      analystRating: "Buy",
      putCallRatio: 0.78,
    },
    snapshotDate: "2024-03-15",
  },

  // ========== DIS — MODERATE match to covid-airlines ==========
  {
    ticker: "DIS",
    companyName: "The Walt Disney Co.",
    exchange: "NYSE",
    sector: "Entertainment",
    stockPrice: 112.40,
    priceChange30d: 1.5,
    marketCap: "205B",
    sectorPerformance: -0.8,
    spyPerformance: 2.9,
    greeksData: {
      contracts: [
        { type: "put", strike: 105, expiration: "2024-04-19", premium: 1.85, delta: -0.22, gamma: 0.008, theta: -0.06, vega: 0.10, iv: 0.30 },
        { type: "put", strike: 95, expiration: "2024-04-19", premium: 0.65, delta: -0.09, gamma: 0.004, theta: -0.03, vega: 0.06, iv: 0.32 },
        { type: "call", strike: 120, expiration: "2024-04-19", premium: 1.40, delta: 0.22, gamma: 0.008, theta: -0.06, vega: 0.10, iv: 0.29 },
        { type: "put", strike: 90, expiration: "2024-05-17", premium: 0.85, delta: -0.08, gamma: 0.003, theta: -0.02, vega: 0.06, iv: 0.31 },
      ],
    },
    volatilityData: { iv30: 29.5, iv60: 27.2, hv30: 23.8, ivRank: 40, ivPercentile: 45 },
    sentimentData: {
      headlines: [
        "Disney theme parks see strong demand but streaming losses persist",
        "Travel and entertainment sector vulnerable to economic slowdown",
        "Disney+ subscriber growth stalls as content spending is questioned",
        "Parks revenue exceeds expectations as international tourism rebounds",
      ],
      analystRating: "Buy",
      putCallRatio: 0.75,
    },
    snapshotDate: "2024-03-15",
  },

  // ========== ABNB — MODERATE match to covid-airlines ==========
  {
    ticker: "ABNB",
    companyName: "Airbnb Inc.",
    exchange: "NASDAQ",
    sector: "Travel & Leisure",
    stockPrice: 162.30,
    priceChange30d: 4.2,
    marketCap: "103B",
    sectorPerformance: -1.2,
    spyPerformance: 2.9,
    greeksData: {
      contracts: [
        { type: "put", strike: 150, expiration: "2024-04-19", premium: 3.40, delta: -0.22, gamma: 0.004, theta: -0.12, vega: 0.16, iv: 0.38 },
        { type: "put", strike: 140, expiration: "2024-04-19", premium: 1.85, delta: -0.12, gamma: 0.003, theta: -0.07, vega: 0.12, iv: 0.40 },
        { type: "call", strike: 175, expiration: "2024-04-19", premium: 2.95, delta: 0.22, gamma: 0.004, theta: -0.12, vega: 0.16, iv: 0.37 },
        { type: "put", strike: 130, expiration: "2024-05-17", premium: 2.20, delta: -0.10, gamma: 0.002, theta: -0.05, vega: 0.14, iv: 0.39 },
      ],
    },
    volatilityData: { iv30: 36.8, iv60: 34.2, hv30: 28.5, ivRank: 48, ivPercentile: 52 },
    sentimentData: {
      headlines: [
        "Airbnb bookings hold steady but average daily rates face pressure",
        "Travel platforms brace for impact as global health concerns resurface",
        "ABNB expands Experiences offering to diversify beyond accommodation",
        "Short-term rental regulation tightens in major European cities",
      ],
      analystRating: "Buy",
      putCallRatio: 0.82,
    },
    snapshotDate: "2024-03-15",
  },

  // ========== RIVN — LOW match to oil-crash-energy (inverse) ==========
  {
    ticker: "RIVN",
    companyName: "Rivian Automotive Inc.",
    exchange: "NASDAQ",
    sector: "Automotive",
    stockPrice: 18.45,
    priceChange30d: -18.2,
    marketCap: "18.5B",
    sectorPerformance: -8.5,
    spyPerformance: -2.1,
    greeksData: {
      contracts: [
        { type: "put", strike: 16, expiration: "2024-04-19", premium: 1.05, delta: -0.28, gamma: 0.05, theta: -0.05, vega: 0.02, iv: 0.68 },
        { type: "put", strike: 14, expiration: "2024-04-19", premium: 0.55, delta: -0.16, gamma: 0.04, theta: -0.03, vega: 0.02, iv: 0.72 },
        { type: "call", strike: 22, expiration: "2024-05-17", premium: 0.85, delta: 0.20, gamma: 0.03, theta: -0.03, vega: 0.02, iv: 0.70 },
        { type: "put", strike: 12, expiration: "2024-05-17", premium: 0.65, delta: -0.14, gamma: 0.03, theta: -0.02, vega: 0.02, iv: 0.74 },
      ],
    },
    volatilityData: { iv30: 68.5, iv60: 62.4, hv30: 55.2, ivRank: 55, ivPercentile: 58 },
    sentimentData: {
      headlines: [
        "Rivian faces cash burn concerns as EV competition intensifies",
        "Electric vehicle demand growth slows amid high interest rates",
        "RIVN production ramp falls short of targets; stock hits new low",
        "EV makers struggle with profitability as legacy automakers enter market",
      ],
      analystRating: "Sell",
      putCallRatio: 1.22,
    },
    snapshotDate: "2024-03-15",
  },

  // ========== COIN — MODERATE match to gme-squeeze ==========
  {
    ticker: "COIN",
    companyName: "Coinbase Global Inc.",
    exchange: "NASDAQ",
    sector: "Fintech",
    stockPrice: 225.60,
    priceChange30d: 35.8,
    marketCap: "54.2B",
    sectorPerformance: 8.5,
    spyPerformance: 1.5,
    greeksData: {
      contracts: [
        { type: "call", strike: 250, expiration: "2024-04-19", premium: 12.50, delta: 0.30, gamma: 0.003, theta: -0.35, vega: 0.28, iv: 0.88 },
        { type: "call", strike: 280, expiration: "2024-05-17", premium: 10.80, delta: 0.22, gamma: 0.002, theta: -0.22, vega: 0.30, iv: 0.92 },
        { type: "call", strike: 320, expiration: "2024-05-17", premium: 5.40, delta: 0.12, gamma: 0.001, theta: -0.14, vega: 0.22, iv: 0.95 },
        { type: "put", strike: 190, expiration: "2024-04-19", premium: 5.80, delta: -0.15, gamma: 0.002, theta: -0.20, vega: 0.22, iv: 0.85 },
      ],
    },
    volatilityData: { iv30: 88.4, iv60: 82.5, hv30: 72.8, ivRank: 65, ivPercentile: 70 },
    sentimentData: {
      headlines: [
        "Coinbase surges as Bitcoin rally fuels crypto trading volume spike",
        "Retail trading frenzy returns to crypto markets; COIN options volume explodes",
        "Short sellers target Coinbase amid regulatory uncertainty",
        "Crypto exchange stocks see massive call buying as speculative fervor builds",
      ],
      analystRating: "Hold",
      putCallRatio: 0.45,
    },
    snapshotDate: "2024-03-15",
  },

  // ========== PLTR — LOW match to apple-launch ==========
  {
    ticker: "PLTR",
    companyName: "Palantir Technologies Inc.",
    exchange: "NYSE",
    sector: "Technology",
    stockPrice: 24.80,
    priceChange30d: 6.8,
    marketCap: "53.5B",
    sectorPerformance: 1.8,
    spyPerformance: -0.8,
    greeksData: {
      contracts: [
        { type: "call", strike: 27, expiration: "2024-04-19", premium: 0.95, delta: 0.30, gamma: 0.05, theta: -0.04, vega: 0.02, iv: 0.52 },
        { type: "put", strike: 22, expiration: "2024-04-19", premium: 0.65, delta: -0.22, gamma: 0.04, theta: -0.03, vega: 0.02, iv: 0.50 },
        { type: "call", strike: 30, expiration: "2024-05-17", premium: 0.80, delta: 0.22, gamma: 0.03, theta: -0.02, vega: 0.02, iv: 0.54 },
        { type: "put", strike: 20, expiration: "2024-05-17", premium: 0.55, delta: -0.14, gamma: 0.02, theta: -0.02, vega: 0.02, iv: 0.52 },
      ],
    },
    volatilityData: { iv30: 50.5, iv60: 48.2, hv30: 42.8, ivRank: 52, ivPercentile: 55 },
    sentimentData: {
      headlines: [
        "Palantir wins new government AI contracts worth $250 million",
        "PLTR commercial revenue growth accelerates but valuation concerns linger",
        "AI hype cycle lifts Palantir but fundamentals remain debated",
        "Data analytics stocks rally on enterprise AI adoption narrative",
      ],
      analystRating: "Hold",
      putCallRatio: 0.58,
    },
    snapshotDate: "2024-03-15",
  },
];

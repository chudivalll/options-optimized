export interface ModuleData {
  slug: string;
  title: string;
  description: string;
  order: number;
  difficulty: "beginner" | "intermediate" | "advanced";
}

export const modules: ModuleData[] = [
  {
    slug: "options-basics",
    title: "Options 101",
    description:
      "What are options, calls vs puts, basic terminology. Build a solid foundation in options trading from the ground up.",
    order: 1,
    difficulty: "beginner",
  },
  {
    slug: "the-greeks",
    title: "The Greeks Decoded",
    description:
      "Delta, gamma, theta, vega explained. Understand the key risk metrics that drive option pricing and behavior.",
    order: 2,
    difficulty: "intermediate",
  },
  {
    slug: "implied-volatility",
    title: "Volatility & IV",
    description:
      "IV, HV, IV rank, IV crush, volatility smile. Master the most important concept in options pricing.",
    order: 3,
    difficulty: "intermediate",
  },
  {
    slug: "strategies",
    title: "Options Strategies",
    description:
      "Spreads, straddles, strangles, protective puts. Learn multi-leg strategies to profit in any market condition.",
    order: 4,
    difficulty: "advanced",
  },
  {
    slug: "market-sentiment",
    title: "Reading the Market",
    description:
      "Put/call ratio, news analysis, sentiment indicators. Develop the skills to gauge market mood and trade accordingly.",
    order: 5,
    difficulty: "advanced",
  },
];

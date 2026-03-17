import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import {
  findPatternMatches,
  type SnapshotForMatching,
  type ScenarioForMatching,
} from "@/lib/pattern-matcher";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ ticker: string }> }
) {
  const { ticker } = await params;

  const snapshot = await prisma.tickerSnapshot.findUnique({
    where: { ticker: ticker.toUpperCase() },
  });

  if (!snapshot) {
    return NextResponse.json({ error: "Ticker not found" }, { status: 404 });
  }

  const scenarios = await prisma.scenario.findMany();

  // Build snapshot for matching
  const snapshotInput: SnapshotForMatching = {
    ticker: snapshot.ticker,
    greeksData: JSON.parse(snapshot.greeksData),
    volatilityData: JSON.parse(snapshot.volatilityData),
    sentimentData: JSON.parse(snapshot.sentimentData),
    market: {
      priceChange30d: snapshot.priceChange30d,
      sector: snapshot.sector,
      sectorPerformance: snapshot.sectorPerformance,
      spyPerformance: snapshot.spyPerformance,
    },
  };

  // Build scenarios for matching
  const scenarioInputs: ScenarioForMatching[] = scenarios.map((s) => {
    const marketData = JSON.parse(s.marketData);
    return {
      id: s.id,
      slug: s.slug,
      title: s.title,
      company: s.company,
      companyName: s.companyName,
      category: s.category,
      greeksData: JSON.parse(s.greeksData),
      volatilityData: JSON.parse(s.volatilityData),
      sentimentData: JSON.parse(s.sentimentData),
      market: {
        priceChange30d: marketData.priceChange30d,
        sector: marketData.sector,
        sectorPerformance: marketData.sectorPerformance,
        spyPerformance: marketData.spyPerformance,
      },
      outcomeData: JSON.parse(s.outcomeData),
    };
  });

  const matches = findPatternMatches(snapshotInput, scenarioInputs);

  return NextResponse.json({
    ticker: snapshot.ticker,
    companyName: snapshot.companyName,
    matches,
  });
}

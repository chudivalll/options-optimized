import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const scenario = await prisma.scenario.findUnique({
    where: { id },
  });

  if (!scenario) {
    return NextResponse.json({ error: "Scenario not found" }, { status: 404 });
  }

  return NextResponse.json({
    ...scenario,
    marketData: JSON.parse(scenario.marketData),
    greeksData: JSON.parse(scenario.greeksData),
    volatilityData: JSON.parse(scenario.volatilityData),
    sentimentData: JSON.parse(scenario.sentimentData),
    outcomeData: JSON.parse(scenario.outcomeData),
  });
}

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { calculateScore } from "@/lib/scoring";
import { checkAndAwardBadges } from "@/lib/badges";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as { id: string }).id;
  const body = await request.json();
  const { scenarioId, direction, strategy, timeframe, confidence, reasoning } = body;

  if (!scenarioId || !direction || !strategy || !timeframe || !confidence) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const scenario = await prisma.scenario.findUnique({ where: { id: scenarioId } });
  if (!scenario) {
    return NextResponse.json({ error: "Scenario not found" }, { status: 404 });
  }

  const existing = await prisma.prediction.findUnique({
    where: { userId_scenarioId: { userId, scenarioId } },
  });
  if (existing) {
    return NextResponse.json({ error: "Already predicted for this scenario" }, { status: 400 });
  }

  const outcomeData = JSON.parse(scenario.outcomeData);
  const scoreBreakdown = calculateScore(
    { direction, strategy, timeframe, confidence },
    outcomeData
  );

  const prediction = await prisma.prediction.create({
    data: {
      userId,
      scenarioId,
      direction,
      strategy,
      timeframe,
      confidence,
      reasoning,
      score: scoreBreakdown.total,
      maxScore: scoreBreakdown.maxScore,
    },
  });

  // Update user total score
  await prisma.user.update({
    where: { id: userId },
    data: {
      totalScore: { increment: scoreBreakdown.total },
      lastActiveAt: new Date(),
    },
  });

  // Check badges
  const newBadges = await checkAndAwardBadges(userId);

  return NextResponse.json({
    prediction,
    scoreBreakdown,
    newBadges,
  });
}

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as { id: string }).id;
  const { searchParams } = new URL(request.url);
  const scenarioId = searchParams.get("scenarioId");

  const where: Record<string, string> = { userId };
  if (scenarioId) where.scenarioId = scenarioId;

  const predictions = await prisma.prediction.findMany({
    where,
    include: { scenario: { select: { title: true, company: true, slug: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(predictions);
}

import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import ScenarioClient from "./ScenarioClient";

export default async function ScenarioPage({
  params,
}: {
  params: Promise<{ scenarioId: string }>;
}) {
  const { scenarioId } = await params;
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id: string } | undefined)?.id;

  const scenario = await prisma.scenario.findUnique({
    where: { id: scenarioId },
  });

  if (!scenario) notFound();

  // Check if user already predicted
  let existingPrediction = null;
  if (userId) {
    existingPrediction = await prisma.prediction.findUnique({
      where: { userId_scenarioId: { userId, scenarioId } },
    });
  }

  const parsed = {
    ...scenario,
    marketData: JSON.parse(scenario.marketData),
    greeksData: JSON.parse(scenario.greeksData),
    volatilityData: JSON.parse(scenario.volatilityData),
    sentimentData: JSON.parse(scenario.sentimentData),
    outcomeData: JSON.parse(scenario.outcomeData),
  };

  return (
    <ScenarioClient
      scenario={parsed}
      existingPrediction={existingPrediction}
      isLoggedIn={!!userId}
    />
  );
}

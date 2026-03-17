import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const difficulty = searchParams.get("difficulty");
  const category = searchParams.get("category");

  const where: Record<string, string> = {};
  if (difficulty) where.difficulty = difficulty;
  if (category) where.category = category;

  const scenarios = await prisma.scenario.findMany({
    where,
    select: {
      id: true,
      slug: true,
      title: true,
      company: true,
      companyName: true,
      eventDate: true,
      difficulty: true,
      category: true,
      imageUrl: true,
    },
    orderBy: { eventDate: "desc" },
  });

  return NextResponse.json(scenarios);
}

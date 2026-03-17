import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const scenarios = await prisma.scenario.findMany({
    select: { id: true, slug: true, title: true, company: true, companyName: true, difficulty: true, category: true },
  });

  if (scenarios.length === 0) {
    return NextResponse.json({ error: "No scenarios available" }, { status: 404 });
  }

  // Deterministic daily pick based on date
  const today = new Date();
  const dayIndex =
    (today.getFullYear() * 366 + today.getMonth() * 31 + today.getDate()) %
    scenarios.length;

  return NextResponse.json(scenarios[dayIndex]);
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

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

  return NextResponse.json(snapshot);
}

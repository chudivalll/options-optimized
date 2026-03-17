import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as { id: string }).id;

  const watchlist = await prisma.watchlistItem.findMany({
    where: { userId },
    orderBy: { addedAt: "desc" },
  });

  // Fetch snapshot data for each ticker
  const tickers = watchlist.map((w) => w.ticker);
  const snapshots = await prisma.tickerSnapshot.findMany({
    where: { ticker: { in: tickers } },
  });

  const snapshotMap = new Map(snapshots.map((s) => [s.ticker, s]));

  const items = watchlist.map((w) => ({
    ...w,
    snapshot: snapshotMap.get(w.ticker) || null,
  }));

  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as { id: string }).id;
  const body = await request.json();
  const { ticker, notes } = body;

  if (!ticker) {
    return NextResponse.json({ error: "Ticker is required" }, { status: 400 });
  }

  // Verify the ticker exists in snapshots
  const snapshot = await prisma.tickerSnapshot.findUnique({
    where: { ticker: ticker.toUpperCase() },
  });

  if (!snapshot) {
    return NextResponse.json({ error: "Ticker not found" }, { status: 404 });
  }

  // Check if already on watchlist
  const existing = await prisma.watchlistItem.findUnique({
    where: { userId_ticker: { userId, ticker: ticker.toUpperCase() } },
  });

  if (existing) {
    return NextResponse.json({ error: "Already on watchlist" }, { status: 400 });
  }

  const item = await prisma.watchlistItem.create({
    data: {
      userId,
      ticker: ticker.toUpperCase(),
      notes: notes || null,
    },
  });

  return NextResponse.json({ ...item, snapshot });
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as { id: string }).id;
  const { searchParams } = new URL(request.url);
  const ticker = searchParams.get("ticker");

  if (!ticker) {
    return NextResponse.json({ error: "Ticker is required" }, { status: 400 });
  }

  const existing = await prisma.watchlistItem.findUnique({
    where: { userId_ticker: { userId, ticker: ticker.toUpperCase() } },
  });

  if (!existing) {
    return NextResponse.json({ error: "Not on watchlist" }, { status: 404 });
  }

  await prisma.watchlistItem.delete({
    where: { id: existing.id },
  });

  return NextResponse.json({ success: true });
}

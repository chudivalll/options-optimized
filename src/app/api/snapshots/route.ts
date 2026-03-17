import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sector = searchParams.get("sector");
  const sort = searchParams.get("sort") || "ticker";

  const where: Record<string, unknown> = {};
  if (sector) {
    where.sector = sector;
  }

  type SortOrder = "asc" | "desc";
  let orderBy: Record<string, SortOrder> = { ticker: "asc" };
  if (sort === "price") orderBy = { stockPrice: "desc" };
  else if (sort === "change") orderBy = { priceChange30d: "desc" };
  else if (sort === "sector") orderBy = { sector: "asc" };

  const snapshots = await prisma.tickerSnapshot.findMany({
    where,
    orderBy,
  });

  // Get unique sectors for filter options
  const allSnapshots = await prisma.tickerSnapshot.findMany({
    select: { sector: true },
    distinct: ["sector"],
    orderBy: { sector: "asc" },
  });
  const sectors = allSnapshots.map((s) => s.sector);

  return NextResponse.json({ snapshots, sectors });
}

-- CreateTable
CREATE TABLE "WatchlistItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "ticker" TEXT NOT NULL,
    "addedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,
    CONSTRAINT "WatchlistItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TickerSnapshot" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ticker" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "exchange" TEXT NOT NULL DEFAULT 'NYSE',
    "sector" TEXT NOT NULL,
    "stockPrice" REAL NOT NULL,
    "priceChange30d" REAL NOT NULL,
    "marketCap" TEXT NOT NULL,
    "sectorPerformance" REAL NOT NULL DEFAULT 0,
    "spyPerformance" REAL NOT NULL DEFAULT 0,
    "greeksData" TEXT NOT NULL,
    "volatilityData" TEXT NOT NULL,
    "sentimentData" TEXT NOT NULL,
    "snapshotDate" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "PatternMatch" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "ticker" TEXT NOT NULL,
    "scenarioId" TEXT NOT NULL,
    "similarityScore" REAL NOT NULL,
    "breakdown" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PatternMatch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PatternMatch_scenarioId_fkey" FOREIGN KEY ("scenarioId") REFERENCES "Scenario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "WatchlistItem_userId_ticker_key" ON "WatchlistItem"("userId", "ticker");

-- CreateIndex
CREATE UNIQUE INDEX "TickerSnapshot_ticker_key" ON "TickerSnapshot"("ticker");

-- CreateIndex
CREATE UNIQUE INDEX "PatternMatch_userId_ticker_scenarioId_key" ON "PatternMatch"("userId", "ticker", "scenarioId");

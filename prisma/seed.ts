import { PrismaClient } from "@prisma/client";
import { modules } from "../src/data/modules";
import { lessons } from "../src/data/lessons";
import { tickerSnapshots } from "../src/data/ticker-snapshots";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await prisma.patternMatch.deleteMany();
  await prisma.watchlistItem.deleteMany();
  await prisma.tickerSnapshot.deleteMany();
  await prisma.userBadge.deleteMany();
  await prisma.badge.deleteMany();
  await prisma.userProgress.deleteMany();
  await prisma.prediction.deleteMany();
  await prisma.scenario.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.learningModule.deleteMany();
  await prisma.user.deleteMany();

  // Seed learning modules
  const moduleMap: Record<string, string> = {};
  for (const mod of modules) {
    const created = await prisma.learningModule.create({
      data: {
        slug: mod.slug,
        title: mod.title,
        description: mod.description,
        order: mod.order,
        difficulty: mod.difficulty,
      },
    });
    moduleMap[mod.slug] = created.id;
    console.log(`  Module: ${mod.title}`);
  }

  // Seed lessons
  for (const lesson of lessons) {
    const moduleId = moduleMap[lesson.moduleSlug];
    if (!moduleId) {
      console.warn(`  Skipping lesson "${lesson.title}" - module "${lesson.moduleSlug}" not found`);
      continue;
    }
    await prisma.lesson.create({
      data: {
        moduleId,
        slug: lesson.slug,
        title: lesson.title,
        content: lesson.content,
        order: lesson.order,
        quizData: JSON.stringify(lesson.quizData),
      },
    });
    console.log(`  Lesson: ${lesson.title}`);
  }

  // Seed scenarios from JSON files
  const scenariosDir = path.resolve(__dirname, "../src/data/scenarios");
  const scenarioFiles = fs.readdirSync(scenariosDir).filter((f) => f.endsWith(".json"));

  for (const file of scenarioFiles) {
    const raw = fs.readFileSync(path.join(scenariosDir, file), "utf-8");
    const data = JSON.parse(raw);

    await prisma.scenario.create({
      data: {
        slug: data.slug,
        title: data.title,
        company: data.company,
        companyName: data.companyName,
        exchange: data.exchange || "NYSE",
        eventDate: data.eventDate,
        difficulty: data.difficulty,
        category: data.category,
        setupNarrative: data.setupNarrative,
        revealNarrative: data.revealNarrative,
        marketData: JSON.stringify(data.marketData),
        greeksData: JSON.stringify(data.greeksData),
        volatilityData: JSON.stringify(data.volatilityData),
        sentimentData: JSON.stringify(data.sentimentData),
        outcomeData: JSON.stringify(data.outcomeData),
        imageUrl: data.imageUrl || null,
      },
    });
    console.log(`  Scenario: ${data.title}`);
  }

  // Seed badges
  const badges = [
    { slug: "first-prediction", name: "First Steps", description: "Made your first prediction", criteria: JSON.stringify({ type: "predictions_completed", threshold: 1 }) },
    { slug: "five-predictions", name: "Getting Serious", description: "Completed 5 scenario predictions", criteria: JSON.stringify({ type: "predictions_completed", threshold: 5 }) },
    { slug: "perfect-score", name: "Perfect Call", description: "Scored 90+ on a scenario", criteria: JSON.stringify({ type: "high_score", threshold: 90 }) },
    { slug: "first-lesson", name: "Knowledge Seeker", description: "Completed your first lesson", criteria: JSON.stringify({ type: "lessons_completed", threshold: 1 }) },
    { slug: "module-complete", name: "Module Master", description: "Completed all lessons in a module", criteria: JSON.stringify({ type: "module_completed", threshold: 1 }) },
    { slug: "all-scenarios", name: "Market Historian", description: "Completed all available scenarios", criteria: JSON.stringify({ type: "all_scenarios_completed", threshold: 1 }) },
    { slug: "streak-3", name: "On a Roll", description: "Maintained a 3-day streak", criteria: JSON.stringify({ type: "streak", threshold: 3 }) },
    { slug: "streak-7", name: "Dedicated Trader", description: "Maintained a 7-day streak", criteria: JSON.stringify({ type: "streak", threshold: 7 }) },
  ];

  for (const badge of badges) {
    await prisma.badge.create({ data: badge });
    console.log(`  Badge: ${badge.name}`);
  }

  // Seed ticker snapshots
  for (const snapshot of tickerSnapshots) {
    await prisma.tickerSnapshot.create({
      data: {
        ticker: snapshot.ticker,
        companyName: snapshot.companyName,
        exchange: snapshot.exchange,
        sector: snapshot.sector,
        stockPrice: snapshot.stockPrice,
        priceChange30d: snapshot.priceChange30d,
        marketCap: snapshot.marketCap,
        sectorPerformance: snapshot.sectorPerformance,
        spyPerformance: snapshot.spyPerformance,
        greeksData: JSON.stringify(snapshot.greeksData),
        volatilityData: JSON.stringify(snapshot.volatilityData),
        sentimentData: JSON.stringify(snapshot.sentimentData),
        snapshotDate: snapshot.snapshotDate,
      },
    });
    console.log(`  Snapshot: ${snapshot.ticker} (${snapshot.companyName})`);
  }

  console.log("\nSeeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

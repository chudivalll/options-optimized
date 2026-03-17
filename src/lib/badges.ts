import { prisma } from "./db";

export async function checkAndAwardBadges(userId: string) {
  const badges = await prisma.badge.findMany();
  const userBadges = await prisma.userBadge.findMany({
    where: { userId },
    select: { badgeId: true },
  });
  const earnedIds = new Set(userBadges.map((b) => b.badgeId));

  const predictions = await prisma.prediction.findMany({
    where: { userId },
  });

  const completedLessons = await prisma.userProgress.count({
    where: { userId, completed: true },
  });

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { streak: true },
  });

  const totalScenarios = await prisma.scenario.count();

  const newBadges: string[] = [];

  for (const badge of badges) {
    if (earnedIds.has(badge.id)) continue;

    const criteria = JSON.parse(badge.criteria);
    let earned = false;

    switch (criteria.type) {
      case "predictions_completed":
        earned = predictions.length >= criteria.threshold;
        break;
      case "high_score":
        earned = predictions.some((p) => p.score >= criteria.threshold);
        break;
      case "lessons_completed":
        earned = completedLessons >= criteria.threshold;
        break;
      case "module_completed": {
        const modules = await prisma.learningModule.findMany({
          include: { lessons: { select: { id: true } } },
        });
        const completedLessonIds = new Set(
          (
            await prisma.userProgress.findMany({
              where: { userId, completed: true },
              select: { lessonId: true },
            })
          ).map((p) => p.lessonId)
        );
        earned = modules.some((m) =>
          m.lessons.every((l) => completedLessonIds.has(l.id))
        );
        break;
      }
      case "all_scenarios_completed":
        earned = predictions.length >= totalScenarios && totalScenarios > 0;
        break;
      case "streak":
        earned = (user?.streak || 0) >= criteria.threshold;
        break;
    }

    if (earned) {
      await prisma.userBadge.create({
        data: { userId, badgeId: badge.id },
      });
      newBadges.push(badge.name);
    }
  }

  return newBadges;
}

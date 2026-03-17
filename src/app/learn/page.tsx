import Link from "next/link";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Card, { CardContent } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/ui/ProgressBar";

export default async function LearnPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id: string } | undefined)?.id;

  const modules = await prisma.learningModule.findMany({
    include: {
      lessons: {
        select: { id: true },
        orderBy: { order: "asc" },
      },
    },
    orderBy: { order: "asc" },
  });

  let progressMap: Record<string, boolean> = {};
  if (userId) {
    const progress = await prisma.userProgress.findMany({
      where: { userId, completed: true },
      select: { lessonId: true },
    });
    progressMap = Object.fromEntries(progress.map((p) => [p.lessonId, true]));
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Learn Options Trading</h1>
        <p className="text-gray-600 mt-2">
          Master the fundamentals through interactive lessons and quizzes
        </p>
      </div>

      <div className="space-y-4">
        {modules.map((mod, idx) => {
          const totalLessons = mod.lessons.length;
          const completedLessons = mod.lessons.filter(
            (l) => progressMap[l.id]
          ).length;
          const progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
          const isComplete = completedLessons === totalLessons && totalLessons > 0;

          return (
            <Link key={mod.id} href={`/learn/${mod.id}`}>
              <Card hover className="mb-4">
                <CardContent>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <span className="text-blue-700 font-bold text-lg">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-lg font-semibold text-gray-900">
                          {mod.title}
                        </h2>
                        <Badge
                          variant={
                            mod.difficulty === "beginner"
                              ? "success"
                              : mod.difficulty === "intermediate"
                              ? "warning"
                              : "danger"
                          }
                        >
                          {mod.difficulty}
                        </Badge>
                        {isComplete && <Badge variant="success">Complete</Badge>}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        {mod.description}
                      </p>
                      <div className="flex items-center gap-3">
                        <ProgressBar value={progress} className="flex-1" />
                        <span className="text-sm text-gray-500 whitespace-nowrap">
                          {completedLessons}/{totalLessons} lessons
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

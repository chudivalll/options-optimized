import Link from "next/link";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";
import Card, { CardContent } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

export default async function ModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id: string } | undefined)?.id;

  const mod = await prisma.learningModule.findUnique({
    where: { id: moduleId },
    include: {
      lessons: { orderBy: { order: "asc" } },
    },
  });

  if (!mod) notFound();

  let progressMap: Record<string, { completed: boolean; quizScore: number | null }> = {};
  if (userId) {
    const progress = await prisma.userProgress.findMany({
      where: { userId, lessonId: { in: mod.lessons.map((l) => l.id) } },
      select: { lessonId: true, completed: true, quizScore: true },
    });
    progressMap = Object.fromEntries(
      progress.map((p) => [p.lessonId, { completed: p.completed, quizScore: p.quizScore }])
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/learn"
        className="text-sm text-blue-600 hover:text-blue-700 mb-4 inline-block"
      >
        &larr; Back to Modules
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold text-gray-900">{mod.title}</h1>
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
        </div>
        <p className="text-gray-600">{mod.description}</p>
      </div>

      <div className="space-y-3">
        {mod.lessons.map((lesson, idx) => {
          const prog = progressMap[lesson.id];
          const isCompleted = prog?.completed;

          return (
            <Link key={lesson.id} href={`/learn/${moduleId}/${lesson.id}`}>
              <Card hover className="mb-3">
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        isCompleted
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {isCompleted ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <span className="font-medium">{idx + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                    </div>
                    {prog?.quizScore != null && (
                      <span className="text-sm text-gray-500">
                        Quiz: {prog.quizScore}%
                      </span>
                    )}
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
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

import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Card, { CardContent, CardHeader } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import {
  getDirectionLabel,
  getStrategyLabel,
  getTimeframeLabel,
} from "@/lib/utils";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const userId = (session.user as { id: string }).id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      predictions: {
        include: {
          scenario: { select: { title: true, company: true } },
        },
        orderBy: { createdAt: "desc" },
      },
      badges: {
        include: { badge: true },
        orderBy: { earnedAt: "desc" },
      },
      progress: {
        where: { completed: true },
      },
    },
  });

  if (!user) redirect("/login");

  const totalScenarios = await prisma.scenario.count();
  const totalLessons = await prisma.lesson.count();
  const avgScore =
    user.predictions.length > 0
      ? Math.round(
          user.predictions.reduce((sum, p) => sum + p.score, 0) /
            user.predictions.length
        )
      : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
        <p className="text-gray-600 mt-1">
          {user.name || user.email} &mdash; Member since{" "}
          {user.createdAt.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
          })}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Score" value={user.totalScore.toString()} accent="border-t-blue-500" />
        <StatCard label="Avg Score" value={`${avgScore}/100`} accent="border-t-indigo-500" />
        <StatCard
          label="Scenarios"
          value={`${user.predictions.length}/${totalScenarios}`}
          accent="border-t-violet-500"
        />
        <StatCard
          label="Lessons"
          value={`${user.progress.length}/${totalLessons}`}
          accent="border-t-purple-500"
        />
      </div>

      {/* Streak */}
      <Card className="mb-8">
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 font-mono">
                {user.streak} day{user.streak !== 1 ? "s" : ""}
              </p>
              <p className="text-sm text-gray-500">Current streak</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Badges */}
      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-lg font-semibold">Badges</h2>
        </CardHeader>
        <CardContent>
          {user.badges.length === 0 ? (
            <p className="text-gray-500 text-sm">
              No badges earned yet. Complete scenarios and lessons to earn
              badges!
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {user.badges.map((ub) => (
                <div
                  key={ub.id}
                  className="text-center p-4 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl border border-yellow-100"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-[0_0_12px_rgba(245,158,11,0.3)]">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.023 6.023 0 01-2.77.704 6.023 6.023 0 01-2.77-.704" />
                    </svg>
                  </div>
                  <p className="font-medium text-gray-900 text-sm">
                    {ub.badge.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {ub.badge.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Prediction History */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Prediction History</h2>
        </CardHeader>
        <CardContent>
          {user.predictions.length === 0 ? (
            <p className="text-gray-500 text-sm">
              No predictions yet. Try a scenario to get started!
            </p>
          ) : (
            <div className="space-y-3">
              {user.predictions.map((p) => {
                const borderColor =
                  p.direction === "bullish"
                    ? "border-l-green-400"
                    : p.direction === "bearish"
                    ? "border-l-red-400"
                    : "border-l-gray-300";

                return (
                  <div
                    key={p.id}
                    className={`flex items-center justify-between p-3 bg-gray-50 rounded-lg border-l-4 ${borderColor}`}
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {p.scenario.company} — {p.scenario.title}
                      </p>
                      <div className="flex gap-2 mt-1">
                        <Badge
                          variant={
                            p.direction === "bullish"
                              ? "success"
                              : p.direction === "bearish"
                              ? "danger"
                              : "default"
                          }
                        >
                          {getDirectionLabel(p.direction)}
                        </Badge>
                        <Badge variant="info">{getStrategyLabel(p.strategy)}</Badge>
                        <Badge>{getTimeframeLabel(p.timeframe)}</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900 font-mono">
                        {p.score}
                      </p>
                      <p className="text-xs text-gray-500">/ {p.maxScore}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <Card className={`border-t-2 ${accent}`}>
      <CardContent className="text-center">
        <p className="text-2xl font-bold text-gray-900 font-mono">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </CardContent>
    </Card>
  );
}

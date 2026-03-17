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
        <StatCard label="Total Score" value={user.totalScore.toString()} />
        <StatCard label="Avg Score" value={`${avgScore}/100`} />
        <StatCard
          label="Scenarios"
          value={`${user.predictions.length}/${totalScenarios}`}
        />
        <StatCard
          label="Lessons"
          value={`${user.progress.length}/${totalLessons}`}
        />
      </div>

      {/* Streak */}
      <Card className="mb-8">
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🔥</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
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
                  className="text-center p-4 bg-yellow-50 rounded-xl border border-yellow-100"
                >
                  <div className="text-3xl mb-2">🏆</div>
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
              {user.predictions.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
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
                    <p className="text-xl font-bold text-gray-900">
                      {p.score}
                    </p>
                    <p className="text-xs text-gray-500">/ {p.maxScore}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardContent className="text-center">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </CardContent>
    </Card>
  );
}

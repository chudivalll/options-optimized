import Link from "next/link";
import { prisma } from "@/lib/db";
import Card, { CardContent } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { getCategoryLabel } from "@/lib/utils";

export default async function ScenariosPage() {
  const scenarios = await prisma.scenario.findMany({
    orderBy: { eventDate: "desc" },
    select: {
      id: true,
      slug: true,
      title: true,
      company: true,
      companyName: true,
      eventDate: true,
      difficulty: true,
      category: true,
    },
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Scenario Library</h1>
        <p className="text-gray-600 mt-2">
          Step into real historical market moments and test your options trading instincts
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {scenarios.map((scenario) => (
          <Link key={scenario.id} href={`/scenarios/${scenario.id}`}>
            <Card hover className="h-full">
              <CardContent>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl font-bold text-gray-900">
                    {scenario.company}
                  </span>
                  <span className="text-sm text-gray-500">
                    {scenario.companyName}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {scenario.title}
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  {new Date(scenario.eventDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      scenario.difficulty === "beginner"
                        ? "success"
                        : scenario.difficulty === "intermediate"
                        ? "warning"
                        : "danger"
                    }
                  >
                    {scenario.difficulty}
                  </Badge>
                  <Badge variant="info">
                    {getCategoryLabel(scenario.category)}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

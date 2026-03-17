"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Card, { CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

interface DailyScenario {
  id: string;
  slug: string;
  title: string;
  company: string;
  companyName: string;
  difficulty: string;
  category: string;
}

export default function DailyChallengePage() {
  const router = useRouter();
  const [scenario, setScenario] = useState<DailyScenario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/daily")
      .then((res) => res.json())
      .then((data) => {
        setScenario(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="animate-pulse">
          <div className="w-20 h-20 bg-gray-200 rounded-2xl mx-auto mb-4" />
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-2" />
          <div className="h-4 bg-gray-200 rounded w-48 mx-auto" />
        </div>
      </div>
    );
  }

  if (!scenario) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500">No daily challenge available.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">📅</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Daily Challenge
        </h1>
        <p className="text-gray-600">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="text-center py-8">
          <div className="text-4xl font-bold text-gray-900 mb-2">
            {scenario.company}
          </div>
          <p className="text-lg text-gray-600 mb-4">{scenario.companyName}</p>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {scenario.title}
          </h2>
          <div className="flex items-center justify-center gap-2">
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
            <Badge variant="info">{scenario.category}</Badge>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button
          size="lg"
          onClick={() => router.push(`/scenarios/${scenario.id}`)}
        >
          Start Today&apos;s Challenge
        </Button>
      </div>
    </div>
  );
}

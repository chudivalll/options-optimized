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
          <div className="w-20 h-20 animate-shimmer rounded-2xl mx-auto mb-4" />
          <div className="h-8 animate-shimmer rounded w-64 mx-auto mb-2" />
          <div className="h-4 animate-shimmer rounded w-48 mx-auto" />
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
    <div className="max-w-2xl mx-auto px-4 py-16 animate-fade-in-up">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_24px_rgba(59,130,246,0.4)]">
          <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
          </svg>
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

      <Card className="mb-8 border-t-2 border-t-blue-500">
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

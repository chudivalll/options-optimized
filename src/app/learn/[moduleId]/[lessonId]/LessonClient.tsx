"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import QuizSection from "@/components/learn/QuizSection";
import Button from "@/components/ui/Button";

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface LessonClientProps {
  content: string;
  quizData: QuizQuestion[];
  lessonId: string;
  prevLesson: { id: string; title: string; moduleId: string } | null;
  nextLesson: { id: string; title: string; moduleId: string } | null;
}

export default function LessonClient({
  content,
  quizData,
  lessonId,
  prevLesson,
  nextLesson,
}: LessonClientProps) {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleQuizComplete(score: number) {
    setQuizCompleted(true);
    setSaving(true);
    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, quizScore: score }),
      });
    } catch {
      // Silently fail — user can still navigate
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      {/* Lesson content */}
      <div className="prose prose-gray max-w-none mb-8">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>

      {/* Quiz */}
      {quizData.length > 0 && (
        <div className="mb-8">
          <QuizSection
            questions={quizData}
            lessonId={lessonId}
            onComplete={handleQuizComplete}
          />
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between border-t border-gray-200 pt-6">
        {prevLesson ? (
          <Link href={`/learn/${prevLesson.moduleId}/${prevLesson.id}`}>
            <Button variant="outline">
              &larr; {prevLesson.title}
            </Button>
          </Link>
        ) : (
          <div />
        )}

        {nextLesson ? (
          <Link href={`/learn/${nextLesson.moduleId}/${nextLesson.id}`}>
            <Button>
              {nextLesson.title} &rarr;
            </Button>
          </Link>
        ) : quizCompleted ? (
          <Link href={`/learn/${prevLesson?.moduleId || ""}`}>
            <Button variant="secondary">
              {saving ? "Saving..." : "Back to Module"}
            </Button>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

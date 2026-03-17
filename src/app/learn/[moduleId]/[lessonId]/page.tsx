import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import LessonClient from "./LessonClient";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ moduleId: string; lessonId: string }>;
}) {
  const { moduleId, lessonId } = await params;

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      module: true,
    },
  });

  if (!lesson || lesson.moduleId !== moduleId) notFound();

  // Get sibling lessons for navigation
  const lessons = await prisma.lesson.findMany({
    where: { moduleId },
    orderBy: { order: "asc" },
    select: { id: true, title: true, order: true },
  });

  const currentIdx = lessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIdx > 0 ? lessons[currentIdx - 1] : null;
  const nextLesson =
    currentIdx < lessons.length - 1 ? lessons[currentIdx + 1] : null;

  const quizData = JSON.parse(lesson.quizData);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        href={`/learn/${moduleId}`}
        className="text-sm text-blue-600 hover:text-blue-700 mb-4 inline-block"
      >
        &larr; Back to {lesson.module.title}
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-6">{lesson.title}</h1>

      <LessonClient
        content={lesson.content}
        quizData={quizData}
        lessonId={lessonId}
        prevLesson={prevLesson ? { id: prevLesson.id, title: prevLesson.title, moduleId } : null}
        nextLesson={nextLesson ? { id: nextLesson.id, title: nextLesson.title, moduleId } : null}
      />
    </div>
  );
}

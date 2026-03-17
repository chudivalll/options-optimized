import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { checkAndAwardBadges } from "@/lib/badges";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as { id: string }).id;

  const progress = await prisma.userProgress.findMany({
    where: { userId },
    include: {
      lesson: {
        select: { title: true, slug: true, moduleId: true },
      },
    },
  });

  return NextResponse.json(progress);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as { id: string }).id;
  const { lessonId, quizScore } = await request.json();

  if (!lessonId) {
    return NextResponse.json({ error: "lessonId is required" }, { status: 400 });
  }

  const progress = await prisma.userProgress.upsert({
    where: { userId_lessonId: { userId, lessonId } },
    update: {
      completed: true,
      quizScore,
      completedAt: new Date(),
    },
    create: {
      userId,
      lessonId,
      completed: true,
      quizScore,
      completedAt: new Date(),
    },
  });

  await checkAndAwardBadges(userId);

  return NextResponse.json(progress);
}

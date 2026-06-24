import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import type { Metadata } from "next";
import AssignmentStandalonePage from "@/components/lesson/AssignmentStandalonePage";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const assignment = await prisma.assignment.findUnique({ where: { id: params.id } });
  if (!assignment) return { title: "Assignment Not Found" };
  return { title: `${assignment.title} | TeachCode` };
}

export default async function AssignmentPage({ params }: Props) {
  const assignment = await prisma.assignment.findUnique({
    where: { id: params.id },
    include: {
      lesson: { select: { title: true, slug: true } },
    },
  });

  if (!assignment) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <AssignmentStandalonePage assignment={assignment} />
    </div>
  );
}

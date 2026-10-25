export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { parseActivityChoices } from "@/lib/data/activities";
import { PageHeader } from "@/components/ui/decor";
import ActivitiesClient from "./ActivitiesClient";

export default async function ActivitiesPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const user = await db.user.findUnique({
    where: { id: session.user!.id },
    select: { activityChoices: true },
  });

  const day = new Date().getDay();
  const todayIndex = day === 0 ? 6 : day - 1;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-10">
      <PageHeader
        eyebrow="Activities"
        title="Little Moments Today"
        subtitle="Two ideas for each part of the day, new every day of the week. Don't fancy one? Swap it."
      />
      <ActivitiesClient todayIndex={todayIndex} initialChoices={parseActivityChoices(user?.activityChoices)} />
    </div>
  );
}

export const dynamic = "force-dynamic";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import MealsClient from "./MealsClient";
import { PageHeader } from "@/components/ui/decor";

export default async function MealsPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const user = await db.user.findUnique({
    where: { id: session.user!.id },
    select: { childFoodDislikes: true },
  });

  const day = new Date().getDay();
  const todayIndex = day === 0 ? 6 : day - 1;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-10">
      <PageHeader
        eyebrow="Meal plan"
        title="This Week's Table"
        subtitle="Breakfast, lunch and dinner for every day — tap a day to see what's cooking."
      />
      <MealsClient todayIndex={todayIndex} dislikedFoods={user?.childFoodDislikes ?? []} />
    </div>
  );
}

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { DAYS, SLOTS, choiceKey, findMealBySlug, parseMealChoices, type Slot } from "@/lib/data/meals";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const day = body?.day;
  const slot = body?.slot;
  const slug = body?.slug;

  if (
    !(DAYS as readonly string[]).includes(day) ||
    !SLOTS.includes(slot) ||
    !(slug === null || (typeof slug === "string" && findMealBySlug(slug)))
  ) {
    return Response.json({ error: "Invalid meal choice" }, { status: 400 });
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { mealChoices: true },
  });
  const choices = parseMealChoices(user?.mealChoices);
  const key = choiceKey(day, slot as Slot);
  if (slug === null) delete choices[key];
  else choices[key] = slug;

  await db.user.update({
    where: { id: session.user.id },
    data: { mealChoices: choices },
  });

  return Response.json({ choices });
}

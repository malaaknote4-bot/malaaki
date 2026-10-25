import { randomUUID } from "crypto";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { DAYS, choiceKey, parseMealChoices, slugify } from "@/lib/data/meals";
import { MealDraftSchema, SlotSchema, draftToMeal } from "@/lib/data/custom-meal";

const MAX_CUSTOM_MEALS = 100;

const Body = z.object({
  draft: MealDraftSchema,
  slot: SlotSchema,
  day: z.enum(DAYS),
});

// Saves a family's own recipe and puts it on the plan for the given day and slot.
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;

  const body = Body.safeParse(await req.json().catch(() => null));
  if (!body.success) {
    return Response.json(
      { error: body.error.issues[0]?.message ?? "Some recipe details are missing." },
      { status: 400 }
    );
  }
  const { draft, slot, day } = body.data;

  const count = await db.customMeal.count({ where: { userId } });
  if (count >= MAX_CUSTOM_MEALS) {
    return Response.json({ error: "You've reached the limit of saved family recipes." }, { status: 400 });
  }

  const slug = `my-${slugify(draft.name).slice(0, 50) || "meal"}-${randomUUID().slice(0, 6)}`;
  const meal = draftToMeal(draft, slot, slug);

  const user = await db.user.findUnique({ where: { id: userId }, select: { mealChoices: true } });
  const choices = { ...parseMealChoices(user?.mealChoices), [choiceKey(day, slot)]: slug };

  await db.$transaction([
    db.customMeal.create({ data: { userId, slug, data: { ...draft, slot } } }),
    db.user.update({ where: { id: userId }, data: { mealChoices: choices } }),
  ]);

  return Response.json({ meal, choices });
}

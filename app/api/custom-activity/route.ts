import { randomUUID } from "crypto";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { DAYS, slugify } from "@/lib/data/meals";
import { PER_PERIOD, activityKey, parseActivityChoices, parseCustomActivities, type Activity } from "@/lib/data/activities";
import { ActivityDraftSchema, PeriodSchema } from "@/lib/data/custom-activity";

const MAX_CUSTOM_ACTIVITIES = 100;

const Body = z.object({
  draft: ActivityDraftSchema,
  day: z.enum(DAYS),
  period: PeriodSchema,
  index: z.number().int().min(0).max(PER_PERIOD - 1),
});

// Saves a parent's own activity and puts it on the plan for the given day, time of day and slot.
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;

  const body = Body.safeParse(await req.json().catch(() => null));
  if (!body.success) {
    return Response.json({ error: body.error.issues[0]?.message ?? "Some details are missing." }, { status: 400 });
  }
  const { draft, day, period, index } = body.data;

  const user = await db.user.findUnique({
    where: { id: userId },
    select: { customActivities: true, activityChoices: true },
  });
  const existing = parseCustomActivities(user?.customActivities);
  if (existing.length >= MAX_CUSTOM_ACTIVITIES) {
    return Response.json({ error: "You've reached the limit of saved activities." }, { status: 400 });
  }

  const activity: Activity = {
    id: `my-${slugify(draft.title).slice(0, 40) || "activity"}-${randomUUID().slice(0, 6)}`,
    period,
    emoji: draft.emoji,
    title: draft.title,
    duration: draft.duration || "Any time",
    description: draft.description,
    custom: true,
  };
  const choices = { ...parseActivityChoices(user?.activityChoices), [activityKey(day, period, index)]: activity.id };

  await db.user.update({
    where: { id: userId },
    data: { customActivities: [activity, ...existing], activityChoices: choices },
  });

  return Response.json({ activity, choices });
}

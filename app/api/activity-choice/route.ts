import { z } from "zod";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { DAYS } from "@/lib/data/meals";
import { PERIODS, PER_PERIOD, activityKey, findActivity, parseActivityChoices } from "@/lib/data/activities";

const Body = z.object({
  day: z.enum(DAYS),
  period: z.enum(PERIODS as [string, ...string[]]),
  index: z.number().int().min(0).max(PER_PERIOD - 1),
  id: z.string().nullable(),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = Body.safeParse(await req.json().catch(() => null));
  if (!body.success || (body.data.id !== null && !findActivity(body.data.id))) {
    return Response.json({ error: "Invalid activity choice" }, { status: 400 });
  }
  const { day, period, index, id } = body.data;

  const user = await db.user.findUnique({ where: { id: session.user.id }, select: { activityChoices: true } });
  const choices = parseActivityChoices(user?.activityChoices);
  const key = activityKey(day, period as (typeof PERIODS)[number], index);
  if (id === null) delete choices[key];
  else choices[key] = id;

  await db.user.update({ where: { id: session.user.id }, data: { activityChoices: choices } });
  return Response.json({ choices });
}

import { z } from "zod";
import { auth } from "@/lib/auth";
import { PeriodSchema } from "@/lib/data/custom-activity";
import { generateActivityDetails } from "@/lib/custom-activities.server";
import { RecipeError } from "@/lib/custom-meals.server";

const Body = z.object({
  title: z.string().trim().min(1).max(60),
  notes: z.string().trim().max(400).default(""),
  period: PeriodSchema,
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = Body.safeParse(await req.json().catch(() => null));
  if (!body.success) {
    return Response.json({ error: "Tell us the name of the activity first." }, { status: 400 });
  }

  try {
    const draft = await generateActivityDetails(body.data.title, body.data.notes, body.data.period);
    return Response.json({ draft });
  } catch (error) {
    if (error instanceof RecipeError) {
      return Response.json({ error: error.message }, { status: error.status });
    }
    throw error;
  }
}

import { z } from "zod";
import { auth } from "@/lib/auth";
import { SlotSchema } from "@/lib/data/custom-meal";
import { generateRecipe, RecipeError } from "@/lib/custom-meals.server";

const Body = z.object({
  name: z.string().trim().min(1).max(80),
  notes: z.string().trim().max(600).default(""),
  slot: SlotSchema,
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = Body.safeParse(await req.json().catch(() => null));
  if (!body.success) {
    return Response.json({ error: "Tell us the name of the meal first." }, { status: 400 });
  }

  try {
    const draft = await generateRecipe(body.data.name, body.data.notes, body.data.slot);
    return Response.json({ draft });
  } catch (error) {
    if (error instanceof RecipeError) {
      return Response.json({ error: error.message }, { status: error.status });
    }
    throw error;
  }
}

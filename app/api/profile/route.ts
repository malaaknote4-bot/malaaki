import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  await db.user.update({
    where: { id: session.user.id },
    data: {
      onboardingDone: true,
      childAgeRange: body.childAgeRange ?? null,
      childAllergies: body.childAllergies ?? [],
      childFoodDislikes: body.childFoodDislikes ?? [],
      numChildren: body.numChildren ?? null,
      dietaryPreferences: body.dietaryPreferences ?? [],
    },
  });

  return Response.json({ ok: true });
}

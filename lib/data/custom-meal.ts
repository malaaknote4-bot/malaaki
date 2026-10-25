import { z } from "zod";
import { detectFoodTags } from "./foods";
import { SLOTS, type Meal, type Slot } from "./meals";

// What a parent can save as their own recipe (also the shape the recipe writer returns).
export const MealDraftSchema = z.object({
  name: z.string().trim().min(1, "Give the meal a name").max(80),
  emoji: z.string().trim().min(1).max(16),
  note: z.string().trim().max(160),
  time: z.string().trim().min(1, "Add a cooking time").max(30),
  adultPortion: z.number().int().positive().max(3000),
  childPortion: z.number().int().positive().max(3000),
  ingredients: z
    .array(
      z.object({
        name: z.string().trim().min(1, "Every ingredient needs a name").max(80),
        amount: z.number().positive("Amounts must be more than 0").max(10000),
        unit: z.enum(["g", "ml"]),
        note: z.string().trim().max(80).optional(),
      })
    )
    .min(1, "Add at least one ingredient")
    .max(40),
  steps: z.array(z.string().trim().min(1, "Steps can't be empty").max(600)).min(1, "Add at least one step").max(20),
});

export type MealDraft = z.infer<typeof MealDraftSchema>;

export const SlotSchema = z.enum(SLOTS as [Slot, ...Slot[]]);

export const emptyDraft = (name = ""): MealDraft => ({
  name,
  emoji: "🍽️",
  note: "",
  time: "",
  adultPortion: 350,
  childPortion: 200,
  ingredients: [{ name: "", amount: 100, unit: "g", note: "" }],
  steps: [""],
});

// Tags are always worked out from the ingredients, so dislikes apply to family recipes too.
export function draftToMeal(draft: MealDraft, slot: Slot, slug: string): Meal {
  return {
    slug,
    emoji: draft.emoji,
    name: draft.name,
    note: draft.note || "Our family recipe",
    prep: draft.steps.join(" ").slice(0, 160),
    time: draft.time,
    servings: { serves: 4, adultPortion: draft.adultPortion, childPortion: draft.childPortion },
    ingredients: draft.ingredients.map((i) => ({ ...i, note: i.note || undefined })),
    steps: draft.steps,
    tags: detectFoodTags([draft.name, ...draft.ingredients.map((i) => i.name)]),
    custom: { slot },
  };
}

const StoredMealSchema = MealDraftSchema.extend({ slot: SlotSchema });

export function storedToMeal(slug: string, data: unknown): Meal | null {
  const parsed = StoredMealSchema.safeParse(data);
  if (!parsed.success) return null;
  const { slot, ...draft } = parsed.data;
  return draftToMeal(draft, slot, slug);
}

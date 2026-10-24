"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const FOOD_OPTIONS = [
  { value: "banana",    label: "🍌 Banana" },
  { value: "oats",      label: "🌾 Oats" },
  { value: "eggs",      label: "🥚 Eggs" },
  { value: "pasta",     label: "🍝 Pasta" },
  { value: "beef",      label: "🥩 Beef" },
  { value: "chicken",   label: "🍗 Chicken" },
  { value: "fish",      label: "🐟 Fish" },
  { value: "tuna",      label: "🐟 Tuna" },
  { value: "tomato",    label: "🍅 Tomato" },
  { value: "cheese",    label: "🧀 Cheese" },
  { value: "potato",    label: "🥔 Potato" },
  { value: "beans",     label: "🫘 Beans" },
  { value: "lentils",   label: "🌱 Lentils" },
  { value: "sweetcorn", label: "🌽 Sweetcorn" },
  { value: "mushrooms", label: "🍄 Mushrooms" },
  { value: "onion",     label: "🧅 Onion" },
  { value: "carrot",    label: "🥕 Carrot" },
  { value: "pepper",    label: "🫑 Pepper" },
  { value: "bread",     label: "🍞 Bread" },
  { value: "yogurt",    label: "🥛 Yogurt" },
  { value: "ham",       label: "🍖 Ham" },
  { value: "peas",      label: "🟢 Peas" },
  { value: "rice",      label: "🍚 Rice" },
  { value: "broccoli",  label: "🥦 Broccoli" },
  { value: "avocado",   label: "🥑 Avocado" },
  { value: "spinach",   label: "🥬 Spinach" },
];

const STEPS = [
  {
    emoji: "🎂",
    question: "How old is your little one?",
    subtitle: "We'll tailor meals and activities to their age",
    type: "single" as const,
    field: "childAgeRange",
    options: [
      { value: "0-2", label: "Baby", sub: "0 – 2 years" },
      { value: "2-4", label: "Toddler", sub: "2 – 4 years" },
      { value: "4-6", label: "Little Kid", sub: "4 – 6 years" },
      { value: "6-9", label: "Kid", sub: "6 – 9 years" },
      { value: "9-12", label: "Tween", sub: "9 – 12 years" },
    ],
  },
  {
    emoji: "🚨",
    question: "Any allergies we should know about?",
    subtitle: "Select all that apply — we'll flag these in meal plans",
    type: "multi" as const,
    field: "childAllergies",
    options: [
      { value: "nuts",      label: "🥜 Nuts" },
      { value: "dairy",     label: "🥛 Dairy" },
      { value: "eggs",      label: "🥚 Eggs" },
      { value: "gluten",    label: "🌾 Gluten" },
      { value: "shellfish", label: "🦐 Shellfish" },
      { value: "soy",       label: "🫘 Soy" },
      { value: "none",      label: "✅ None" },
    ],
  },
  {
    emoji: "🙅",
    question: "Any foods they really don't like?",
    subtitle: "Search and pick — we'll swap these out of the meal plan",
    type: "search-multi" as const,
    field: "childFoodDislikes",
  },
  {
    emoji: "👨‍👩‍👧‍👦",
    question: "How many children are you planning for?",
    subtitle: "Just so we know how many little ones to feed!",
    type: "single" as const,
    field: "numChildren",
    options: [
      { value: "1", label: "1 child" },
      { value: "2", label: "2 children" },
      { value: "3", label: "3 children" },
      { value: "4", label: "4+ children" },
    ],
  },
  {
    emoji: "🥦",
    question: "Any dietary preferences?",
    subtitle: "Select all that apply",
    type: "multi" as const,
    field: "dietaryPreferences",
    options: [
      { value: "none",        label: "🍽️ No preference" },
      { value: "vegetarian",  label: "🥕 Vegetarian" },
      { value: "vegan",       label: "🌱 Vegan" },
      { value: "halal",       label: "☪️ Halal" },
      { value: "kosher",      label: "✡️ Kosher" },
    ],
  },
];

type Answers = {
  childAgeRange: string;
  childAllergies: string[];
  childFoodDislikes: string[];
  numChildren: number | null;
  dietaryPreferences: string[];
};

export default function OnboardingClient() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [foodSearch, setFoodSearch] = useState("");
  const [answers, setAnswers] = useState<Answers>({
    childAgeRange: "",
    childAllergies: [],
    childFoodDislikes: [],
    numChildren: null,
    dietaryPreferences: [],
  });

  const current = STEPS[step];

  function getSingleValue(): string {
    const field = current.field as keyof Answers;
    const val = answers[field];
    return typeof val === "string" ? val : val !== null ? String(val) : "";
  }

  function getMultiValues(): string[] {
    const field = current.field as keyof Answers;
    const val = answers[field];
    return Array.isArray(val) ? val : [];
  }

  function selectSingle(value: string) {
    const field = current.field as keyof Answers;
    if (field === "numChildren") {
      setAnswers((a) => ({ ...a, numChildren: parseInt(value.replace("+", "")) }));
    } else {
      setAnswers((a) => ({ ...a, [field]: value }));
    }
  }

  function toggleMulti(value: string) {
    const field = current.field as keyof Answers;
    setAnswers((a) => {
      const prev = (a[field] as string[]) ?? [];
      if (value === "none") return { ...a, [field]: ["none"] };
      const without = prev.filter((v) => v !== "none");
      return {
        ...a,
        [field]: without.includes(value)
          ? without.filter((v) => v !== value)
          : [...without, value],
      };
    });
  }

  function toggleFoodDislike(value: string) {
    setAnswers((a) => ({
      ...a,
      childFoodDislikes: a.childFoodDislikes.includes(value)
        ? a.childFoodDislikes.filter((v) => v !== value)
        : [...a.childFoodDislikes, value],
    }));
  }

  function canAdvance(): boolean {
    if (current.type === "search-multi") return true;
    if (current.type === "single") return getSingleValue() !== "";
    if (current.type === "multi") return getMultiValues().length > 0;
    return true;
  }

  const filteredFoods = foodSearch.trim()
    ? FOOD_OPTIONS.filter(
        (f) =>
          f.label.toLowerCase().includes(foodSearch.toLowerCase()) ||
          f.value.toLowerCase().includes(foodSearch.toLowerCase())
      )
    : FOOD_OPTIONS;

  async function handleNext() {
    if (step < STEPS.length - 1) {
      setFoodSearch("");
      setStep((s) => s + 1);
    } else {
      setSaving(true);
      await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });
      router.push("/");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-lg px-4 py-10">
        {/* Progress dots */}
        <div className="flex gap-2 justify-center mb-8">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i <= step ? "w-8 bg-primary" : "w-1.5 bg-primary/25"
              }`}
            />
          ))}
        </div>

        {/* Card */}
        <div className="overflow-hidden rounded-[28px] bg-card border border-border">
          <div className="bg-blush px-6 py-8 text-center">
            <div className="text-5xl mb-3">{current.emoji}</div>
            <h2 className="font-display text-3xl sm:text-4xl leading-[1] text-primary">{current.question}</h2>
            <p className="mt-2 text-sm text-foreground/75">{current.subtitle}</p>
          </div>
          <div className="p-6">

          {/* Single select */}
          {current.type === "single" && (
            <div className="grid grid-cols-2 gap-3">
              {current.options?.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => selectSingle(opt.value)}
                  className={`rounded-2xl border p-4 text-left transition-all ${
                    getSingleValue() === opt.value
                      ? "border-primary bg-blush"
                      : "border-border bg-card hover:border-primary/40"
                  }`}
                >
                  <div className="font-semibold text-foreground">{opt.label}</div>
                  {"sub" in opt && (
                    <div className="text-xs font-semibold text-soft mt-0.5">{opt.sub}</div>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Multi select */}
          {current.type === "multi" && (
            <div className="flex flex-wrap gap-2">
              {current.options?.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => toggleMulti(opt.value)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                    getMultiValues().includes(opt.value)
                      ? "border-primary bg-blush text-foreground"
                      : "border-border bg-card text-soft hover:border-primary/40"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          {/* Search multi — food dislikes */}
          {current.type === "search-multi" && (
            <div>
              {/* Selected tags */}
              {answers.childFoodDislikes.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {answers.childFoodDislikes.map((val) => {
                    const food = FOOD_OPTIONS.find((f) => f.value === val);
                    return (
                      <button
                        key={val}
                        onClick={() => toggleFoodDislike(val)}
                        className="flex items-center gap-1 rounded-full bg-primary text-primary-fg px-3 py-1 text-xs font-semibold"
                      >
                        {food?.label}
                        <span className="ml-0.5 opacity-60">×</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Search input */}
              <input
                type="text"
                placeholder="Search foods (e.g. chicken, pasta…)"
                value={foodSearch}
                onChange={(e) => setFoodSearch(e.target.value)}
                className="w-full rounded-full border border-border bg-background px-5 py-3 text-foreground font-semibold text-sm placeholder:text-soft focus:outline-none focus:border-primary mb-3"
              />

              {/* Filtered chip list */}
              <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                {filteredFoods.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => toggleFoodDislike(opt.value)}
                    className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition-all ${
                      answers.childFoodDislikes.includes(opt.value)
                        ? "border-primary bg-blush text-foreground"
                        : "border-border bg-card text-soft hover:border-primary/40"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
                {filteredFoods.length === 0 && (
                  <p className="text-sm text-soft font-medium py-2">No matching foods found.</p>
                )}
              </div>

              {answers.childFoodDislikes.length === 0 && (
                <p className="text-xs text-soft font-medium mt-3 text-center">
                  Skip if no dislikes — tap Next to continue
                </p>
              )}
            </div>
          )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-3 mt-4">
          {step > 0 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="flex-1 rounded-full border border-border bg-card py-3 text-sm font-semibold text-soft hover:bg-muted transition-colors"
            >
              ← Back
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!canAdvance() || saving}
            className={`flex-1 rounded-full py-3 text-sm font-semibold text-primary-fg transition-all ${
              canAdvance() && !saving
                ? "bg-primary hover:opacity-90"
                : "bg-primary/40 cursor-not-allowed"
            }`}
          >
            {saving ? "Saving…" : step === STEPS.length - 1 ? "All done! 🎉" : "Next →"}
          </button>
        </div>

        <p className="text-center text-xs text-soft mt-4 font-semibold">
          Step {step + 1} of {STEPS.length}
        </p>
      </div>
    </div>
  );
}

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
    subtitle: "Search and pick — we'll flag these on the meal plan",
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
    <div className="relative overflow-hidden min-h-screen flex items-center justify-center">
      <div className="blob h-72 w-72 bg-amber-200 -top-10 -right-10" />
      <div className="blob h-56 w-56 bg-pink-100 bottom-20 -left-10" />
      <div className="blob h-40 w-40 bg-violet-100 top-1/3 left-0" />

      <div className="relative z-10 w-full max-w-md px-4 py-10">
        {/* Progress dots */}
        <div className="flex gap-2 justify-center mb-8">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                i <= step ? "w-8 bg-primary" : "w-2 bg-border"
              }`}
            />
          ))}
        </div>

        {/* Card */}
        <div className="rounded-3xl bg-card border border-border shadow-lg p-6">
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">{current.emoji}</div>
            <h2 className="text-xl font-black text-foreground leading-tight">{current.question}</h2>
            <p className="mt-1 text-sm font-medium text-soft">{current.subtitle}</p>
          </div>

          {/* Single select */}
          {current.type === "single" && (
            <div className="grid grid-cols-2 gap-3">
              {current.options?.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => selectSingle(opt.value)}
                  className={`rounded-2xl border-2 p-4 text-left transition-all ${
                    getSingleValue() === opt.value
                      ? "border-primary bg-primary/10"
                      : "border-border bg-muted hover:border-primary/40"
                  }`}
                >
                  <div className="font-black text-foreground">{opt.label}</div>
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
                  className={`rounded-2xl border-2 px-4 py-2 text-sm font-bold transition-all ${
                    getMultiValues().includes(opt.value)
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border bg-muted text-soft hover:border-primary/40"
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
                        className="flex items-center gap-1 rounded-2xl bg-primary/15 border border-primary/30 px-3 py-1 text-xs font-bold text-foreground"
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
                className="w-full rounded-2xl border border-border bg-muted px-4 py-3 text-foreground font-semibold text-sm placeholder:text-soft focus:outline-none focus:border-primary mb-3"
              />

              {/* Filtered chip list */}
              <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                {filteredFoods.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => toggleFoodDislike(opt.value)}
                    className={`rounded-2xl border-2 px-3 py-1.5 text-sm font-bold transition-all ${
                      answers.childFoodDislikes.includes(opt.value)
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-muted text-soft hover:border-primary/40"
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

        {/* Navigation */}
        <div className="flex gap-3 mt-4">
          {step > 0 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="flex-1 rounded-2xl border border-border bg-card py-3 text-sm font-bold text-soft hover:bg-muted transition-colors"
            >
              ← Back
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!canAdvance() || saving}
            className={`flex-1 rounded-2xl py-3 text-sm font-black text-white transition-all ${
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

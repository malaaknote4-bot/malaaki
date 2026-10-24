"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
      { value: "nuts", label: "🥜 Nuts" },
      { value: "dairy", label: "🥛 Dairy" },
      { value: "eggs", label: "🥚 Eggs" },
      { value: "gluten", label: "🌾 Gluten" },
      { value: "shellfish", label: "🦐 Shellfish" },
      { value: "soy", label: "🫘 Soy" },
      { value: "none", label: "✅ None" },
    ],
  },
  {
    emoji: "🙅",
    question: "Any foods they really don't like?",
    subtitle: "Free text — e.g. mushrooms, onions, broccoli",
    type: "text" as const,
    field: "childFoodDislikes",
    placeholder: "e.g. mushrooms, onions…",
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
      { value: "none", label: "🍽️ No preference" },
      { value: "vegetarian", label: "🥕 Vegetarian" },
      { value: "vegan", label: "🌱 Vegan" },
      { value: "halal", label: "☪️ Halal" },
      { value: "kosher", label: "✡️ Kosher" },
    ],
  },
];

type Answers = {
  childAgeRange: string;
  childAllergies: string[];
  childFoodDislikes: string;
  numChildren: number | null;
  dietaryPreferences: string[];
};

export default function OnboardingClient() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [answers, setAnswers] = useState<Answers>({
    childAgeRange: "",
    childAllergies: [],
    childFoodDislikes: "",
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

  function canAdvance(): boolean {
    if (current.type === "text") return true;
    if (current.type === "single") return getSingleValue() !== "";
    if (current.type === "multi") return getMultiValues().length > 0;
    return true;
  }

  async function handleNext() {
    if (step < STEPS.length - 1) {
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
      {/* Background blobs */}
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

          {/* Text input */}
          {current.type === "text" && (
            <input
              type="text"
              placeholder={"placeholder" in current ? current.placeholder : ""}
              value={answers.childFoodDislikes}
              onChange={(e) => setAnswers((a) => ({ ...a, childFoodDislikes: e.target.value }))}
              className="w-full rounded-2xl border border-border bg-muted px-4 py-3 text-foreground font-semibold text-sm placeholder:text-soft focus:outline-none focus:border-primary"
            />
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

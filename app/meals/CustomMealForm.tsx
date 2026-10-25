"use client";

import { useState } from "react";
import { Loader2, Plus, Sparkles, X } from "lucide-react";
import type { Meal, MealChoices, Slot } from "@/lib/data/meals";
import { MealDraftSchema, emptyDraft, type MealDraft } from "@/lib/data/custom-meal";

type Ingredient = MealDraft["ingredients"][number];

const input =
  "rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-soft focus:border-primary focus:outline-none";
const field = `${input} w-full`;
const label = "mb-1 block text-[11px] font-semibold uppercase tracking-[0.14em] text-soft";

async function postJson(url: string, body: unknown) {
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? "Something went wrong — please try again.");
  return data;
}

export default function CustomMealForm({
  day,
  slot,
  initialName,
  onSaved,
  onBack,
}: {
  day: string;
  slot: Slot;
  initialName: string;
  onSaved: (meal: Meal, choices: MealChoices) => void;
  onBack: () => void;
}) {
  const [step, setStep] = useState<"describe" | "edit">("describe");
  const [name, setName] = useState(initialName);
  const [notes, setNotes] = useState("");
  const [draft, setDraft] = useState<MealDraft>(() => emptyDraft(initialName));
  const [busy, setBusy] = useState<"writing" | "saving" | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function writeForMe() {
    if (!name.trim()) return setError("Tell us the name of the meal first.");
    setBusy("writing");
    setError(null);
    try {
      const data = await postJson("/api/custom-meal/generate", { name, notes, slot });
      setDraft(data.draft);
      setStep("edit");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(null);
    }
  }

  function typeMyself() {
    setDraft((d) => ({ ...d, name: name.trim() || d.name }));
    setError(null);
    setStep("edit");
  }

  async function save() {
    const parsed = MealDraftSchema.safeParse({
      ...draft,
      ingredients: draft.ingredients.filter((i) => i.name.trim() || i.note?.trim()),
      steps: draft.steps.filter((s) => s.trim()),
    });
    if (!parsed.success) return setError(parsed.error.issues[0]?.message ?? "Some details are missing.");
    setBusy("saving");
    setError(null);
    try {
      const data = await postJson("/api/custom-meal", { draft: parsed.data, slot, day });
      onSaved(data.meal, data.choices);
    } catch (e) {
      setError((e as Error).message);
      setBusy(null);
    }
  }

  const set = <K extends keyof MealDraft>(key: K, value: MealDraft[K]) => setDraft((d) => ({ ...d, [key]: value }));
  const setIngredient = (i: number, patch: Partial<Ingredient>) =>
    set("ingredients", draft.ingredients.map((ing, j) => (j === i ? { ...ing, ...patch } : ing)));
  const num = (v: string) => (v === "" ? 0 : Number(v));

  if (step === "describe") {
    return (
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <label className="block">
            <span className={label}>Meal name</span>
            <input className={field} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Grandma's chicken and rice" maxLength={80} autoFocus />
          </label>
          <label className="mt-4 block">
            <span className={label}>How do you make it? (optional)</span>
            <textarea
              className={`${field} min-h-24 resize-y`}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              maxLength={600}
              placeholder="e.g. chicken thighs, rice, peas and a little cumin, all cooked in one pot"
            />
          </label>
          <p className="mt-3 text-sm text-soft">
            We&apos;ll write the full recipe — ingredients weighed in grams, serving sizes and steps — built around what you tell us. You can change anything before saving.
          </p>
          {busy === "writing" && (
            <p role="status" className="mt-4 flex items-center gap-2 rounded-2xl bg-blush px-4 py-3 text-sm font-medium text-foreground">
              <Loader2 className="h-4 w-4 animate-spin text-primary" /> Writing your recipe… this can take about half a minute.
            </p>
          )}
          {error && (
            <p role="alert" className="mt-4 rounded-2xl bg-primary-dim px-4 py-3 text-sm font-medium text-primary">
              {error}{" "}
              <button onClick={typeMyself} className="underline">Type the recipe yourself instead</button>
            </p>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-6 py-4">
          <button onClick={onBack} disabled={!!busy} className="text-sm font-semibold text-soft hover:text-foreground">
            ← Back to options
          </button>
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={typeMyself} disabled={!!busy} className="text-sm font-semibold text-primary hover:underline disabled:opacity-50">
              I&apos;ll type it myself
            </button>
            <button
              onClick={writeForMe}
              disabled={!!busy}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-fg hover:opacity-90 disabled:opacity-50"
            >
              <Sparkles className="h-4 w-4" /> Write the recipe for me
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex-1 overflow-y-auto px-6 py-5">
        <div className="grid grid-cols-[64px_1fr] gap-3">
          <label>
            <span className={label}>Emoji</span>
            <input className={`${field} text-center text-xl`} value={draft.emoji} onChange={(e) => set("emoji", e.target.value)} maxLength={16} />
          </label>
          <label>
            <span className={label}>Meal name</span>
            <input className={field} value={draft.name} onChange={(e) => set("name", e.target.value)} maxLength={80} />
          </label>
        </div>
        <label className="mt-3 block">
          <span className={label}>Short description</span>
          <input className={field} value={draft.note} onChange={(e) => set("note", e.target.value)} maxLength={160} placeholder="e.g. Grandma's Sunday favourite" />
        </label>
        <div className="mt-3 grid grid-cols-3 gap-3">
          <label>
            <span className={label}>Time</span>
            <input className={field} value={draft.time} onChange={(e) => set("time", e.target.value)} maxLength={30} placeholder="30 min" />
          </label>
          <label>
            <span className={label}>Adult portion (g)</span>
            <input className={field} type="number" min={1} value={draft.adultPortion || ""} onChange={(e) => set("adultPortion", num(e.target.value))} />
          </label>
          <label>
            <span className={label}>Child portion (g)</span>
            <input className={field} type="number" min={1} value={draft.childPortion || ""} onChange={(e) => set("childPortion", num(e.target.value))} />
          </label>
        </div>
        <p className="mt-2 text-xs text-soft">Serves 4 — 2 adults and 2 kids.</p>

        <h3 className="mt-6 font-display text-2xl text-primary">Ingredients</h3>
        <ul className="mt-2 flex flex-col gap-2">
          {draft.ingredients.map((ing, i) => (
            <li key={i} className="rounded-2xl border border-border p-2.5">
              <div className="flex items-center gap-2">
                <input className={`${input} min-w-0 flex-1`} aria-label={`Ingredient ${i + 1} name`} value={ing.name} onChange={(e) => setIngredient(i, { name: e.target.value })} placeholder="Ingredient" maxLength={80} />
                <input className={`${input} w-20 shrink-0`} aria-label={`Ingredient ${i + 1} amount`} type="number" min={0} step="any" value={ing.amount || ""} onChange={(e) => setIngredient(i, { amount: num(e.target.value) })} />
                <select className={`${input} w-16 shrink-0 px-2`} aria-label={`Ingredient ${i + 1} unit`} value={ing.unit} onChange={(e) => setIngredient(i, { unit: e.target.value as "g" | "ml" })}>
                  <option value="g">g</option>
                  <option value="ml">ml</option>
                </select>
                <button
                  onClick={() => set("ingredients", draft.ingredients.filter((_, j) => j !== i))}
                  aria-label={`Remove ingredient ${i + 1}`}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-soft hover:bg-muted hover:text-primary"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <input className={`${field} mt-2 text-xs`} aria-label={`Ingredient ${i + 1} note`} value={ing.note ?? ""} onChange={(e) => setIngredient(i, { note: e.target.value })} placeholder="Everyday measure or prep, e.g. 2 large, chopped" maxLength={80} />
            </li>
          ))}
        </ul>
        <button
          onClick={() => set("ingredients", [...draft.ingredients, { name: "", amount: 100, unit: "g", note: "" }])}
          className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          <Plus className="h-4 w-4" /> Add ingredient
        </button>

        <h3 className="mt-6 font-display text-2xl text-primary">Method</h3>
        <ol className="mt-2 flex flex-col gap-2">
          {draft.steps.map((s, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-fg">{i + 1}</span>
              <textarea
                className={`${input} min-h-16 min-w-0 flex-1 resize-y`}
                aria-label={`Step ${i + 1}`}
                value={s}
                onChange={(e) => set("steps", draft.steps.map((x, j) => (j === i ? e.target.value : x)))}
                maxLength={600}
              />
              <button
                onClick={() => set("steps", draft.steps.filter((_, j) => j !== i))}
                aria-label={`Remove step ${i + 1}`}
                className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-soft hover:bg-muted hover:text-primary"
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ol>
        <button onClick={() => set("steps", [...draft.steps, ""])} className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
          <Plus className="h-4 w-4" /> Add step
        </button>

        {error && (
          <p role="alert" className="mt-4 rounded-2xl bg-primary-dim px-4 py-3 text-sm font-medium text-primary">{error}</p>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-6 py-4">
        <button
          onClick={() => {
            setError(null);
            setStep("describe");
          }}
          disabled={!!busy}
          className="text-sm font-semibold text-soft hover:text-foreground"
        >
          ← Back
        </button>
        <button
          onClick={save}
          disabled={!!busy}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-fg hover:opacity-90 disabled:opacity-50"
        >
          {busy === "saving" && <Loader2 className="h-4 w-4 animate-spin" />} Save to {day}&apos;s {slot}
        </button>
      </div>
    </div>
  );
}

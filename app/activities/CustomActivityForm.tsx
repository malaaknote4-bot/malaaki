"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import type { Activity, ActivityChoices, Period } from "@/lib/data/activities";
import { ActivityDraftSchema, type ActivityDraft } from "@/lib/data/custom-activity";

const field =
  "w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-soft focus:border-primary focus:outline-none";
const label = "mb-1 block text-[11px] font-semibold uppercase tracking-[0.14em] text-soft";

async function postJson(url: string, body: unknown) {
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? "Something went wrong — please try again.");
  return data;
}

export default function CustomActivityForm({
  day,
  period,
  index,
  initialTitle,
  onSaved,
  onBack,
}: {
  day: string;
  period: Period;
  index: number;
  initialTitle: string;
  onSaved: (activity: Activity, choices: ActivityChoices) => void;
  onBack: () => void;
}) {
  const [draft, setDraft] = useState<ActivityDraft>({ title: initialTitle, emoji: "⭐", duration: "", description: "" });
  const [busy, setBusy] = useState<"writing" | "saving" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const set = <K extends keyof ActivityDraft>(key: K, value: ActivityDraft[K]) => setDraft((d) => ({ ...d, [key]: value }));

  async function writeForMe() {
    if (!draft.title.trim()) return setError("Tell us the name of the activity first.");
    setBusy("writing");
    setError(null);
    try {
      const data = await postJson("/api/custom-activity/generate", { title: draft.title, notes: draft.description, period });
      setDraft(data.draft);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(null);
    }
  }

  async function save() {
    const parsed = ActivityDraftSchema.safeParse(draft);
    if (!parsed.success) return setError(parsed.error.issues[0]?.message ?? "Some details are missing.");
    setBusy("saving");
    setError(null);
    try {
      const data = await postJson("/api/custom-activity", { draft: parsed.data, day, period, index });
      onSaved(data.activity, data.choices);
    } catch (e) {
      setError((e as Error).message);
      setBusy(null);
    }
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
            <span className={label}>Activity</span>
            <input
              className={field}
              value={draft.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="e.g. Visit Nana, Swimming lessons"
              maxLength={60}
              autoFocus
            />
          </label>
        </div>
        <label className="mt-3 block">
          <span className={label}>How long (optional)</span>
          <input className={field} value={draft.duration} onChange={(e) => set("duration", e.target.value)} placeholder="e.g. 45 min" maxLength={30} />
        </label>
        <label className="mt-3 block">
          <span className={label}>Description (optional)</span>
          <textarea
            className={`${field} min-h-24 resize-y`}
            value={draft.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="What you'll do — or leave it to us"
            maxLength={400}
          />
        </label>
        <button
          onClick={writeForMe}
          disabled={!!busy}
          className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline disabled:opacity-50"
        >
          {busy === "writing" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {busy === "writing" ? "Writing the details…" : "Write the details for me"}
        </button>
        {error && (
          <p role="alert" className="mt-4 rounded-2xl bg-primary-dim px-4 py-3 text-sm font-medium text-primary">
            {error}
          </p>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-6 py-4">
        <button onClick={onBack} disabled={!!busy} className="text-sm font-semibold text-soft hover:text-foreground">
          ← Back to options
        </button>
        <button
          onClick={save}
          disabled={!!busy}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-fg hover:opacity-90 disabled:opacity-50"
        >
          {busy === "saving" && <Loader2 className="h-4 w-4 animate-spin" />} Add to {day}&apos;s {period}
        </button>
      </div>
    </div>
  );
}

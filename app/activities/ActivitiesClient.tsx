"use client";

import { useCallback, useRef, useState } from "react";
import { Check, Plus, Shuffle } from "lucide-react";
import { DAYS } from "@/lib/data/meals";
import {
  PERIODS,
  activityKey,
  dayActivities,
  type Activity,
  type ActivityChoices,
  type Period,
} from "@/lib/data/activities";
import { SectionTitle } from "@/components/ui/decor";
import ActivitySwapSheet from "./ActivitySwapSheet";

const SECTIONS: Record<Period, { label: string; panel: string }> = {
  morning: { label: "Morning", panel: "bg-peach" },
  afternoon: { label: "Afternoon", panel: "bg-sky" },
  evening: { label: "Evening", panel: "bg-blush" },
};

type Slot = { period: Period; index: number };

function ActivityCard({
  activity,
  panel,
  done,
  isPick,
  onToggle,
  onSwap,
  swapRef,
}: {
  activity: Activity;
  panel: string;
  done: boolean;
  isPick: boolean;
  onToggle: () => void;
  onSwap: () => void;
  swapRef: (el: HTMLButtonElement | null) => void;
}) {
  return (
    <article
      className={`relative flex min-w-0 flex-col rounded-[22px] border border-border bg-card p-4 transition-all hover:shadow-md ${done ? "opacity-60" : ""}`}
    >
      {isPick && (
        <span className="absolute right-4 top-4 rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-semibold text-primary-fg">
          Your pick
        </span>
      )}
      <div className="flex items-start gap-4">
        <span className={`${panel} flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-3xl`}>{activity.emoji}</span>
        <span className={`min-w-0 flex-1 ${isPick ? "pr-20" : ""}`}>
          <span className={`block font-display text-xl leading-tight ${done ? "text-soft line-through" : "text-foreground"}`}>
            {activity.title}
          </span>
          <span className="mt-0.5 block text-xs font-semibold uppercase tracking-[0.14em] text-primary">{activity.duration}</span>
          <span className="mt-1.5 block text-sm leading-relaxed text-soft">{activity.description}</span>
        </span>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-3">
        <button
          onClick={onToggle}
          aria-pressed={done}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
        >
          <span
            className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
              done ? "bg-primary text-primary-fg" : "border border-primary"
            }`}
          >
            {done ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </span>
          {done ? "Done!" : "Mark as done"}
        </button>
        <button
          ref={swapRef}
          onClick={onSwap}
          aria-haspopup="dialog"
          className="inline-flex items-center gap-1.5 rounded-full border border-primary px-3.5 py-1.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-fg"
        >
          <Shuffle className="h-3.5 w-3.5" />
          Other options
        </button>
      </div>
    </article>
  );
}

export default function ActivitiesClient({
  todayIndex,
  initialChoices,
}: {
  todayIndex: number;
  initialChoices: ActivityChoices;
}) {
  const [selectedDay, setSelectedDay] = useState(todayIndex);
  const [choices, setChoices] = useState<ActivityChoices>(initialChoices);
  const [done, setDone] = useState<Set<string>>(new Set());
  const [swap, setSwap] = useState<Slot | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});
  const openSlot = useRef<Slot | null>(null);

  const day = DAYS[selectedDay];
  const plan = dayActivities(day, choices);
  const dayIds = PERIODS.flatMap((p) => plan[p].map((a) => a.id));
  const doneKey = (a: Activity) => `${day}.${a.id}`;
  const doneCount = dayIds.filter((id) => done.has(`${day}.${id}`)).length;

  function toggleDone(a: Activity) {
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(doneKey(a))) next.delete(doneKey(a));
      else next.add(doneKey(a));
      return next;
    });
  }

  function openSheet(slot: Slot) {
    openSlot.current = slot;
    setSwap(slot);
  }

  const closeSheet = useCallback(() => {
    const slot = openSlot.current;
    openSlot.current = null;
    setSwap(null);
    if (slot) requestAnimationFrame(() => triggers.current[`${slot.period}.${slot.index}`]?.focus());
  }, []);

  async function saveChoice({ period, index }: Slot, id: string | null) {
    const key = activityKey(day, period, index);
    const previous = choices;
    const next = { ...choices };
    if (id) next[key] = id;
    else delete next[key];
    setChoices(next);
    setSaveError(null);
    closeSheet();
    try {
      const res = await fetch("/api/activity-choice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ day, period, index, id }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setChoices(previous);
      setSaveError("Couldn't save that change — please try again.");
    }
  }

  return (
    <>
      {/* Day selector */}
      <div className="mb-8 flex gap-2 overflow-x-auto pb-1">
        {DAYS.map((d, i) => (
          <button
            key={d}
            onClick={() => setSelectedDay(i)}
            className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
              selectedDay === i
                ? "bg-primary text-primary-fg"
                : "border border-border bg-card text-soft hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {i === todayIndex ? "Today" : d.slice(0, 3)}
          </button>
        ))}
      </div>

      {/* Progress */}
      <div className="mb-10 flex items-center gap-4">
        <div className="h-[3px] flex-1 rounded-full bg-primary-dim">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(doneCount / dayIds.length) * 100}%` }} />
        </div>
        <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.16em] text-soft">
          {doneCount} of {dayIds.length} done {selectedDay === todayIndex ? "today" : `on ${day}`}
        </span>
      </div>

      {saveError && (
        <p role="alert" className="mb-6 rounded-2xl bg-primary-dim px-4 py-3 text-sm font-medium text-primary">
          {saveError}
        </p>
      )}

      <div className="flex flex-col gap-12">
        {PERIODS.map((period) => (
          <section key={period}>
            <SectionTitle>{SECTIONS[period].label}</SectionTitle>
            <div className="grid gap-3 md:grid-cols-2">
              {plan[period].map((a, index) => (
                <ActivityCard
                  key={`${period}.${index}`}
                  activity={a}
                  panel={SECTIONS[period].panel}
                  done={done.has(doneKey(a))}
                  isPick={Boolean(choices[activityKey(day, period, index)])}
                  onToggle={() => toggleDone(a)}
                  onSwap={() => openSheet({ period, index })}
                  swapRef={(el) => {
                    triggers.current[`${period}.${index}`] = el;
                  }}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {swap && (
        <ActivitySwapSheet
          day={day}
          period={swap.period}
          current={plan[swap.period][swap.index]}
          dayIds={dayIds}
          hasPick={Boolean(choices[activityKey(day, swap.period, swap.index)])}
          onChoose={(id) => saveChoice(swap, id)}
          onReset={() => saveChoice(swap, null)}
          onClose={closeSheet}
        />
      )}

      {/* Week overview */}
      <section className="mt-12">
        <SectionTitle>Week at a Glance</SectionTitle>
        <div className="overflow-hidden rounded-[22px] border border-border bg-card">
          {DAYS.map((d, i) => {
            const dp = dayActivities(d, choices);
            return (
              <button
                key={d}
                onClick={() => setSelectedDay(i)}
                className={`grid w-full grid-cols-[72px_1fr] sm:grid-cols-[110px_1fr_1fr_1fr] items-center gap-x-4 gap-y-1 border-b border-border px-5 py-3.5 text-left last:border-b-0 transition-colors ${
                  selectedDay === i ? "bg-blush" : "hover:bg-muted"
                }`}
              >
                <span className={`text-sm font-semibold ${selectedDay === i ? "text-primary" : "text-foreground"}`}>
                  {i === todayIndex ? "Today" : d}
                </span>
                {PERIODS.map((p, j) => (
                  <span key={p} className={`min-w-0 truncate text-sm text-soft ${j > 0 ? "hidden sm:block" : ""}`}>
                    {dp[p].map((a) => `${a.emoji} ${a.title}`).join(" · ")}
                  </span>
                ))}
              </button>
            );
          })}
        </div>
        <p className="mt-6 text-center font-reading italic text-soft">
          Even one activity together makes a memory worth keeping.
        </p>
      </section>
    </>
  );
}

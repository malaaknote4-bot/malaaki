"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { morningActivities, afternoonActivities, eveningActivities, type Activity } from "@/lib/data/activities";
import { PageHeader, SectionTitle } from "@/components/ui/decor";

const sections = [
  { key: "morning",   label: "Morning",   activities: morningActivities,   panel: "bg-peach" },
  { key: "afternoon", label: "Afternoon", activities: afternoonActivities, panel: "bg-sky" },
  { key: "evening",   label: "Evening",   activities: eveningActivities,   panel: "bg-blush" },
];

function ActivityCard({
  activity,
  panel,
  done,
  onToggle,
}: {
  activity: Activity;
  panel: string;
  done: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      aria-pressed={done}
      className={`flex w-full items-start gap-4 rounded-[22px] border border-border bg-card p-4 text-left transition-all hover:shadow-md ${
        done ? "opacity-60" : ""
      }`}
    >
      <span className={`${panel} flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-3xl`}>
        {activity.emoji}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-baseline gap-2">
          <span className={`font-display text-xl leading-tight ${done ? "line-through text-soft" : "text-foreground"}`}>
            {activity.title}
          </span>
        </span>
        <span className="mt-0.5 block text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          {activity.duration}
        </span>
        <span className="mt-1.5 block text-sm leading-relaxed text-soft">{activity.description}</span>
      </span>
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
          done ? "bg-primary text-primary-fg" : "border border-primary text-primary"
        }`}
      >
        {done ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
      </span>
    </button>
  );
}

export default function ActivitiesPage() {
  const [done, setDone] = useState<Set<string>>(new Set());
  const total = morningActivities.length + afternoonActivities.length + eveningActivities.length;

  function toggle(id: string) {
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-10">
      <PageHeader
        eyebrow="Activities"
        title="Little Moments Today"
        subtitle="Pick what feels right — you don't have to do them all. Tap one to mark it done."
      />

      {/* Progress */}
      <div className="mb-10 flex items-center gap-4">
        <div className="h-[3px] flex-1 rounded-full bg-primary-dim">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${(done.size / total) * 100}%` }}
          />
        </div>
        <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.16em] text-soft">
          {done.size} of {total} done
        </span>
      </div>

      <div className="flex flex-col gap-12">
        {sections.map(({ key, label, activities, panel }) => (
          <section key={key}>
            <SectionTitle aside={<span className="text-sm font-medium text-soft">{activities.length} ideas</span>}>
              {label}
            </SectionTitle>
            <div className="grid gap-3 md:grid-cols-2">
              {activities.map((a) => (
                <ActivityCard
                  key={a.id}
                  activity={a}
                  panel={panel}
                  done={done.has(a.id)}
                  onToggle={() => toggle(a.id)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      <p className="mt-12 text-center font-reading italic text-soft">
        Even one activity together makes a memory worth keeping.
      </p>
    </div>
  );
}

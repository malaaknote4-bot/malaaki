"use client";

import { useState } from "react";
import { morningActivities, afternoonActivities, eveningActivities, type Activity } from "@/lib/data/activities";

const sections = [
  { key: "morning",   label: "Morning",   emoji: "🌄", activities: morningActivities,   color: "text-amber-500",  bg: "bg-amber-50 dark:bg-amber-900/20" },
  { key: "afternoon", label: "Afternoon", emoji: "☀️", activities: afternoonActivities, color: "text-violet-500", bg: "bg-violet-50 dark:bg-violet-900/20" },
  { key: "evening",   label: "Evening",   emoji: "🌆", activities: eveningActivities,   color: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-900/20" },
];

function ActivityCard({ activity }: { activity: Activity }) {
  const [done, setDone] = useState(false);

  return (
    <button
      onClick={() => setDone(!done)}
      className={`w-full text-left rounded-3xl border p-4 shadow-sm transition-all active:scale-[0.99] ${
        done
          ? "bg-muted border-border opacity-60"
          : "bg-card border-border hover:shadow-md"
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Gradient icon box */}
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${activity.color} shadow-sm`}>
          <span className="text-2xl">{activity.emoji}</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={`font-black text-base ${done ? "line-through text-soft" : "text-foreground"}`}>
              {activity.title}
            </span>
            {done && <span className="text-green-500 text-sm">✓</span>}
          </div>
          <div className="flex items-center gap-2 mt-0.5 mb-1">
            <span className="text-xs font-bold text-activities bg-activities-dim rounded-full px-2 py-0.5">
              {activity.duration}
            </span>
          </div>
          <p className="text-xs font-medium text-soft leading-relaxed">{activity.description}</p>
        </div>
      </div>
    </button>
  );
}

export default function ActivitiesPage() {
  const total = morningActivities.length + afternoonActivities.length + eveningActivities.length;

  return (
    <div className="relative overflow-hidden min-h-[calc(100vh-56px)]">
      {/* Background blobs */}
      <div className="blob h-72 w-72 bg-violet-100 -top-10 -right-10" />
      <div className="blob h-48 w-48 bg-purple-100 bottom-20 -left-8" />

      <div className="relative z-10 mx-auto max-w-2xl px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-black text-foreground">Today&apos;s Activities</h1>
          <p className="mt-1 text-sm font-medium text-soft">{total} ideas to fill your day with joy 🎉</p>
        </div>

        {/* Tip card */}
        <div className="mb-6 rounded-3xl bg-activities-dim border border-activities/20 p-4">
          <p className="text-sm font-semibold text-foreground">
            💡 Tap an activity to mark it as done. You don&apos;t have to do them all — just pick what feels right today!
          </p>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-8">
          {sections.map(({ key, label, emoji, activities }) => (
            <div key={key}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{emoji}</span>
                <h2 className="text-xl font-black text-foreground">{label}</h2>
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-bold text-soft">
                  {activities.length}
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {activities.map((activity) => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer motivator */}
        <div className="mt-8 rounded-3xl bg-card border border-border p-5 text-center shadow-sm">
          <p className="text-2xl mb-2">🌟</p>
          <p className="text-sm font-semibold text-soft">
            Even one activity together makes a memory worth keeping.
          </p>
        </div>
      </div>
    </div>
  );
}

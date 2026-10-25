"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Plus, Search, X } from "lucide-react";
import {
  getActivityOptions,
  searchActivities,
  type Activity,
  type ActivityChoices,
  type Period,
} from "@/lib/data/activities";
import CustomActivityForm from "./CustomActivityForm";

const PANEL: Record<Period, string> = { morning: "bg-peach", afternoon: "bg-sky", evening: "bg-blush" };

function OptionRow({ activity, panel, onChoose }: { activity: Activity; panel: string; onChoose: () => void }) {
  return (
    <li>
      <button
        onClick={onChoose}
        className="group flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors hover:bg-muted"
      >
        <span className={`${panel} flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl`}>{activity.emoji}</span>
        <span className="min-w-0 flex-1">
          <span className="block truncate font-semibold text-foreground">{activity.title}</span>
          <span className="block truncate text-xs text-soft">
            {activity.custom && <span className="font-semibold text-primary">Your activity · </span>}
            {activity.duration} · {activity.description}
          </span>
        </span>
        <span className="shrink-0 rounded-full border border-primary px-3 py-1 text-xs font-semibold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-fg">
          Choose
        </span>
      </button>
    </li>
  );
}

const label = "px-3 pb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-soft";

function AddOwnRow({ query, onClick }: { query: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="mb-2 flex w-full items-center gap-3 rounded-2xl border border-dashed border-primary/50 px-3 py-2.5 text-left transition-colors hover:bg-blush"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-fg">
        <Plus className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-semibold text-foreground">
          {query ? <>Add &ldquo;{query}&rdquo; as your own activity</> : "Add your own activity"}
        </span>
        <span className="block truncate text-xs text-soft">Type anything you like — we can fill in the details</span>
      </span>
    </button>
  );
}

export default function ActivitySwapSheet({
  day,
  period,
  index,
  current,
  dayIds,
  hasPick,
  customActivities,
  onChoose,
  onCustomSaved,
  onReset,
  onClose,
}: {
  day: string;
  period: Period;
  index: number;
  current: Activity;
  dayIds: string[];
  hasPick: boolean;
  customActivities: Activity[];
  onChoose: (id: string) => void;
  onCustomSaved: (activity: Activity, choices: ActivityChoices) => void;
  onReset: () => void;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<"browse" | "create">("browse");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const q = query.trim();
  const options = useMemo(
    () => getActivityOptions(period, dayIds, customActivities),
    [period, dayIds, customActivities]
  );
  const search = useMemo(
    () => (q ? searchActivities(q, period, dayIds, customActivities) : null),
    [q, period, dayIds, customActivities]
  );

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 backdrop-blur-[2px] sm:items-center sm:p-6"
      onClick={() => mode === "browse" && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="swap-title"
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[88vh] w-full flex-col overflow-hidden rounded-t-[28px] border border-border bg-card shadow-2xl sm:max-w-xl sm:rounded-[28px]"
      >
        <div className="relative bg-blush px-6 pb-5 pt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {mode === "browse" ? "Other options" : "Your own activity"}
          </p>
          <h2 id="swap-title" className="mt-1 pr-8 font-display text-3xl leading-tight text-primary">
            {mode === "browse" ? <>Swap {day}&apos;s {period} activity</> : <>Add an activity for {day}&apos;s {period}</>}
          </h2>
          <p className="mt-1 truncate text-sm text-foreground/75">
            Instead of {current.emoji} {current.title}
          </p>
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-foreground hover:bg-card/60"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {mode === "create" ? (
          <CustomActivityForm
            day={day}
            period={period}
            index={index}
            initialTitle={q}
            onSaved={onCustomSaved}
            onBack={() => setMode("browse")}
          />
        ) : (
        <>
        <div className="border-b border-border px-6 py-4">
          <label className="relative block">
            <span className="sr-only">Type what they&apos;d enjoy</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-soft" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type what they'd enjoy, e.g. painting"
              className="w-full rounded-full border border-border bg-background py-3 pl-11 pr-4 text-sm font-medium text-foreground placeholder:text-soft focus:border-primary focus:outline-none"
            />
          </label>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
          <AddOwnRow query={q} onClick={() => setMode("create")} />

          {!search && (
            <>
              <p className={label}>{options.length} {period} ideas</p>
              <ul>
                {options.map((a) => (
                  <OptionRow key={a.id} activity={a} panel={PANEL[period]} onChoose={() => onChoose(a.id)} />
                ))}
              </ul>
            </>
          )}
          {search && search.same.length > 0 && (
            <>
              <p className={label}>{period} ideas</p>
              <ul>
                {search.same.map((a) => (
                  <OptionRow key={a.id} activity={a} panel={PANEL[period]} onChoose={() => onChoose(a.id)} />
                ))}
              </ul>
            </>
          )}
          {search && search.other.length > 0 && (
            <>
              <p className={`${label} pt-3`}>Other times of day</p>
              <ul>
                {search.other.map((a) => (
                  <OptionRow key={a.id} activity={a} panel={PANEL[a.period]} onChoose={() => onChoose(a.id)} />
                ))}
              </ul>
            </>
          )}
          {search && search.same.length + search.other.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-soft">
              Nothing on our list matches &ldquo;{q}&rdquo; — add it as your own activity above.
            </p>
          )}
        </div>

        {hasPick && (
          <div className="border-t border-border px-6 py-3 text-center">
            <button onClick={onReset} className="text-sm font-semibold text-primary hover:underline">
              Back to the suggested activity
            </button>
          </div>
        )}
        </>
        )}
      </div>
    </div>
  );
}

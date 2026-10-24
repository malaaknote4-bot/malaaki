"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { stories } from "@/lib/data/stories";
import { Sparkle } from "@/components/ui/decor";

const panels = ["bg-blush", "bg-sky", "bg-peach"];

export default function StoriesClient({ tonightIndex }: { tonightIndex: number }) {
  const [current, setCurrent] = useState(tonightIndex);
  const story = stories[current];

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px] items-start">
      {/* Reader */}
      <article className="min-w-0 overflow-hidden rounded-[28px] border border-border bg-card">
        <div className={`${panels[current % panels.length]} relative px-6 py-10 sm:px-12 text-center`}>
          {current === tonightIndex && (
            <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-card/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Tonight
            </span>
          )}
          <Sparkle className="absolute right-6 top-6 h-5 w-5" />
          <div className="text-7xl">{story.emoji}</div>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl leading-[0.95] text-primary">{story.title}</h2>
          <p className="mt-3 font-reading italic text-foreground/75">{story.tagline}</p>
        </div>

        <div className="mx-auto max-w-[62ch] px-6 py-8 sm:px-10 sm:py-10">
          <div className="space-y-5 font-reading text-[17px] leading-[1.8] text-foreground">
            {story.content.map((para, i) =>
              i === story.content.length - 1 ? (
                <p key={i} className="border-t border-border pt-6 text-center italic text-soft">
                  {para}
                </p>
              ) : (
                <p key={i}>{para}</p>
              )
            )}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-border px-6 py-4">
          <button
            onClick={() => setCurrent((c) => (c - 1 + stories.length) % stories.length)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-primary text-primary hover:bg-primary-dim transition-colors"
            aria-label="Previous story"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-1.5">
            {stories.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Story ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === current ? "w-6 bg-primary" : "w-1.5 bg-primary/25 hover:bg-primary/50"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => setCurrent((c) => (c + 1) % stories.length)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-fg hover:opacity-90 transition-opacity"
            aria-label="Next story"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </article>

      {/* Shelf */}
      <aside className="min-w-0 lg:sticky lg:top-24">
        <h3 className="mb-4 flex items-center gap-2.5 font-display text-2xl text-primary">
          <Sparkle className="h-4 w-4" />
          The Story Shelf
        </h3>
        <div className="flex flex-col gap-2">
          {stories.map((s, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`flex items-center gap-3 rounded-2xl border px-3 py-2.5 text-left transition-colors ${
                i === current ? "border-primary/40 bg-blush" : "border-border bg-card hover:bg-muted"
              }`}
            >
              <span className={`${panels[i % panels.length]} flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl`}>
                {s.emoji}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-semibold text-sm text-foreground">{s.title}</span>
                <span className="block truncate text-xs text-soft">{s.tagline}</span>
              </span>
              {i === tonightIndex && (
                <span className="shrink-0 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-fg">
                  Tonight
                </span>
              )}
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
}

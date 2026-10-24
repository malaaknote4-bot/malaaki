"use client";

import { useState } from "react";
import { stories } from "@/lib/data/stories";

export default function StoriesClient({ tonightIndex }: { tonightIndex: number }) {
  const [current, setCurrent] = useState(tonightIndex);
  const story = stories[current];

  return (
    <>
      {/* Tonight badge */}
      {current === tonightIndex && (
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-stories-dim border border-stories/20 px-4 py-1.5">
          <span className="h-2 w-2 rounded-full bg-stories animate-pulse" />
          <span className="text-xs font-bold text-stories">Tonight&apos;s Story</span>
        </div>
      )}

      {/* Story card */}
      <div className="rounded-3xl bg-card border border-border shadow-lg overflow-hidden mb-6">
        {/* Story header */}
        <div className="bg-gradient-to-br from-stories/20 to-stories-dim border-b border-border p-6 text-center">
          <div className="text-6xl mb-3">{story.emoji}</div>
          <h2 className="text-2xl font-black text-foreground mb-2">{story.title}</h2>
          <p className="text-sm font-medium text-soft italic">{story.tagline}</p>
        </div>

        {/* Story body */}
        <div className="p-6">
          <div className="space-y-4">
            {story.content.map((para, i) => (
              <p
                key={i}
                className={`leading-relaxed font-medium ${
                  i === story.content.length - 1
                    ? "text-soft italic text-sm text-center pt-2 border-t border-border"
                    : "text-foreground"
                }`}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => setCurrent((c) => (c - 1 + stories.length) % stories.length)}
          className="flex-1 rounded-2xl border border-border bg-card py-3 text-sm font-bold text-soft hover:bg-muted hover:text-foreground transition-colors"
        >
          ← Previous
        </button>

        {/* Dots */}
        <div className="flex gap-1.5 shrink-0">
          {stories.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all ${
                i === current ? "w-5 bg-stories" : "w-2 bg-border hover:bg-soft"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrent((c) => (c + 1) % stories.length)}
          className="flex-1 rounded-2xl bg-stories py-3 text-sm font-bold text-white hover:opacity-90 transition-opacity"
        >
          Next →
        </button>
      </div>

      {/* All stories list */}
      <div className="mt-8 rounded-3xl bg-card border border-border p-5 shadow-sm">
        <h3 className="font-black text-foreground mb-4">All Stories 📚</h3>
        <div className="flex flex-col gap-2">
          {stories.map((s, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-left transition-colors ${
                i === current ? "bg-stories-dim" : "hover:bg-muted"
              }`}
            >
              <span className="text-2xl shrink-0">{s.emoji}</span>
              <div className="flex-1 min-w-0">
                <span className="font-bold text-sm text-foreground block truncate">{s.title}</span>
                <span className="text-xs text-soft truncate block">{s.tagline}</span>
              </div>
              {i === tonightIndex && (
                <span className="shrink-0 rounded-full bg-stories text-white text-[10px] font-bold px-2 py-0.5">Tonight</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-soft">Sweet dreams 🌙✨</p>
    </>
  );
}

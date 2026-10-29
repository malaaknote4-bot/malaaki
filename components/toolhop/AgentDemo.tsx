"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Line = { kind: "call" | "out" | "paid" | "ok"; text: string };

// One scripted run: an agent finds a document tool, pays for it and gets the answer.
const script: Line[] = [
  { kind: "call", text: 'search_tools("read a PDF")' },
  { kind: "out", text: "pdf-reader      $0.004 / call   99.8% ok   0.9s" },
  { kind: "out", text: "pdf-to-text     $0.006 / call   98.1% ok   1.4s" },
  { kind: "call", text: 'use_tool("pdf-reader", { file: "invoice.pdf" })' },
  { kind: "paid", text: "paid $0.004 from wallet  ·  limit left $19.83" },
  { kind: "ok", text: "done  ·  2 pages, 1,204 words returned" },
];

const STEP_MS = 1100;
const PAUSE_MS = 3200;

export default function AgentDemo() {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(script.length);
      return;
    }
    const done = shown >= script.length;
    const timer = setTimeout(() => setShown(done ? 0 : shown + 1), done ? PAUSE_MS : shown === 0 ? 500 : STEP_MS);
    return () => clearTimeout(timer);
  }, [shown]);

  return (
    <figure className="overflow-hidden rounded-2xl border border-edge bg-night-2 shadow-[0_30px_80px_-30px_rgba(60,240,162,0.25)]">
      <div className="flex items-center gap-2 border-b border-edge px-4 py-3">
        <span className="size-2.5 rounded-full bg-edge" />
        <span className="size-2.5 rounded-full bg-edge" />
        <span className="size-2.5 rounded-full bg-edge" />
        <figcaption className="ms-2 font-mono text-xs text-muted">your-agent · example run</figcaption>
      </div>
      <ol className="min-h-[17rem] space-y-2.5 p-5 font-mono text-[13px] leading-relaxed sm:text-sm" aria-live="off">
        {script.slice(0, shown).map((line, i) => (
          <li key={i} className={cn("animate-line-in break-words", lineStyles[line.kind])}>
            {line.kind === "call" && <span className="me-2 text-accent">›</span>}
            {line.kind === "paid" && <span className="me-2">$</span>}
            {line.kind === "ok" && <span className="me-2">✓</span>}
            {line.text}
          </li>
        ))}
        {shown < script.length && (
          <li aria-hidden className="animate-blink inline-block h-4 w-2 translate-y-0.5 bg-accent" />
        )}
      </ol>
    </figure>
  );
}

const lineStyles: Record<Line["kind"], string> = {
  call: "text-text",
  out: "ps-4 text-muted",
  paid: "ps-4 text-accent",
  ok: "ps-4 text-text",
};

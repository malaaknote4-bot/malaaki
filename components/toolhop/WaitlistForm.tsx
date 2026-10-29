"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { toolhop } from "@/lib/toolhop";
import { cn } from "@/lib/utils";

const roles = [
  { value: "owner", label: "I run AI agents" },
  { value: "maker", label: "I make tools" },
] as const;

type Status = "idle" | "sending" | "done" | "error" | "not-connected";

export default function WaitlistForm() {
  const [role, setRole] = useState<(typeof roles)[number]["value"]>("owner");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!toolhop.waitlistEndpoint) {
      setStatus("not-connected");
      return;
    }
    const email = new FormData(e.currentTarget).get("email");
    setStatus("sending");
    try {
      const res = await fetch(toolhop.waitlistEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, role }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className="flex items-center justify-center gap-3 rounded-2xl border border-accent/40 bg-accent/10 px-6 py-5 text-lg">
        <Check className="size-6 shrink-0 text-accent" />
        You&apos;re on the list. We&apos;ll email you when your spot opens.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <fieldset className="flex justify-center gap-2">
        <legend className="sr-only">Which describes you?</legend>
        {roles.map((r) => (
          <label
            key={r.value}
            className={cn(
              "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition has-focus-visible:outline-2 has-focus-visible:outline-accent",
              role === r.value ? "border-accent bg-accent/10 text-text" : "border-edge text-muted hover:text-text",
            )}
          >
            <input
              type="radio"
              name="role"
              value={r.value}
              checked={role === r.value}
              onChange={() => setRole(r.value)}
              className="sr-only"
            />
            {r.label}
          </label>
        ))}
      </fieldset>

      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="waitlist-email" className="sr-only">
          Email address
        </label>
        <input
          id="waitlist-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          className="h-14 min-w-0 flex-1 rounded-full border border-edge bg-night px-6 text-base text-text placeholder:text-muted/70 focus:border-accent focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-accent px-8 text-base font-semibold text-accent-ink transition hover:brightness-110 disabled:opacity-60"
        >
          {status === "sending" ? "Joining…" : "Join the waitlist"}
          <ArrowRight className="size-5" />
        </button>
      </div>

      <p role="status" className="min-h-5 text-center text-sm text-muted">
        {status === "error" && "Something went wrong. Please try again."}
        {status === "not-connected" && "The waitlist isn't connected yet. Check back soon."}
        {role === "maker" && status === "idle" && "Tool makers on the list get to sell first."}
      </p>
    </form>
  );
}

"use client";

import { useMemo, useState } from "react";
import { airbnbLink } from "@/lib/airbnb";
import { site } from "@/lib/content";

function isoDate(d: Date) {
  const tz = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tz).toISOString().slice(0, 10);
}

function addDays(iso: string, days: number) {
  const d = new Date(`${iso}T00:00:00`);
  d.setDate(d.getDate() + days);
  return isoDate(d);
}

function nightsBetween(a: string, b: string) {
  return Math.round((new Date(`${b}T00:00:00`).getTime() - new Date(`${a}T00:00:00`).getTime()) / 86400000);
}

type Props = { variant?: "light" | "panel" };

export default function BookingForm({ variant = "panel" }: Props) {
  const today = useMemo(() => isoDate(new Date()), []);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const nights = checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 0;
  const datesInvalid = Boolean(checkIn && checkOut && nights <= 0);
  const totalGuests = adults + children;

  function onCheckInChange(value: string) {
    setCheckIn(value);
    // Keep check-out after check-in so the user never lands on an invalid range.
    if (value && (!checkOut || nightsBetween(value, checkOut) <= 0)) {
      setCheckOut(addDays(value, 2));
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (datesInvalid) return;
    window.open(
      airbnbLink({ checkIn: checkIn || undefined, checkOut: checkOut || undefined, adults, children }),
      "_blank",
      "noopener,noreferrer",
    );
  }

  const field =
    "w-full rounded-xl border border-stone bg-shell px-4 py-3 text-base text-ink outline-none transition-colors focus:border-sea";
  const label = "mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-ink-soft";

  return (
    <form
      onSubmit={onSubmit}
      className={`grid gap-4 rounded-3xl p-5 sm:p-7 md:grid-cols-[1fr_1fr_1.3fr_auto] md:items-end ${
        variant === "panel" ? "bg-white shadow-[0_20px_60px_-30px_rgba(36,48,47,0.45)]" : "bg-shell"
      }`}
      aria-label="Check availability"
    >
      <div>
        <label htmlFor="check-in" className={label}>
          Check-in
        </label>
        <input id="check-in" type="date" min={today} value={checkIn} onChange={(e) => onCheckInChange(e.target.value)} className={field} />
      </div>
      <div>
        <label htmlFor="check-out" className={label}>
          Check-out
        </label>
        <input
          id="check-out"
          type="date"
          min={checkIn ? addDays(checkIn, 1) : today}
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className={field}
          aria-invalid={datesInvalid}
          aria-describedby="booking-note"
        />
      </div>
      <fieldset className="grid grid-cols-2 gap-3">
        <legend className="sr-only">Guests</legend>
        <Stepper label="Adults" value={adults} min={1} max={site.maxGuests - children} onChange={setAdults} />
        <Stepper label="Children" value={children} min={0} max={site.maxGuests - adults} onChange={setChildren} />
      </fieldset>
      <button
        type="submit"
        disabled={datesInvalid}
        className="h-[50px] rounded-full bg-sea-deep px-7 text-base font-medium text-white transition-colors hover:bg-ink disabled:cursor-not-allowed disabled:opacity-50"
      >
        Check availability
      </button>

      <p id="booking-note" className="text-sm text-ink-soft md:col-span-4" aria-live="polite">
        {datesInvalid
          ? "Check-out needs to be after check-in."
          : nights > 0
            ? `${nights} night${nights === 1 ? "" : "s"} · ${totalGuests} guest${totalGuests === 1 ? "" : "s"} — you'll confirm price and book securely on Airbnb.`
            : `Up to ${site.maxGuests} guests. You'll see live prices and book securely on Airbnb.`}
      </p>
    </form>
  );
}

function Stepper({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
}) {
  const btn =
    "grid h-8 w-8 place-items-center rounded-full border border-stone text-lg leading-none text-ink transition-colors hover:border-sea disabled:opacity-30 disabled:hover:border-stone";
  return (
    <div>
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-ink-soft">{label}</span>
      <div className="flex h-[50px] items-center justify-between rounded-xl border border-stone bg-shell px-2.5">
        <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label={`Fewer ${label.toLowerCase()}`}>
          −
        </button>
        <span className="tabular-nums" aria-live="polite" aria-label={`${value} ${label.toLowerCase()}`}>
          {value}
        </span>
        <button type="button" className={btn} onClick={() => onChange(value + 1)} disabled={value >= max} aria-label={`More ${label.toLowerCase()}`}>
          +
        </button>
      </div>
    </div>
  );
}

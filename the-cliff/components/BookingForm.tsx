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

export default function BookingForm() {
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

  const label = "block text-[10px] font-semibold uppercase tracking-[0.26em] text-ink-soft";
  const field = "mt-2 w-full bg-transparent text-base font-medium text-ink outline-none";
  const cell = "flex flex-col justify-center px-5 py-4 md:px-6";

  return (
    <form onSubmit={onSubmit} className="border border-line bg-paper shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)]" aria-label="Check availability">
      <div className="grid divide-y divide-line md:grid-cols-[1fr_1fr_1.5fr_auto] md:divide-x md:divide-y-0">
        <div className="grid grid-cols-2 divide-x divide-line md:col-span-2">
          <label htmlFor="check-in" className={cell}>
            <span className={label}>Check-in</span>
            <input id="check-in" type="date" min={today} value={checkIn} onChange={(e) => onCheckInChange(e.target.value)} className={field} />
          </label>
          <label htmlFor="check-out" className={cell}>
            <span className={label}>Check-out</span>
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
          </label>
        </div>
        <fieldset className="grid grid-cols-2 divide-x divide-line">
          <legend className="sr-only">Guests</legend>
          <Stepper label="Adults" value={adults} min={1} max={site.maxGuests - children} onChange={setAdults} />
          <Stepper label="Children" value={children} min={0} max={site.maxGuests - adults} onChange={setChildren} />
        </fieldset>
        <button
          type="submit"
          disabled={datesInvalid}
          className="group flex min-h-16 items-stretch text-[15px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className="flex flex-1 items-center bg-white px-6 text-coal md:px-7">Check availability</span>
          <span className="grid w-16 place-items-center bg-moss transition-[width] duration-300 group-hover:w-[4.5rem]" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M2 9h13M10 4l5 5-5 5" />
            </svg>
          </span>
        </button>
      </div>
      <p id="booking-note" className="border-t border-line px-5 py-3 text-[13px] text-ink-soft md:px-6" aria-live="polite">
        {datesInvalid
          ? "Check-out needs to be after check-in."
          : nights > 0
            ? `${nights} night${nights === 1 ? "" : "s"} · ${totalGuests} guest${totalGuests === 1 ? "" : "s"}. You'll see the price and book securely on Airbnb.`
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
    "grid h-8 w-8 place-items-center border border-line text-lg leading-none text-ink transition-colors hover:border-ink disabled:opacity-30 disabled:hover:border-line";
  return (
    <div className="flex flex-col justify-center px-5 py-4 md:px-6">
      <span className="block text-[10px] font-semibold uppercase tracking-[0.26em] text-ink-soft">{label}</span>
      <div className="mt-2 flex items-center justify-between gap-2">
        <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label={`Fewer ${label.toLowerCase()}`}>
          −
        </button>
        <span className="tabular-nums font-medium" aria-live="polite" aria-label={`${value} ${label.toLowerCase()}`}>
          {value}
        </span>
        <button type="button" className={btn} onClick={() => onChange(value + 1)} disabled={value >= max} aria-label={`More ${label.toLowerCase()}`}>
          +
        </button>
      </div>
    </div>
  );
}

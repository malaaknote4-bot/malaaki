import { airbnbLink } from "@/lib/airbnb";

// Always-visible booking shortcut on small screens.
export default function MobileBookBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex border-t border-line-light bg-night text-white md:hidden">
      <a href="#book" className="flex h-14 flex-1 items-center justify-center text-sm font-semibold">
        Choose dates
      </a>
      <a
        href={airbnbLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 flex-1 items-center justify-center gap-2 bg-white text-sm font-semibold text-ink"
      >
        Book on Airbnb
        <svg width="14" height="14" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M5 13L13 5M6 5h7v7" />
        </svg>
      </a>
    </div>
  );
}

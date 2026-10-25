// A simple mark: a cliff edge dropping away beneath a horizon line.
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
        <rect x="1" y="1" width="28" height="28" stroke="currentColor" strokeWidth="1.5" />
        <path d="M1 12h28" stroke="currentColor" strokeWidth="1.5" />
        <path d="M1 12h11l4 7 2 10H1z" fill="currentColor" />
      </svg>
      <span className="text-[13px] font-semibold uppercase tracking-[0.32em]">The Cliff</span>
    </span>
  );
}

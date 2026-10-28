// Decorative curving road from the logo: red edges with white lane dashes.
export default function RoadCurves({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 300" fill="none" className={className} aria-hidden="true">
      <path d="M0 290 C120 150 380 70 800 60" stroke="var(--brand)" strokeWidth="26" strokeLinecap="round" />
      <path d="M210 300 C300 190 480 120 800 108" stroke="var(--brand)" strokeWidth="22" strokeLinecap="round" />
      <path
        d="M105 298 C210 170 430 95 800 84"
        stroke="var(--line)"
        strokeWidth="8"
        strokeDasharray="26 22"
        strokeLinecap="round"
      />
    </svg>
  );
}

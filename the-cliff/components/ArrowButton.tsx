// Split button: label block + square arrow block.
export default function ArrowButton({
  href,
  children,
  tone = "light",
  external = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  tone?: "light" | "dark";
  external?: boolean;
  className?: string;
}) {
  const label = tone === "light" ? "bg-white/10 text-white border-white/40 backdrop-blur-sm" : "bg-white text-coal border-white";
  const arrow = tone === "light" ? "bg-white text-coal" : "bg-moss text-white";
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex h-14 items-stretch text-[15px] font-semibold ${className}`}
    >
      <span className={`flex flex-1 items-center whitespace-nowrap border-l-2 px-6 ${label}`}>{children}</span>
      <span className={`grid w-14 place-items-center transition-[width] duration-300 group-hover:w-16 ${arrow}`} aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6">
          {external ? <path d="M5 13L13 5M6 5h7v7" /> : <path d="M2 9h13M10 4l5 5-5 5" />}
        </svg>
      </span>
    </a>
  );
}

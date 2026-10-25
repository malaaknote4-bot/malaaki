export default function SectionHeading({
  eyebrow,
  title,
  text,
  dark = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  text?: string;
  dark?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      <p className={`text-[11px] font-semibold uppercase tracking-[0.28em] ${dark ? "text-moss" : "text-ink-soft"}`}>{eyebrow}</p>
      <h2 className="mt-5 font-serif text-[clamp(2.4rem,5vw,4.2rem)] leading-[1.02] font-light tracking-[-0.02em] text-balance">{title}</h2>
      {text && <p className={`mt-6 max-w-xl text-lg leading-relaxed ${dark ? "text-white/65" : "text-ink-soft"}`}>{text}</p>}
    </div>
  );
}

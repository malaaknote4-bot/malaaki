export default function SectionHeading({
  eyebrow,
  title,
  text,
  center = false,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <p className="text-xs font-medium uppercase tracking-[0.22em] text-gum">{eyebrow}</p>
      <h2 className="mt-4 font-serif text-4xl leading-tight font-light md:text-5xl">{title}</h2>
      {text && <p className="mt-5 text-lg leading-relaxed text-ink-soft">{text}</p>}
    </div>
  );
}

import RevealHeading from "./motion/RevealHeading";

export default function SectionHeading({
  eyebrow,
  lines,
  text,
  dark = false,
}: {
  eyebrow: string;
  // Headline split into lines; end with the italic phrase, e.g. ["Good", <em>to know</em>].
  lines: React.ReactNode[];
  text?: string;
  dark?: boolean;
}) {
  return <RevealHeading eyebrow={eyebrow} lines={lines} text={text} dark={dark} />;
}

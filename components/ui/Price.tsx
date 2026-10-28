import { formatNewPrice, formatOldPrice, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

// New-pound price, with the old-pound price underneath as on the printed menu.
export default function Price({ value, lang, className }: { value: number; lang: Locale; className?: string }) {
  return (
    <span className={cn("flex flex-col leading-tight", className)}>
      <span className="font-black">{formatNewPrice(value, lang)}</span>
      <span className="text-xs font-semibold opacity-60">{formatOldPrice(value, lang)}</span>
    </span>
  );
}

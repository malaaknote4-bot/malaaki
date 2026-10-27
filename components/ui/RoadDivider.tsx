import { cn } from "@/lib/utils";

export default function RoadDivider({ className }: { className?: string }) {
  return (
    <div className={cn("asphalt py-4", className)} aria-hidden="true">
      <div className="road-line animate-drive h-2 w-full" />
    </div>
  );
}

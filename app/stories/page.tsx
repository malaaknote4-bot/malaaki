import StoriesClient from "./StoriesClient";
import { PageHeader } from "@/components/ui/decor";

export const dynamic = "force-dynamic";

export default function StoriesPage() {
  const tonightIndex = new Date().getDay();

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-10">
      <PageHeader
        eyebrow="Bedtime"
        title="Tonight's Story"
        subtitle="A new gentle story every night — dim the lights and read it slowly."
      />
      <StoriesClient tonightIndex={tonightIndex} />
    </div>
  );
}

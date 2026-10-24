import StoriesClient from "./StoriesClient";

export const dynamic = "force-dynamic";

export default function StoriesPage() {
  const tonightIndex = new Date().getDay();

  return (
    <div className="relative overflow-hidden min-h-[calc(100vh-56px)]">
      {/* Background blobs */}
      <div className="blob h-72 w-72 bg-pink-100 -top-10 -right-10" />
      <div className="blob h-56 w-56 bg-rose-100 bottom-10 -left-8" />
      <div className="blob h-40 w-40 bg-amber-100 top-1/3 right-0" />

      <div className="relative z-10 mx-auto max-w-2xl px-4 py-6">
        {/* Header */}
        <div className="mb-2">
          <h1 className="text-3xl font-black text-foreground">Bedtime Story</h1>
          <p className="mt-1 text-sm font-medium text-soft">A new story every night 🌙</p>
        </div>

        <StoriesClient tonightIndex={tonightIndex} />
      </div>
    </div>
  );
}

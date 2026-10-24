import MealsClient from "./MealsClient";

export const dynamic = "force-dynamic";

export default function MealsPage() {
  const day = new Date().getDay();
  const todayIndex = day === 0 ? 6 : day - 1;

  return (
    <div className="relative overflow-hidden min-h-[calc(100vh-56px)]">
      {/* Background blobs */}
      <div className="blob h-72 w-72 bg-emerald-100 -top-10 -right-10" />
      <div className="blob h-48 w-48 bg-green-100 bottom-20 -left-8" />

      <div className="relative z-10 mx-auto max-w-2xl px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-black text-foreground">This Week&apos;s Meals</h1>
          <p className="mt-1 text-sm font-medium text-soft">Tap a day to see what&apos;s cooking 🍳</p>
        </div>

        <MealsClient todayIndex={todayIndex} />
      </div>
    </div>
  );
}

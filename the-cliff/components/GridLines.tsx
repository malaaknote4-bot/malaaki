// Thin column lines that run the full height of the page, aligned to the content container.
// `difference` blending keeps them visible on both dark and light sections.
const columns = [
  "border-l",
  "border-l border-r md:border-r-0",
  "hidden md:block border-l",
  "hidden md:block border-l border-r",
];

export default function GridLines() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-20 mix-blend-difference">
      <div className="mx-auto grid h-full max-w-6xl grid-cols-2 px-5 md:grid-cols-4 md:px-8">
        {columns.map((c, i) => (
          <div key={i} className={`border-white/[0.09] ${c}`} />
        ))}
      </div>
    </div>
  );
}

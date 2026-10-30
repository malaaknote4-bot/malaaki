// Bayer dither dissolve: covers an element with a flat colour and dissolves it away
// through an 8×8 ordered-dither pattern. Plain DOM code, so the static preview can reuse it.

// 8×8 Bayer matrix, values 0–63, built recursively from the 2×2 one.
const BAYER8 = (() => {
  let m = [[0, 2], [3, 1]];
  while (m.length < 8) {
    const n = m.length;
    const next: number[][] = Array.from({ length: n * 2 }, () => []);
    for (let y = 0; y < n * 2; y++)
      for (let x = 0; x < n * 2; x++)
        next[y][x] = 4 * m[y % n][x % n] + [[0, 2], [3, 1]][Math.floor(y / n)][Math.floor(x / n)];
    m = next;
  }
  return m.flat().map((v) => v / 64);
})();

const CELL = 4; // CSS px per dither cell

export type DitherTrigger = "load" | "view";

// Starts the effect on `el` and returns a cleanup function.
// "load" plays straight away; "view" waits until the element scrolls into view,
// and does nothing if it is already on screen (so visible content never flashes).
export function startDither(el: HTMLElement, trigger: DitherTrigger, color: string, duration = 900): () => void {
  const removeCovers = () => el.querySelectorAll(":scope > [data-dither-cover]").forEach((c) => c.remove());
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    removeCovers();
    return () => {};
  }
  if (trigger === "view" && el.getBoundingClientRect().top < innerHeight) return () => {};

  const rect = el.getBoundingClientRect();
  const w = Math.max(1, Math.ceil(rect.width / CELL));
  const h = Math.max(1, Math.ceil(rect.height / CELL));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  canvas.setAttribute("aria-hidden", "true");
  Object.assign(canvas.style, {
    position: "absolute",
    inset: "0",
    width: "100%",
    height: "100%",
    imageRendering: "pixelated",
    pointerEvents: "none",
    zIndex: "10",
  });
  const ctx = canvas.getContext("2d");
  if (!ctx) return removeCovers;

  // Resolve the token (e.g. "paper") to RGB by letting the canvas parse it.
  ctx.fillStyle = getComputedStyle(el).getPropertyValue(`--${color}`).trim() || color;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  const img = ctx.createImageData(w, h);
  const px = img.data;
  for (let i = 0; i < w * h; i++) {
    px[i * 4] = r;
    px[i * 4 + 1] = g;
    px[i * 4 + 2] = b;
  }

  const paint = (progress: number) => {
    for (let y = 0; y < h; y++)
      for (let x = 0; x < w; x++) px[(y * w + x) * 4 + 3] = BAYER8[(y & 7) * 8 + (x & 7)] >= progress ? 255 : 0;
    ctx.putImageData(img, 0, 0);
  };

  paint(0);
  el.appendChild(canvas);
  removeCovers();

  let frame = 0;
  let observer: IntersectionObserver | undefined;
  const play = () => {
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      paint(1 - (1 - t) ** 3); // ease-out
      if (t < 1) frame = requestAnimationFrame(step);
      else canvas.remove();
    };
    frame = requestAnimationFrame(step);
  };

  if (trigger === "load") play();
  else {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer?.disconnect();
          play();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
  }

  return () => {
    cancelAnimationFrame(frame);
    observer?.disconnect();
    canvas.remove();
  };
}

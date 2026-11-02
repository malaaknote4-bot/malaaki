export const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Bounces a value back and forth between lo and hi (for ricochets). */
export const reflect = (v: number, lo: number, hi: number) => {
  const span = hi - lo;
  const m = ((v - lo) % (2 * span) + 2 * span) % (2 * span);
  return lo + (m < span ? m : 2 * span - m);
};

/** Squash right after a landing: returns scaleY (scaleX should be 1/scaleY). */
export const landingSquash = (framesSinceLanding: number, amount = 0.3) => {
  const d = framesSinceLanding;
  if (d < 0 || d > 14) return 1;
  return 1 - amount * Math.sin(d * 0.7) * Math.exp(-d * 0.25);
};

export type Point = { x: number; y: number };
export type Hop = { at: number; to: Point; dur?: number; height?: number };

/**
 * Follows a series of hops starting at `start`. Returns position, stretch
 * (scaleY) and facing direction for squash-and-stretch characters.
 */
export const followHops = (frame: number, start: Point, hops: Hop[]) => {
  let pos = start;
  let stretch = 1;
  let facing = 1;
  let lastLanding = -999;
  for (const h of hops) {
    const dur = h.dur ?? 18;
    const height = h.height ?? 180;
    if (frame < h.at) break;
    if (h.to.x !== pos.x) facing = h.to.x > pos.x ? 1 : -1;
    if (frame < h.at + dur) {
      const p = (frame - h.at) / dur;
      return {
        x: lerp(pos.x, h.to.x, p),
        y: lerp(pos.y, h.to.y, p) - 4 * height * p * (1 - p),
        stretch: 1 + 0.25 * Math.sin(Math.PI * p) * (p < 0.5 ? 1 : 0.6),
        facing,
        airborne: true,
      };
    }
    pos = h.to;
    lastLanding = h.at + dur;
  }
  stretch = landingSquash(frame - lastLanding);
  return { ...pos, stretch, facing, airborne: false };
};

/** Landing frames for a hop list. */
export const landings = (hops: Hop[]) => hops.map((h) => h.at + (h.dur ?? 18));

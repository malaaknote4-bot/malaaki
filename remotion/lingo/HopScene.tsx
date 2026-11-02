import { AbsoluteFill, interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Kind, Toon } from "./Characters";
import { C, FONT } from "./theme";
import { followHops, Hop, landings, Point } from "./util";

const TILES = [
  { x: 330, y: 470, word: "el gato" },
  { x: 720, y: 380, word: "le chien" },
  { x: 1200, y: 380, word: "das Haus" },
  { x: 1590, y: 470, word: "il pane" },
  { x: 520, y: 800, word: "ねこ" },
  { x: 960, y: 690, word: "agua" },
  { x: 1400, y: 800, word: "merci" },
];
const at = (i: number): Point => ({ x: TILES[i].x, y: TILES[i].y });
const ENTRY = { dur: 24, height: 300 };

const CAST: { kind: Kind; size: number; start: Point; hops: Hop[] }[] = [
  {
    kind: "fox",
    size: 190,
    start: { x: -200, y: 620 },
    hops: [{ at: 4, to: at(0), ...ENTRY }, { at: 32, to: at(4) }, { at: 60, to: at(5) }, { at: 92, to: at(2) }],
  },
  {
    kind: "penguin",
    size: 190,
    start: { x: 2120, y: 620 },
    hops: [{ at: 8, to: at(3), ...ENTRY }, { at: 36, to: at(6) }, { at: 64, to: at(2) }, { at: 96, to: at(3) }],
  },
  {
    kind: "dragon",
    size: 170,
    start: { x: 1200, y: -260 },
    hops: [{ at: 12, to: at(2), dur: 20, height: 40 }, { at: 40, to: at(1) }, { at: 70, to: at(0) }],
  },
  {
    kind: "robot",
    size: 190,
    start: { x: 960, y: 1350 },
    hops: [{ at: 16, to: at(5), ...ENTRY }, { at: 84, to: at(6) }, { at: 116, to: at(5) }],
  },
];

/** Every landing: which tile, when. Used for tile lighting, checkmarks and pops. */
export const HOP_LANDINGS = CAST.flatMap((c) =>
  landings(c.hops).map((f, i) => ({
    frame: f,
    tile: TILES.findIndex((t) => t.x === c.hops[i].to.x && t.y === c.hops[i].to.y),
  })),
);

const EXTRA_CHECKS = Array.from({ length: 14 }, (_, i) => ({
  x: 120 + random(`kx${i}`) * 1680,
  y: 120 + random(`ky${i}`) * 860,
  at: 24 + Math.floor(random(`kt${i}`) * 110),
  size: 50 + random(`ks${i}`) * 50,
}));
export const EXTRA_CHECK_FRAMES = EXTRA_CHECKS.map((c) => c.at);

const FIRE_START = 100;
const FIRE_WORD = "HOLA!".split("");
export const FIRE_FRAME = FIRE_START;

const Check: React.FC<{ x: number; y: number; size: number; s: number }> = ({ x, y, size, s }) => (
  <div
    style={{
      position: "absolute",
      left: x - size / 2,
      top: y - size / 2,
      width: size,
      height: size,
      borderRadius: "50%",
      background: C.green,
      border: `${size * 0.07}px solid white`,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      transform: `scale(${s})`,
      boxShadow: `0 0 24px ${C.neon}`,
    }}
  >
    <svg viewBox="0 0 24 24" width={size * 0.6} height={size * 0.6}>
      <path d="M4 12.5 L10 18 L20 6" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

// 4–9 s: the cast runs in and hops between floating lesson tiles.
export const HopScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const float = Math.sin(frame / 10) * 10;

  return (
    <AbsoluteFill style={{ fontFamily: FONT }}>
      {/* Tiles */}
      {TILES.map((t, i) => {
        const hits = HOP_LANDINGS.filter((l) => l.tile === i && l.frame <= frame);
        const lit = hits.length > 0;
        const last = hits.length ? Math.max(...hits.map((h) => h.frame)) : -99;
        const dip = frame - last < 10 ? Math.sin(((frame - last) / 10) * Math.PI) * 16 : 0;
        const appear = spring({ frame: frame - i * 2, fps, config: { damping: 12 } });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: t.x - 140,
              top: t.y + float + dip,
              width: 280,
              height: 84,
              borderRadius: 24,
              background: lit ? C.green : "white",
              boxShadow: lit
                ? `0 10px 0 #46a302, 0 0 50px ${C.neon}`
                : "0 10px 0 #cfcfcf, 0 20px 40px rgba(0,0,0,0.4)",
              color: lit ? "white" : C.ink,
              fontSize: 44,
              fontWeight: 700,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transform: `scale(${appear})`,
            }}
          >
            {t.word}
          </div>
        );
      })}

      {/* Characters */}
      {CAST.map((c) => {
        const h = followHops(frame, c.start, c.hops);
        const facing = c.kind === "dragon" && frame >= FIRE_START - 6 ? 1 : h.facing;
        return (
          <Toon
            key={c.kind}
            kind={c.kind}
            size={c.size}
            x={h.x}
            y={h.y + float}
            stretch={h.stretch}
            facing={facing}
            frame={frame}
            card="hola"
          />
        );
      })}

      {/* Dragon spells a word with fire */}
      {frame >= FIRE_START && (
        <>
          {Array.from({ length: 12 }, (_, k) => {
            const t = (frame - FIRE_START + k * 3) % 18;
            const mouth = { x: TILES[0].x + 22, y: TILES[0].y - 76 + float };
            return (
              <div
                key={k}
                style={{
                  position: "absolute",
                  left: mouth.x + t * 26,
                  top: mouth.y - t * 4 + Math.sin(k * 2.1) * t * 2,
                  width: 30 + t * 2,
                  height: 30 + t * 2,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, #fff7a8 0%, ${C.gold} 35%, ${C.orange} 65%, rgba(255,75,75,0) 100%)`,
                  transform: "translate(-50%, -50%)",
                  opacity: 1 - t / 18,
                }}
              />
            );
          })}
          {FIRE_WORD.map((ch, k) => {
            const s = spring({ frame: frame - (FIRE_START + 4 + k * 6), fps, config: { damping: 9 } });
            return (
              <div
                key={k}
                style={{
                  position: "absolute",
                  left: 480 + k * 92,
                  top: 230 + float,
                  fontSize: 110,
                  fontWeight: 700,
                  color: C.gold,
                  textShadow: `0 0 18px ${C.orange}, 0 0 40px ${C.red}, 0 6px 0 #c2410c`,
                  transform: `scale(${s}) translateY(${Math.sin(frame / 3 + k) * 4}px)`,
                }}
              >
                {ch}
              </div>
            );
          })}
        </>
      )}

      {/* Checkmarks on landings */}
      {HOP_LANDINGS.map((l, i) => {
        if (l.frame > frame || frame - l.frame > 28) return null;
        const s = spring({ frame: frame - l.frame, fps, config: { damping: 8, stiffness: 200 } });
        const out = interpolate(frame - l.frame, [20, 28], [1, 0], { extrapolateLeft: "clamp" });
        const t = TILES[l.tile];
        return <Check key={i} x={t.x + 130} y={t.y - 20 + float} size={74} s={s * out} />;
      })}
      {EXTRA_CHECKS.map((c, i) => {
        if (frame < c.at || frame - c.at > 26) return null;
        const s = spring({ frame: frame - c.at, fps, config: { damping: 8, stiffness: 200 } });
        const out = interpolate(frame - c.at, [18, 26], [1, 0], { extrapolateLeft: "clamp" });
        return <Check key={`x${i}`} x={c.x} y={c.y} size={c.size} s={s * out} />;
      })}
    </AbsoluteFill>
  );
};

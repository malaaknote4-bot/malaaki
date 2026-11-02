import { AbsoluteFill, interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CAST, Toon } from "./Characters";
import { BEAT, C, FONT, H, W } from "./theme";
import { clamp, landingSquash, reflect } from "./util";

export const MILESTONES = [
  { at: 10, value: 7 },
  { at: 40, value: 30 },
  { at: 70, value: 100 },
  { at: 100, value: 365 },
];

const pile = (x: number) => 60 + 170 * Math.exp(-(((x - W / 2) / 650) ** 2));

const COINS = Array.from({ length: 80 }, (_, i) => {
  const x = 60 + random(`cx${i}`) * (W - 120);
  return {
    x,
    spawn: 18 + Math.floor(random(`cs${i}`) * 90),
    restY: H - pile(x) * (0.35 + 0.65 * random(`cy${i}`)),
    spin: random(`cp${i}`) * 6,
  };
});
const G = 2.4;
const fallFrames = (c: (typeof COINS)[number]) => Math.sqrt((2 * (c.restY + 80)) / G);
export const COIN_LANDINGS = COINS.filter((_, i) => i % 7 === 0).map((c) => Math.round(c.spawn + fallFrames(c)));

const GEMS = Array.from({ length: 7 }, (_, i) => ({
  x: random(`gx${i}`) * W,
  y: random(`gy${i}`) * H * 0.7,
  vx: (random(`gvx${i}`) > 0.5 ? 1 : -1) * (14 + random(`gsx${i}`) * 10),
  vy: (random(`gvy${i}`) > 0.5 ? 1 : -1) * (12 + random(`gsy${i}`) * 9),
  color: [C.blue, C.pink, C.purple, "#5eead4"][i % 4],
  appear: 30 + i * 5,
}));

const DIVE_AT = 104;
const DIVERS = CAST.map((kind, i) => ({
  kind,
  from: { x: i % 2 === 0 ? -180 : W + 180, y: 260 + i * 40 },
  to: { x: 520 + i * 290, y: H - 70 },
  at: DIVE_AT + i * 4,
}));
export const DIVE_SPLASHES = DIVERS.map((d) => d.at + 18);

const Flame: React.FC = () => (
  <svg viewBox="0 0 200 260" width="100%" height="100%" overflow="visible">
    <defs>
      <linearGradient id="flameOuter" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" stopColor={C.red} />
        <stop offset="0.6" stopColor={C.orange} />
        <stop offset="1" stopColor={C.gold} />
      </linearGradient>
      <linearGradient id="flameInner" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" stopColor={C.gold} />
        <stop offset="1" stopColor="#fff7c2" />
      </linearGradient>
    </defs>
    <path
      d="M100 0 C 120 50 190 90 186 168 C 182 226 144 260 100 260 C 56 260 18 226 14 168 C 10 118 46 96 60 40 C 76 74 90 64 100 0 Z"
      fill="url(#flameOuter)"
    />
    <path
      d="M100 90 C 112 120 150 140 148 190 C 146 226 124 246 100 246 C 76 246 54 226 52 192 C 50 158 74 146 82 116 C 90 132 96 124 100 90 Z"
      fill="url(#flameInner)"
    />
  </svg>
);

const Gem: React.FC<{ color: string }> = ({ color }) => (
  <svg viewBox="0 0 80 70" width="80" height="70">
    <polygon points="16,4 64,4 78,24 40,68 2,24" fill={color} />
    <polygon points="16,4 64,4 54,24 26,24" fill="white" opacity="0.45" />
    <polygon points="2,24 26,24 40,68" fill="black" opacity="0.12" />
    <polygon points="78,24 54,24 40,68" fill="white" opacity="0.2" />
  </svg>
);

// 9–14 s: streak flame pulses on the beat, counter climbs, XP coins rain down.
export const StreakScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ignite = spring({ frame, fps, config: { damping: 9, stiffness: 140 } });
  const beat = Math.floor(frame / BEAT);
  const sinceBeat = frame % BEAT;
  const grow = 0.55 + 0.09 * Math.min(beat, 8);
  const pulse = 1 + 0.16 * Math.exp(-sinceBeat / 3.5);
  const flicker = 1 + 0.035 * Math.sin(frame * 1.7);

  // Counter: count up fast between milestones.
  let value = 0;
  let lastMilestone = -99;
  MILESTONES.forEach((m, i) => {
    const prev = i === 0 ? 0 : MILESTONES[i - 1].value;
    if (frame >= m.at - 14) {
      value = Math.round(interpolate(frame, [m.at - 14, m.at], [prev, m.value], { extrapolateRight: "clamp" }));
    }
    if (frame >= m.at) lastMilestone = m.at;
  });
  const numPop = spring({ frame: frame - lastMilestone, fps, config: { damping: 7, stiffness: 220 } });

  const landedFraction = COINS.filter((c) => frame >= c.spawn + fallFrames(c)).length / COINS.length;

  const renderCoin = (c: (typeof COINS)[number], i: number) => {
    const t = frame - c.spawn;
    if (t < 0) return null;
    const land = fallFrames(c);
    const falling = t < land;
    const y = falling ? -80 + 0.5 * G * t * t : c.restY;
    const sq = falling ? 1 : landingSquash(t - land, 0.35);
    const flip = falling ? Math.abs(Math.cos(t * 0.3 + c.spin)) * 0.8 + 0.2 : 1;
    return (
      <div
        key={i}
        style={{
          position: "absolute",
          left: c.x - 34,
          top: y - 34,
          width: 68,
          height: 68,
          borderRadius: "50%",
          background: `radial-gradient(circle at 35% 30%, #fff3a3 0%, ${C.gold} 45%, #e0a000 100%)`,
          border: "5px solid #c98a00",
          boxSizing: "border-box",
          color: "#8a5a00",
          fontSize: 24,
          fontWeight: 700,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transformOrigin: "50% 100%",
          transform: `scale(${flip / Math.sqrt(sq)}, ${sq})`,
          boxShadow: "0 0 18px rgba(255,200,0,0.5)",
        }}
      >
        XP
      </div>
    );
  };

  return (
    <AbsoluteFill style={{ fontFamily: FONT }}>
      {/* glow behind flame */}
      <div
        style={{
          position: "absolute",
          left: W / 2 - 450,
          top: 150,
          width: 900,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,150,0,0.45) 0%, rgba(255,150,0,0) 70%)",
          transform: `scale(${ignite * pulse * grow * 1.4})`,
        }}
      />
      {/* streak flame */}
      <div
        style={{
          position: "absolute",
          left: W / 2 - 200,
          top: 730 - 520,
          width: 400,
          height: 520,
          transformOrigin: "50% 100%",
          transform: `scale(${ignite * grow * pulse * flicker}, ${ignite * grow * pulse}) skewX(${Math.sin(frame / 4) * 3}deg)`,
          filter: "drop-shadow(0 0 30px rgba(255,150,0,0.8))",
        }}
      >
        <Flame />
      </div>

      {/* counter */}
      <div
        style={{
          position: "absolute",
          left: 0,
          width: W,
          top: 520,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `scale(${interpolate(numPop, [0, 1], [1.5, 1])})`,
          opacity: frame >= MILESTONES[0].at - 14 ? 1 : 0,
        }}
      >
        <div
          style={{
            fontSize: 190,
            lineHeight: 1,
            fontWeight: 700,
            color: "white",
            WebkitTextStroke: "8px #b45309",
            paintOrder: "stroke",
            textShadow: "0 10px 0 #b45309, 0 0 40px rgba(255,200,0,0.8)",
          }}
        >
          {value}
        </div>
        <div
          style={{
            marginTop: 6,
            fontSize: 54,
            fontWeight: 700,
            color: C.gold,
            letterSpacing: 6,
            textShadow: "0 4px 0 #b45309",
          }}
        >
          DAY STREAK
        </div>
      </div>

      {/* coins behind divers */}
      {COINS.map((c, i) => (i % 2 === 0 ? renderCoin(c, i) : null))}

      {/* divers */}
      {DIVERS.map((d) => {
        const p = clamp((frame - d.at) / 18);
        if (frame < d.at) return null;
        const landed = p >= 1;
        const after = frame - (d.at + 18);
        const bob = landed ? spring({ frame: after - 6, fps, config: { damping: 8 } }) : 0;
        const x = landed ? d.to.x : d.from.x + (d.to.x - d.from.x) * p;
        const y = landed ? d.to.y + 110 - bob * 120 : d.from.y + (d.to.y - d.from.y) * p - 4 * 260 * p * (1 - p);
        const dir = d.from.x < W / 2 ? 1 : -1;
        return (
          <Toon
            key={d.kind}
            kind={d.kind}
            size={180}
            x={x}
            y={y}
            rotate={landed ? Math.sin(after / 4) * 8 : dir * p * 160}
            stretch={landed ? landingSquash(after - 8, 0.25) : 1 + 0.25 * Math.sin(Math.PI * p)}
            facing={dir}
            frame={frame}
            card="XP!"
          />
        );
      })}

      {/* golden pool */}
      <div
        style={{
          position: "absolute",
          left: -200,
          width: W + 400,
          top: H - (40 + 150 * landedFraction),
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(ellipse at 50% 10%, #fff3a3 0%, ${C.gold} 25%, #d99400 70%)`,
          boxShadow: "0 -10px 40px rgba(255,200,0,0.5)",
        }}
      />
      {COINS.map((c, i) => (i % 2 === 1 ? renderCoin(c, i) : null))}

      {/* gems ricocheting off the frame edges */}
      {GEMS.map((g, i) => {
        if (frame < g.appear) return null;
        const t = frame - g.appear;
        const x = reflect(g.x + g.vx * t, 40, W - 40);
        const y = reflect(g.y + g.vy * t, 35, H - 35);
        const edge = Math.min(x - 40, W - 40 - x, y - 35, H - 35 - y);
        const s = spring({ frame: t, fps, config: { damping: 10 } });
        return (
          <div key={i}>
            <div
              style={{
                position: "absolute",
                left: x - 40,
                top: y - 35,
                transform: `scale(${s}) rotate(${t * 9}deg)`,
                filter: `drop-shadow(0 0 16px ${g.color})`,
              }}
            >
              <Gem color={g.color} />
            </div>
            {edge < 30 && (
              <div
                style={{
                  position: "absolute",
                  left: x - 60,
                  top: y - 60,
                  width: 120,
                  height: 120,
                  background: `radial-gradient(circle, white 0%, ${g.color} 30%, rgba(0,0,0,0) 70%)`,
                  clipPath:
                    "polygon(50% 0%, 58% 42%, 100% 50%, 58% 58%, 50% 100%, 42% 58%, 0% 50%, 42% 42%)",
                  opacity: 1 - edge / 30,
                }}
              />
            )}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

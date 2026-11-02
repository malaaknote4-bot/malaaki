import { AbsoluteFill, interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CAST, Toon } from "./Characters";
import { C, FONT, H, W } from "./theme";
import { landingSquash } from "./util";

export const TEXT_1_AT = 10;
export const TEXT_2_AT = 20;
const JUMP_AT = 16;

const CORNERS = [
  { x: -250, y: -100 },
  { x: W + 250, y: -100 },
  { x: -250, y: H + 300 },
  { x: W + 250, y: H + 300 },
];
const SPOTS = [600, 840, 1080, 1320];

const SPARKS = Array.from({ length: 40 }, (_, i) => ({
  angle: random(`sa${i}`) * Math.PI * 2,
  speed: 10 + random(`ss${i}`) * 22,
  color: [C.neon, C.gold, C.blue, C.pink, "white"][i % 5],
}));

const Line: React.FC<{ text: string; at: number; top: number; size: number }> = ({ text, at, top, size }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - at, fps, config: { damping: 10, stiffness: 260 } });
  const flash = frame - at >= 0 && frame - at < 3 ? 1 : 0;
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        width: W,
        top,
        textAlign: "center",
        fontSize: size,
        fontWeight: 700,
        lineHeight: 1,
        color: flash ? C.neon : "white",
        WebkitTextStroke: `6px ${C.green}`,
        paintOrder: "stroke",
        textShadow: `0 10px 0 #2b7a00, 0 0 30px ${C.neon}, 0 0 80px ${C.neon}`,
        transform: `scale(${interpolate(s, [0, 1], [2.6, 1])}) rotate(${interpolate(s, [0, 1], [-6, 0])}deg)`,
        opacity: frame < at ? 0 : Math.min(1, (frame - at) / 2),
      }}
    >
      {text}
    </div>
  );
};

// 18–20 s: everything snaps to centre, the cast poses, the tagline slams in.
export const FinaleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ fontFamily: FONT }}>
      {/* rotating neon rays */}
      <div
        style={{
          position: "absolute",
          left: W / 2 - 1400,
          top: 430 - 1400,
          width: 2800,
          height: 2800,
          background: `repeating-conic-gradient(rgba(57,255,20,0.22) 0deg 10deg, rgba(57,255,20,0) 10deg 20deg)`,
          transform: `rotate(${frame * 1.5}deg) scale(${spring({ frame, fps, config: { damping: 14 } })})`,
          maskImage: "radial-gradient(circle, black 0%, transparent 60%)",
          WebkitMaskImage: "radial-gradient(circle, black 0%, transparent 60%)",
        }}
      />

      {/* sparkle burst when they land */}
      {frame >= 8 &&
        SPARKS.map((s, i) => {
          const t = frame - 8;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: W / 2 + Math.cos(s.angle) * s.speed * t,
                top: 440 + Math.sin(s.angle) * s.speed * t + 0.5 * t * t,
                width: 16,
                height: 16,
                background: s.color,
                clipPath: "polygon(50% 0%, 62% 38%, 100% 50%, 62% 62%, 50% 100%, 38% 62%, 0% 50%, 38% 38%)",
                opacity: Math.max(0, 1 - t / 40),
                transform: `scale(${1.5 - t / 40})`,
              }}
            />
          );
        })}

      {CAST.map((kind, i) => {
        const snap = spring({ frame: frame - i * 2, fps, config: { damping: 13, stiffness: 320 } });
        const x = interpolate(snap, [0, 1], [CORNERS[i].x, SPOTS[i]]);
        const baseY = interpolate(snap, [0, 1], [CORNERS[i].y, 520]);
        const j = frame - (JUMP_AT + i * 2);
        const air = j >= 0 && j < 14 ? Math.sin((j / 14) * Math.PI) : 0;
        const stretch = air > 0 ? 1 + 0.25 * air : landingSquash(j - 14, 0.3) * landingSquash(frame - 6 - i * 2, 0.3);
        return (
          <Toon
            key={kind}
            kind={kind}
            size={220}
            x={x}
            y={baseY - air * 90}
            stretch={stretch}
            rotate={air * (i % 2 === 0 ? -10 : 10)}
            frame={frame * 2}
            card="¡sí!"
          />
        );
      })}

      <Line text="Learn a language." at={TEXT_1_AT} top={600} size={128} />
      <Line text="Have fun doing it." at={TEXT_2_AT} top={760} size={128} />
    </AbsoluteFill>
  );
};

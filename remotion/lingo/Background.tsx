import { AbsoluteFill, random, useCurrentFrame } from "remotion";
import { C, H, W } from "./theme";

const PARTICLES = Array.from({ length: 70 }, (_, i) => ({
  x: random(`px${i}`) * W,
  y: random(`py${i}`) * H,
  vx: 0.6 + random(`vx${i}`) * 2.2,
  vy: -0.4 - random(`vy${i}`) * 1.2,
  r: 2 + random(`r${i}`) * 6,
  tw: random(`tw${i}`) * Math.PI * 2,
}));

// Deep black-to-neon-green gradient with glowing particles drifting across.
export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const glow = 0.55 + 0.1 * Math.sin(frame / 7.5);
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse 120% 80% at 50% 115%, rgba(57,255,20,${glow}) 0%, rgba(88,204,2,0.35) 30%, ${C.deep} 65%, #000 100%)`,
        overflow: "hidden",
      }}
    >
      {PARTICLES.map((p, i) => {
        const x = (((p.x + p.vx * frame) % (W + 40)) + W + 40) % (W + 40) - 20;
        const y = (((p.y + p.vy * frame) % (H + 40)) + H + 40) % (H + 40) - 20;
        const o = 0.35 + 0.65 * Math.abs(Math.sin(frame / 12 + p.tw));
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: p.r,
              height: p.r,
              borderRadius: "50%",
              background: i % 5 === 0 ? "#eaffd9" : C.neon,
              opacity: o,
              boxShadow: `0 0 ${p.r * 3}px ${p.r}px rgba(57,255,20,0.6)`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

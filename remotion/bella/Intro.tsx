import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BOUNCY, COLORS, FONT } from "./theme";

const NAME = "Bella".split("");
const MORPH_START = 55;

// A glowing orb pulses, collapses, and blooms into the "Bella" wordmark.
export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const appear = spring({ frame, fps, config: { damping: 14 } });
  const pulse = 1 + Math.sin(frame / 6) * 0.07;
  const collapse = interpolate(frame, [MORPH_START, MORPH_START + 14], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const orbScale = appear * pulse * interpolate(collapse, [0, 1], [2.4, 1]);
  const glow = 60 + Math.sin(frame / 6) * 25;

  const taglineIn = spring({
    frame: frame - (MORPH_START + 40),
    fps,
    config: { damping: 200 },
  });

  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", fontFamily: FONT }}
    >
      {/* Orb */}
      <div
        style={{
          position: "absolute",
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: `radial-gradient(circle at 35% 35%, #ffffff 0%, ${COLORS.blush} 35%, ${COLORS.purple} 100%)`,
          boxShadow: `0 0 ${glow}px ${glow / 3}px rgba(236,72,153,0.55), 0 0 ${glow * 2}px rgba(124,58,237,0.45)`,
          transform: `scale(${orbScale})`,
          opacity: collapse,
          filter: `blur(${interpolate(collapse, [0, 1], [30, 0])}px)`,
        }}
      />

      {/* Wordmark */}
      <div style={{ display: "flex", alignItems: "baseline" }}>
        {NAME.map((letter, i) => {
          const s = spring({
            frame: frame - (MORPH_START + 6 + i * 4),
            fps,
            config: BOUNCY,
          });
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                fontSize: 260,
                fontWeight: 900,
                letterSpacing: -4,
                backgroundImage: `linear-gradient(135deg, ${COLORS.purple} 0%, ${COLORS.pink} 100%)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                opacity: interpolate(s, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }),
                // Each letter bursts out from the orb's centre to its place.
                transform: `translate(${interpolate(s, [0, 1], [(2 - i) * 130, 0])}px, ${interpolate(s, [0, 1], [20, 0])}px) scale(${interpolate(s, [0, 1], [0.3, 1])})`,
                filter: `blur(${interpolate(s, [0, 1], [12, 0], { extrapolateRight: "clamp" })}px)`,
                textShadow: "0 20px 60px rgba(236,72,153,0.25)",
              }}
            >
              {letter}
            </span>
          );
        })}
      </div>

      <div
        style={{
          position: "absolute",
          top: 680,
          fontSize: 48,
          fontWeight: 700,
          color: COLORS.muted,
          opacity: taglineIn,
          transform: `translateY(${interpolate(taglineIn, [0, 1], [20, 0])}px)`,
        }}
      >
        Your AI assistant for an organized workday
      </div>
    </AbsoluteFill>
  );
};

import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BOUNCY, COLORS, FONT } from "./theme";

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logo = spring({ frame, fps, config: BOUNCY });
  const text = spring({ frame: frame - 12, fps, config: { damping: 200 } });
  const glow = 40 + Math.sin(frame / 6) * 15;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 30,
        fontFamily: FONT,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 36, transform: `scale(${logo})` }}>
        <div
          style={{
            width: 110,
            height: 110,
            borderRadius: "50%",
            background: `radial-gradient(circle at 35% 35%, #ffffff 0%, ${COLORS.blush} 35%, ${COLORS.purple} 100%)`,
            boxShadow: `0 0 ${glow}px rgba(236,72,153,0.6)`,
          }}
        />
        <span
          style={{
            fontSize: 200,
            fontWeight: 900,
            letterSpacing: -4,
            backgroundImage: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.pink})`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Bella
        </span>
      </div>
      <div
        style={{
          fontSize: 58,
          fontWeight: 800,
          color: COLORS.ink,
          opacity: text,
          transform: `translateY(${interpolate(text, [0, 1], [24, 0])}px)`,
        }}
      >
        Your workday, organized.
      </div>
    </AbsoluteFill>
  );
};

import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BOUNCY, COLORS, FONT } from "./theme";

// "01  Manages your schedule" label shown under each scene.
export const Caption: React.FC<{ index: string; text: string; delay?: number }> = ({
  index,
  text,
  delay = 10,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - delay, fps, config: BOUNCY });

  return (
    <div
      style={{
        position: "absolute",
        bottom: 110,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        fontFamily: FONT,
        opacity: interpolate(pop, [0, 1], [0, 1], { extrapolateRight: "clamp" }),
        transform: `translateY(${interpolate(pop, [0, 1], [40, 0])}px)`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 22,
          padding: "18px 40px",
          borderRadius: 999,
          background: "rgba(255,255,255,0.7)",
          boxShadow: "0 10px 40px rgba(124,58,237,0.15)",
        }}
      >
        <span
          style={{
            fontSize: 30,
            fontWeight: 900,
            color: "white",
            background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.pink})`,
            borderRadius: 999,
            padding: "4px 16px",
          }}
        >
          {index}
        </span>
        <span style={{ fontSize: 46, fontWeight: 800, color: COLORS.ink }}>
          {text}
        </span>
      </div>
    </div>
  );
};

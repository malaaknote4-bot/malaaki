import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const WORDS = ["I", "like", "ice", "cream"];

export const IceCream: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Cone drops in after the words have appeared.
  const cone = spring({ frame: frame - 45, fps, config: { damping: 12 } });
  const wobble = Math.sin(frame / 6) * 4;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #ffd6e7 0%, #fff4d6 100%)",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "system-ui, sans-serif",
        opacity: fadeOut,
      }}
    >
      <div
        style={{
          fontSize: 260,
          transform: `translateY(${interpolate(cone, [0, 1], [-500, 0])}px) rotate(${wobble}deg)`,
          opacity: cone,
          marginBottom: 20,
        }}
      >
        🍦
      </div>
      <div style={{ display: "flex", gap: 36 }}>
        {WORDS.map((word, i) => {
          const pop = spring({
            frame: frame - i * 8,
            fps,
            config: { damping: 10 },
          });
          return (
            <span
              key={word}
              style={{
                fontSize: 150,
                fontWeight: 900,
                color: "#d6336c",
                textShadow: "6px 6px 0 #ffffff",
                transform: `scale(${pop})`,
                display: "inline-block",
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

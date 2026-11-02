import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS } from "./theme";

// Soft purple/pink gradient with slowly drifting light blobs.
export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = (speed: number, range: number) =>
    Math.sin(frame / speed) * range;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #ede4ff 0%, #f6dcf4 50%, #ffe0ee 100%)`,
        overflow: "hidden",
      }}
    >
      <Blob
        color={COLORS.violet}
        size={900}
        x={-200 + drift(70, 60)}
        y={-250 + drift(90, 40)}
      />
      <Blob
        color={COLORS.blush}
        size={800}
        x={1300 + drift(80, 50)}
        y={500 + drift(60, 60)}
      />
      <Blob
        color="#c4b5fd"
        size={600}
        x={700 + drift(100, 80)}
        y={750 + drift(75, 30)}
      />
    </AbsoluteFill>
  );
};

const Blob: React.FC<{ color: string; size: number; x: number; y: number }> = ({
  color,
  size,
  x,
  y,
}) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: size,
      height: size,
      borderRadius: "50%",
      background: color,
      opacity: 0.45,
      filter: "blur(120px)",
    }}
  />
);

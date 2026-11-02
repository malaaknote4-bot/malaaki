import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Caption } from "./Caption";
import { BOUNCY, COLORS, FONT } from "./theme";

const HOURS = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM"];
const ROW = 92;

const BLOCKS = [
  { label: "Team stand-up", start: 0, length: 0.75, color: COLORS.purple },
  { label: "Design review", start: 1.25, length: 1.25, color: COLORS.pink },
  { label: "Lunch break", start: 3, length: 1, color: "#f59e0b" },
  { label: "Client call", start: 4.25, length: 1, color: "#06b6d4" },
];

// A calendar flips open and time blocks slide neatly into place.
export const CalendarScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const flip = spring({ frame, fps, config: { damping: 13, stiffness: 90 } });

  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", fontFamily: FONT }}
    >
      <div style={{ perspective: 1800, marginTop: -110 }}>
        <div
          style={{
            width: 960,
            borderRadius: 40,
            background: COLORS.card,
            boxShadow: "0 40px 100px rgba(124,58,237,0.25)",
            overflow: "hidden",
            transformOrigin: "top center",
            transform: `rotateX(${interpolate(flip, [0, 1], [-95, 0])}deg)`,
            opacity: interpolate(flip, [0, 0.2], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          {/* Header */}
          <div
            style={{
              background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.pink})`,
              color: "white",
              padding: "26px 44px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 44, fontWeight: 900 }}>Tuesday</span>
            <span style={{ fontSize: 34, fontWeight: 700, opacity: 0.85 }}>
              March 12
            </span>
          </div>

          {/* Grid */}
          <div style={{ position: "relative", padding: "24px 44px 30px" }}>
            {HOURS.map((h) => (
              <div
                key={h}
                style={{
                  height: ROW,
                  display: "flex",
                  alignItems: "flex-start",
                  borderTop: "2px solid #efe7fb",
                }}
              >
                <span
                  style={{
                    width: 120,
                    fontSize: 24,
                    fontWeight: 700,
                    color: COLORS.muted,
                    paddingTop: 6,
                  }}
                >
                  {h}
                </span>
              </div>
            ))}

            {BLOCKS.map((b, i) => {
              const s = spring({
                frame: frame - (22 + i * 9),
                fps,
                config: BOUNCY,
              });
              return (
                <div
                  key={b.label}
                  style={{
                    position: "absolute",
                    left: 184,
                    right: 44,
                    top: 24 + b.start * ROW + 6,
                    height: b.length * ROW - 12,
                    borderRadius: 20,
                    background: b.color,
                    color: "white",
                    fontSize: 30,
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: 28,
                    boxShadow: `0 10px 24px ${b.color}55`,
                    transform: `translateX(${interpolate(s, [0, 1], [900, 0])}px)`,
                    opacity: interpolate(s, [0, 0.3], [0, 1], { extrapolateRight: "clamp" }),
                  }}
                >
                  {b.label}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Caption index="01" text="Manages your schedule" delay={18} />
    </AbsoluteFill>
  );
};

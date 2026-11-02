import { Check, Phone } from "lucide-react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Caption } from "./Caption";
import { BOUNCY, COLORS, FONT } from "./theme";

const RING_END = 55;

// A phone icon rings, then a "Call booked ✓" tag pops up.
export const CallScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: BOUNCY });
  const ringing = frame < RING_END;
  const shake = ringing
    ? Math.sin(frame * 1.6) * 14 * (Math.floor(frame / 12) % 2 === 0 ? 1 : 0.15)
    : 0;
  const settle = spring({ frame: frame - RING_END, fps, config: BOUNCY });
  const iconBg = ringing ? COLORS.purple : COLORS.green;

  const tag = spring({ frame: frame - (RING_END + 6), fps, config: BOUNCY });
  const detail = spring({ frame: frame - (RING_END + 16), fps, config: { damping: 200 } });

  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", fontFamily: FONT }}
    >
      <div
        style={{
          position: "relative",
          width: 300,
          height: 300,
          marginTop: -180,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Ripples while ringing */}
        {[0, 1, 2].map((i) => {
          const t = ((frame + i * 15) % 45) / 45;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 300,
                height: 300,
                borderRadius: "50%",
                border: `6px solid ${COLORS.pink}`,
                transform: `scale(${0.8 + t * 0.9})`,
                opacity: ringing ? (1 - t) * 0.6 : 0,
              }}
            />
          );
        })}
        <div
          style={{
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${iconBg}, ${ringing ? COLORS.pink : "#34d399"})`,
            boxShadow: `0 30px 80px ${ringing ? "rgba(236,72,153,0.4)" : "rgba(16,185,129,0.4)"}`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: `scale(${enter * (ringing ? 1 : interpolate(settle, [0, 0.5, 1], [1, 0.9, 1]))}) rotate(${shake}deg)`,
          }}
        >
          <Phone size={140} color="white" strokeWidth={2.2} fill="white" />
        </div>
      </div>

      {/* Booked tag */}
      <div
        style={{
          position: "absolute",
          top: 630,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            padding: "22px 46px",
            borderRadius: 999,
            background: "white",
            boxShadow: "0 20px 50px rgba(16,185,129,0.25)",
            transform: `scale(${tag})`,
          }}
        >
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: "50%",
              background: COLORS.green,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Check size={40} color="white" strokeWidth={4} />
          </div>
          <span style={{ fontSize: 56, fontWeight: 900, color: COLORS.ink }}>
            Call booked
          </span>
        </div>
        <span
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: COLORS.muted,
            opacity: detail,
            transform: `translateY(${interpolate(detail, [0, 1], [15, 0])}px)`,
          }}
        >
          Thursday · 3:00 PM with Alex
        </span>
      </div>

      <Caption index="02" text="Books your calls" delay={18} />
    </AbsoluteFill>
  );
};

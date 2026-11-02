import { AbsoluteFill, interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BUBBLE_COLORS, C, FONT } from "./theme";
import { landingSquash } from "./util";

const WORDS = ["Hola!", "Bonjour!", "Ciao!", "こんにちは!", "Hallo!"];
export const BURST_AT = 34;
export const PHONE_LAND = 11;

export const BUBBLES = Array.from({ length: 20 }, (_, i) => {
  const angle = (i / 20) * Math.PI * 2 + (random(`ba${i}`) - 0.5) * 0.4;
  return {
    text: WORDS[i % WORDS.length],
    color: BUBBLE_COLORS[i % BUBBLE_COLORS.length],
    angle,
    dist: 380 + random(`bd${i}`) * 420,
    spin: (random(`bs${i}`) - 0.5) * 540,
    launch: BURST_AT + (i % 5) * 3,
    pop: 84 + Math.floor(random(`bp${i}`) * 26),
  };
});

const CONFETTI = Array.from({ length: 70 }, (_, i) => ({
  angle: random(`ca${i}`) * Math.PI * 2,
  speed: 14 + random(`cs${i}`) * 26,
  color: [C.neon, C.gold, C.blue, C.pink, C.orange, C.white][i % 6],
  w: 10 + random(`cw${i}`) * 14,
  spin: (random(`cr${i}`) - 0.5) * 40,
}));

const CX = 960;
const CY = 540;

// 0–4 s: phone drops, bounces, and bursts open into speech-bubble confetti.
export const BurstScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const drop = spring({ frame, fps, config: { damping: 7, stiffness: 160, mass: 0.7 } });
  const phoneY = interpolate(drop, [0, 1], [-1300, 0]);
  const squash = landingSquash(frame - PHONE_LAND, 0.28) * landingSquash(frame - BURST_AT, 0.2);
  const shake = frame >= PHONE_LAND && frame < PHONE_LAND + 8 ? Math.sin(frame * 5) * 14 : 0;
  const burstFlash = interpolate(frame, [BURST_AT - 2, BURST_AT, BURST_AT + 10], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ring = Math.max(0, frame - BURST_AT);

  return (
    <AbsoluteFill style={{ fontFamily: FONT, transform: `translateY(${shake}px)` }}>
      {/* shockwave ring */}
      {ring > 0 && ring < 30 && (
        <div
          style={{
            position: "absolute",
            left: CX - 100,
            top: CY - 100,
            width: 200,
            height: 200,
            borderRadius: "50%",
            border: `${14 - ring * 0.4}px solid ${C.neon}`,
            transform: `scale(${1 + ring * 0.45})`,
            opacity: 1 - ring / 30,
            boxShadow: `0 0 40px ${C.neon}`,
          }}
        />
      )}

      {/* Phone */}
      <div
        style={{
          position: "absolute",
          left: CX - 180,
          top: CY - 360,
          width: 360,
          height: 720,
          transformOrigin: "50% 100%",
          transform: `translateY(${phoneY}px) scale(${1 / squash}, ${squash})`,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 58,
            background: "#111",
            border: "6px solid #2a2a2a",
            boxShadow: `0 0 60px rgba(57,255,20,0.55), 0 30px 60px rgba(0,0,0,0.6)`,
            padding: 18,
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              borderRadius: 42,
              background: "linear-gradient(180deg, #ffffff 0%, #eaffd9 100%)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "70px 26px",
              boxSizing: "border-box",
              gap: 26,
            }}
          >
            <div style={{ width: "100%", height: 22, borderRadius: 11, background: "#e5e5e5" }}>
              <div
                style={{
                  width: `${interpolate(frame, [12, 34], [15, 85], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%`,
                  height: "100%",
                  borderRadius: 11,
                  background: C.green,
                }}
              />
            </div>
            <div style={{ fontSize: 34, fontWeight: 700, color: C.ink }}>Translate:</div>
            <div
              style={{
                fontSize: 58,
                fontWeight: 700,
                color: C.ink,
                background: "white",
                border: "4px solid #e5e5e5",
                borderRadius: 24,
                padding: "16px 34px",
              }}
            >
              Hello!
            </div>
            <div
              style={{
                marginTop: "auto",
                width: "100%",
                padding: "20px 0",
                borderRadius: 22,
                background: C.green,
                boxShadow: "0 8px 0 #46a302",
                color: "white",
                fontSize: 34,
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              CHECK
            </div>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `radial-gradient(circle, white 0%, ${C.neon} 70%)`,
                opacity: burstFlash,
              }}
            />
          </div>
        </div>
      </div>

      {/* Confetti */}
      {frame > BURST_AT &&
        CONFETTI.map((c, i) => {
          const t = frame - BURST_AT;
          const x = CX + Math.cos(c.angle) * c.speed * t;
          const y = CY + Math.sin(c.angle) * c.speed * t + 0.9 * t * t;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: x,
                top: y,
                width: c.w,
                height: c.w * 0.5,
                background: c.color,
                borderRadius: 3,
                transform: `rotate(${c.spin * t}deg) scaleY(${Math.cos(t * 0.4 + i)})`,
              }}
            />
          );
        })}

      {/* Speech bubbles */}
      {BUBBLES.map((b, i) => {
        const p = spring({ frame: frame - b.launch, fps, config: { damping: 11, stiffness: 120 } });
        if (frame < b.launch) return null;
        const popT = frame - b.pop;
        const popScale = popT < 0 ? 1 : popT < 4 ? 1 + popT * 0.12 : 0;
        if (popScale === 0) return null;
        const x = CX + Math.cos(b.angle) * b.dist * p;
        const y = CY + Math.sin(b.angle) * b.dist * 0.75 * p + Math.sin((frame + i * 9) / 8) * 10;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              transform: `translate(-50%, -50%) rotate(${b.spin * p * 0.15 + Math.sin(frame / 5 + i) * 8}deg) scale(${p * popScale})`,
              opacity: popT >= 0 ? 1 - popT / 4 : 1,
            }}
          >
            <div
              style={{
                position: "relative",
                background: b.color,
                color: "white",
                fontSize: 54,
                fontWeight: 700,
                padding: "14px 34px",
                borderRadius: 40,
                whiteSpace: "nowrap",
                boxShadow: "0 8px 0 rgba(0,0,0,0.25), 0 0 30px rgba(57,255,20,0.35)",
                textShadow: "0 3px 0 rgba(0,0,0,0.2)",
              }}
            >
              {b.text}
              <div
                style={{
                  position: "absolute",
                  left: 40,
                  bottom: -14,
                  width: 30,
                  height: 30,
                  background: b.color,
                  transform: "rotate(45deg)",
                  borderRadius: 4,
                  zIndex: -1,
                }}
              />
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

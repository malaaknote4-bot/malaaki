import { Folder, Mail } from "lucide-react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Caption } from "./Caption";
import { BOUNCY, COLORS, FONT } from "./theme";

const FOLDERS = [
  { name: "Work", color: COLORS.purple, x: 560 },
  { name: "Clients", color: COLORS.pink, x: 960 },
  { name: "Personal", color: "#06b6d4", x: 1360 },
];
const FOLDER_Y = 640;

// Messy pile: position offsets, tilt, and the folder each email goes to.
const EMAILS = [
  { dx: -60, dy: -40, rot: -18, folder: 0 },
  { dx: 70, dy: -70, rot: 14, folder: 1 },
  { dx: -10, dy: 20, rot: -6, folder: 2 },
  { dx: 110, dy: 30, rot: 22, folder: 0 },
  { dx: -120, dy: 50, rot: 9, folder: 1 },
  { dx: 30, dy: -10, rot: -25, folder: 2 },
  { dx: -40, dy: 80, rot: 16, folder: 0 },
];
const PILE = { x: 960, y: 290 };
const SORT_START = 28;

// A messy stack of emails sorts itself into tidy folders.
export const EmailScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ fontFamily: FONT }}>
      {/* Folders */}
      {FOLDERS.map((f, i) => {
        const appear = spring({ frame: frame - (4 + i * 4), fps, config: BOUNCY });
        // Little bounce each time an email lands in this folder.
        const landed = EMAILS.map((e, j) => ({ ...e, j }))
          .filter((e) => e.folder === i)
          .map((e) => SORT_START + e.j * 6 + 14);
        const bump = landed.reduce((acc, t) => {
          const d = frame - t;
          return d >= 0 && d < 10 ? Math.max(acc, Math.sin((d / 10) * Math.PI) * 0.12) : acc;
        }, 0);
        const count = landed.filter((t) => frame >= t).length;

        return (
          <div
            key={f.name}
            style={{
              position: "absolute",
              left: f.x - 150,
              top: FOLDER_Y - 120,
              width: 300,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transform: `scale(${appear * (1 + bump)})`,
            }}
          >
            <div style={{ position: "relative" }}>
              <Folder size={200} color={f.color} fill={`${f.color}33`} strokeWidth={1.6} />
              {count > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: 20,
                    right: -6,
                    minWidth: 56,
                    height: 56,
                    borderRadius: 999,
                    background: f.color,
                    color: "white",
                    fontSize: 32,
                    fontWeight: 900,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: `0 6px 16px ${f.color}66`,
                  }}
                >
                  {count}
                </div>
              )}
            </div>
            <span style={{ fontSize: 38, fontWeight: 800, color: COLORS.ink }}>
              {f.name}
            </span>
          </div>
        );
      })}

      {/* Emails */}
      {EMAILS.map((e, i) => {
        const drop = spring({ frame: frame - i * 2, fps, config: BOUNCY });
        const sort = spring({
          frame: frame - (SORT_START + i * 6),
          fps,
          config: { damping: 14, stiffness: 120 },
        });
        const target = FOLDERS[e.folder];
        const x = interpolate(sort, [0, 1], [PILE.x + e.dx, target.x]);
        const y =
          interpolate(sort, [0, 1], [PILE.y + e.dy, FOLDER_Y - 40]) -
          Math.sin(Math.min(sort, 1) * Math.PI) * 120;
        const rot = interpolate(sort, [0, 1], [e.rot, 0]);
        const scale = interpolate(sort, [0, 0.7, 1], [1, 0.7, 0.2], {
          extrapolateRight: "clamp",
        });
        const opacity = interpolate(sort, [0.85, 1], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x - 130,
              top: y - 80 - interpolate(drop, [0, 1], [400, 0]),
              width: 260,
              height: 160,
              borderRadius: 22,
              background: "white",
              boxShadow: "0 14px 34px rgba(59,29,94,0.18)",
              display: "flex",
              alignItems: "center",
              gap: 18,
              padding: "0 24px",
              transform: `rotate(${rot}deg) scale(${scale * drop})`,
              opacity,
              zIndex: 10 + i,
            }}
          >
            <Mail size={64} color={target.color} strokeWidth={2} />
            <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
              <div style={{ height: 14, borderRadius: 7, background: "#e9ddfb", width: "90%" }} />
              <div style={{ height: 14, borderRadius: 7, background: "#f3ecfd", width: "65%" }} />
              <div style={{ height: 14, borderRadius: 7, background: "#f3ecfd", width: "80%" }} />
            </div>
          </div>
        );
      })}

      <Caption index="03" text="Sorts your inbox" delay={18} />
    </AbsoluteFill>
  );
};

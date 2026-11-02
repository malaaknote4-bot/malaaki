import { loadFont } from "@remotion/google-fonts/Nunito";

const { fontFamily } = loadFont("normal", {
  weights: ["600", "700", "800", "900"],
  subsets: ["latin"],
});

export const FONT = fontFamily;

export const COLORS = {
  purple: "#7c3aed",
  violet: "#a78bfa",
  pink: "#ec4899",
  blush: "#f9a8d4",
  ink: "#3b1d5e",
  muted: "#8b7aa8",
  card: "rgba(255,255,255,0.92)",
  green: "#10b981",
};

export const BOUNCY = { damping: 11, stiffness: 140, mass: 0.8 };
export const SMOOTH = { damping: 200 };

import { loadFont } from "@remotion/google-fonts/Fredoka";
import { continueRender, delayRender, staticFile } from "remotion";

const fredoka = loadFont("normal", { weights: ["600", "700"], subsets: ["latin"] });
// Noto Sans JP (OFL) subset with only the Japanese glyphs this video uses
// (こんにちは ねこ ありがとう), bundled locally instead of 120+ font chunks.
const JP_FAMILY = "LingoNotoSansJP";
if (typeof FontFace !== "undefined") {
  const handle = delayRender("Loading Japanese font");
  const face = new FontFace(JP_FAMILY, `url(${staticFile("remotion/lingo/noto-sans-jp-subset.woff2")}) format("woff2")`, {
    weight: "800",
  });
  face
    .load()
    .then(() => {
      document.fonts.add(face);
      continueRender(handle);
    })
    .catch(() => continueRender(handle));
}

export const FONT = `${fredoka.fontFamily}, ${JP_FAMILY}, sans-serif`;

export const W = 1920;
export const H = 1080;
export const FPS = 30;
/** One beat of the 120 BPM soundtrack, in frames. */
export const BEAT = 15;

export const C = {
  neon: "#39ff14",
  green: "#58cc02",
  deep: "#03140a",
  gold: "#ffc800",
  orange: "#ff9600",
  red: "#ff4b4b",
  blue: "#1cb0f6",
  purple: "#ce82ff",
  pink: "#ff86d0",
  white: "#ffffff",
  ink: "#0b1f12",
};

export const BUBBLE_COLORS = [C.blue, C.orange, C.purple, C.pink, C.gold, C.red];

/** Scene start frames (global). */
export const SCENES = {
  burst: { from: 0, duration: 120 },
  hop: { from: 120, duration: 150 },
  streak: { from: 270, duration: 150 },
  globe: { from: 420, duration: 120 },
  finale: { from: 540, duration: 60 },
};
export const TOTAL = 600;

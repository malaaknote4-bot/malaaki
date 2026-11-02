import { AbsoluteFill, Html5Audio, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Background } from "./Background";
import { BUBBLES, BURST_AT, BurstScene, PHONE_LAND } from "./BurstScene";
import { FinaleScene, TEXT_1_AT, TEXT_2_AT } from "./FinaleScene";
import { GlobeScene } from "./GlobeScene";
import { EXTRA_CHECK_FRAMES, FIRE_FRAME, HOP_LANDINGS, HopScene } from "./HopScene";
import { COIN_LANDINGS, DIVE_SPLASHES, MILESTONES, StreakScene } from "./StreakScene";
import { C, SCENES } from "./theme";

const CUTS = [SCENES.hop.from, SCENES.streak.from, SCENES.globe.from, SCENES.finale.from];

type Sfx = "pop" | "ding" | "clink" | "whoosh" | "boing";
const uniq = (xs: number[]) => [...new Set(xs.map(Math.round))].sort((a, b) => a - b);

// Every sound effect, at global frames, derived from the scenes' own timings.
const SFX: { at: number; name: Sfx; volume: number }[] = [
  { at: 0, name: "whoosh", volume: 0.6 },
  { at: PHONE_LAND, name: "boing", volume: 0.7 },
  ...uniq(BUBBLES.map((b) => b.launch)).map((at) => ({ at, name: "pop" as Sfx, volume: 0.55 })),
  ...uniq(BUBBLES.map((b) => b.pop)).filter((_, i) => i % 2 === 0).map((at) => ({ at, name: "pop" as Sfx, volume: 0.4 })),
  ...CUTS.map((at) => ({ at: at - 5, name: "whoosh" as Sfx, volume: 0.5 })),
  ...uniq(HOP_LANDINGS.map((l) => l.frame)).map((at) => ({ at: SCENES.hop.from + at, name: "pop" as Sfx, volume: 0.45 })),
  ...uniq(EXTRA_CHECK_FRAMES).filter((_, i) => i % 2 === 0).map((at) => ({ at: SCENES.hop.from + at, name: "pop" as Sfx, volume: 0.3 })),
  { at: SCENES.hop.from + FIRE_FRAME, name: "whoosh", volume: 0.6 },
  ...MILESTONES.map((m) => ({ at: SCENES.streak.from + m.at, name: "ding" as Sfx, volume: 0.45 })),
  ...uniq(COIN_LANDINGS).map((at) => ({ at: SCENES.streak.from + at, name: "clink" as Sfx, volume: 0.3 })),
  ...uniq(DIVE_SPLASHES).map((at) => ({ at: SCENES.streak.from + at, name: "boing" as Sfx, volume: 0.5 })),
  { at: SCENES.finale.from + 6, name: "pop", volume: 0.6 },
  { at: SCENES.finale.from + TEXT_1_AT, name: "ding", volume: 0.5 },
  { at: SCENES.finale.from + TEXT_2_AT, name: "pop", volume: 0.6 },
];

const CutFlash: React.FC = () => {
  const frame = useCurrentFrame();
  const o = Math.max(
    0,
    ...CUTS.map((c) => interpolate(frame, [c - 1, c, c + 5], [0, 0.9, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })),
  );
  return (
    <AbsoluteFill
      style={{ background: `radial-gradient(circle, white 0%, ${C.neon} 80%)`, opacity: o, pointerEvents: "none" }}
    />
  );
};

export const LanguageFun: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "black" }}>
      <Background />
      <Sequence from={SCENES.burst.from} durationInFrames={SCENES.burst.duration}>
        <BurstScene />
      </Sequence>
      <Sequence from={SCENES.hop.from} durationInFrames={SCENES.hop.duration}>
        <HopScene />
      </Sequence>
      <Sequence from={SCENES.streak.from} durationInFrames={SCENES.streak.duration}>
        <StreakScene />
      </Sequence>
      <Sequence from={SCENES.globe.from} durationInFrames={SCENES.globe.duration}>
        <GlobeScene />
      </Sequence>
      <Sequence from={SCENES.finale.from} durationInFrames={SCENES.finale.duration}>
        <FinaleScene />
      </Sequence>
      <CutFlash />

      <Html5Audio src={staticFile("remotion/lingo/music.mp3")} volume={0.75} />
      {SFX.filter((s) => s.at >= 0).map((s, i) => (
        <Sequence key={i} from={s.at} durationInFrames={30} layout="none">
          <Html5Audio src={staticFile(`remotion/lingo/${s.name}.wav`)} volume={s.volume} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

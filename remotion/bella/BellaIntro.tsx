import { linearTiming, springTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { AbsoluteFill } from "remotion";
import { Background } from "./Background";
import { CalendarScene } from "./CalendarScene";
import { CallScene } from "./CallScene";
import { EmailScene } from "./EmailScene";
import { Intro } from "./Intro";
import { Outro } from "./Outro";

const SCENES = { intro: 135, calendar: 135, call: 135, email: 140, outro: 90 };
const T = 18; // transition length in frames

const bouncy = springTiming({
  config: { damping: 14, stiffness: 160 },
  durationInFrames: T,
});

export const BELLA_DURATION =
  Object.values(SCENES).reduce((a, b) => a + b, 0) - 4 * T;

export const BellaIntro: React.FC = () => {
  return (
    <AbsoluteFill>
      <Background />
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={SCENES.intro}>
          <Intro />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={bouncy}
        />
        <TransitionSeries.Sequence durationInFrames={SCENES.calendar}>
          <CalendarScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={bouncy}
        />
        <TransitionSeries.Sequence durationInFrames={SCENES.call}>
          <CallScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={bouncy}
        />
        <TransitionSeries.Sequence durationInFrames={SCENES.email}>
          <EmailScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />
        <TransitionSeries.Sequence durationInFrames={SCENES.outro}>
          <Outro />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};

import { Composition } from "remotion";
import { HelloWorld } from "./HelloWorld";
import { IceCream } from "./IceCream";
import { LanguageFun } from "./lingo/LanguageFun";
import { TOTAL as LINGO_TOTAL } from "./lingo/theme";
import { BELLA_DURATION, BellaIntro } from "./bella/BellaIntro";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ title: "Hello from Remotion" }}
      />
      <Composition
        id="IceCream"
        component={IceCream}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="BellaIntro"
        component={BellaIntro}
        durationInFrames={BELLA_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="LanguageFun"
        component={LanguageFun}
        durationInFrames={LINGO_TOTAL}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};

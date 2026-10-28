import LycorisSpecimen, { type LycorisGlyphGroup } from "@/components/ui/lycoris-specimen";
import { dictionaries, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

// Menu names for the specimen frame, in Latin letters (see the note on `hero` in lib/i18n.ts).
const LEFT_ROWS = [["BUMB", "STOP", "SOISY"], ["ZONE", "BRAKE"], ["STRIPS", "CRISPY"]];
const RIGHT_ROWS = [["ROAD8", "BIG 8", "CORNER"], ["HORN", "CURVE"], ["FRIES", "RINGS"]];
const SIZES = ["min(5.4cqw, 5.4cqh)", "min(4cqw, 4cqh)", "min(3cqw, 3cqh)"];

const groups = (labels: string[], rows: string[][]): LycorisGlyphGroup[] =>
  labels.map((label, i) => ({ label, rows: rows[i], size: SIZES[i] }));

// The scroll hero: Road 8's red-on-asphalt version of the Lycoris specimen.
export default function Road8Hero({ lang }: { lang: Locale }) {
  const t = dictionaries[lang].hero;
  return (
    // The specimen lays itself out left to right; Arabic text inside still reads right to left.
    <div dir="ltr" className="w-full">
      <LycorisSpecimen
        name="ROAD 8"
        studio={site.phones[1].display}
        year={site.phones[0].display}
        description={t.description}
        specs={t.specs}
        tagline={t.tagline}
        multilingual={t.finaleLine}
        ligatureWord={t.finaleWord}
        links={[
          { label: t.whatsappLabel, href: `https://wa.me/${site.whatsapp}` },
          { label: t.instagramLabel, href: site.instagram },
        ]}
        fontFamily="var(--font-anton), var(--font-lalezar), Impact, sans-serif"
        fontHref={null}
        ink="#111010"
        bone="#f1ece4"
        crimson="#e5130c"
        height="calc(100svh - var(--nav-h))"
        stickyTop="var(--nav-h)"
        sceneScroll={0.9}
        copy={{
          kind: t.kind,
          coverKicker: t.coverKicker,
          fan: t.fan as [string, string, string],
          madeBy: t.madeBy,
          credits: t.credits as [string, string][],
          crownCaption: t.crownCaption,
          specimenLeft: groups(t.groupsLeft, LEFT_ROWS),
          specimenRight: groups(t.groupsRight, RIGHT_ROWS),
          specimenSubtitle: t.specimenSubtitle,
          specimenPlaceholder: "8",
          specimenCenterRows: [],
          specimenBottom: "BBQ · RANCH · MAYO · CHEDDAR · JALAPEÑO",
          inspectHint: t.inspectHint,
          showCodepoint: false,
          bloomCaption: t.bloomCaption,
          editable: false,
          finaleCaption: t.finaleCaption,
          ligatures: [],
          finaleTail: t.finaleTail,
          finaleHref: `/${lang}/menu`,
          nav: t.nav,
        }}
      />
    </div>
  );
}

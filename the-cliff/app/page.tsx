import Image from "next/image";
import BookingForm from "@/components/BookingForm";
import CliffHero from "@/components/CliffHero";
import Header from "@/components/Header";
import LogoDraw from "@/components/LogoDraw";
import MobileBookBar from "@/components/MobileBookBar";
import SectionHeading from "@/components/SectionHeading";
import { Ruled } from "@/components/motion/Hairline";
import ImageUnveil from "@/components/motion/ImageUnveil";
import Odometer from "@/components/motion/Odometer";
import Parallax from "@/components/motion/Parallax";
import ScrollWords from "@/components/motion/ScrollWords";
import FadeIn from "@/components/motion/FadeIn";
import BookingSteps from "@/components/BookingSteps";
import NearbyLine from "@/components/NearbyLine";
import GalleryGrid from "@/components/GalleryGrid";
import Faq from "@/components/Faq";
import ClosingCta from "@/components/ClosingCta";
import ToneBackdrop from "@/components/motion/ToneBackdrop";
import { airbnbLink } from "@/lib/airbnb";
import { amenities, highlights, rating, site, spaces } from "@/lib/content";

const container = "mx-auto w-full max-w-6xl px-5 md:px-8";

export default function Home() {
  return (
    <>
      <Header />
      <ToneBackdrop />
      <main id="top">
        {/* Hero: scroll to reveal the house, then the pitch and booking form fade in */}
        <CliffHero>
          <div className={`${container} pb-28 pt-6 md:pb-36`}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/60">{site.region}</p>

            <div className="mt-8 grid items-end gap-10 md:grid-cols-[1fr_auto]">
              <h1 className="font-serif text-[clamp(3.3rem,10vw,8.4rem)] leading-[0.9] font-light tracking-[-0.035em]">
                <span className="block">Wake up</span>
                <span className="block">above the</span>
                <span className="block italic">rainforest.</span>
              </h1>

              <a
                href={airbnbLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group hidden w-72 items-stretch bg-paper text-ink md:flex"
              >
                <span className="relative w-24 shrink-0">
                  <Image src="/images/deck-rainbow.jpg" alt="" fill sizes="96px" className="object-cover" />
                </span>
                <span className="flex flex-col justify-center gap-1 p-4">
                  <span className="font-serif text-3xl font-light leading-none">★ {rating.score}</span>
                  <span className="text-xs font-semibold text-ink-soft">
                    {rating.badge} · {rating.reviews} reviews
                  </span>
                  <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] group-hover:underline">Read on Airbnb ↗</span>
                </span>
              </a>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-4 md:items-stretch">
              <p className="border-l-2 border-white/60 bg-white/5 px-6 py-5 text-[15px] leading-relaxed text-white/80 md:col-span-2 md:col-start-3">
                {site.listingTitle}. A private clifftop home in Springbrook with layer after layer of World Heritage rainforest
                falling away below the deck.
              </p>
            </div>

            <p className="mt-8 text-xs font-semibold text-white/70 md:hidden">
              ★ {rating.score} · {rating.badge} · {rating.reviews} reviews on Airbnb
            </p>

            <div id="book" className="mt-16 scroll-mt-28 text-ink">
              <BookingForm />
            </div>
          </div>
        </CliffHero>

        {/* The Retreat */}
        <section id="retreat" data-tone="bone" className="py-28 md:py-40">
          <div className={container}>
            <FadeIn>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ink-soft">The Retreat</p>
            </FadeIn>
            <ScrollWords
              className="mt-8 max-w-4xl font-serif text-[clamp(1.9rem,3.6vw,3.1rem)] leading-[1.15] font-light tracking-[-0.015em] text-balance"
              segments={[
                { text: "Perched on the edge of the Springbrook escarpment, The Cliff is a place to" },
                { text: "slow right down.", italic: true },
                { text: "Coffee on the deck, mist in the valley, and nothing on the schedule but the view." },
              ]}
            />

            <ul className="mt-20 grid grid-cols-2 md:grid-cols-4">
              {highlights.map((h, i) => (
                <Ruled key={h.label} as="li" delay={i * 0.12} contentClassName="py-8 pr-4">
                  <Odometer
                    value={h.value.replace(/\D/g, "").padStart(2, "0")}
                    delay={i * 0.12 + 0.6}
                    className="font-serif text-6xl font-light tabular-nums tracking-tight md:text-7xl"
                  />
                  <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-ink-soft">{h.label}</p>
                </Ruled>
              ))}
            </ul>

            <a
              href={airbnbLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-block text-sm font-semibold underline decoration-line underline-offset-8 transition-colors hover:decoration-ink"
            >
              ★ {rating.score} from {rating.reviews} guest reviews. Read them on Airbnb ↗
            </a>
          </div>
        </section>

        {/* Spaces */}
        <section data-tone="paper" className="py-28 md:py-40">
          <div className={container}>
            <SectionHeading eyebrow="The Spaces" lines={["Made for slow days", <em key="i">above the valley</em>]} />
            <div className="mt-20 grid gap-20 md:gap-28">
              {spaces.map((s, i) => (
                <article key={s.title} className="grid items-end gap-8 md:grid-cols-4 md:gap-0">
                  <ImageUnveil from={i % 2 ? "left" : "right"} className={`aspect-[4/3] md:col-span-2 ${i % 2 ? "md:order-2" : ""}`}>
                    <Parallax>
                      <Image src={s.image} alt={s.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                    </Parallax>
                  </ImageUnveil>
                  <FadeIn delay={0.5} className={`md:col-span-2 ${i % 2 ? "md:pr-12" : "md:pl-12"}`}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ink-soft/60 tabular-nums">
                      0{i + 1} — 0{spaces.length}
                    </p>
                    <h3 className="mt-4 font-serif text-4xl font-light tracking-tight md:text-5xl">{s.title}</h3>
                    <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-soft">{s.text}</p>
                  </FadeIn>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Amenities */}
        <section id="amenities" data-tone="night" className="relative overflow-hidden py-28 text-white md:py-40">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="mist-layer absolute -left-1/4 top-1/4 h-[60%] w-[80%] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.05),transparent)] blur-3xl" />
            <div className="mist-layer-2 absolute -right-1/4 bottom-0 h-[55%] w-[70%] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.04),transparent)] blur-3xl" />
          </div>
          <div className={`${container} relative`}>
            <SectionHeading
              dark
              eyebrow="Amenities"
              lines={["Everything you need,", <em key="i">nothing you don&rsquo;t</em>]}
              text="The whole house to yourselves, with the view doing most of the work."
            />
            <ul className="mt-20 grid grid-cols-2 gap-y-12 md:grid-cols-4">
              {amenities.map((a, i) => (
                <Ruled key={a.title} as="li" delay={(Math.floor(i / 4) + (i % 4)) * 0.12} lineClassName="bg-line-light" contentClassName="pr-4 pt-6 md:pr-6">
                  <h3 className="font-semibold">{a.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{a.text}</p>
                </Ruled>
              ))}
            </ul>
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" data-tone="bone" className="py-28 md:py-40">
          <div className={container}>
            <SectionHeading eyebrow="Gallery" lines={["Every hour,", <em key="i">a different view</em>]} />
            <GalleryGrid />
          </div>
        </section>

        {/* Location */}
        <section id="location" data-tone="paper" className="py-28 md:py-40">
          <div className={`${container} grid gap-14 md:grid-cols-4 md:gap-0`}>
            <div className="md:col-span-2 md:pr-12">
              <SectionHeading
                eyebrow="The Location"
                lines={["High in the", <em key="i">Gold Coast Hinterland</em>]}
                text="Springbrook is cool, green and quiet, with national park on the doorstep and the coast an easy drive away. Airbnb shares the exact address once your booking is confirmed."
              />
            </div>
            <ImageUnveil from="left" className="aspect-[16/10] md:col-span-2 md:self-end">
              <Parallax axis="x" distance={6} scale={1.15}>
                <Image src="/images/valley.jpg" alt="Rainforest valleys of Springbrook stretching to the coast" fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover" />
              </Parallax>
            </ImageUnveil>
            <NearbyLine />
          </div>
        </section>

        {/* How to book */}
        <section data-tone="night" className="py-28 text-white md:py-40">
          <div className={container}>
            <SectionHeading dark eyebrow="How to book" lines={["Three simple steps", <em key="i">to the cliff</em>]} />
            <BookingSteps />
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" data-tone="bone" className="py-28 md:py-40">
          <div className={`${container} grid gap-12 md:grid-cols-4 md:gap-0`}>
            <div className="md:col-span-2 md:pr-12">
              <SectionHeading eyebrow="FAQ" lines={["Good", <em key="i">to know</em>]} />
            </div>
            <Faq />
          </div>
        </section>

        {/* Closing CTA */}
        <ClosingCta container={container} />
      </main>

      <footer className="border-t border-line-light bg-night text-white/60">
        <div className={`${container} flex flex-col gap-8 py-12 pb-24 text-sm md:flex-row md:items-center md:justify-between md:pb-12`}>
          <div className="text-white">
            <LogoDraw />
            <p className="mt-3 text-white/50">{site.region}</p>
          </div>
          <nav className="flex flex-wrap gap-6" aria-label="Footer">
            <a href="#retreat" className="hover:text-white">The Retreat</a>
            <a href="#gallery" className="hover:text-white">Gallery</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
            <a href={airbnbLink()} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              Airbnb listing ↗
            </a>
          </nav>
          <p>© {new Date().getFullYear()} {site.name}</p>
        </div>
      </footer>

      <MobileBookBar />
    </>
  );
}

import Image from "next/image";
import ArrowButton from "@/components/ArrowButton";
import BookingForm from "@/components/BookingForm";
import CliffHero from "@/components/CliffHero";
import Header from "@/components/Header";
import Logo from "@/components/Logo";
import MobileBookBar from "@/components/MobileBookBar";
import SectionHeading from "@/components/SectionHeading";
import { airbnbLink } from "@/lib/airbnb";
import { amenities, bookingSteps, experiences, faqs, gallery, highlights, rating, site, spaces } from "@/lib/content";

const container = "mx-auto w-full max-w-6xl px-5 md:px-8";

export default function Home() {
  return (
    <>
      <Header />
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
        <section id="retreat" className="py-28 md:py-40">
          <div className={container}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ink-soft">The Retreat</p>
            <p className="mt-8 max-w-4xl font-serif text-[clamp(1.9rem,3.6vw,3.1rem)] leading-[1.15] font-light tracking-[-0.015em] text-balance">
              Perched on the edge of the Springbrook escarpment, The Cliff is a place to <em>slow right down</em>. Coffee on the
              deck, mist in the valley, and nothing on the schedule but the view.
            </p>

            <dl className="mt-20 grid grid-cols-2 border-t border-line md:grid-cols-4">
              {highlights.map((h) => (
                <div key={h.label} className="border-b border-line py-8 pr-4 md:border-b-0">
                  <dd className="font-serif text-6xl font-light tabular-nums tracking-tight md:text-7xl">{h.value.replace(/\D/g, "").padStart(2, "0")}</dd>
                  <dt className="mt-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-ink-soft">{h.label}</dt>
                </div>
              ))}
            </dl>

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
        <section className="bg-paper py-28 md:py-40">
          <div className={container}>
            <SectionHeading eyebrow="The Spaces" title={<>Made for slow days <em>above the valley</em></>} />
            <div className="mt-20 grid gap-20 md:gap-28">
              {spaces.map((s, i) => (
                <article key={s.title} className="grid items-end gap-8 md:grid-cols-4 md:gap-0">
                  <div className={`relative aspect-[4/3] md:col-span-2 ${i % 2 ? "md:order-2" : ""}`}>
                    <Image src={s.image} alt={s.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                  </div>
                  <div className={`md:col-span-2 ${i % 2 ? "md:pr-12" : "md:pl-12"}`}>
                    <h3 className="font-serif text-4xl font-light tracking-tight md:text-5xl">{s.title}</h3>
                    <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-soft">{s.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Amenities */}
        <section id="amenities" className="bg-night py-28 text-white md:py-40">
          <div className={container}>
            <SectionHeading
              dark
              eyebrow="Amenities"
              title={<>Everything you need, <em>nothing you don&rsquo;t</em></>}
              text="The whole house to yourselves, with the view doing most of the work."
            />
            <ul className="mt-20 grid grid-cols-2 gap-y-12 md:grid-cols-4">
              {amenities.map((a) => (
                <li key={a.title} className="border-t border-line-light pr-4 pt-6 md:pr-6">
                  <h3 className="font-semibold">{a.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{a.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" className="py-28 md:py-40">
          <div className={container}>
            <SectionHeading eyebrow="Gallery" title={<>Every hour, <em>a different view</em></>} />
            <div className="mt-16 grid grid-cols-2 gap-2 md:grid-cols-4">
              {gallery.map((g, i) => (
                <div key={g.src} className={`relative overflow-hidden ${i === 0 ? "col-span-2 aspect-[5/4] md:row-span-2" : "aspect-[5/4] md:aspect-auto"}`}>
                  <Image
                    src={g.src}
                    alt={g.alt}
                    fill
                    sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                    className="object-cover transition-transform duration-[1.2s] hover:scale-[1.04]"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location */}
        <section id="location" className="bg-paper py-28 md:py-40">
          <div className={`${container} grid gap-14 md:grid-cols-4 md:gap-0`}>
            <div className="md:col-span-2 md:pr-12">
              <SectionHeading
                eyebrow="The Location"
                title={<>High in the <em>Gold Coast Hinterland</em></>}
                text="Springbrook is cool, green and quiet, with national park on the doorstep and the coast an easy drive away. Airbnb shares the exact address once your booking is confirmed."
              />
            </div>
            <div className="relative aspect-[16/10] md:col-span-2 md:self-end">
              <Image src="/images/valley.jpg" alt="Rainforest valleys of Springbrook stretching to the coast" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
            <ul className="border-t border-line md:col-span-4 md:mt-20 md:grid md:grid-cols-4">
              {experiences.map((e) => (
                <li key={e.title} className="border-b border-line py-6 pr-6 md:border-b-0">
                  <h3 className="font-semibold">{e.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{e.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* How to book */}
        <section className="bg-night py-28 text-white md:py-40">
          <div className={container}>
            <SectionHeading dark eyebrow="How to book" title={<>Three simple steps <em>to the cliff</em></>} />
            <div className="mt-20 grid gap-12 md:grid-cols-4 md:gap-0">
              <ol className="grid gap-12 md:col-span-3 md:grid-cols-3 md:gap-0">
                {bookingSteps.map((s, i) => (
                  <li key={s.title} className="border-t border-line-light pr-8 pt-6">
                    <span className="font-serif text-6xl font-light text-moss md:text-7xl">0{i + 1}</span>
                    <h3 className="mt-6 text-lg font-semibold">{s.title}</h3>
                    <p className="mt-2 leading-relaxed text-white/60">{s.text}</p>
                  </li>
                ))}
              </ol>
              <div className="flex flex-col gap-3 border-t border-line-light pt-6 md:pl-8">
                <ArrowButton href="#book" className="w-full">Choose dates</ArrowButton>
                <a
                  href={airbnbLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-white/70 underline decoration-white/30 underline-offset-8 hover:text-white"
                >
                  View the listing on Airbnb ↗
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-28 md:py-40">
          <div className={`${container} grid gap-12 md:grid-cols-4 md:gap-0`}>
            <div className="md:col-span-2 md:pr-12">
              <SectionHeading eyebrow="FAQ" title={<>Good <em>to know</em></>} />
            </div>
            <div className="border-t border-line md:col-span-2">
              {faqs.map((f) => (
                <details key={f.q} className="group border-b border-line">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-medium [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="grid h-8 w-8 shrink-0 place-items-center border border-line text-lg font-light transition-transform duration-300 group-open:rotate-45" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p className="pb-6 pr-12 leading-relaxed text-ink-soft">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="relative isolate overflow-hidden bg-night text-white">
          <Image src="/images/valley.jpg" alt="" fill sizes="100vw" className="-z-10 object-cover" />
          <div className="absolute inset-0 -z-10 bg-night/65" />
          <div className={`${container} py-32 md:py-48`}>
            <h2 className="max-w-4xl font-serif text-[clamp(2.8rem,7vw,6rem)] leading-[0.95] font-light tracking-[-0.03em]">
              Your stay on the cliff <em>is waiting.</em>
            </h2>
            <p className="mt-8 max-w-md text-lg text-white/75">Choose your dates and book securely through our official Airbnb listing.</p>
            <ArrowButton href="#book" className="mt-12 w-full sm:w-72">
              Book your stay
            </ArrowButton>
          </div>
        </section>
      </main>

      <footer className="border-t border-line-light bg-night text-white/60">
        <div className={`${container} flex flex-col gap-8 py-12 pb-24 text-sm md:flex-row md:items-center md:justify-between md:pb-12`}>
          <div className="text-white">
            <Logo />
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

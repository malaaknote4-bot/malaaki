import Image from "next/image";
import Header from "@/components/Header";
import BookingForm from "@/components/BookingForm";
import MobileBookBar from "@/components/MobileBookBar";
import SectionHeading from "@/components/SectionHeading";
import { airbnbLink } from "@/lib/airbnb";
import { amenities, bookingSteps, experiences, faqs, gallery, highlights, rating, site, spaces } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top" className="pb-20 md:pb-0">
        {/* Hero */}
        <section className="relative flex min-h-[92svh] items-end overflow-hidden">
          <Image src="/images/deck-view.jpg" alt="" fill preload sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/25 to-ink/60" />
          <div className="relative mx-auto w-full max-w-6xl px-5 pb-28 pt-32 text-white md:px-8 md:pb-36">
            <p className="text-xs font-medium uppercase tracking-[0.28em] opacity-90">{site.region}</p>
            <h1 className="mt-5 max-w-3xl font-serif text-5xl leading-[1.05] font-light md:text-7xl">
              Where the land ends, <em className="italic">and the quiet begins.</em>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed opacity-90">
              {site.name} is a private clifftop home high above the rainforest valleys of Springbrook. Slow mornings,
              wide horizons and nothing to do but rest.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#book" className="rounded-full bg-white px-7 py-3.5 font-medium text-ink transition-colors hover:bg-sand">
                Check availability
              </a>
              <a
                href="#retreat"
                className="rounded-full border border-white/60 px-7 py-3.5 font-medium text-white transition-colors hover:bg-white/10"
              >
                Explore the retreat
              </a>
            </div>
            <p className="mt-8 text-sm opacity-90">
              <span aria-hidden="true">★ </span>
              {rating.score} · {rating.badge} on Airbnb · {rating.reviews} reviews
            </p>
          </div>
        </section>

        {/* Booking */}
        <section id="book" className="relative z-10 mx-auto -mt-16 max-w-6xl scroll-mt-28 px-5 md:px-8">
          <BookingForm />
        </section>

        {/* Intro + highlights */}
        <section id="retreat" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
          <div className="grid gap-14 md:grid-cols-2 md:items-center">
            <SectionHeading
              eyebrow="The Retreat"
              title="A calm place to arrive, unwind and stay a little longer"
              text="Perched on the edge of the Springbrook escarpment, The Cliff looks out across layer after layer of World Heritage rainforest. The deck sits right on the edge, so the view is part of every meal, every morning coffee and every sunset."
            />
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-stone">
              {highlights.map((h) => (
                <div key={h.label} className="bg-shell p-7 md:p-9">
                  <dt className="text-xs uppercase tracking-[0.18em] text-ink-soft">{h.label}</dt>
                  <dd className="mt-2 font-serif text-3xl">{h.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="mt-8 flex justify-end">
            <a href={airbnbLink()} target="_blank" rel="noopener noreferrer" className="text-sm text-ink-soft underline-offset-4 hover:text-ink hover:underline">
              ★ {rating.score} from {rating.reviews} guest reviews. Read them on Airbnb ↗
            </a>
          </div>
        </section>

        {/* Spaces */}
        <section className="bg-shell py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <SectionHeading eyebrow="The Spaces" title="Made for slow days above the valley" />
            <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
              {spaces.map((s) => (
                <article key={s.title}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
                    <Image src={s.image} alt={s.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                  </div>
                  <h3 className="mt-6 font-serif text-2xl">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{s.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Amenities */}
        <section id="amenities" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
          <SectionHeading
            eyebrow="Amenities"
            title="Everything you need, nothing you don't"
            text="Thoughtful comforts so you can settle in from the moment you arrive."
          />
          <ul className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {amenities.map((a) => (
              <li key={a.title} className="border-t border-stone pt-5">
                <h3 className="font-medium">{a.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{a.text}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Gallery */}
        <section id="gallery" className="bg-shell py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <SectionHeading eyebrow="Gallery" title="Every hour, a different view" />
            <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {gallery.map((g, i) => (
                <div
                  key={g.src + i}
                  className={`relative overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 aspect-[5/4] md:row-span-2" : "aspect-[5/4] md:aspect-auto"}`}
                >
                  <Image
                    src={g.src}
                    alt={g.alt}
                    fill
                    sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                    className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location */}
        <section id="location" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
          <div className="grid gap-14 md:grid-cols-[1.1fr_1fr] md:items-center">
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl">
              <Image src="/images/valley.jpg" alt="Rainforest valleys of Springbrook stretching to the coast" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
            <div>
              <SectionHeading
                eyebrow="The Location"
                title="High in the Gold Coast Hinterland"
                text="Springbrook is cool, green and quiet, with national park on the doorstep and the coast an easy drive away. Airbnb shares the exact address once your booking is confirmed."
              />
              <ul className="mt-10 space-y-6">
                {experiences.map((e) => (
                  <li key={e.title} className="flex gap-4">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gum" aria-hidden="true" />
                    <div>
                      <h3 className="font-medium">{e.title}</h3>
                      <p className="mt-1 text-ink-soft">{e.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* How to book */}
        <section className="bg-gum-deep py-24 text-white md:py-32">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-mist">How to book</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight font-light md:text-5xl">Three simple steps to the cliff</h2>
            </div>
            <ol className="mt-14 grid gap-10 md:grid-cols-3">
              {bookingSteps.map((s, i) => (
                <li key={s.title}>
                  <span className="font-serif text-5xl font-light text-mist">0{i + 1}</span>
                  <h3 className="mt-4 text-lg font-medium">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-white/75">{s.text}</p>
                </li>
              ))}
            </ol>
            <div className="mt-14 flex flex-wrap gap-3">
              <a href="#book" className="rounded-full bg-white px-7 py-3.5 font-medium text-ink transition-colors hover:bg-sand">
                Choose your dates
              </a>
              <a
                href={airbnbLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/50 px-7 py-3.5 font-medium transition-colors hover:bg-white/10"
              >
                View listing on Airbnb ↗
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-3xl px-5 py-24 md:px-8 md:py-32">
          <SectionHeading eyebrow="FAQ" title="Good to know" center />
          <div className="mt-12 divide-y divide-stone border-y border-stone">
            {faqs.map((f) => (
              <details key={f.q} className="group py-2">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="text-2xl font-light text-gum transition-transform duration-300 group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="pb-5 leading-relaxed text-ink-soft">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Closing CTA */}
        <section className="relative overflow-hidden">
          <Image src="/images/valley.jpg" alt="" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-ink/40" />
          <div className="relative mx-auto max-w-3xl px-5 py-28 text-center text-white md:py-40">
            <h2 className="font-serif text-4xl leading-tight font-light md:text-6xl">Your stay on the cliff is waiting</h2>
            <p className="mx-auto mt-5 max-w-lg text-lg opacity-90">Choose your dates and book securely through our official Airbnb listing.</p>
            <a href="#book" className="mt-9 inline-block rounded-full bg-white px-8 py-4 font-medium text-ink transition-colors hover:bg-sand">
              Book your stay
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-shell">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-12 pb-28 text-sm text-ink-soft md:flex-row md:items-center md:justify-between md:px-8 md:pb-12">
          <div>
            <p className="font-serif text-2xl text-ink">{site.name}</p>
            <p className="mt-1">{site.region}</p>
          </div>
          <nav className="flex flex-wrap gap-6" aria-label="Footer">
            <a href="#retreat" className="hover:text-ink">The Retreat</a>
            <a href="#gallery" className="hover:text-ink">Gallery</a>
            <a href="#faq" className="hover:text-ink">FAQ</a>
            <a href={airbnbLink()} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
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

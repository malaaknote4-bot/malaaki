import {
  ArrowRight,
  BadgeCheck,
  Coins,
  Eye,
  FileText,
  Gauge,
  Plug,
  ScanText,
  Search,
  ShieldCheck,
  Sheet,
  Tag,
  Undo2,
  Wallet,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import AgentDemo from "@/components/toolhop/AgentDemo";
import WaitlistForm from "@/components/toolhop/WaitlistForm";
import { GradientBackground } from "@/components/ui/ok";
import { toolhop } from "@/lib/toolhop";

const steps: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Search, title: "Look", text: "Your AI looks for a tool, like “read a PDF”." },
  { icon: Coins, title: "Pay", text: "It picks the best one and pays a small price." },
  { icon: Wrench, title: "Use", text: "It uses the tool and gets the answer right away." },
  { icon: Undo2, title: "Refund", text: "If the tool does not work, the money comes back." },
];

const firstTools: { icon: LucideIcon; name: string; text: string; price: string }[] = [
  { icon: FileText, name: "read-pdf", text: "Read any PDF and get clean text back.", price: "~$0.004" },
  { icon: Sheet, name: "pdf-tables", text: "Pull the tables out of a document.", price: "~$0.006" },
  { icon: ScanText, name: "page-to-text", text: "Turn a photo of a page into text.", price: "~$0.005" },
];

const audiences = [
  {
    eyebrow: "For people who own AI agents",
    title: "Add money once. Stay in control.",
    points: [
      { icon: Wallet, text: "Add money once and your AI pays as it goes." },
      { icon: Gauge, text: "Set a spending limit it can never go over." },
      { icon: Eye, text: "See everything your AI buys, call by call." },
    ],
  },
  {
    eyebrow: "For people who make tools",
    title: "Sell to every AI agent.",
    points: [
      { icon: Plug, text: "Put your tool in the shop. No billing or sign-ups to build." },
      { icon: Tag, text: "Pick your price, down to a fraction of a cent." },
      { icon: Coins, text: "Get paid every time an AI uses it." },
    ],
  },
];

// Sample calls for the ticker: what traffic will look like, not live data.
const sampleCalls = [
  ["read-pdf", "0.004"],
  ["pdf-tables", "0.006"],
  ["page-to-text", "0.005"],
  ["read-pdf", "0.004"],
  ["split-pdf", "0.002"],
  ["pdf-tables", "0.006"],
  ["form-fields", "0.003"],
  ["page-to-text", "0.005"],
];

export default function ToolhopHome() {
  return (
    <>
      <header className="sticky top-0 z-20 border-b border-line/70 bg-paper/80 backdrop-blur">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2 font-mono text-lg font-semibold tracking-tight">
            <span className="grid size-7 place-items-center rounded-md bg-accent font-bold text-on-accent">T</span>
            {toolhop.name.toLowerCase()}
          </a>
          <div className="flex items-center gap-1 text-sm sm:gap-6">
            <a href="#how" className="hidden text-muted transition hover:text-ink sm:inline">
              How it works
            </a>
            <a href="#makers" className="hidden text-muted transition hover:text-ink sm:inline">
              For tool makers
            </a>
            <a
              href="#waitlist"
              className="rounded-full bg-accent px-4 py-2 font-semibold text-on-accent transition hover:brightness-110"
            >
              Join the waitlist
            </a>
          </div>
        </nav>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="relative overflow-hidden">
          {/* The gradient sets its own position: relative, so a wrapper pins it behind the section. */}
          <div className="absolute inset-0">
            <GradientBackground />
          </div>
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:pb-28 lg:pt-24">
            <div className="space-y-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-3 py-1 font-mono text-xs text-muted">
                <span className="size-1.5 rounded-full bg-accent" />
                Early access · document tools first
              </span>
              <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                Every tool your agent needs.{" "}
                <span className="text-accent">One connection.</span>
              </h1>
              <p className="max-w-xl text-lg text-muted sm:text-xl">
                A shop for AI agents. Your AI finds the tool it needs, pays a few cents and uses it right away.
                No sign-ups. No API keys. No setup.
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                <a
                  href="#waitlist"
                  className="inline-flex h-14 items-center gap-2 rounded-full bg-accent px-8 text-lg font-semibold text-on-accent transition hover:brightness-110"
                >
                  Join the waitlist
                  <ArrowRight className="size-5" />
                </a>
                <a href="#makers" className="inline-flex items-center gap-1.5 font-medium text-ink/90 hover:text-accent">
                  I make tools
                  <ArrowRight className="size-4" />
                </a>
              </div>
            </div>
            <AgentDemo />
          </div>
        </section>

        {/* Ticker of sample calls */}
        <div className="border-y border-line bg-paper-2" aria-label="Sample calls">
          <div className="flex overflow-hidden py-3">
            <div className="animate-ticker flex shrink-0 gap-10 pe-10 font-mono text-sm text-muted">
              {[...sampleCalls, ...sampleCalls].map(([tool, price], i) => (
                <span key={i} aria-hidden={i >= sampleCalls.length} className="whitespace-nowrap">
                  agent paid <span className="text-accent">${price}</span> for <span className="text-ink">{tool}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Problem / fix */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-line bg-surface p-7">
              <p className="font-mono text-xs uppercase tracking-widest text-muted">Today</p>
              <p className="mt-4 text-xl leading-relaxed">
                When an AI needs a new tool, a person must sign up, pay and set it up.{" "}
                <span className="text-muted">That is slow, and the AI stops working while it waits.</span>
              </p>
            </div>
            <div className="rounded-2xl border border-peach bg-peach/25 p-7">
              <p className="font-mono text-xs uppercase tracking-widest text-accent">With {toolhop.name}</p>
              <p className="mt-4 text-xl leading-relaxed">
                Connect your AI to the shop one time.{" "}
                <span className="text-muted">After that, it finds a tool, pays a few cents and uses it right away.</span>
              </p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="border-t border-line bg-paper-2">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">How it works</h2>
            <p className="mt-3 max-w-xl text-lg text-muted">Four steps, all done by your AI, in about a second.</p>
            <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, i) => (
                <li key={s.title} className="rounded-2xl border border-line bg-surface p-6">
                  <div className="flex items-center justify-between">
                    <s.icon className="size-6 text-accent" strokeWidth={1.75} />
                    <span className="font-mono text-sm text-muted">0{i + 1}</span>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-muted">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Document tools first */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">We start with documents.</h2>
              <p className="mt-4 text-lg text-muted">
                At first, the shop sells document tools only. More types of tools come later.
              </p>
            </div>
            <ul className="grid gap-3">
              {firstTools.map((t) => (
                <li key={t.name} className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-white">
                    <t.icon className="size-5 text-accent" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-sm font-medium">{t.name}</p>
                    <p className="text-muted">{t.text}</p>
                  </div>
                  <span className="hidden shrink-0 font-mono text-sm text-accent sm:block">{t.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Audiences */}
        <section id="makers" className="border-t border-line bg-paper-2">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 py-20 sm:px-6 md:grid-cols-2 lg:py-28">
            {audiences.map((a) => (
              <div key={a.eyebrow} className="rounded-2xl border border-line bg-surface p-8">
                <p className="font-mono text-xs uppercase tracking-widest text-accent">{a.eyebrow}</p>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">{a.title}</h2>
                <ul className="mt-8 space-y-5">
                  {a.points.map((p) => (
                    <li key={p.text} className="flex gap-4">
                      <p.icon className="mt-0.5 size-5 shrink-0 text-accent" strokeWidth={1.75} />
                      <span className="text-ink/90">{p.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Safety */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Safe by design.</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <div>
              <ShieldCheck className="size-6 text-accent" strokeWidth={1.75} />
              <h3 className="mt-4 text-lg font-semibold">Hard spending limits</h3>
              <p className="mt-2 text-muted">Your AI can never spend more than your limit. We enforce it, not the AI.</p>
            </div>
            <div>
              <BadgeCheck className="size-6 text-accent" strokeWidth={1.75} />
              <h3 className="mt-4 text-lg font-semibold">Every tool is tested</h3>
              <p className="mt-2 text-muted">We test each tool before it goes in the shop, and keep checking after.</p>
            </div>
            <div>
              <Undo2 className="size-6 text-accent" strokeWidth={1.75} />
              <h3 className="mt-4 text-lg font-semibold">Money back on failures</h3>
              <p className="mt-2 text-muted">If a tool errors or times out, the charge is reversed automatically.</p>
            </div>
          </div>
        </section>

        {/* Waitlist */}
        <section id="waitlist" className="border-t border-line">
          <div className="relative overflow-hidden">
            <div className="absolute inset-0">
              <GradientBackground />
            </div>
            <div className="relative mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 lg:py-28">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">Get early access.</h2>
              <p className="mx-auto mt-4 max-w-lg text-lg text-muted">
                Join the waitlist to connect your AI first. Tool makers can sign up early to start selling.
              </p>
              <div className="mt-10">
                <WaitlistForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="font-mono">{toolhop.name.toLowerCase()}</p>
          <p>Tools your AI can buy on its own.</p>
        </div>
      </footer>
    </>
  );
}

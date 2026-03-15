"use client";

import Image from "next/image";
import Link from "next/link";
import { Header, Button } from "../../page";
import VertalisCapTableCard from "@/components/VertalisCapTableCard";
import VertalisWord from "@/components/VertalisWord";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  Check,
  CircleDot,
  LineChart,
  ShieldCheck,
  Split,
} from "lucide-react";

const tokens = {
  bg: "#0a0a0c",
  accent: "#c06020",
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-[1320px] px-6">{children}</div>;
}

function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "relative overflow-hidden rounded-[1.9rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] shadow-[0_24px_70px_-42px_rgba(0,0,0,0.82)]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[1.9rem] ring-1 ring-inset ring-white/6" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function StatPill({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-neutral-300">
      {children}
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  desc,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="max-w-[1100px]">
      {eyebrow ? (
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-neutral-300">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: tokens.accent }}
          />
          {eyebrow}
        </div>
      ) : null}

      <h2 className="mt-4 max-w-4xl text-3xl font-semibold leading-[1.05] tracking-[-0.03em] text-white md:text-[2.2rem]">
        {title}
      </h2>

      {desc ? (
        <p className="mt-4 max-w-4xl text-[1.02rem] leading-8 text-neutral-300">
          {desc}
        </p>
      ) : null}
    </div>
  );
}

const pillars = [
  {
    title: "Dilution",
    desc: "Understand how each round changes founder ownership across time, not just in the moment.",
    icon: <Split className="h-5 w-5" />,
  },
  {
    title: "Control",
    desc: "Protect decision-making leverage as capital enters the company and governance evolves.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    title: "Terms",
    desc: "Translate investor language into practical tradeoffs founders can actually evaluate.",
    icon: <CircleDot className="h-5 w-5" />,
  },
  {
    title: "Trajectory",
    desc: "Structure the round so it supports future hiring, future financing, and long-term optionality.",
    icon: <LineChart className="h-5 w-5" />,
  },
];

const troublePoints = [
  "Under-modeling dilution across multiple rounds and discovering too late how much founder ownership has shifted.",
  "Accepting control concessions early that quietly reshape authority as the company grows.",
  "Treating fundraising like a one-time event instead of a structural process that compounds over time.",
  "Using vague or overly founder-unfriendly term sheet language that becomes harder to unwind later.",
  "Building an option pool or financing structure that weakens flexibility for future hires and future rounds.",
];

export default function InvestorsPage() {
  return (
    <main
      className="min-h-screen overflow-x-hidden text-neutral-100"
      style={{ backgroundColor: tokens.bg }}
    >
      <Header />

      <section className="relative isolate overflow-hidden pt-2 md:pt-4">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-[#0a0a0c]" />

          <div
            className="absolute left-[-8%] top-[8%] h-[460px] w-[460px] rounded-full blur-3xl"
            style={{ background: "rgba(192,96,32,0.16)" }}
          />

          <div
            className="absolute right-[-5%] top-[18%] h-[420px] w-[420px] rounded-full blur-3xl"
            style={{ background: "rgba(72,90,120,0.10)" }}
          />

          <div className="absolute inset-0 flex items-center justify-center opacity-[0.055]">
            <img
              src="/logo-final.png"
              alt=""
              className="object-contain blur-[0.2px]"
              style={{ width: 700, height: 700 }}
            />
          </div>

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
              maskImage: "radial-gradient(circle at center, black 35%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(circle at center, black 35%, transparent 100%)",
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b0d]/10 via-transparent to-[#0b0b0d]/80" />
        </div>

        <Container>
        <div className="relative z-10 py-8 md:py-12">
          <Card className="px-6 py-8 md:px-10 md:py-10">
            <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
              <aside className="rounded-[1.7rem] border border-white/8 bg-[linear-gradient(160deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] p-6 shadow-[0_22px_60px_-38px_rgba(0,0,0,0.75)]">
              <div className="relative">
                <div
                  className="absolute -left-8 -top-10 h-24 w-24 rounded-full blur-2xl"
                  style={{ background: "rgba(192,96,32,0.18)" }}
                />
                <div className="relative z-10">
                  <Image
                    src="/logo.png"
                    alt="Vertalis shield"
                    width={56}
                    height={56}
                    className="h-auto w-[52px] opacity-90"
                  />

                  <div className="mt-4">
                    <VertalisWord
                      className="font-semibold tracking-tight"
                      style={{
                        fontSize: "34pt",
                        filter:
                          "drop-shadow(0 10px 26px rgba(192,96,32,0.18))",
                      }}
                    >
                      Vertalis
                    </VertalisWord>

                    <div className="mt-1 text-[0.76rem] uppercase tracking-[0.22em] text-neutral-500">
                      Legal Counsel
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                Navigate
              </div>

              <nav className="mt-4 flex flex-col gap-3 text-[1rem]">
                {[
                  ["Founders", "/about/founders"],
                  ["Governance", "/about/governance"],
                  ["Capital Strategy", "/about/investors"],
                  ["Employees", "/about/employees"],
                  ["Intellectual Property", "/about/ip"],
                ].map(([label, href], i) => (
                  <a
                    key={href}
                    href={href}
                    className={cx(
                      "inline-flex items-center justify-between rounded-xl px-3 py-2.5 transition-all duration-200",
                      i === 2
                        ? "bg-white/[0.06] text-white"
                        : "text-neutral-400 hover:bg-white/[0.04] hover:text-white"
                    )}
                  >
                    <span>{label}</span>
                    <ArrowRight className="h-4 w-4 opacity-70" />
                  </a>
                ))}
              </nav>

              <div className="mt-8">
                <Button href="#contact" className="w-full rounded-full">
                  Contact
                </Button>
              </div>
              </aside>

              <div className="min-w-0">
              <header className="max-w-4xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-neutral-300">
                  <Banknote className="h-4 w-4" style={{ color: tokens.accent }} />
                  Capital Strategy
                </div>

                <h1 className="mt-5 text-5xl font-semibold tracking-[-0.04em] text-white md:text-[4.35rem] md:leading-[0.98]">
                  Capital Strategy
                </h1>

                <p className="mt-5 max-w-3xl text-[1.28rem] leading-9 text-neutral-200">
                  Designing financing structures that fuel growth without quietly
                  eroding founder control.
                </p>

                <div className="mt-6 max-w-[58rem] space-y-5 text-[1.05rem] leading-8 text-neutral-300">
                  <p>
                    Raising capital is not just about securing investment. It is
                    about shaping the ownership and control of the company for
                    years to come.
                  </p>
                  <p>
                    Valuation, dilution, option pools, investor rights, and board
                    structure all compound across funding rounds. Small structural
                    decisions made early can dramatically reshape a company by the
                    time it reaches later stages of growth.
                  </p>
                  <p>
                    Vertalis helps founders approach capital strategically before
                    investor pressure enters the room, ensuring that each round
                    strengthens the company rather than quietly reshaping it
                    against the founders.
                  </p>
                </div>
              </header>
              </div>
            </div>
          </Card>

            <section className="py-8 md:py-10">
              <Card className="p-6 md:p-8">
                <SectionHeading
                  eyebrow="Understanding dilution"
                  title="Model funding rounds before investors do it for you."
                  desc="Every financing round reshapes the company. Ownership shifts, control dynamics evolve, and future fundraising flexibility changes. Founders often focus on valuation while overlooking how dilution compounds across multiple rounds."
                />

                <p className="mt-6 max-w-3xl text-[1rem] leading-8 text-neutral-300">
                  Use the model below to explore how valuation, investment size,
                  and option pools can reshape ownership over time.
                </p>

                <div className="mt-8 rounded-[1.6rem] border border-white/10 bg-black/20 p-3 md:p-4">
                  <div className="mb-4 px-2 pt-2">
                    <div className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                      Interactive dilution model
                    </div>
                    <p className="mt-2 max-w-3xl text-sm leading-7 text-neutral-400">
                      Every financing round reshapes the company. Understanding
                      the mechanics before negotiating terms is how founders
                      retain leverage.
                    </p>
                  </div>

                  <div className="w-full max-w-7xl">
                    <VertalisCapTableCard />
                  </div>
                </div>
              </Card>
            </section>

            <section className="py-8 md:py-10">
              <Card className="p-7 md:p-9">
                <SectionHeading
                  eyebrow="What disciplined fundraising looks like"
                  title="Capital should accelerate the company, not quietly rewrite it."
                  desc="Strong financing strategy connects clean ownership mechanics, predictable dilution, and control structures that remain stable as capital enters the business."
                />

                <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {pillars.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-[1.45rem] border border-white/10 bg-white/[0.03] p-5"
                    >
                      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-white">
                        <span style={{ color: tokens.accent }}>{item.icon}</span>
                      </div>

                      <div className="text-[1.02rem] font-semibold text-white">
                        {item.title}
                      </div>

                      <p className="mt-3 text-sm leading-7 text-neutral-300">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="mt-8 max-w-4xl text-[1rem] leading-8 text-neutral-300">
                  When founders understand these mechanics early, they negotiate
                  from clarity rather than reacting to investor terms under time
                  pressure.
                </p>
              </Card>
            </section>

            <section className="py-8 md:py-10">
              <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
                <Card className="p-7 md:p-8">
                  <SectionHeading
                    eyebrow="Where founders lose leverage"
                    title="Most financing mistakes compound quietly."
                    desc="Many founders approach fundraising as a single event rather than a structural process."
                  />

                  <div className="mt-8 space-y-4">
                    {troublePoints.map((point) => (
                      <div
                        key={point}
                        className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-neutral-300"
                      >
                        <Check
                          className="mt-0.5 h-5 w-5 shrink-0"
                          style={{ color: tokens.accent }}
                        />
                        <span className="text-sm leading-7">{point}</span>
                      </div>
                    ))}
                  </div>

                  <p className="mt-8 text-[1rem] leading-8 text-neutral-300">
                    These issues rarely create immediate friction. Instead, they
                    quietly reshape ownership and authority as the company grows,
                    leaving founders with fewer options when future financing
                    decisions arise.
                  </p>
                </Card>

                <Card className="p-7 md:p-8">
                  <SectionHeading
                    eyebrow="How Vertalis helps"
                    title="Funding strategy with structural clarity."
                    desc="Vertalis helps founders approach capital with more than a checklist mentality."
                  />

                  <div className="mt-8 space-y-4 text-[1rem] leading-8 text-neutral-300">
                    <p>
                      That means modeling dilution before negotiations begin,
                      translating investor terms into clear tradeoffs, and
                      structuring financing rounds that preserve long-term
                      flexibility.
                    </p>

                    <p>
                      It also means helping founders understand how each round
                      affects ownership, hiring incentives, governance, and future
                      capital options, before those decisions become difficult to
                      unwind.
                    </p>

                    <p>
                      The goal is not simply to close a round. It is to ensure
                      that each round strengthens the company’s trajectory while
                      protecting the founders’ ability to lead the business they
                      are building.
                    </p>
                  </div>

                  <div className="mt-8 rounded-[1.45rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] p-5">
                    <div className="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                      Vertalis capital lens
                    </div>
                    <p className="mt-3 text-sm leading-7 text-neutral-300">
                      Raise capital with a clear view of dilution, control,
                      investor leverage, and future financing flexibility, not
                      just a goal of getting the round done.
                    </p>
                  </div>
                </Card>
              </div>
            </section>

            <section id="contact" className="py-10 md:py-14">
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(152deg,#242129_0%,#21262f_48%,#171b23_100%)] shadow-[0_28px_82px_-46px_rgba(0,0,0,0.8)]">
                <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
                  <div className="border-b border-white/10 p-7 lg:border-b-0 lg:border-r lg:p-9">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-neutral-300">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: tokens.accent }}
                      />
                      Start the conversation
                    </div>

                    <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-white md:text-[2.65rem]">
                      If capital is entering the company, the structure should be ready for it.
                    </h2>

                    <p className="mt-5 max-w-xl text-[1.03rem] leading-8 text-neutral-300">
                      Vertalis is built for founders who need more than occasional
                      legal help. This is counsel for teams raising capital,
                      navigating dilution, and protecting long-term control.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <StatPill>Dilution modeling</StatPill>
                      <StatPill>Term mechanics</StatPill>
                      <StatPill>Control architecture</StatPill>
                      <StatPill>Governance</StatPill>
                      <StatPill>Capital readiness</StatPill>
                    </div>
                  </div>

                  <div className="p-7 lg:p-9">
                    <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-6">
                      <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white">
                        Contact Vertalis
                      </h3>

                      <p className="mt-4 max-w-xl text-[0.98rem] leading-8 text-neutral-300">
                        Tell me your current financing stage, what terms are on
                        the table, and where you need structural clarity before
                        the round moves forward.
                      </p>

                      <a
                        href="mailto:tim@vertalislegal.com?subject=Investors%20Consult%20Request"
                        className="mt-7 inline-flex items-center gap-2 rounded-[1rem] bg-[linear-gradient(180deg,rgba(210,132,78,1)_0%,rgba(191,96,23,1)_100%)] px-6 py-4 text-[1rem] font-medium text-white shadow-[0_12px_28px_-18px_rgba(191,96,23,0.55),inset_0_1px_0_rgba(255,255,255,0.26)] transition-all duration-200 hover:-translate-y-[2px]"
                      >
                        <span>Email Vertalis</span>
                        <ArrowRight className="h-4 w-4" />
                      </a>

                      <p className="mt-5 text-sm leading-7 text-neutral-400">
                        Best for founders who need strategic counsel on
                        financing structure, dilution, control, governance, and
                        investor-facing legal architecture.
                      </p>

                      <div className="mt-8">
                        <a
                          href="/about"
                          className="inline-flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-white"
                        >
                          <ArrowLeft className="h-4 w-4" />
                          Back to About
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
        </div>
        </Container>
      </section>
    </main>
  );
}
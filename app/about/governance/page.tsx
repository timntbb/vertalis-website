"use client";

import Image from "next/image";
import { Header, Button } from "../../page";
import VertalisWord from "@/components/VertalisWord";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleDot,
  ShieldCheck,
 Scale,
  Landmark,
  Network,
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

function StatPill({ children }: { children: React.ReactNode }) {
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
    title: "Authority",
    desc: "Define who can act, approve, and bind the company as the organization becomes more complex.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    title: "Board Structure",
    desc: "Create governance systems that support accountability without choking speed and execution.",
    icon: <Landmark className="h-5 w-5" />,
  },
  {
    title: "Decision Rights",
    desc: "Clarify what remains with founders, what moves to the board, and what investor consent may affect.",
    icon: <Scale className="h-5 w-5" />,
  },
  {
    title: "Operating Rhythm",
    desc: "Install governance that scales with the company rather than breaking under growth pressure.",
    icon: <Network className="h-5 w-5" />,
  },
];

const troublePoints = [
  "Founder authority becomes unclear as the company grows and more stakeholders enter the picture.",
  "Boards are formed without clear boundaries, creating confusion instead of accountability.",
  "Investor rights begin to influence core decisions before founders understand the long-term tradeoffs.",
  "Officer roles and decision channels remain informal long after the company needs operational clarity.",
  "Major actions require approvals that were never clearly defined in the first place.",
];

export default function GovernancePage() {
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
              maskImage:
                "radial-gradient(circle at center, black 35%, transparent 100%)",
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
                      ["Capital Strategy", "/about/investors"],
                      ["Governance", "/about/governance"],
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
                      <Landmark
                        className="h-4 w-4"
                        style={{ color: tokens.accent }}
                      />
                      Governance
                    </div>

                    <h1 className="mt-5 text-5xl font-semibold tracking-[-0.04em] text-white md:text-[4.35rem] md:leading-[0.98]">
                      Governance
                    </h1>

                    <p className="mt-5 max-w-3xl text-[1.28rem] leading-9 text-neutral-200">
                      Designing the decision architecture that allows a company
                      to scale with clarity.
                    </p>

                    <div className="mt-6 max-w-[58rem] space-y-5 text-[1.05rem] leading-8 text-neutral-300">
                      <p>
                        Governance is the structural system that determines how
                        authority moves through a company. It defines who makes
                        decisions, how accountability is assigned, and what
                        happens as the organization grows more complex.
                      </p>
                      <p>
                        Many startups delay governance until investors ask for
                        it. By then, authority is often unclear, responsibilities
                        are unevenly distributed, and decision-making has already
                        become reactive.
                      </p>
                      <p>
                        Vertalis helps founders install governance systems early,
                        creating operational clarity that supports speed,
                        discipline, and long-term control.
                      </p>
                    </div>
                  </header>
                </div>
              </div>
            </Card>

            <section className="py-8 md:py-10">
              <Card className="p-6 md:p-8">
                <SectionHeading
                  eyebrow="What this means"
                  title="Governance is not paperwork, it is decision structure."
                  desc="As companies grow, informal authority stops working. Governance creates the framework for board oversight, officer responsibility, founder authority, and major company approvals."
                />

                <p className="mt-6 max-w-3xl text-[1rem] leading-8 text-neutral-300">
                  Strong governance allows a company to move faster because the
                  structure for making decisions is already clear before pressure
                  enters the room.
                </p>
              </Card>
            </section>

            <section className="py-8 md:py-10">
              <Card className="p-7 md:p-9">
                <SectionHeading
                  eyebrow="How governance supports scale"
                  title="Clarity at the decision level prevents structural friction later."
                  desc="Well-designed governance keeps the company aligned as founders, executives, boards, and investors all begin to influence the business."
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
                  Good governance does not burden a startup with unnecessary
                  formality. It installs the right level of structure at the
                  right stage so leadership can operate with confidence.
                </p>
              </Card>
            </section>

            <section className="py-8 md:py-10">
              <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
                <Card className="p-7 md:p-8">
                  <SectionHeading
                    eyebrow="Where founders get into trouble"
                    title="Decision ambiguity compounds as the company grows."
                    desc="Most governance problems begin as small gaps in authority and become larger conflicts over time."
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
                    These problems often stay hidden until capital enters, the
                    team expands, or a major company decision forces everyone to
                    confront who actually has authority.
                  </p>
                </Card>

                <Card className="p-7 md:p-8">
                  <SectionHeading
                    eyebrow="How Vertalis helps"
                    title="Governance designed for founder-led growth."
                    desc="Vertalis approaches governance as architecture, not bureaucracy."
                  />

                  <div className="mt-8 space-y-4 text-[1rem] leading-8 text-neutral-300">
                    <p>
                      That means helping founders structure board roles, define
                      officer authority, map decision thresholds, and understand
                      where investor rights may begin to influence the company.
                    </p>

                    <p>
                      It also means building governance systems that can evolve
                      with the business rather than forcing a startup into
                      institutional formalities too early.
                    </p>

                    <p>
                      The goal is a company that knows how decisions are made,
                      who owns responsibility, and how leadership stays aligned
                      as growth creates more complexity.
                    </p>
                  </div>

                  <div className="mt-8 rounded-[1.45rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] p-5">
                    <div className="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                      Vertalis governance lens
                    </div>
                    <p className="mt-3 text-sm leading-7 text-neutral-300">
                      Install authority, accountability, and decision structure
                      before growth pressure exposes where the company is
                      operating on assumptions instead of architecture.
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
                      If the company is growing, the decision structure should
                      be ready for it.
                    </h2>

                    <p className="mt-5 max-w-xl text-[1.03rem] leading-8 text-neutral-300">
                      Vertalis helps founders build governance that supports
                      speed, clarity, and scale, without losing control to
                      ambiguity.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <StatPill>Board structure</StatPill>
                      <StatPill>Officer roles</StatPill>
                      <StatPill>Approval thresholds</StatPill>
                      <StatPill>Authority mapping</StatPill>
                      <StatPill>Founder control</StatPill>
                    </div>
                  </div>

                  <div className="p-7 lg:p-9">
                    <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-6">
                      <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white">
                        Contact Vertalis
                      </h3>

                      <p className="mt-4 max-w-xl text-[0.98rem] leading-8 text-neutral-300">
                        Tell me how authority is currently structured, where
                        decision-making is becoming unclear, and what needs to be
                        strengthened as the company grows.
                      </p>

                      <a
                        href="mailto:tim@vertalislegal.com?subject=Governance%20Consult%20Request"
                        className="mt-7 inline-flex items-center gap-2 rounded-[1rem] bg-[linear-gradient(180deg,rgba(210,132,78,1)_0%,rgba(191,96,23,1)_100%)] px-6 py-4 text-[1rem] font-medium text-white shadow-[0_12px_28px_-18px_rgba(191,96,23,0.55),inset_0_1px_0_rgba(255,255,255,0.26)] transition-all duration-200 hover:-translate-y-[2px]"
                      >
                        <span>Email Vertalis</span>
                        <ArrowRight className="h-4 w-4" />
                      </a>

                      <p className="mt-5 text-sm leading-7 text-neutral-400">
                        Best for founders who need governance structure, decision
                        clarity, board alignment, and founder-side legal
                        architecture.
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
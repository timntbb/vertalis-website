"use client";

import Image from "next/image";
import { Header, Button } from "../../page";
import VertalisWord from "@/components/VertalisWord";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Fingerprint,
  ShieldCheck,
  FileCode2,
  BadgeCheck,
  Lock,
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
    title: "Ownership",
    desc: "Make sure the assets the company depends on are actually owned by the company.",
    icon: <BadgeCheck className="h-5 w-5" />,
  },
  {
    title: "Protection",
    desc: "Secure the legal systems that preserve the value of technology, brand, and proprietary know-how.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    title: "Documentation",
    desc: "Use assignment, confidentiality, and licensing frameworks that hold up as the business grows.",
    icon: <FileCode2 className="h-5 w-5" />,
  },
  {
    title: "Defensibility",
    desc: "Reduce the risk that investors, acquirers, or counterparties discover gaps in the chain of ownership.",
    icon: <Lock className="h-5 w-5" />,
  },
];

const troublePoints = [
  "Founders build valuable technology before the company is properly set up to own it.",
  "Contractors, developers, or collaborators create core assets without clear assignment language.",
  "Brand strategy moves forward before trademark and ownership discipline are in place.",
  "Confidential information is shared without strong confidentiality or trade secret protections.",
  "The company assumes it owns its most important assets, but the documentation never fully proves it.",
];

export default function IPPage() {
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
            <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-[0.06]">
              <img
                src="/logo-final.png"
                alt=""
                className="h-[560px] w-[560px] object-contain blur-[0.2px]"
              />
            </div>

            <div className="relative z-10 grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
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
                          i === 4
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
                      <Fingerprint
                        className="h-4 w-4"
                        style={{ color: tokens.accent }}
                      />
                      Intellectual Property
                    </div>

                    <h1 className="mt-5 text-5xl font-semibold tracking-[-0.04em] text-white md:text-[4.35rem] md:leading-[0.98]">
                      Intellectual Property
                    </h1>

                    <p className="mt-5 max-w-3xl text-[1.28rem] leading-9 text-neutral-200">
                      Protecting the assets that make the company worth building.
                    </p>

                    <div className="mt-6 max-w-[58rem] space-y-5 text-[1.05rem] leading-8 text-neutral-300">
                      <p>
                        For many startups, the most valuable assets are not
                        physical. They are the code, brand, product design,
                        systems, know-how, and proprietary information that make
                        the company distinct.
                      </p>
                      <p>
                        The problem is that many companies move quickly without
                        fully securing ownership of the things they are creating.
                        That gap often remains invisible until diligence,
                        fundraising, or acquisition pressure reveals it.
                      </p>
                      <p>
                        Vertalis helps founders install the legal architecture
                        that ensures the company owns, protects, and preserves
                        the value of what it is building.
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
                  title="IP is not just a legal asset, it is company value."
                  desc="Ownership and protection of technology, brand assets, proprietary information, and creative work directly affect fundraising confidence, transaction readiness, and long-term defensibility."
                />

                <p className="mt-6 max-w-3xl text-[1rem] leading-8 text-neutral-300">
                  If the company creates something valuable, the company should
                  be able to prove that it owns it, controls it, and can protect
                  it.
                </p>
              </Card>
            </section>

            <section className="py-8 md:py-10">
              <Card className="p-7 md:p-9">
                <SectionHeading
                  eyebrow="What strong IP architecture looks like"
                  title="Ownership should be clear long before anyone asks for proof."
                  desc="Intellectual property structure should support growth, diligence, and strategic leverage, not become a surprise issue when the company is under pressure."
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
                  When the ownership chain is clean and the protections are
                  deliberate, the company is in a much stronger position to
                  raise capital, expand the brand, and defend what it has built.
                </p>
              </Card>
            </section>

            <section className="py-8 md:py-10">
              <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
                <Card className="p-7 md:p-8">
                  <SectionHeading
                    eyebrow="Where founders get into trouble"
                    title="The ownership gap usually appears late."
                    desc="Many IP problems are created early and discovered only when the company faces serious scrutiny."
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
                    These issues can slow financing, undermine diligence, weaken
                    leverage, and create serious uncertainty around the
                    company’s most valuable assets.
                  </p>
                </Card>

                <Card className="p-7 md:p-8">
                  <SectionHeading
                    eyebrow="How Vertalis helps"
                    title="Intellectual property architecture with founder-side clarity."
                    desc="Vertalis helps founders secure the ownership chain around what makes the company valuable."
                  />

                  <div className="mt-8 space-y-4 text-[1rem] leading-8 text-neutral-300">
                    <p>
                      That includes structuring invention assignment,
                      confidentiality protections, ownership documentation,
                      trademark strategy, and the legal systems needed to ensure
                      the company actually controls what it depends on.
                    </p>

                    <p>
                      It also means identifying where founders, employees,
                      contractors, and third parties may unintentionally create
                      ownership ambiguity if the structure is not handled
                      correctly from the start.
                    </p>

                    <p>
                      The result is a company that can move into financing,
                      partnerships, and growth conversations with stronger proof,
                      cleaner rights, and more defensible value.
                    </p>
                  </div>

                  <div className="mt-8 rounded-[1.45rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] p-5">
                    <div className="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                      Vertalis IP lens
                    </div>
                    <p className="mt-3 text-sm leading-7 text-neutral-300">
                      Protect the company by making ownership clear, preserving
                      proprietary value, and ensuring the assets that matter most
                      are legally aligned with the business that is scaling.
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
                      If the company is creating value, ownership of that value
                      should already be secure.
                    </h2>

                    <p className="mt-5 max-w-xl text-[1.03rem] leading-8 text-neutral-300">
                      Vertalis helps founders protect technology, brand assets,
                      confidential know-how, and the legal chain of ownership
                      that supports long-term enterprise value.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <StatPill>IP ownership</StatPill>
                      <StatPill>Assignment agreements</StatPill>
                      <StatPill>Trademark strategy</StatPill>
                      <StatPill>Confidentiality</StatPill>
                      <StatPill>Asset protection</StatPill>
                    </div>
                  </div>

                  <div className="p-7 lg:p-9">
                    <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-6">
                      <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white">
                        Contact Vertalis
                      </h3>

                      <p className="mt-4 max-w-xl text-[0.98rem] leading-8 text-neutral-300">
                        Tell me what your company is building, who has touched
                        the core assets, and where you need more certainty around
                        ownership and protection.
                      </p>

                      <a
                        href="mailto:tim@vertalislegal.com?subject=IP%20Consult%20Request"
                        className="mt-7 inline-flex items-center gap-2 rounded-[1rem] bg-[linear-gradient(180deg,rgba(210,132,78,1)_0%,rgba(191,96,23,1)_100%)] px-6 py-4 text-[1rem] font-bold text-white shadow-[0_12px_28px_-18px_rgba(191,96,23,0.55),inset_0_1px_0_rgba(255,255,255,0.26)] transition-all duration-200 hover:-translate-y-[2px]"
                      >
                        <span>Email Vertalis</span>
                        <ArrowRight className="h-4 w-4" />
                      </a>

                      <p className="mt-5 text-sm leading-7 text-neutral-400">
                        Best for founders who need ownership clarity, assignment
                        structure, brand protection, and stronger control over
                        the assets driving company value.
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
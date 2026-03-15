"use client";

import React from "react";
import Image from "next/image";
import { Header, Button } from "@/app/page";
import VertalisWord from "@/components/VertalisWord";
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  Building2,
  ShieldCheck,
  Layers3,
  Sparkles,
  Check,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

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

function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 14 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
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
    <div className="max-w-3xl">
      {eyebrow ? (
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-neutral-300">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: tokens.accent }}
          />
          {eyebrow}
        </div>
      ) : null}

      <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white md:text-[2.35rem]">
        {title}
      </h2>

      {desc ? (
        <p className="mt-4 max-w-2xl text-[1.02rem] leading-8 text-neutral-300">
          {desc}
        </p>
      ) : null}
    </div>
  );
}

const founderLens = [
  {
    title: "Ownership",
    desc: "Who owns the company, how ownership is split, and whether the equity structure supports the people actually building it.",
    icon: <Layers3 className="h-5 w-5" />,
  },
  {
    title: "Control",
    desc: "Who has authority, where decisions live, and whether the company can move quickly without internal ambiguity.",
    icon: <Compass className="h-5 w-5" />,
  },
  {
    title: "Protection",
    desc: "Whether the company is actually protected through contracts, IP ownership, and the legal framework behind the product.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    title: "Growth",
    desc: "Whether the current structure can support hiring, capital, customer growth, and the pressure that comes with traction.",
    icon: <Building2 className="h-5 w-5" />,
  },
];

const troublePoints = [
  "Equity gets split quickly, without enough thought behind contribution, vesting, or long-term control.",
  "Roles evolve informally, leaving founders with unclear authority and overlapping decision-making.",
  "Technology or product IP is assumed to belong to the company, but the actual chain of ownership is weak.",
  "Customer, contractor, or hiring documents are borrowed from templates that do not match how the company operates.",
  "The business gains traction before the legal structure is ready for real growth, diligence, or capital.",
];

const processSteps = [
  {
    title: "Assess the current structure",
    desc: "Vertalis starts by understanding what already exists, ownership, authority, employees, contracts, IP, and the legal reality behind the company as it stands today.",
  },
  {
    title: "Understand where the company is going",
    desc: "Once the current structure is clear, the conversation shifts to vision: hiring plans, capital goals, product expansion, risk, and what the founders are actually trying to build.",
  },
  {
    title: "Architect the structure for growth",
    desc: "Vertalis then designs the legal architecture that supports that path, ownership frameworks, governance, incentives, contracts, and structural protections that allow the company to grow smoothly.",
  },
];

export default function FoundersPage() {
  const reduce = useReducedMotion();

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

          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: 0.055 }}
            animate={
              reduce
                ? undefined
                : {
                    rotate: [0, 0.55, -0.55, 0],
                    y: [0, -4, 0, 4, 0],
                  }
            }
            transition={
              reduce
                ? undefined
                : {
                    duration: 24,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
          >
            <img
              src="/logo-final.png"
              alt=""
              className="object-contain blur-[0.2px]"
              style={{ width: 700, height: 700 }}
            />
          </motion.div>

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
                <FadeIn>
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
                        ["Investors", "/about/investors"],
                        ["Employees", "/about/employees"],
                        ["IP", "/about/ip"],
                      ].map(([label, href], i) => (
                        <a
                          key={href}
                          href={href}
                          className={cx(
                            "inline-flex items-center justify-between rounded-xl px-3 py-2.5 transition-all duration-200",
                            i === 0
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
                </FadeIn>

                <div className="min-w-0">
                  <FadeIn delay={0.04}>
                    <div className="max-w-4xl">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-neutral-300">
                        <Sparkles
                          className="h-4 w-4"
                          style={{ color: tokens.accent }}
                        />
                        Founders
                      </div>

                      <h1 className="mt-5 text-5xl font-semibold tracking-[-0.04em] text-white md:text-[4.35rem] md:leading-[0.98]">
                        Founders
                      </h1>

                      <p className="mt-5 max-w-3xl text-[1.28rem] leading-9 text-neutral-200">
                        Architecting the structure behind companies that are starting
                        to gain traction.
                      </p>

                      <div className="mt-6 max-w-[58rem] space-y-5 text-[1.05rem] leading-8 text-neutral-300">
                        <p>
                          When a product begins to work and customers start
                          appearing, the company enters a different phase.
                          Decisions about ownership, authority, hiring,
                          governance, and intellectual property suddenly begin to
                          matter.
                        </p>
                        <p>
                          What worked during the early building stage may not
                          support the company as it grows.
                        </p>
                        <p>
                          Vertalis works alongside founders during that
                          transition, helping turn early momentum into a company
                          that can scale smoothly.
                        </p>
                      </div>

                      <div className="mt-8 flex flex-wrap gap-3">
                        <StatPill>Traction changes the questions</StatPill>
                        <StatPill>Structure determines the ceiling</StatPill>
                        <StatPill>Growth needs clean architecture</StatPill>
                      </div>
                    </div>
                  </FadeIn>
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      <section className="py-8 md:py-10">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <FadeIn>
              <Card className="p-7 md:p-8">
                <SectionHeading
                  eyebrow="The traction moment"
                  title="The company starts working, and the structure starts mattering."
                  desc="Every builder eventually reaches the same realization. The product works. Customers are appearing. The company might actually become something real."
                />

                <div className="mt-8 space-y-4 text-[1.02rem] leading-8 text-neutral-300">
                  <p>At that point, the questions change.</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      "Who owns what?",
                      "Who controls decisions?",
                      "How should the team grow?",
                      "Is the intellectual property protected?",
                      "Would investors see a structurally sound company?",
                      "Will the current setup survive pressure?",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-neutral-200"
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  <p>
                    These are not just legal questions. They are structural
                    decisions that determine whether momentum turns into growth or
                    friction.
                  </p>
                </div>
              </Card>
            </FadeIn>

            <FadeIn delay={0.06}>
              <Card className="p-7 md:p-8">
                <SectionHeading
                  eyebrow="What founders gain"
                  title="Less structural friction. More room to build."
                  desc="When the company is designed intentionally, growth becomes easier to support."
                />

                <div className="mt-8 space-y-4">
                  {[
                    "Decisions become clearer because authority is defined.",
                    "Hiring becomes easier because incentives and roles are structured properly.",
                    "Intellectual property is protected so the product can actually be invested in.",
                    "Investors see a company built for growth rather than improvisation.",
                    "Founders get back to building instead of constantly resolving avoidable uncertainty.",
                  ].map((item) => (
                    <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-neutral-300">
                      <Check
                        className="mt-0.5 h-5 w-5 shrink-0"
                        style={{ color: tokens.accent }}
                      />
                      <span className="leading-7">{item}</span>
                    </div>
                  ))}
                </div>

                <p className="mt-8 text-[1rem] leading-8 text-neutral-200">
                  Vertalis handles the architecture so builders can keep building.
                </p>
              </Card>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="py-8 md:py-10">
        <Container>
          <FadeIn>
            <Card className="p-7 md:p-9">
              <SectionHeading
                eyebrow="Where founders run into trouble"
                title="Most companies do not break because the product fails first. They break because the structure never caught up."
                desc="Most founders correctly spend their early energy on building the product and finding customers. Structure often develops informally along the way."
              />

              <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {troublePoints.map((point) => (
                  <div
                    key={point}
                    className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] p-5 text-[0.98rem] leading-7 text-neutral-300"
                  >
                    {point}
                  </div>
                ))}
              </div>

              <p className="mt-8 max-w-4xl text-[1.02rem] leading-8 text-neutral-300">
                These decisions may not create problems at first. But when hiring
                accelerates, capital enters the picture, or pressure increases
                inside the company, the gaps in that structure begin to surface.
                What once felt like alignment can quickly turn into uncertainty
                about control, ownership, contracts, and execution.
              </p>
            </Card>
          </FadeIn>
        </Container>
      </section>

      <section className="py-8 md:py-10">
        <Container>
          <FadeIn>
            <Card className="p-7 md:p-9">
              <SectionHeading
                eyebrow="The Vertalis founder architecture lens"
                title="Vertalis does not start with documents. Vertalis starts with structure."
                desc="Founders do not need more generic legal output. They need an advisor who can understand how the company actually runs, identify what is working, spot what is weak, and architect the structure needed for growth."
              />

              <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {founderLens.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5"
                  >
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-white">
                      <span style={{ color: tokens.accent }}>{item.icon}</span>
                    </div>

                    <div className="text-[1.05rem] font-semibold text-white">
                      {item.title}
                    </div>

                    <p className="mt-3 text-sm leading-7 text-neutral-300">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </FadeIn>
        </Container>
      </section>

      <section className="py-8 md:py-10">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <FadeIn>
              <Card className="h-full p-7 md:p-8">
                <SectionHeading
                  eyebrow="What this looks like in practice"
                  title="Founders bring momentum. Vertalis helps translate that momentum into durable structure."
                  desc="If a company comes in with a working product, a few customers, and the possibility of real growth, Vertalis begins by asking what the structure looks like now."
                />

                <div className="mt-8 space-y-4 text-[1rem] leading-8 text-neutral-300">
                  <p>
                    Ownership. Employees. Intellectual property. Contracts.
                    Investment history. Regulatory exposure.
                  </p>
                  <p>
                    The first goal is to understand what has been done right,
                    what has been done wrong, and what risks are already built
                    into the company.
                  </p>
                  <p>
                    The second goal is strategic: where do the founders want to
                    be in the next two to five years, and what structure is
                    required to support that path?
                  </p>
                  <p>
                    That is where Vertalis is most valuable, not as a source of
                    generic paperwork, but as counsel helping founders architect
                    the company they are actually trying to build.
                  </p>
                </div>
              </Card>
            </FadeIn>

            <FadeIn delay={0.06}>
              <Card className="h-full p-7 md:p-8">
                <SectionHeading
                  eyebrow="The Vertalis process"
                  title="A practical architecture process for founders with real traction."
                  desc="Vertalis approaches founder structure the same way an architect approaches a building."
                />

                <div className="mt-8 space-y-5">
                  {processSteps.map((step, index) => (
                    <div
                      key={step.title}
                      className="rounded-[1.55rem] border border-white/10 bg-white/[0.03] p-5"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-sm font-semibold text-white"
                          style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.04) inset" }}
                        >
                          {index + 1}
                        </div>

                        <div>
                          <div className="text-[1.05rem] font-semibold text-white">
                            {step.title}
                          </div>
                          <p className="mt-2 text-sm leading-7 text-neutral-300">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-8 text-[1rem] leading-8 text-neutral-300">
                  The legal work implements the architecture, but the real value
                  is helping founders design a company that can grow, attract
                  capital, and operate smoothly under pressure.
                </p>
              </Card>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section id="contact" className="py-10 md:py-14">
        <Container>
          <FadeIn>
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
                    If the company is starting to work, the structure should too.
                  </h2>

                  <p className="mt-5 max-w-xl text-[1.03rem] leading-8 text-neutral-300">
                    Vertalis is built for founders who need more than occasional
                    legal help. This is counsel for builders who are gaining
                    traction, making real decisions, and need the structure to
                    support growth.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <StatPill>Ownership</StatPill>
                    <StatPill>Governance</StatPill>
                    <StatPill>Contracts</StatPill>
                    <StatPill>IP</StatPill>
                    <StatPill>Capital readiness</StatPill>
                  </div>
                </div>

                <div className="p-7 lg:p-9">
                  <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-6">
                    <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white">
                      Contact Vertalis
                    </h3>

                    <p className="mt-4 max-w-xl text-[0.98rem] leading-8 text-neutral-300">
                      Tell me what you are building, what has already been put in
                      place, and where the company is trying to go next.
                    </p>

                    <a
                      href="mailto:tim@vertalislegal.com?subject=Founders%20Consult%20Request"
                      className="mt-7 inline-flex items-center gap-2 rounded-[1rem] bg-[linear-gradient(180deg,rgba(210,132,78,1)_0%,rgba(191,96,23,1)_100%)] px-6 py-4 text-[1rem] font-medium text-white shadow-[0_12px_28px_-18px_rgba(191,96,23,0.55),inset_0_1px_0_rgba(255,255,255,0.26)] transition-all duration-200 hover:-translate-y-[2px]"
                    >
                      <span>Email Vertalis</span>
                      <ArrowRight className="h-4 w-4" />
                    </a>

                    <p className="mt-5 text-sm leading-7 text-neutral-400">
                      Best for founders who need practical, strategic counsel on
                      ownership, control, contracts, IP, governance, and the
                      legal structure behind growth.
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
          </FadeIn>
        </Container>
      </section>
    </main>
  );
}
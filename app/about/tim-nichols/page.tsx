import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "@/app/page";

export default function TimNicholsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0c] text-neutral-100">
      <Header />

      <section className="relative overflow-hidden py-14 md:py-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-8%] top-[8%] h-[420px] w-[420px] rounded-full blur-3xl bg-[rgba(192,96,32,0.14)]" />
          <div className="absolute right-[-6%] top-[24%] h-[360px] w-[360px] rounded-full blur-3xl bg-[rgba(72,90,120,0.12)]" />
        </div>

        <div className="relative mx-auto w-full max-w-5xl px-6">
          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(155deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-7 shadow-[0_28px_90px_-46px_rgba(0,0,0,0.82)] md:p-10">
            <p className="text-[0.78rem] uppercase tracking-[0.25em] text-neutral-400">
              The attorney behind Vertalis
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.035em] text-white md:text-5xl">
              Tim Nichols
            </h1>

            <p className="mt-3 text-lg leading-8 text-neutral-300">
              Founder-side legal counsel for companies building with urgency, ambition, and modern AI exposure.
            </p>

            <p className="mt-6 max-w-3xl text-[1.02rem] leading-8 text-neutral-300">
              Vertalis is built around a simple principle: legal should improve decision quality and execution speed, not introduce drag. Tim advises founders and leadership teams on the structural choices that shape long-term leverage—capital, governance, contracts, people, and ownership.
            </p>

            <div className="mt-9 grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                <h2 className="text-xl font-semibold tracking-[-0.02em] text-white">Approach</h2>
                <p className="mt-3 text-sm leading-7 text-neutral-300">
                  Strategic, direct, and business-minded. Advice is delivered in plain language with clear tradeoffs, practical sequencing, and execution-focused guidance calibrated to founder reality.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                <h2 className="text-xl font-semibold tracking-[-0.02em] text-white">Focus</h2>
                <p className="mt-3 text-sm leading-7 text-neutral-300">
                  Fundraising mechanics, governance architecture, AI-aware commercial contracting, and legal operating systems that support momentum while reducing avoidable risk.
                </p>
              </div>
            </div>

            <div className="mt-9">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-xl bg-[#c06020] px-6 py-3 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#b85b1b]"
              >
                Start the conversation
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";
import AboutNodeRail from "../components/AboutNodeRail";
import { Header } from "../../page";

export default function InvestorsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0c] text-white">
      <Header />
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <AboutNodeRail current="investors" />

          <div>
        <header className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Investors</h1>
          <p className="mt-3 text-xl text-neutral-200">
            Investor strategy built for disciplined fundraising, not reactive terms.
          </p>
          <p className="mt-4 leading-7 text-neutral-300">
            Raise outcomes are shaped before a term sheet appears. Financing
            structure, diligence readiness, dilution modeling, and risk framing are
            the difference between optionality and expensive concessions.
          </p>
        </header>

        <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-semibold">What this means</h2>
          <p className="mt-3 leading-7 text-neutral-300">
            Investor legal strategy connects clean financing mechanics with clear
            risk posture, so founders understand the tradeoffs embedded in each
            raise and each major term.
          </p>
        </section>

        <section className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-semibold">Where founders get into trouble</h2>
          <p className="mt-3 leading-7 text-neutral-300">
            Founders get boxed in when they under-model dilution, overlook control
            concessions, or accept ambiguous term sheet language that compounds
            across future rounds.
          </p>
        </section>

        <section className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-semibold">How Vertalis helps</h2>
          <p className="mt-3 leading-7 text-neutral-300">
            Vertalis helps founders prepare for investor scrutiny, pressure-test key
            term sheet issues in plain language, and protect control, dilution, and
            future financing flexibility across each round.
          </p>
        </section>

        <div className="mt-8 flex flex-wrap gap-5">
          <Link
            href="/#about"
            className="text-sm font-medium text-[#d59a73] transition-colors hover:text-[#e9b18a]"
          >
            ← Back to About
          </Link>
          <Link
            href="/#contact"
            className="text-sm font-medium text-[#d59a73] transition-colors hover:text-[#e9b18a]"
          >
            Contact Vertalis
          </Link>
        </div>
          </div>
        </div>
      </div>
    </main>
  );
}

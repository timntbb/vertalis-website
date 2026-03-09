import Link from "next/link";
import AboutNodeRail from "../components/AboutNodeRail";
import { Header } from "../../page";

export default function FoundersPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0c] text-white">
      <Header />
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <AboutNodeRail current="founders" />

          <div>
        <header className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Founders</h1>
          <p className="mt-3 text-xl text-neutral-200">
            Strategic founder alignment that protects speed, trust, and control.
          </p>
          <p className="mt-4 leading-7 text-neutral-300">
            The earliest founder decisions shape every later round, hire, and board
            conversation. Clear rules around equity splits, vesting, role scope,
            and decision rights create durable alignment under pressure.
          </p>
        </header>

        <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-semibold">What this means</h2>
          <p className="mt-3 leading-7 text-neutral-300">
            Founder alignment sets the baseline for ownership, accountability, and
            execution. Clean equity structures and decision-right rules reduce
            ambiguity when speed and pressure increase.
          </p>
        </section>

        <section className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-semibold">Where founders get into trouble</h2>
          <p className="mt-3 leading-7 text-neutral-300">
            Teams often defer hard conversations, then discover misaligned vesting,
            unclear role boundaries, and unresolved control assumptions when real
            capital or stress enters the business.
          </p>
        </section>

        <section className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-semibold">How Vertalis helps</h2>
          <p className="mt-3 leading-7 text-neutral-300">
            Vertalis turns founder assumptions into clear operating terms: practical
            equity and vesting structures, role and authority boundaries, and
            decision frameworks founders can actually use as the company scales.
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

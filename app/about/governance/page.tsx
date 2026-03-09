import Link from "next/link";
import AboutNodeRail from "../components/AboutNodeRail";
import { Header } from "../../page";

export default function GovernancePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0c] text-white">
      <Header />
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <AboutNodeRail current="governance" />

          <div>
        <header className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Governance</h1>
          <p className="mt-3 text-xl text-neutral-200">
            Governance that keeps control clear while the company moves faster.
          </p>
          <p className="mt-4 leading-7 text-neutral-300">
            Governance is the decision architecture behind execution. Clean
            authority lines, approval paths, and board mechanics let founders move
            quickly without creating avoidable control risk.
          </p>
        </header>

        <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-semibold">What this means</h2>
          <p className="mt-3 leading-7 text-neutral-300">
            Governance defines who has authority, what requires approval, and how
            major decisions flow through founders, managers, and board-level
            oversight.
          </p>
        </section>

        <section className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-semibold">Where founders get into trouble</h2>
          <p className="mt-3 leading-7 text-neutral-300">
            Trouble starts when authority is implied rather than documented: unclear
            approval thresholds, informal board practices, and inconsistent control
            boundaries create avoidable execution and liability risk.
          </p>
        </section>

        <section className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-semibold">How Vertalis helps</h2>
          <p className="mt-3 leading-7 text-neutral-300">
            Vertalis designs governance that works in real operations: clear
            authority matrices, practical approval thresholds, and board mechanics
            that reduce friction while preserving founder leverage.
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

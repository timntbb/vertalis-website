import Link from "next/link";
import AboutNodeRail from "../components/AboutNodeRail";
import { Header } from "../../page";

export default function IPPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0c] text-white">
      <Header />
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <AboutNodeRail current="ip" />

          <div>
        <header className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">IP</h1>
          <p className="mt-3 text-xl text-neutral-200">
            IP ownership clarity is strategic leverage, not just legal hygiene.
          </p>
          <p className="mt-4 leading-7 text-neutral-300">
            The value of the company depends on what it truly owns. Assignment
            discipline, brand protection, and commercial-rights structure determine
            whether your core assets hold up under diligence and scale.
          </p>
        </header>

        <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-semibold">What this means</h2>
          <p className="mt-3 leading-7 text-neutral-300">
            Intellectual property governance ensures the company owns what it
            builds and has enforceable rights across founders, employees,
            contractors, and commercial partnerships.
          </p>
        </section>

        <section className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-semibold">Where founders get into trouble</h2>
          <p className="mt-3 leading-7 text-neutral-300">
            Founders often inherit assignment gaps, inconsistent ownership language,
            and weak brand/rights controls that surface during diligence, deals,
            or enforcement moments.
          </p>
        </section>

        <section className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-semibold">How Vertalis helps</h2>
          <p className="mt-3 leading-7 text-neutral-300">
            Vertalis helps teams close ownership gaps, clean assignment chains, and
            implement practical IP and commercial-rights protections that support
            partnerships, fundraising, and long-term defensibility.
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

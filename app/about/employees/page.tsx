import Link from "next/link";
import AboutNodeRail from "../components/AboutNodeRail";
import { Header } from "../../page";

export default function EmployeesPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0c] text-white">
      <Header />
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <AboutNodeRail current="employees" />

          <div>
        <header className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Employees</h1>
          <p className="mt-3 text-xl text-neutral-200">
            People systems that protect culture, velocity, and legal integrity.
          </p>
          <p className="mt-4 leading-7 text-neutral-300">
            Team growth creates legal complexity fast. Hiring standards, incentive
            design, offer-letter discipline, and contractor classification choices
            all shape execution risk and long-term retention.
          </p>
        </header>

        <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-semibold">What this means</h2>
          <p className="mt-3 leading-7 text-neutral-300">
            Employment architecture aligns documentation, incentives, and
            classification standards so teams scale without creating avoidable
            legal exposure.
          </p>
        </section>

        <section className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-semibold">Where founders get into trouble</h2>
          <p className="mt-3 leading-7 text-neutral-300">
            Risk appears when offers and role terms drift over time, equity
            incentives are loosely documented, or contractors are treated like
            employees without compliant classification controls.
          </p>
        </section>

        <section className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-semibold">How Vertalis helps</h2>
          <p className="mt-3 leading-7 text-neutral-300">
            Vertalis helps leadership build practical hiring and compensation
            frameworks, tighten core employment documentation, and reduce
            misclassification exposure before it becomes operational or investor
            risk.
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

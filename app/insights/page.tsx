import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "../page";
import { insightPosts } from "./data";

export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0c] text-white">
      <Header />

      <section className="relative overflow-hidden border-b border-white/8 bg-[radial-gradient(circle_at_top_left,rgba(192,96,32,0.22),transparent_34%),linear-gradient(180deg,#0d0d10_0%,#09090b_100%)]">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-400">
              Insights
            </p>
            <h1 className="mt-4 max-w-5xl whitespace-nowrap text-4xl font-semibold tracking-[-0.04em] text-white md:text-6xl">
              Clarity for founders building under pressure.
            </h1>
            <p className="mt-6 max-w-3xl whitespace-nowrap text-base leading-8 text-neutral-300 md:text-lg">
              Practical insight on governance, structure, capital readiness, and
              the legal decisions that shape real companies.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c06020]">
              Framework
            </p>

            <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
              How Vertalis thinks about legal structure
            </h2>

            <p className="mt-4 text-sm leading-7 text-neutral-400 md:text-base">
              Guidance across governance, capital, risk, and the decisions that shape
              companies before pressure exposes the gaps.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {[
              "Governance",
              "Capital Readiness",
              "Contracts",
              "AI + Risk",
              "Founder Alignment",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-neutral-300 backdrop-blur-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c06020]">
              Latest Insights
            </p>
            <p className="mt-3 text-sm leading-7 text-neutral-400 md:text-base">
              Focused guidance on the decisions that matter before pressure
              exposes the gaps.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {insightPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/insights/${post.slug}`}
                className="group block rounded-[1.75rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.045),rgba(255,255,255,0.018))] p-6 shadow-[0_24px_70px_-42px_rgba(0,0,0,0.8)] transition-all duration-200 hover:-translate-y-1 hover:border-white/15"
              >
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#c06020]">
                  {post.category}
                </p>

                <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white">
                  {post.title}
                </h2>

                <p className="mt-4 text-sm leading-7 text-neutral-300">
                  {post.excerpt}
                </p>

                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold tracking-[0.08em] text-white transition-colors group-hover:text-[#e26a2c]">
                  Read insight
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
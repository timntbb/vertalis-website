import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "../page";

const placeholderPosts = [
  {
    slug: "founder-governance-basics",
    category: "Governance",
    title: "Founder Governance Basics",
    excerpt:
      "A placeholder post for early-stage teams thinking through authority, board structure, and clean operating decisions.",
  },
  {
    slug: "seed-round-readiness",
    category: "Capital",
    title: "Seed Round Readiness",
    excerpt:
      "A placeholder post covering the legal housekeeping founders should have in place before investor conversations accelerate.",
  },
  {
    slug: "ai-contract-risk-checklist",
    category: "AI Risk",
    title: "AI Contract Risk Checklist",
    excerpt:
      "A placeholder post on the contract terms and ownership issues companies should review when AI becomes part of the product stack.",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0c] text-white">
      <Header />

      <section className="relative overflow-hidden border-b border-white/8 bg-[radial-gradient(circle_at_top_left,rgba(192,96,32,0.22),transparent_34%),linear-gradient(180deg,#0d0d10_0%,#09090b_100%)]">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-400">
              Insights
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white md:text-6xl">
              Practical legal commentary for modern founders.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-neutral-300 md:text-lg">
              This is a placeholder insights page with three sample posts. It can
              be replaced later with your real article archive and individual
              blog entries.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {placeholderPosts.map((post) => (
              <article
                key={post.slug}
                className="group rounded-[1.75rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.045),rgba(255,255,255,0.018))] p-6 shadow-[0_24px_70px_-42px_rgba(0,0,0,0.8)] transition-transform duration-200 hover:-translate-y-1"
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
                <Link
                  href={`/insights/${post.slug}`}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold tracking-[0.08em] text-white transition-colors hover:text-[#e26a2c]"
                >
                  Read placeholder
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

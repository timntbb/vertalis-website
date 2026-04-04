import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import VertalisWord from "@/components/VertalisWord";
import { Header } from "../../page";
import { getInsightPost, insightPosts } from "../data";

type InsightPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return insightPosts.map((post) => ({ slug: post.slug }));
}

export default async function InsightPostPage({ params }: InsightPostPageProps) {
  const { slug } = await params;
  const post = getInsightPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0a0a0c] text-white">
      <Header />

      <section className="relative overflow-hidden border-b border-white/8 bg-[radial-gradient(circle_at_top_left,rgba(192,96,32,0.14),transparent_30%),linear-gradient(180deg,#0d0d10_0%,#09090b_100%)]">
        <div className="mx-auto w-full max-w-6xl px-6 pb-10 pt-16 md:pb-12 md:pt-20">
          <div className="max-w-5xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-400">
              Insights
            </p>

            <h1 className="mt-4 max-w-6xl text-5xl font-semibold leading-[0.92] tracking-[-0.05em] text-white md:text-7xl">
              The Operating Agreement:
              <br />
              The Backbone of Your Company
            </h1>

            <p className="mt-5 whitespace-nowrap text-xl leading-8 text-neutral-200 md:text-2xl md:leading-9">
              Structure isn’t optional. It’s what keeps companies from breaking under pressure.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="mx-auto w-full max-w-3xl px-6">
          <div className="space-y-6 text-[1.08rem] leading-9 text-neutral-300 md:text-[1.15rem]">
            <p>
              Starting a company is exciting. It’s momentum, vision, and a little bit of risk all rolled into one. Most founders are focused on building the product, finding customers, and creating traction, not thinking about deadlock provisions or indemnity clauses.
            </p>

            <p>
              That is exactly where problems begin.
            </p>

            <p className="text-xl font-semibold leading-8 text-white md:text-[1.7rem] md:leading-10">
              Legal structure isn’t a formality. It’s infrastructure.
            </p>

            <p>
              Most founder disputes do not come from bad people. They come from unclear agreements, and the most expensive operating agreement is often the one you did not have when things went wrong.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-12 md:pb-16">
        <div className="mx-auto w-full max-w-3xl px-6">
          <div className="space-y-8 text-base leading-8 text-neutral-300">
            {post.sections.slice(2).map((section, index) => (
              <section key={section.heading ?? index} className="space-y-4">
                {section.heading ? (
                  <h2 className="pt-1 text-[1.7rem] font-semibold tracking-[-0.03em] text-white md:text-[2rem]">
                    {section.heading}
                  </h2>
                ) : null}

                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}

                {section.emphasis ? (
                  <p className="py-1 text-[1.05rem] font-semibold leading-8 tracking-[-0.015em] text-white md:text-[1.15rem] md:leading-9">
                    {section.emphasis}
                  </p>
                ) : null}

                {section.bullets ? (
                  <ul className="space-y-3 pt-1 text-neutral-200">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c06020]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            <div className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(145deg,rgba(192,96,32,0.09),rgba(255,255,255,0.03))] px-6 py-6 shadow-[0_20px_55px_-40px_rgba(0,0,0,0.9)]">
              <VertalisWord className="text-lg font-semibold tracking-tight">
                Vertalis
              </VertalisWord>
              <p className="mt-4 text-xl font-semibold tracking-[-0.03em] text-white">
                If you’re building something real, don’t leave this to a template.
              </p>
              <p className="mt-3 text-base leading-7 text-neutral-300">
                Let’s structure it correctly from day one. {" "}
                <Link
                  href="/about/governance"
                  className="inline-flex items-center gap-1 font-semibold tracking-[0.06em] text-white transition-colors hover:text-[#e26a2c]"
                >
                  Governance
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

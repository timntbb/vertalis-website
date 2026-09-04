import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "../page";
import { insightPosts } from "./data";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://vertalislegal.com/insights",
  },
};

export default function InsightsPage() {
  const listedPosts = insightPosts.filter((post) => !post.hiddenFromListings);

  const sortedPosts = listedPosts
    .map((post, index) => ({ post, index }))
    .sort((a, b) => {
      const aTime = a.post.date ? Date.parse(a.post.date) : Number.NaN;
      const bTime = b.post.date ? Date.parse(b.post.date) : Number.NaN;

      if (Number.isNaN(aTime) && Number.isNaN(bTime)) {
        return b.index - a.index;
      }

      if (Number.isNaN(aTime) || Number.isNaN(bTime) || aTime === bTime) {
        return b.index - a.index;
      }

      return bTime - aTime;
    })
    .map(({ post }) => post);

  const newestPosts = sortedPosts.slice(0, 3);
  const archivePosts = sortedPosts.slice(3);

  return (
    <main className="min-h-screen bg-[#0a0a0c] text-white">
      <Header />

      <section className="relative overflow-hidden px-4 pb-8 pt-6 md:px-6 md:pb-10 md:pt-8">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-[linear-gradient(180deg,rgba(12,12,15,0.96)_0%,rgba(8,8,10,0.98)_100%)] shadow-[0_40px_120px_-60px_rgba(0,0,0,0.92)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(192,96,32,0.18),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(44,68,108,0.14),transparent_24%)]" />
            <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:56px_56px]" />

            <div className="relative px-6 py-14 md:px-10 md:py-16 lg:px-14 lg:py-20">
              <div className="w-full max-w-[1400px]">
                <p className="inline-flex rounded-full border border-[#c06020]/25 bg-[#c06020]/8 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-[#d87a3b]">
                  Vertalis insights
                </p>

                <h1 className="mt-6 max-w-[1400px] text-[clamp(1.88rem,3.42vw,3.08rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-white lg:whitespace-nowrap">
                  Legal insight for founders building real companies.
                </h1>

                <p className="mt-6 max-w-5xl text-base leading-8 text-neutral-300 md:text-lg">
                  Writing from the founder side on governance, capital, control,
                  risk, and the structural legal decisions that matter before the
                  pressure shows up.
                </p>
              </div>

              {newestPosts.length > 0 ? (
                <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {newestPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/insights/${post.slug}`}
                      className="group flex min-h-[320px] flex-col rounded-[1.65rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.045),rgba(255,255,255,0.018))] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:shadow-[0_24px_70px_-42px_rgba(0,0,0,0.8)]"
                    >
                      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[#c06020]">
                        {post.category}
                      </p>

                      <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.035em] text-white">
                        {post.title}
                      </h3>

                      <p className="mt-4 text-sm leading-7 text-neutral-300">
                        {post.excerpt}
                      </p>

                      <span className="mt-auto pt-8 inline-flex items-center gap-2 text-sm font-semibold tracking-[0.08em] text-white transition-colors group-hover:text-[#e58a4a]">
                        Read insight
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </Link>
                  ))}
                </div>
              ) : null}

              {archivePosts.length > 0 ? (
                <div className="mt-12">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#c06020]">
                    Archive
                  </p>

                  <div className="mt-6 -mx-2 overflow-x-auto pb-2">
                    <div className="flex min-w-max snap-x snap-mandatory gap-4 px-2">
                      {archivePosts.map((post) => (
                        <Link
                          key={post.slug}
                          href={`/insights/${post.slug}`}
                          className="group w-[320px] snap-start rounded-[1.5rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.045),rgba(255,255,255,0.018))] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/15"
                        >
                          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#c06020]">
                            {post.category}
                          </p>

                          <h3 className="mt-3 text-xl font-semibold leading-tight tracking-[-0.03em] text-white">
                            {post.title}
                          </h3>

                          <p className="mt-3 text-sm leading-7 text-neutral-300">
                            {post.excerpt}
                          </p>

                          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold tracking-[0.08em] text-white transition-colors group-hover:text-[#e58a4a]">
                            Read insight
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}

            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
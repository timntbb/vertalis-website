import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Home } from "lucide-react";
import VertalisWord from "@/components/VertalisWord";
import VertalisTextBox from "@/components/VertalisTextBox";
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

export async function generateMetadata({
  params,
}: InsightPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getInsightPost(slug);

  if (!post) {
    return {};
  }

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://vertalislegal.com").replace(
    /\/$/,
    "",
  );
  const canonical = `${siteUrl}/insights/${post.slug}`;
  const seoPost = post as typeof post & {
    seoTitle?: string;
    seoDescription?: string;
  };
  const title = seoPost.seoTitle ?? `${post.title} | Vertalis Insights`;
  const description = seoPost.seoDescription ?? post.excerpt;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: canonical,
      siteName: "Vertalis",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function InsightPostPage({ params }: InsightPostPageProps) {
  const { slug } = await params;
  const post = getInsightPost(slug);

  if (!post) {
    notFound();
  }

  const listedPosts = insightPosts.filter((item) => !item.hiddenFromListings);
  const hasDates = listedPosts.every((item) => Boolean(item.date));
  const recentPosts = hasDates
    ? [...listedPosts].sort((a, b) => Date.parse(b.date!) - Date.parse(a.date!))
    : listedPosts;
  const sidebarPosts = recentPosts.slice(0, 5);
  const hideHeroSummary =
    post.slug === "contract-chaos" ||
    post.slug === "intellectual-property-employees-ownership-problem";
  const heroSummary = hideHeroSummary ? "" : post.subtitle || post.excerpt;
  const seoPost = post as typeof post & {
    seoDescription?: string;
  };
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://vertalislegal.com").replace(
    /\/$/,
    "",
  );
  const articleUrl = `${siteUrl}/insights/${post.slug}`;
  const parsedPublished = post.date ? Date.parse(post.date) : Number.NaN;
  const publishedIso = Number.isNaN(parsedPublished)
    ? undefined
    : new Date(parsedPublished).toISOString();
  const parsedUpdated = post.updatedDate ? Date.parse(post.updatedDate) : Number.NaN;
  const updatedIso = Number.isNaN(parsedUpdated)
    ? publishedIso
    : new Date(parsedUpdated).toISOString();
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: articleUrl,
    headline: post.title,
    description: seoPost.seoDescription ?? post.excerpt,
    datePublished: publishedIso,
    dateModified: updatedIso,
    author: {
      "@type": "Organization",
      name: "Vertalis",
    },
    publisher: {
      "@type": "Organization",
      name: "Vertalis",
    },
  };

  return (
    <main className="min-h-screen bg-[#0a0a0c] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <Header />

      <section className="relative overflow-hidden border-b border-white/8 bg-[radial-gradient(circle_at_top_left,rgba(192,96,32,0.16),transparent_26%),linear-gradient(180deg,#0d0d10_0%,#09090b_100%)]">
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:64px_64px]" />

        <div className="relative mx-auto w-full max-w-7xl px-6 pb-12 pt-16 md:pb-14 md:pt-20">
          <div className="max-w-5xl">
            <p className="inline-flex rounded-full border border-[#c06020]/30 bg-[#c06020]/10 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[#d37a43]">
              {post.category}
            </p>

            <h1 className="mt-6 text-4xl font-semibold leading-[0.93] tracking-[-0.05em] text-white md:text-6xl lg:text-[4.1rem]">
              {post.title}
            </h1>

            {heroSummary ? (
              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-300 md:text-xl md:leading-9">
                {heroSummary}
              </p>
            ) : null}

            <p className="mt-5 text-sm text-neutral-400">
              {post.date ? post.date : "Insights"}
              {post.readTime ? ` • ${post.readTime}` : ""}
            </p>
          </div>
        </div>
      </section>

      {post.fullWidthTool ? (
        <section className="py-10 md:py-12">
          <div className="mx-auto w-full max-w-7xl px-6">
            {post.content}
          </div>
        </section>
      ) : (
        <section className="py-10 md:py-12">
          <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-[1.6rem] border border-white/10 bg-[linear-gradient(170deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5 shadow-[0_28px_80px_-55px_rgba(0,0,0,0.92)] backdrop-blur-md">
                <div className="rounded-[1.1rem] border border-white/10 bg-white/[0.02] px-4 py-3">
                  <VertalisWord className="text-[1.25rem] font-semibold tracking-tight">
                    Vertalis
                  </VertalisWord>
                  <p className="mt-1 text-[0.68rem] uppercase tracking-[0.22em] text-neutral-500">
                    Insight Navigation
                  </p>
                </div>

                <p className="mt-5 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-neutral-500">
                  Navigate
                </p>

                <div className="mt-3 space-y-2">
                  <Link
                    href="/"
                    className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.015] px-3 py-2.5 text-sm text-neutral-300 transition-colors hover:border-white/20 hover:text-white"
                  >
                    <Home className="h-4 w-4" />
                    Home
                  </Link>

                  {sidebarPosts.map((item) => {
                    const isCurrent = item.slug === post.slug;

                    return (
                      <Link
                        key={item.slug}
                        href={`/insights/${item.slug}`}
                        className={
                          isCurrent
                            ? "block rounded-xl border border-[#c06020]/35 bg-[#c06020]/10 px-3 py-2.5 text-sm leading-6 text-white"
                            : "block rounded-xl border border-white/10 bg-white/[0.015] px-3 py-2.5 text-sm leading-6 text-neutral-300 transition-colors hover:border-white/20 hover:text-white"
                        }
                      >
                        {item.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </aside>

            <div className="min-w-0">
              <div className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.04),rgba(255,255,255,0.018))] p-6 shadow-[0_30px_90px_-60px_rgba(0,0,0,0.92)] md:p-8">
                {post.content ? (
                  <div className="text-neutral-300 [&_article]:text-inherit [&_article_h1:first-child]:hidden [&_article_h2]:mt-12 [&_article_h2]:text-[1.7rem] [&_article_h2]:font-semibold [&_article_h2]:tracking-[-0.03em] [&_article_h2]:text-white [&_article_p]:mt-4 [&_article_ul]:mt-4 [&_article_ul]:ml-6 [&_article_ul]:list-disc [&_article_li]:mt-2 [&_article_li]:leading-8 [&_article_a]:font-medium [&_article_a]:text-neutral-200 [&_article_a]:underline [&_article_a]:decoration-[#d37a43]/45 [&_article_a]:underline-offset-4 [&_article_a]:transition-colors [&_article_a:hover]:text-[#d37a43]">
                    {post.content}
                  </div>
                ) : (
                  <article className="space-y-8 text-[1.04rem] leading-[1.9] text-neutral-300">
                    {post.sections.map((section, index) => (
                      <section key={section.heading ?? index} className="space-y-4">
                        {section.heading ? (
                          <h2 className="pt-1 text-[1.7rem] font-semibold tracking-[-0.03em] text-white md:text-[2rem]">
                            {section.heading}
                          </h2>
                        ) : null}

                        {section.paragraphs?.map((paragraph, paragraphIndex) => (
                          <p key={paragraphIndex}>{paragraph}</p>
                        ))}

                        {section.emphasis ? (
                          <p className="py-1 text-[1.05rem] font-semibold leading-8 tracking-[-0.015em] text-white md:text-[1.15rem] md:leading-9">
                            {section.emphasis}
                          </p>
                        ) : null}

                        {section.bullets ? (
                          <ul className="space-y-3 pt-1 text-neutral-200">
                            {section.bullets.map((bullet, bulletIndex) => (
                              <li key={bulletIndex} className="flex items-start gap-3">
                                <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c06020]" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </section>
                    ))}
                  </article>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      <section id="contact" className="py-10 md:py-14">
        <div className="mx-auto w-full max-w-7xl px-6">
          <VertalisTextBox />
        </div>
      </section>
    </main>
  );
}

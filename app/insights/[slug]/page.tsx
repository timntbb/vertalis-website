import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Home } from "lucide-react";
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

  const hasDates = insightPosts.every((item) => Boolean(item.date));
  const recentPosts = hasDates
    ? [...insightPosts].sort((a, b) => Date.parse(b.date!) - Date.parse(a.date!))
    : insightPosts;
  const sidebarPosts = recentPosts.slice(0, 5);
  const heroSummary = post.subtitle || post.excerpt;

  return (
    <main className="min-h-screen bg-[#0a0a0c] text-white">
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
                <div className="text-neutral-300 [&_article]:text-inherit [&_article_h1:first-child]:hidden [&_article_h2]:mt-12 [&_article_h2]:text-[1.7rem] [&_article_h2]:font-semibold [&_article_h2]:tracking-[-0.03em] [&_article_h2]:text-white [&_article_p]:mt-4 [&_article_ul]:mt-4 [&_article_ul]:ml-6 [&_article_ul]:list-disc [&_article_li]:mt-2 [&_article_li]:leading-8">
                  {post.content}
                </div>
              ) : (
                <article className="space-y-8 text-base leading-8 text-neutral-300">
                  {post.sections.map((section, index) => (
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
                </article>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="contact-intro">
            <div className="contact-eyebrow">
              <span className="contact-dot" />
              Direct line
            </div>

            <h2>Let’s talk</h2>
            <p>
              If the company is starting to move, this is where the structure behind it gets installed.
            </p>
          </div>

          <div className="contact-shell">
            <aside className="contact-rail bg-neutral-900/60 backdrop-blur-sm flex flex-col justify-start">
              <Image
                src="/logo.png"
                alt="Vertalis shield"
                width={48}
                height={48}
                className="contact-brand-mark"
              />

              <VertalisWord
                className="font-semibold leading-[0.95] tracking-[-0.035em] select-none"
                style={{
                  fontSize: "42pt",
                  filter: "drop-shadow(0 10px 26px rgba(192,96,32,0.18))",
                  marginLeft: "-10px",
                }}
              >
                Vertalis
              </VertalisWord>

              <div className="contact-brand-sub">LEGAL COUNSEL</div>

              <a
                href="https://www.linkedin.com/in/timntbb/"
                target="_blank"
                rel="noreferrer"
                className="contact-linkedin"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6S0 4.88 0 3.5 1.11 1 2.49 1s2.49 1.12 2.49 2.5ZM.5 8h4V24h-4V8Zm7 0h3.83v2.18h.05c.53-1.01 1.84-2.18 3.8-2.18 4.06 0 4.82 2.67 4.82 6.14V24h-4v-7.02c0-1.67-.03-3.82-2.33-3.82-2.33 0-2.69 1.82-2.69 3.7V24h-4V8Z" />
                </svg>
              </a>

              <div className="contact-links-title">Navigate</div>

              <div className="contact-links">
                <Link href="/">Home <ArrowRight size={16} /></Link>
                <Link href="/about/tim-nichols">About <ArrowRight size={16} /></Link>
                <Link href="/insights">Insights <ArrowRight size={16} /></Link>
                <a href="mailto:tim@vertalislegal.com">Contact <ArrowRight size={16} /></a>
              </div>
            </aside>

            <div className="contact-panel transition-all duration-300 hover:translate-y-[-3px] hover:shadow-xl">
              <div className="contact-panel-inner">
                <h3 className="tracking-[-0.02em]">Start the conversation</h3>

                <p className="contact-panel-copy">
                  Tell me what you&apos;re building, where the friction is, and what kind
                  of legal support you need. Vertalis is built for founders who want
                  practical guidance on contracts, governance, capital readiness,
                  and AI risk.
                </p>

                <div className="mt-6">
                  <a
                    href="mailto:tim@vertalislegal.com?subject=Vertalis%20Consult%20Request"
                    className="contact-cta"
                  >
                    <span>Email Vertalis</span>
                    <ArrowRight size={18} />
                  </a>
                </div>

                <p className="contact-panel-note">
                  Best for founders who need sharp legal guidance on contracts,
                  governance, capital readiness, and AI risk.
                </p>

                <div className="contact-chips">
                  <span>Contracts</span>
                  <span>Governance</span>
                  <span>AI + Capital Readiness</span>
                </div>
              </div>
            </div>
          </div>

          <footer className="contact-footer">
            <div className="contact-footer-row">
              <div>© {new Date().getFullYear()} Vertalis Legal Counsel, PLLC</div>
              <div className="contact-footer-links">
                <a href="/privacy">Privacy</a>
                <a href="/terms">Terms</a>
                <span>Built in DFW</span>
              </div>
            </div>

            <div className="contact-footer-note">
              This website provides general information, and does not create an
              attorney-client relationship.
            </div>
          </footer>
        </div>

      </section>
    </main>
  );
}

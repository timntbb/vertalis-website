import { sharedOpenGraph, sharedTwitter } from "@/lib/social-metadata";
import type { Metadata } from "next";
import PracticeArtwork from "@/components/PracticeArtwork";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { JsonLd, buildOrganizationSchema } from "@/components/StructuredData";
import { Header } from "../../page";
import { getPractice, practices } from "../data";
import { getInsightPost } from "../../insights/data";
import { organizationId, siteInfo } from "@/lib/site";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return practices.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const practice = getPractice(slug);
  if (!practice) return {};

  return {
    title: practice.seoTitle,
    description: practice.seoDescription,
    alternates: { canonical: `/services/${practice.slug}` },
    openGraph: {
      ...sharedOpenGraph,
      title: practice.seoTitle,
      description: practice.seoDescription,
      url: `https://vertalislegal.com/services/${practice.slug}`,
      siteName: "Vertalis",
      type: "website",
    },
    twitter: {
      ...sharedTwitter,
      card: "summary_large_image",
      title: practice.seoTitle,
      description: practice.seoDescription,
    },
  };
}

export default async function PracticePage({ params }: PageProps) {
  const { slug } = await params;
  const practice = getPractice(slug);
  if (!practice) notFound();

  const currentIndex = practices.findIndex((item) => item.slug === slug);
  const previous = practices[(currentIndex - 1 + practices.length) % practices.length];
  const next = practices[(currentIndex + 1) % practices.length];
  const relatedInsights = practice.relatedInsights
    .map((insightSlug) => getInsightPost(insightSlug))
    .filter((post): post is NonNullable<typeof post> => Boolean(post));
  const pageUrl = `https://vertalislegal.com/services/${practice.slug}`;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://vertalislegal.com/" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://vertalislegal.com/services" },
      { "@type": "ListItem", position: 3, name: practice.title, item: pageUrl },
    ],
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    url: pageUrl,
    name: practice.title,
    description: practice.seoDescription,
    provider: { "@id": organizationId },
    areaServed: siteInfo.areaServed,
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0a0a0c] text-neutral-100">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={buildOrganizationSchema()} />
      <JsonLd data={serviceSchema} />
      <Header />

      <section className="relative isolate overflow-hidden border-b border-white/[0.10] bg-[#08080a] py-12 md:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_81%_42%,rgba(182,94,46,0.16),transparent_50%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.065] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:44px_44px]" />
        <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-6 lg:grid-cols-[1.13fr_.87fr] lg:items-center lg:gap-16">
          <div>
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">
              <Link href="/" className="transition hover:text-[#d66f24]">Home</Link>
              <span aria-hidden="true">→</span>
              <Link href="/services" className="transition hover:text-[#d66f24]">Services</Link>
              <span aria-hidden="true">→</span>
              <span className="text-neutral-300">{practice.title}</span>
            </nav>
            <p className="mt-10 text-xs font-bold uppercase tracking-[0.26em] text-[#d77938]">Vertalis / How we help</p>
            <div aria-hidden="true" className="mt-5 h-1 w-16 rounded-full bg-[#B65E2E]" />
            <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.04] tracking-[-0.05em] text-white sm:text-5xl xl:text-[3.8rem]">
              {practice.h1}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-200 md:text-xl md:leading-9">{practice.intro}</p>
          </div>
          <div className="relative flex min-h-[340px] items-center justify-center overflow-hidden rounded-[2rem] border border-[#B65E2E]/25 bg-[radial-gradient(circle_at_50%_40%,rgba(182,94,46,0.18),transparent_60%),linear-gradient(155deg,#1b1514,#0c0c0e_72%)] shadow-[0_22px_70px_-36px_rgba(182,94,46,0.35)] md:min-h-[390px]">
            <div aria-hidden="true" className="pointer-events-none absolute h-[290px] w-[290px] rounded-full border border-[#B65E2E]/25 md:h-[330px] md:w-[330px]" />
            <div aria-hidden="true" className="pointer-events-none absolute h-[235px] w-[235px] rounded-full border border-[#B65E2E]/15 md:h-[270px] md:w-[270px]" />
            <div className="relative z-10"><PracticeArtwork slug={practice.slug} variant="hero" /></div>
            <div className="absolute bottom-6 left-7 right-7 flex items-end justify-between gap-3 border-t border-white/15 pt-4">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#db946b]">Vertalis Legal Counsel</span>
              <span className="text-xs font-medium text-neutral-300">{practice.title}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-[radial-gradient(ellipse_at_4%_22%,rgba(182,94,46,0.06),transparent_34%)] py-14 md:py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 lg:grid-cols-[.65fr_1.35fr] lg:gap-16">
          <aside className="border-l-2 border-[#B65E2E] pl-6 lg:sticky lg:top-32 lg:self-start">
            <p className="text-xs font-bold uppercase tracking-[0.23em] text-[#d77938]">Common matters</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.035em] text-white lg:text-4xl">{practice.seoH2}</h2>
            <p className="mt-5 max-w-sm text-base leading-8 text-neutral-300">Practical legal guidance built around the decisions, obligations, and relationships that keep your business moving.</p>
            <Link href="/consultation" className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#B65E2E]/45 bg-[#B65E2E]/10 px-5 py-3 text-base font-semibold text-white transition hover:border-[#B65E2E] hover:bg-[#B65E2E]/20">
              Schedule a Free Consultation <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>

          <div className="min-w-0">
            {practice.matters.map((matter) => (
              <article key={matter.title} className="group mb-3 grid gap-4 rounded-[1.4rem] border border-white/[0.10] bg-[linear-gradient(120deg,rgba(182,94,46,0.07),rgba(255,255,255,0.025)_48%,rgba(255,255,255,0.018))] px-6 py-6 transition-colors hover:border-[#B65E2E]/45 sm:grid-cols-[.93fr_1.07fr] sm:gap-8 sm:px-8 sm:py-8">
                <h3 className="flex gap-3 text-xl font-semibold leading-7 tracking-[-0.02em] text-white md:text-[1.35rem]">
                  <span className="mt-1 h-6 w-1 shrink-0 rounded-full bg-[#B65E2E]" aria-hidden="true" />
                  {matter.title}
                </h3>
                <p className="text-base leading-8 text-neutral-300">{matter.description}</p>
              </article>
            ))}

            <section className="mt-12 border-t border-white/[0.12] py-10" aria-labelledby="situations-heading">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d66f24]">When businesses call Vertalis</p>
              <h2 id="situations-heading" className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-white md:text-4xl">Legal counsel should meet the business problem.</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-3">
                {practice.situations.map((situation) => (
                  <li key={situation} className="rounded-2xl border border-white/[0.12] border-l-[3px] border-l-[#B65E2E] bg-[#161316] p-5 text-base leading-7 text-neutral-200">{situation}</li>
                ))}
              </ul>
            </section>

            <section className="relative mt-6 overflow-hidden rounded-[1.65rem] border border-[#B65E2E]/25 bg-[linear-gradient(135deg,rgba(182,94,46,0.14),rgba(255,255,255,0.025)_65%)] px-6 py-9 sm:px-9" aria-labelledby="approach-heading">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d66f24]">How Vertalis approaches it</p>
              <h2 id="approach-heading" className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-white md:text-4xl">Business-minded counsel for the next decision.</h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-neutral-300">{practice.approach}</p>
              <p className="mt-4 max-w-3xl text-base leading-8 text-neutral-300">Vertalis serves growing companies across North Texas, including Frisco, McKinney, Prosper, Plano, North Dallas, and the broader Dallas-Fort Worth area.</p>
            </section>

            <section className="mt-12 border-t border-white/[0.12] py-10" aria-labelledby="related-insights-heading">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d66f24]">Related Insights</p>
                  <h2 id="related-insights-heading" className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-white md:text-4xl">Keep exploring the issue.</h2>
                </div>
                <Link href="/insights" className="text-sm font-semibold text-neutral-300 transition hover:text-[#e26a2c]">View all Insights <ArrowRight className="ml-1 inline h-4 w-4" /></Link>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {relatedInsights.map((insight) => (
                  <Link key={insight.slug} href={`/insights/${insight.slug}`} className="group rounded-2xl border border-white/[0.12] bg-[#151316] p-6 transition hover:border-[#d66f24]/50 hover:bg-[#1b1516]">
                    <p className="text-lg font-semibold leading-7 text-white group-hover:text-[#f0a678]">{insight.title}</p>
                    <p className="mt-3 text-base leading-7 text-neutral-300">{insight.excerpt}</p>
                  </Link>
                ))}
              </div>
            </section>

            <section className="mt-6 rounded-[1.65rem] border border-[#B65E2E]/35 bg-[radial-gradient(circle_at_85%_10%,rgba(182,94,46,0.20),transparent_60%),#151112] px-6 py-12 text-center sm:px-10" aria-labelledby="consultation-heading">
              <h2 id="consultation-heading" className="text-3xl font-semibold tracking-[-0.035em] text-white md:text-4xl">Ready to discuss your business?</h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-neutral-300">Talk with Vertalis about the legal issue in front of your company and the next practical step.</p>
              <Link href="/consultation" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[linear-gradient(180deg,#d2844e_0%,#bf6017_100%)] px-6 py-3 text-sm font-semibold tracking-[0.08em] text-white transition hover:brightness-110">Schedule a Free Consultation <ArrowRight className="h-4 w-4" /></Link>
            </section>

            <nav className="mt-8 flex flex-col justify-between gap-4 border-t border-white/[0.07] pt-6 text-sm sm:flex-row" aria-label="Other practices">
              <Link href={`/services/${previous.slug}`} className="inline-flex items-center gap-2 text-neutral-400 transition hover:text-[#d66f24]">
                <ArrowLeft className="h-4 w-4" /> {previous.title}
              </Link>
              <Link href={`/services/${next.slug}`} className="inline-flex items-center gap-2 text-neutral-400 transition hover:text-[#d66f24]">
                {next.title} <ArrowRight className="h-4 w-4" />
              </Link>
            </nav>
          </div>
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { JsonLd, buildOrganizationSchema } from "@/components/StructuredData";
import { Header } from "../../page";
import { getPractice, practices } from "../data";
import { getInsightPost } from "../../insights/data";

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
      title: practice.seoTitle,
      description: practice.seoDescription,
      url: `https://vertalislegal.com/services/${practice.slug}`,
      siteName: "Vertalis",
      type: "website",
      images: ["https://vertalislegal.com/vertalis-shield-preview.png"],
    },
    twitter: {
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
    ...buildOrganizationSchema(),
    "@type": ["Organization", "LegalService"],
    url: pageUrl,
    name: `${practice.title} | ${"Vertalis Legal Counsel, PLLC"}`,
    description: practice.seoDescription,
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0a0a0c] text-neutral-100">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={serviceSchema} />
      <Header />

      <section className="relative overflow-hidden border-b border-white/[0.08] bg-[#07080a] py-10 md:py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_74%_40%,rgba(192,96,32,0.10),transparent_34%)]" />
        <div className="relative mx-auto grid w-full max-w-6xl gap-8 px-6 md:grid-cols-[1fr_.8fr] md:items-center md:gap-16">
          <div>
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">
              <Link href="/" className="transition hover:text-[#d66f24]">Home</Link>
              <span aria-hidden="true">→</span>
              <Link href="/services" className="transition hover:text-[#d66f24]">Services</Link>
              <span aria-hidden="true">→</span>
              <span className="text-neutral-300">{practice.title}</span>
            </nav>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-[#d66f24]">How we help</p>
            <h1 className="mt-3 text-4xl font-bold leading-[0.98] tracking-[-0.055em] text-white sm:text-6xl">
              {practice.h1}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-300">{practice.intro}</p>
          </div>
          <div className="flex min-h-64 items-center justify-center rounded-[1.75rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.035),rgba(255,255,255,0.012))] p-6">
            <Image src={practice.image} alt={practice.imageAlt} width={512} height={512} className="h-56 w-56 object-contain" priority />
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 md:grid-cols-[.55fr_1.45fr] md:gap-20">
          <div className="md:sticky md:top-32 md:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d66f24]">Common matters</p>
            <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.035em] text-white md:text-3xl">Practical counsel for the issues that move the business.</h2>
            <Link href="/#contact" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-[#e26a2c]">
              Discuss your situation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="border-t border-white/10">
            {practice.matters.map((matter) => (
              <article key={matter.title} className="grid gap-2 border-b border-white/10 py-6 sm:grid-cols-[1fr_1.2fr] sm:gap-8 sm:py-7">
                <h3 className="flex gap-3 text-lg font-semibold tracking-[-0.02em] text-white">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d66f24]" aria-hidden="true" />
                  {matter.title}
                </h3>
                <p className="text-sm leading-6 text-neutral-400">{matter.description}</p>
              </article>
            ))}

            <section className="border-t border-white/10 py-10" aria-labelledby="situations-heading">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d66f24]">When businesses call Vertalis</p>
              <h2 id="situations-heading" className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-white md:text-3xl">Legal counsel should meet the business problem.</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-3">
                {practice.situations.map((situation) => (
                  <li key={situation} className="rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-sm leading-6 text-neutral-300">{situation}</li>
                ))}
              </ul>
            </section>

            <section className="border-t border-white/10 py-10" aria-labelledby="approach-heading">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d66f24]">How Vertalis approaches it</p>
              <h2 id="approach-heading" className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-white md:text-3xl">Business-minded counsel for the next decision.</h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-neutral-300">{practice.approach}</p>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-neutral-400">Vertalis serves growing companies across North Texas, including Frisco, McKinney, Prosper, Plano, North Dallas, and the broader Dallas-Fort Worth area.</p>
            </section>

            <section className="border-t border-white/10 py-10" aria-labelledby="related-insights-heading">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d66f24]">Related Insights</p>
                  <h2 id="related-insights-heading" className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-white md:text-3xl">Keep exploring the issue.</h2>
                </div>
                <Link href="/insights" className="text-sm font-semibold text-neutral-300 transition hover:text-[#e26a2c]">View all Insights <ArrowRight className="ml-1 inline h-4 w-4" /></Link>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {relatedInsights.map((insight) => (
                  <Link key={insight.slug} href={`/insights/${insight.slug}`} className="rounded-2xl border border-white/10 bg-white/[0.025] p-4 transition hover:border-[#d66f24]/50 hover:bg-white/[0.05]">
                    <p className="text-sm font-semibold leading-6 text-white">{insight.title}</p>
                    <p className="mt-2 text-xs leading-5 text-neutral-400">{insight.excerpt}</p>
                  </Link>
                ))}
              </div>
            </section>

            <section className="border-t border-white/10 py-10 text-center" aria-labelledby="consultation-heading">
              <h2 id="consultation-heading" className="text-2xl font-semibold tracking-[-0.035em] text-white md:text-3xl">Ready to discuss your business?</h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-neutral-400">Talk with Vertalis about the legal issue in front of your company and the next practical step.</p>
              <Link href="/#contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[linear-gradient(180deg,#d2844e_0%,#bf6017_100%)] px-6 py-3 text-sm font-semibold tracking-[0.08em] text-white transition hover:brightness-110">Discuss Your Business <ArrowRight className="h-4 w-4" /></Link>
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

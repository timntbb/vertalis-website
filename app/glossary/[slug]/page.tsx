import Breadcrumbs from "@/components/Breadcrumbs";
import { sharedOpenGraph, sharedTwitter } from "@/lib/social-metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, Scale } from "lucide-react";
import PracticeArtwork from "@/components/PracticeArtwork";
import { Header } from "../../page";
import { getInsightPost } from "../../insights/data";
import { practices } from "../../services/data";
import { JsonLd, getArticleAuthor } from "@/components/StructuredData";
import { siteUrl } from "@/lib/site";
import { glossaryTerms, getGlossaryTerm, getRelatedTerms, glossaryDescription, getGlossaryServiceSlug } from "../data";
import GlossaryFooter from "../GlossaryFooter";
import TermSections from "../TermSections";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return glossaryTerms.map((term) => ({ slug: term.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const term = getGlossaryTerm((await params).slug);
  if (!term) return {};
  const title = `${term.name}: Definition | Vertalis Glossary`;
  const description = glossaryDescription(term);
  const url = `${siteUrl}/glossary/${term.slug}`;
  return { title, description, alternates: { canonical: url }, openGraph: { ...sharedOpenGraph, title, description, url, type: "website" }, twitter: { ...sharedTwitter, card: "summary_large_image", title, description } };
}
export default async function GlossaryTermPage({ params }: Props) {
  const term = getGlossaryTerm((await params).slug);
  if (!term) notFound();
  const insight = getInsightPost(term.insightSlug);
  const related = getRelatedTerms(term);
  const relatedService = practices.find((practice) => practice.slug === getGlossaryServiceSlug(term));
  const url = `${siteUrl}/glossary/${term.slug}`;
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0a0a0c] font-sans text-white">
      <Header />
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [
        { "@type": "DefinedTerm", "@id": `${url}#term`, name: term.name, alternateName: term.aliases, description: term.definition, url, inDefinedTermSet: { "@id": `${siteUrl}/glossary#terms` } },
        { "@type": "WebPage", "@id": url, url, name: term.name, description: glossaryDescription(term), mainEntity: { "@id": `${url}#term` }, author: getArticleAuthor(), breadcrumb: { "@id": `${url}#breadcrumb` } },
      ] }} />
      <main id="main-content" className="min-h-[calc(100vh-84px)] pb-20 pt-32 md:pb-24 md:pt-40">
        <div className="mx-auto max-w-6xl px-6">
        <Breadcrumbs items={[
          { name: "Home", url: `${siteUrl}/` },
          { name: "Glossary", url: `${siteUrl}/glossary` },
          { name: term.name, url },
        ]} />
        <Link href={`/glossary#${term.slug}`} className="inline-flex items-center gap-2 text-base font-semibold text-[#e38a4e] transition-colors hover:text-[#ffb37f]"><ArrowLeft className="h-4 w-4" aria-hidden="true" />Back to glossary</Link>
        </div>
        <article className="mt-8 md:mt-10">
          <header className="relative isolate overflow-hidden border-y border-[#B65E2E]/25 bg-[radial-gradient(ellipse_at_83%_30%,rgba(182,94,46,0.18),transparent_55%),linear-gradient(145deg,#151113,#0a0a0c_74%)]">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.13)_1px,transparent_1px)] [background-size:48px_48px]" />
            <div className="relative mx-auto grid max-w-6xl gap-9 px-6 py-12 md:grid-cols-[minmax(0,1fr)_250px] md:items-center md:py-16">
              <div>
                <p className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.23em] text-[#df8a56]"><BookOpen aria-hidden="true" className="h-4 w-4" />Vertalis Business Law Glossary</p>
                <div aria-hidden="true" className="mt-5 h-1 w-16 rounded-full bg-[#B65E2E]" />
                <p className="mt-7 text-sm font-semibold uppercase tracking-[0.2em] text-neutral-300">{term.category}</p>
                <h1 className="mt-3 max-w-4xl text-4xl font-bold leading-[1.08] tracking-[-0.045em] text-white sm:text-5xl lg:text-[4rem]">{term.name}</h1>
                {term.aliases.length > 0 && <p className="mt-5 text-base leading-7 text-neutral-300">Also called: {term.aliases.join(" · ")}.</p>}
                <p className="mt-6 text-sm text-neutral-400">By <Link href="/about/tim-nichols" className="font-semibold text-neutral-200 underline decoration-[#B65E2E]/50 underline-offset-4 hover:text-white">Tim Nichols</Link></p>
              </div>
              <div className="hidden min-h-56 flex-col items-center justify-center gap-5 rounded-[1.7rem] border border-[#B65E2E]/25 bg-[#150f10]/80 px-5 py-7 md:flex">
                {relatedService ? <PracticeArtwork slug={relatedService.slug} variant="hero" /> : <Scale aria-hidden="true" className="h-24 w-24 text-[#B65E2E]" />}
                <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-[#df8a56]">Modern Counsel for Growing Companies</p>
              </div>
            </div>
          </header>
          <div className="mx-auto grid max-w-6xl gap-8 px-6 pt-10 lg:grid-cols-[minmax(0,1fr)_270px] lg:gap-14 lg:pt-14">
            <div className="min-w-0">
              <section aria-label="Legal definition" className="rounded-[1.7rem] border border-white/[0.12] border-l-[4px] border-l-[#B65E2E] bg-[linear-gradient(130deg,rgba(182,94,46,0.11),rgba(255,255,255,0.02)_55%)] p-7 shadow-[0_16px_44px_-32px_rgba(0,0,0,0.8)] sm:p-10">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#df8a56]">In plain English</p>
                <p className="mt-5 text-xl leading-[1.7] text-neutral-100 sm:text-2xl sm:leading-[1.65]">{term.definition}</p>
                {term.context && <p className="mt-6 border-t border-white/10 pt-6 text-lg leading-8 text-neutral-300">{term.context}</p>}
              </section>
          <TermSections sections={term.sections} />
          <section aria-labelledby="related-terms-heading" className="mt-10 rounded-[1.5rem] border border-white/[0.12] bg-[#151316] p-6 sm:p-8 md:mt-12">
            <h2 id="related-terms-heading" className="text-xl font-semibold text-white">Related terms</h2>
            <ul className="mt-5 flex flex-wrap gap-3">
              {related.map((item) => <li key={item.slug}><Link href={`/glossary/${item.slug}`} className="inline-flex rounded-full border border-[#B65E2E]/35 bg-[#B65E2E]/[0.08] px-4 py-2 text-base font-medium text-[#f0a678] transition hover:border-[#B65E2E] hover:bg-[#B65E2E]/20">{item.name}</Link></li>)}
            </ul>
          </section>
          {relatedService && <section aria-labelledby="related-glossary-service-heading" className="mt-5 rounded-[1.5rem] border border-[#B65E2E]/25 bg-[linear-gradient(120deg,rgba(182,94,46,0.13),rgba(255,255,255,0.025))] p-6 sm:p-8">
            <h2 id="related-glossary-service-heading" className="text-xl font-semibold text-white">Related legal services</h2>
            <Link href={`/services/${relatedService.slug}`} className="mt-5 inline-flex items-center gap-3 text-lg font-semibold text-[#e38a4e] transition-colors hover:text-[#ffb37f]">
              {relatedService.title} <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </section>}
          {insight && <section aria-labelledby="related-insight-heading" className="mt-5 rounded-[1.5rem] border border-white/[0.12] bg-[#151316] p-6 sm:p-8">
            <h2 id="related-insight-heading" className="text-xl font-semibold text-white">Related insight</h2>
            <Link href={`/insights/${insight.slug}`} className="mt-5 block text-lg font-medium leading-8 text-neutral-200 transition-colors hover:text-white sm:text-xl">{insight.title}</Link>
            <Link href={`/insights/${insight.slug}`} className="mt-5 inline-flex items-center gap-3 text-base font-semibold text-[#e38a4e] hover:text-[#ffb37f]">Read the Insight <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
          </section>}
            </div>
            <aside className="self-start rounded-[1.5rem] border border-white/[0.10] bg-white/[0.025] p-6 lg:sticky lg:top-28">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#df8a56]">Vertalis Legal Counsel</p>
              <h2 className="mt-4 text-xl font-semibold leading-7 text-white">Legal concepts. Business decisions.</h2>
              <p className="mt-4 text-base leading-7 text-neutral-300">Understand the terminology, then explore how it can affect your company.</p>
              <Link href="/consultation" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#B65E2E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#cd723e]">Discuss your business <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              <Link href="/glossary" className="mt-6 block text-sm font-medium text-neutral-300 underline decoration-white/30 underline-offset-4 transition hover:text-white">Browse all glossary terms</Link>
            </aside>
          </div>
        </article>
      </main>
      <GlossaryFooter />
    </div>
  );
}

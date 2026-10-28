import Breadcrumbs from "@/components/Breadcrumbs";
import { sharedOpenGraph, sharedTwitter } from "@/lib/social-metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Header } from "../../page";
import { getInsightPost } from "../../insights/data";
import { JsonLd, getArticleAuthor } from "@/components/StructuredData";
import { siteUrl } from "@/lib/site";
import { glossaryTerms, getGlossaryTerm, getRelatedTerms, glossaryDescription } from "../data";
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
  const url = `${siteUrl}/glossary/${term.slug}`;
  return (
    <div className="min-h-screen bg-[#0a0a0c] font-sans text-white">
      <Header />
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [
        { "@type": "DefinedTerm", "@id": `${url}#term`, name: term.name, alternateName: term.aliases, description: term.definition, url, inDefinedTermSet: { "@id": `${siteUrl}/glossary#terms` } },
        { "@type": "WebPage", "@id": url, url, name: term.name, description: glossaryDescription(term), mainEntity: { "@id": `${url}#term` }, author: getArticleAuthor(), breadcrumb: { "@id": `${url}#breadcrumb` } },
      ] }} />
      <main id="main-content" className="mx-auto min-h-[calc(100vh-84px)] max-w-[860px] px-6 pb-20 pt-36 md:pb-24 md:pt-40">
        <Breadcrumbs items={[
          { name: "Home", url: `${siteUrl}/` },
          { name: "Glossary", url: `${siteUrl}/glossary` },
          { name: term.name, url },
        ]} />
        <Link href={`/glossary#${term.slug}`} className="inline-flex items-center gap-2 text-sm text-[#e38a4e] underline decoration-[#c06020]/50 underline-offset-4 transition-colors hover:text-[#ffb37f]"><ArrowLeft className="h-4 w-4" aria-hidden="true" />Back to glossary</Link>
        <article className="mt-10 md:mt-12">
          <header>
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-[#d77938]">{term.category}</p>
            <h1 className="mt-3 text-4xl font-semibold leading-[1.12] tracking-[-0.045em] sm:text-5xl lg:text-[3.45rem]">{term.name}</h1>
            {term.aliases.length > 0 && <p className="mt-4 text-sm leading-7 text-neutral-400 sm:text-base">Also called: {term.aliases.join(" · ")}.</p>}
          </header>
          <div className="mt-9 md:mt-11">
            <p className="text-lg leading-[1.85] text-neutral-200 sm:text-xl sm:leading-[1.85]">{term.definition}</p>
            {term.context && <p className="mt-4 text-base leading-8 text-neutral-400 sm:text-lg">{term.context}</p>}
            <p className="mt-6 text-xs text-neutral-500">By <Link href="/about/tim-nichols" className="underline decoration-white/15 underline-offset-4 hover:text-neutral-200">Tim Nichols</Link></p>
          </div>
          <TermSections sections={term.sections} />
          <section aria-labelledby="related-terms-heading" className="mt-10 border-t border-white/15 pt-7 md:mt-12">
            <h2 id="related-terms-heading" className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-neutral-500">Related terms</h2>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
              {related.map((item) => <li key={item.slug}><Link href={`/glossary/${item.slug}`} className="text-sm text-[#e38a4e] underline decoration-[#c06020]/40 underline-offset-4 hover:text-[#ffb37f]">{item.name}</Link></li>)}
            </ul>
          </section>
          {insight && <section aria-labelledby="related-insight-heading" className="mt-8 border-t border-white/15 pt-7 md:mt-10">
            <h2 id="related-insight-heading" className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-neutral-500">Related Insight</h2>
            <Link href={`/insights/${insight.slug}`} className="mt-4 block text-lg font-medium leading-7 text-neutral-200 transition-colors hover:text-white sm:text-xl">{insight.title}</Link>
            <Link href={`/insights/${insight.slug}`} className="mt-4 inline-flex items-center gap-3 text-sm text-[#e38a4e] underline decoration-[#c06020]/50 underline-offset-4 hover:text-[#ffb37f]">Read the Insight <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
          </section>}
        </article>
      </main>
      <GlossaryFooter />
    </div>
  );
}

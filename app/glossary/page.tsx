import type { Metadata } from "next";
import { Header } from "../page";
import { insightPosts } from "../insights/data";
import { JsonLd } from "@/components/StructuredData";
import { siteUrl } from "@/lib/site";
import { glossaryTerms } from "./data";
import GlossaryLibrary from "./GlossaryLibrary";
import GlossaryFooter from "./GlossaryFooter";

const title = "Business Law Glossary | Vertalis Legal Counsel";
const description = "Plain-language definitions of 84 business law terms covering Texas LLCs, contracts, ownership, intellectual property, financing, and business disputes.";
export const metadata: Metadata = {
  title, description, alternates: { canonical: "/glossary" },
  openGraph: { title, description, url: `${siteUrl}/glossary`, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};
export default function GlossaryPage() {
  const insights = Object.fromEntries(insightPosts.map((post) => [post.slug, post.title]));
  return (
    <div className="min-h-screen bg-[#0a0a0c] font-sans text-white">
      <Header />
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "DefinedTermSet", "@id": `${siteUrl}/glossary#terms`,
        name: "Vertalis Business Law Glossary", description, url: `${siteUrl}/glossary`,
        hasDefinedTerm: glossaryTerms.map((term) => ({
          "@type": "DefinedTerm", "@id": `${siteUrl}/glossary/${term.slug}#term`,
          name: term.name, url: `${siteUrl}/glossary/${term.slug}`, description: term.definition,
        })),
      }} />
      <main id="main-content" className="mx-auto max-w-6xl px-6 pb-20 pt-36 md:pt-44">
        <section className="mb-10 md:mb-12">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#d77938]">Vertalis Glossary</p>
          <div className="mt-4 flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div>
              <h1 className="text-5xl font-semibold leading-[1.06] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                Business law.<br /><span className="text-[#d77938]">In plain English.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-neutral-400 sm:text-lg">
                Clear definitions for the terms that shape your company, your contracts, and your next decision.
              </p>
            </div>
            <div className="shrink-0 border-l border-white/15 pl-5 md:mb-2 md:py-3">
              <p className="text-lg text-neutral-200">{glossaryTerms.length} essential terms</p>
              <p className="mt-1 text-sm text-neutral-500">Connected to Vertalis Insights</p>
            </div>
          </div>
        </section>
        <GlossaryLibrary terms={glossaryTerms} insights={insights} />
      </main>
      <GlossaryFooter />
    </div>
  );
}

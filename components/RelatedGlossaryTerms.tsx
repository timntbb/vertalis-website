import Link from "next/link";
import { getTermsForInsight } from "@/app/glossary/data";

export default function RelatedGlossaryTerms({ insightSlug }: { insightSlug: string }) {
  const terms = getTermsForInsight(insightSlug);
  if (!terms.length) return null;
  return (
    <section className="border-t border-white/[0.07] py-8" aria-labelledby="glossary-terms-heading">
      <div className="mx-auto max-w-7xl px-6">
        <h2 id="glossary-terms-heading" className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">Terms in this Insight</h2>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
          {terms.slice(0, Math.max(6, terms.filter((term) => term.insightSlug === insightSlug).length)).map((term) => (
            <li key={term.slug}><Link href={`/glossary/${term.slug}`} className="text-sm text-[#e38a4e] underline decoration-[#c06020]/40 underline-offset-4 transition-colors hover:text-[#ffb37f]">{term.name}</Link></li>
          ))}
        </ul>
        <Link href="/glossary" className="mt-5 inline-block text-xs text-neutral-400 transition-colors hover:text-white">Explore the business law glossary →</Link>
      </div>
    </section>
  );
}

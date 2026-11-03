import records from "./terms.json";

export type GlossarySection = { id: string; title: string; text: string };
export type GlossaryTerm = {
  name: string;
  slug: string;
  category: string;
  aliases: string[];
  definition: string;
  context?: string;
  sections: GlossarySection[];
  relatedSlugs: string[];
  insightSlug: string;
  additionalInsightSlugs: string[];
  searchTerms: string[];
};

export const glossaryTerms: GlossaryTerm[] = records;
export const glossaryCategories = [
  "Formation & Liability", "Ownership & Governance", "Contracts", "Commercial Leases",
  "Business Disputes", "Equity & Capital", "Intellectual Property", "People & Work",
  "Business Counsel", "Veteran Businesses",
];
const bySlug = new Map(glossaryTerms.map((term) => [term.slug, term]));
export function getGlossaryTerm(slug: string) { return bySlug.get(slug); }
export function getRelatedTerms(term: GlossaryTerm) {
  return term.relatedSlugs.flatMap((slug) => { const item = bySlug.get(slug); return item ? [item] : []; });
}
export function getTermsForInsight(insightSlug: string) {
  // Primary mappings first; secondary article relationships extend the network.
  return [
    ...glossaryTerms.filter((term) => term.insightSlug === insightSlug),
    ...glossaryTerms.filter((term) => term.insightSlug !== insightSlug && term.additionalInsightSlugs.includes(insightSlug)),
  ];
}
export function glossaryDescription(term: GlossaryTerm) {
  return term.definition.length <= 160 ? term.definition : `${term.definition.slice(0, 157).replace(/\s+\S*$/, "")}…`;
}

/**
 * Each glossary category maps to the closest published Vertalis service.
 * Keeping this centralized gives all definitions a consistent service path
 * without maintaining 84 separate links or changing their editorial copy.
 */
export const glossaryServiceByCategory: Record<string, string> = {
  "Formation & Liability": "company-ownership",
  "Ownership & Governance": "company-ownership",
  "Contracts": "contracts-transactions",
  "Commercial Leases": "contracts-transactions",
  "Business Disputes": "disputes-litigation",
  "Equity & Capital": "growth-capital",
  "Intellectual Property": "contracts-transactions",
  "People & Work": "people-operations",
  "Business Counsel": "company-ownership",
  "Veteran Businesses": "company-ownership",
};

export const glossaryServiceOverrides: Record<string, string> = {
  "fractional-general-counsel": "people-operations",
  "independent-contractor": "people-operations",
  "ip-assignment": "contracts-transactions",
};

export function getGlossaryServiceSlug(term: GlossaryTerm): string | undefined {
  return glossaryServiceOverrides[term.slug] ?? glossaryServiceByCategory[term.category];
}

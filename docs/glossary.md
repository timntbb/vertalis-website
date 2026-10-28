# Business law glossary

The glossary has one hub at `/glossary` and 84 statically generated term pages at `/glossary/[slug]`. The hub and individual pages use the same content in `app/glossary/terms.json`.

## Editing content

Each record contains a canonical `name` and `slug`, a category, a definition, optional context, true aliases, named sections for consolidated concepts, related-term slugs, and primary/secondary Insight slugs. Slugs are permanent URLs. Keep aliases for equivalent names; distinct concepts belong in `sections`, whose titles must also appear in `searchTerms`.

Individual pages retain a quiet single-column layout. Longer definitions can explain named subtopics under “Types and key distinctions.” A URL such as `/glossary/safe#post-money-safe` opens that section automatically. On the hub, search includes acronyms and consolidated subtopic titles. Related-term links expand the destination on the hub and remain normal crawlable URLs for modified clicks and search engines.

Every primary Insight links back to its terms through the shared `RelatedGlossaryTerms` component. Relevant existing article passages also include curated contextual glossary links; existing article-to-article links remain in place. Adding the Glossary navigation item exposes the hub throughout the existing site.

## Validation

Run `npm run check:glossary` to check the approved entry count, unique slugs/names, primary and secondary Insight references, related-term targets, searchable consolidated sections, contextual links, and coverage of all 31 Insights. `npm run build` runs that check and the existing article H1 guard, then type-checks and statically generates pages. Sitemap entries, canonical metadata, and DefinedTerm/DefinedTermSet structured data are generated from the same records. No publication or review dates are invented, and the schema makes no rich-result guarantee.

For this change, supplemental checks inspected every generated term page for its H1, canonical URL, description, JSON-LD, consolidated section anchors, working term/Insight references, reciprocal primary-article backlink, and sitemap inclusion. React interaction checks covered acronym and consolidated-term search, category and letter filters, no-results/reset behavior, related-term navigation from filtered results, and hub hash restoration. The managed visual preview could not launch because its Vite-style flags are incompatible with this repository's Next.js dev command; desktop/mobile browser appearance needs verification through a deployment preview.

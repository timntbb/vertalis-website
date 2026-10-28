// Integrity guard for the curated glossary and its internal-link graph.
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const terms = JSON.parse(readFileSync("app/glossary/terms.json", "utf8"));
assert.equal(terms.length, 84, "The approved glossary has 84 canonical entries.");
const slugs = new Set(terms.map((term) => term.slug));
assert.equal(slugs.size, terms.length, "Glossary slugs must be unique.");
assert.equal(new Set(terms.map((term) => term.name.toLowerCase())).size, terms.length, "Term names must be unique.");
const articleSources = ["app/insights/data.tsx", "app/insights/contractArticles.tsx"].map((file) => readFileSync(file, "utf8")).join("\n");
const articleSlugs = new Set([...articleSources.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]));
for (const term of terms) {
  assert.match(term.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, `${term.name}: invalid URL slug`);
  assert.ok(term.definition.trim().length > 80, `${term.name}: missing substantive definition`);
  assert.ok(articleSlugs.has(term.insightSlug), `${term.name}: missing primary Insight`);
  assert.ok(term.relatedSlugs.length >= 2, `${term.name}: needs related terms`);
  assert.equal(new Set(term.relatedSlugs).size, term.relatedSlugs.length, `${term.name}: duplicate related link`);
  assert.equal(new Set(term.sections.map((section) => section.id)).size, term.sections.length, `${term.name}: duplicate section IDs`);
  for (const slug of term.relatedSlugs) {
    assert.ok(slugs.has(slug), `${term.name}: broken related term ${slug}`);
    assert.notEqual(slug, term.slug, `${term.name}: related term links to itself`);
  }
  for (const slug of term.additionalInsightSlugs) assert.ok(articleSlugs.has(slug), `${term.name}: broken secondary Insight ${slug}`);
  for (const section of term.sections) {
    assert.ok(section.title && section.text, `${term.name}: empty consolidated section`);
    assert.ok(term.searchTerms.includes(section.title), `${term.name}: consolidated section is not searchable`);
  }
}
for (const slug of articleSlugs) {
  assert.ok(terms.some((term) => term.insightSlug === slug || term.additionalInsightSlugs.includes(slug)), `${slug}: no glossary connection`);
}
// Contextual links must resolve to canonical pages; preserve links already pointing to Insights.
const files = [...readdirSync("app/insights/content").filter((file) => file.endsWith(".tsx")).map((file) => path.join("app/insights/content", file)), "app/insights/data.tsx", "app/insights/contractArticles.tsx"];
let contextualLinks = 0;
for (const file of files) {
  for (const match of readFileSync(file, "utf8").matchAll(/(?:href=|:\s*)"\/glossary\/([a-z0-9-]+)"/g)) {
    assert.ok(slugs.has(match[1]), `${file}: broken glossary link ${match[1]}`);
    contextualLinks++;
  }
}
assert.ok(contextualLinks >= 30, "Expected curated contextual links across existing articles.");
console.log(`[check-glossary] OK: ${terms.length} entries, ${articleSlugs.size} connected Insights, ${contextualLinks} contextual links, and all subtopics searchable.`);

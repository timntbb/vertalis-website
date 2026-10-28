"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Search, Plus, Minus } from "lucide-react";
import { glossaryCategories, type GlossaryTerm } from "./data";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
function normalize(value: string) { return value.normalize("NFKD").toLowerCase().replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim(); }

export default function GlossaryLibrary({ terms, insights }: { terms: GlossaryTerm[]; insights: Record<string, string> }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [letter, setLetter] = useState("");
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const results = useRef<HTMLDivElement>(null);
  const termMap = useMemo(() => new Map(terms.map((term) => [term.slug, term])), [terms]);
  const indexed = useMemo(() => terms.map((term) => ({ term, search: normalize([term.name, term.category, ...term.searchTerms, term.definition, ...term.sections.map((section) => section.title)].join(" ")) })), [terms]);
  const needle = normalize(query);
  const visible = new Set(indexed.filter(({ term, search }) => (!needle || search.includes(needle)) && (!category || term.category === category) && (!letter || term.name[0].toUpperCase() === letter)).map(({ term }) => term.slug));
  const letters = new Set(terms.map((term) => term.name[0].toUpperCase()));
  const groups = alphabet.map((initial) => ({ initial, terms: terms.filter((term) => term.name[0].toUpperCase() === initial) })).filter((group) => group.terms.length);
  const hasFilters = Boolean(query || category || letter);
  function clear() { setQuery(""); setCategory(""); setLetter(""); }
  function reveal(slug: string, updateHash = true) {
    if (!termMap.has(slug)) return;
    clear(); setOpenSlug(slug);
    if (updateHash) window.history.replaceState(null, "", `#${slug}`);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const element = document.getElementById(`entry-${slug}`);
      element?.scrollIntoView({ block: "start", behavior: "instant" });
      element?.querySelector("summary")?.focus({ preventScroll: true });
    }));
  }
  useEffect(() => {
    const fromHash = () => {
      let slug: string;
      try { slug = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
      if (!termMap.has(slug)) return;
      setQuery(""); setCategory(""); setLetter(""); setOpenSlug(slug);
      requestAnimationFrame(() => document.getElementById(`entry-${slug}`)?.scrollIntoView({ block: "start" }));
    };
    fromHash(); window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [termMap]);
  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500" aria-hidden="true" />
          <label htmlFor="glossary-search" className="sr-only">Search glossary terms, acronyms, or topics</label>
          <input id="glossary-search" type="search" value={query} onChange={(event) => { setQuery(event.target.value); setLetter(""); }} placeholder="Search a term, acronym, or topic…" className="w-full rounded-md border border-white/20 bg-white/[0.015] py-3.5 pl-12 pr-4 text-base text-white outline-none placeholder:text-neutral-500 focus:border-[#d77938] focus:ring-1 focus:ring-[#d77938]" />
        </div>
        <label className="sr-only" htmlFor="glossary-category">Filter by topic</label>
        <select id="glossary-category" value={category} onChange={(event) => { setCategory(event.target.value); setLetter(""); }} className="rounded-md border border-white/20 bg-[#101013] px-4 py-3.5 text-sm text-neutral-300 outline-none focus:border-[#d77938] sm:w-64">
          <option value="">All topics</option>{glossaryCategories.map((item) => <option key={item}>{item}</option>)}
        </select>
      </div>
      <nav aria-label="Browse glossary alphabetically" className="mt-5 flex flex-wrap gap-1 border-b border-white/15 pb-5 sm:justify-between">
        {alphabet.map((initial) => <button type="button" key={initial} disabled={!letters.has(initial)} aria-pressed={letter === initial} onClick={() => { setLetter(letter === initial ? "" : initial); setQuery(""); setOpenSlug(null); }} className={`h-9 w-9 rounded-full text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d77938] disabled:cursor-default disabled:opacity-20 ${letter === initial ? "bg-[#c06020] text-white" : "text-neutral-400 hover:bg-white/5 hover:text-white"}`}>{initial}</button>)}
      </nav>
      <div className="mt-7 grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="hidden border-r border-white/10 pr-6 lg:block" aria-label="Glossary topics">
          <p className="mb-4 text-[0.65rem] uppercase tracking-[0.2em] text-neutral-500">Browse by topic</p>
          <div className="space-y-1">
            {["", ...glossaryCategories].map((item) => <button type="button" key={item} aria-pressed={category === item} onClick={() => { setCategory(item); setLetter(""); setOpenSlug(null); }} className={`block w-full border-l-2 px-3 py-2.5 text-left text-sm transition-colors ${category === item ? "border-[#d77938] bg-white/[0.025] text-[#e38a4e]" : "border-transparent text-neutral-400 hover:text-white"}`}>{item || "All terms"}</button>)}
          </div>
        </aside>
        <div ref={results} className="min-w-0">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-500">
            <p role="status" aria-live="polite">{visible.size} {hasFilters ? `of ${terms.length} ` : ""}terms{category ? ` · ${category}` : ""}</p>
            {hasFilters && <button type="button" onClick={clear} className="text-[#d77938] underline underline-offset-4 hover:text-[#efa36e]">Clear filters</button>}
          </div>
          {visible.size === 0 && <div className="py-14"><h2 className="text-xl text-white">No matching terms</h2><p className="mt-3 text-neutral-400">Try a different word or acronym, or clear the filters.</p><button type="button" onClick={clear} className="mt-5 text-[#e38a4e] underline underline-offset-4">Show all terms</button></div>}
          {groups.map((group) => <section key={group.initial} hidden={!group.terms.some((term) => visible.has(term.slug))} aria-labelledby={`letter-${group.initial}`} className="mb-8">
            <h2 id={`letter-${group.initial}`} className="mb-3 text-3xl font-medium text-neutral-200">{group.initial}</h2>
            <div className="space-y-2">
              {group.terms.map((term) => <details key={term.slug} id={`entry-${term.slug}`} hidden={!visible.has(term.slug)} open={openSlug === term.slug} onToggle={(event) => { if (event.currentTarget.open) setOpenSlug(term.slug); else setOpenSlug((current) => current === term.slug ? null : current); }} className="group scroll-mt-28 rounded-md border border-white/20 open:border-[#c06020]/80 open:bg-white/[0.012]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-base font-medium text-neutral-200 outline-none focus-visible:ring-2 focus-visible:ring-[#d77938] [&::-webkit-details-marker]:hidden">
                  {term.name}<Plus aria-hidden="true" className="h-4 w-4 shrink-0 text-neutral-500 group-open:hidden" /><Minus aria-hidden="true" className="hidden h-4 w-4 shrink-0 text-[#d77938] group-open:block" />
                </summary>
                <div className="px-5 pb-6">
                  <p className="text-[0.6rem] uppercase tracking-[0.18em] text-[#d77938]">{term.category}</p>
                  <p className="mt-3 text-sm leading-7 text-neutral-300 sm:text-base">{term.definition}</p>
                  {term.context && <p className="mt-3 text-sm leading-7 text-neutral-400">{term.context}</p>}
                  {needle && term.sections.some((section) => normalize(section.title).includes(needle)) && <p className="mt-3 text-xs leading-6 text-neutral-500">Includes: {term.sections.filter((section) => normalize(section.title).includes(needle)).map((section) => section.title).join(" · ")}. See the term page for these distinctions.</p>}
                  <div className="mt-5 border-t border-white/10 pt-4"><p className="text-[0.6rem] uppercase tracking-[0.18em] text-neutral-500">Related Insight</p><Link href={`/insights/${term.insightSlug}`} className="mt-2 inline-flex items-center gap-3 text-sm leading-6 text-neutral-200 hover:text-[#e38a4e]">{insights[term.insightSlug]}<ArrowRight className="h-4 w-4 shrink-0 text-[#d77938]" aria-hidden="true" /></Link></div>
                  <p className="mt-5 text-[0.6rem] uppercase tracking-[0.18em] text-neutral-500">Related terms</p>
                  <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">{term.relatedSlugs.map((slug) => { const related = termMap.get(slug); return related ? <a key={slug} href={`/glossary/${slug}`} onClick={(event) => { if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); reveal(slug); }} className="text-xs text-[#e38a4e] underline decoration-[#c06020]/40 underline-offset-4 hover:text-[#ffb37f]">{related.name}</a> : null; })}</div>
                  <Link href={`/glossary/${term.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm text-[#e38a4e] underline underline-offset-4 hover:text-[#ffb37f]">View term page <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /></Link>
                </div>
              </details>)}
            </div>
          </section>)}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, X } from "lucide-react";
import HeroNetworkCanvas from "@/components/HeroNetworkCanvas";
import {
  getDisplayCategoryLabel,
  insightCategories,
  type InsightCategorySlug,
  type DisplayInsightCategorySlug,
} from "./categories";

export type InsightListItem = {
  slug: string;
  sourceCategory: string;
  displayCategory: DisplayInsightCategorySlug;
  title: string;
  excerpt: string;
  date?: string;
  readTime?: string;
};

type InsightsLibraryProps = {
  posts: InsightListItem[];
};

const validCategorySlugs = new Set<string>(
  insightCategories.map((category) => category.slug),
);

function ArticleMeta({ post }: { post: InsightListItem }) {
  if (!post.date && !post.readTime) return null;

  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.82rem] text-neutral-500">
      {post.date ? <time>{post.date}</time> : null}
      {post.date && post.readTime ? (
        <span aria-hidden="true" className="h-1 w-1 rounded-full bg-neutral-600" />
      ) : null}
      {post.readTime ? <span>{post.readTime}</span> : null}
    </p>
  );
}

export default function InsightsLibrary({ posts }: InsightsLibraryProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<InsightCategorySlug>("all");
  const [urlStateReady, setUrlStateReady] = useState(false);

  useEffect(() => {
    const restoreUrlState = () => {
      const params = new URLSearchParams(window.location.search);
      const category = params.get("category") ?? "all";

      setQuery(params.get("q") ?? "");
      setSelectedCategory(
        validCategorySlugs.has(category)
          ? (category as InsightCategorySlug)
          : "all",
      );
      setUrlStateReady(true);
    };

    restoreUrlState();
    window.addEventListener("popstate", restoreUrlState);
    return () => window.removeEventListener("popstate", restoreUrlState);
  }, []);

  useEffect(() => {
    if (!urlStateReady) return;

    const url = new URL(window.location.href);
    const normalizedQuery = query.trim();

    if (selectedCategory === "all") {
      url.searchParams.delete("category");
    } else {
      url.searchParams.set("category", selectedCategory);
    }

    if (normalizedQuery) {
      url.searchParams.set("q", normalizedQuery);
    } else {
      url.searchParams.delete("q");
    }

    window.history.replaceState(
      window.history.state,
      "",
      `${url.pathname}${url.search}${url.hash}`,
    );
  }, [query, selectedCategory, urlStateReady]);

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();

    return posts.filter((post) => {
      const categoryMatches =
        selectedCategory === "all" ||
        post.displayCategory === selectedCategory;

      if (!categoryMatches) return false;
      if (!normalizedQuery) return true;

      const searchableText = [
        post.title,
        post.excerpt,
        getDisplayCategoryLabel(post.displayCategory),
        post.sourceCategory,
        post.date,
        post.readTime,
        post.slug.replaceAll("-", " "),
      ]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [posts, query, selectedCategory]);

  const featuredPost = filteredPosts[0];
  const latestPosts = filteredPosts.slice(1);
  const filtersAreActive = Boolean(query.trim()) || selectedCategory !== "all";

  const clearFilters = () => {
    setQuery("");
    setSelectedCategory("all");
  };

  return (
    <>
      <section
        aria-labelledby="insights-heading"
        className="relative isolate overflow-hidden border-b border-white/10 bg-[#08090b]"
      >
        <HeroNetworkCanvas className="pointer-events-none absolute inset-0 h-full w-full opacity-35 [mask-image:linear-gradient(to_right,transparent,black_24%,black_82%,transparent)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(192,96,32,0.14),transparent_30%),linear-gradient(90deg,rgba(8,9,11,0.3),rgba(8,9,11,0.82)_58%,rgba(8,9,11,0.48))]" />

        <div className="relative mx-auto w-full max-w-6xl px-6 py-12 md:py-16 lg:py-[4.5rem]">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#d77938]">
            Vertalis Insights
          </p>
          <h1
            id="insights-heading"
            className="mt-5 max-w-4xl text-[clamp(2.5rem,6vw,4.9rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-white"
          >
            Practical legal insight for growing companies.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-neutral-300 md:text-lg">
            Clear guidance on contracts, ownership, employees, risk, and the
            decisions that shape a business as it grows.
          </p>

          <div className="relative mt-8 max-w-3xl">
            <label htmlFor="insights-search" className="sr-only">
              Search Vertalis insights
            </label>
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500"
            />
            <input
              id="insights-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search insights, questions, or legal topics…"
              autoComplete="off"
              className="h-14 w-full rounded-sm border border-white/15 bg-[#101114]/95 py-3 pl-14 pr-14 text-base text-white outline-none transition-colors placeholder:text-neutral-500 hover:border-white/25 focus:border-[#d77938] focus:ring-2 focus:ring-[#c06020]/30 md:h-16"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-sm text-neutral-400 transition-colors hover:bg-white/5 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d77938]"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            ) : null}
          </div>
        </div>
      </section>

      <section aria-label="Filter insights" className="border-b border-white/10 bg-[#0c0c0f]">
        <div className="mx-auto w-full max-w-6xl px-6 py-5">
          <div
            className="hidden flex-wrap gap-2 md:flex"
            role="group"
            aria-label="Filter by legal topic"
          >
            {insightCategories.map((category) => {
              const active = selectedCategory === category.slug;

              return (
                <button
                  key={category.slug}
                  type="button"
                  onClick={() => setSelectedCategory(category.slug)}
                  aria-pressed={active}
                  className={
                    active
                      ? "min-h-11 rounded-full border border-[#d77938] bg-[#c06020]/14 px-4 py-2 text-sm font-medium text-[#f0a36d] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#d77938] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c0c0f]"
                      : "min-h-11 rounded-full border border-white/15 bg-transparent px-4 py-2 text-sm font-medium text-neutral-300 outline-none transition-colors hover:border-white/30 hover:bg-white/[0.035] hover:text-white focus-visible:ring-2 focus-visible:ring-[#d77938] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c0c0f]"
                  }
                >
                  {category.label}
                </button>
              );
            })}
          </div>

          <div className="md:hidden">
            <label
              htmlFor="insights-category"
              className="mb-2 block text-sm font-medium text-neutral-300"
            >
              Filter by topic
            </label>
            <select
              id="insights-category"
              value={selectedCategory}
              onChange={(event) =>
                setSelectedCategory(event.target.value as InsightCategorySlug)
              }
              className="h-12 w-full rounded-sm border border-white/15 bg-[#111216] px-4 text-base text-white outline-none focus:border-[#d77938] focus:ring-2 focus:ring-[#c06020]/30"
            >
              {insightCategories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <div id="insight-results" className="mx-auto w-full max-w-6xl px-6 py-12 md:py-16">
        {featuredPost ? (
          <section aria-labelledby="featured-insight-heading">
            <div className="mb-5 flex items-end justify-between gap-6">
              <h2
                id="featured-insight-heading"
                className="text-sm font-semibold uppercase tracking-[0.22em] text-neutral-400"
              >
                Featured Insight
              </h2>
              {filtersAreActive ? (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="min-h-11 text-sm font-medium text-neutral-400 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d77938]"
                >
                  Clear filters
                </button>
              ) : null}
            </div>

            <Link
              href={`/insights/${featuredPost.slug}`}
              className="group grid min-w-0 overflow-hidden rounded-sm border border-white/12 bg-[#101114] outline-none transition-[border-color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:border-white/25 hover:bg-[#121318] focus-visible:ring-2 focus-visible:ring-[#d77938] motion-reduce:transform-none motion-reduce:transition-none lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]"
            >
              <div className="relative min-h-56 overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_25%_30%,rgba(192,96,32,0.18),transparent_30%),linear-gradient(145deg,#15161a,#090a0c)] lg:min-h-[350px] lg:border-b-0 lg:border-r">
                <HeroNetworkCanvas className="absolute inset-0 h-full w-full opacity-70" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,transparent_30%,rgba(8,9,11,0.74))]" />
                <div className="pointer-events-none absolute bottom-6 left-6 h-px w-24 bg-[#c06020]" />
                <div className="pointer-events-none absolute bottom-6 left-6 h-24 w-px bg-[#c06020]" />
              </div>

              <div className="flex min-w-0 flex-col p-6 md:p-9 lg:p-11">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d77938]">
                  {getDisplayCategoryLabel(featuredPost.displayCategory)}
                </p>
                <h3 className="mt-4 max-w-2xl text-[clamp(1.8rem,3.3vw,3rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-white">
                  {featuredPost.title}
                </h3>
                <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-300">
                  {featuredPost.excerpt}
                </p>
                <div className="mt-7">
                  <ArticleMeta post={featuredPost} />
                </div>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors group-hover:text-[#ee9557]">
                  Read insight
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
                  />
                </span>
              </div>
            </Link>
          </section>
        ) : null}

        <section
          aria-labelledby="latest-insights-heading"
          className={featuredPost ? "mt-14 md:mt-20" : ""}
        >
          <div className="flex items-end justify-between gap-6 border-b border-white/12 pb-5">
            <h2
              id="latest-insights-heading"
              className="text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl"
            >
              Latest Insights
            </h2>
            <p
              aria-live="polite"
              aria-atomic="true"
              className="shrink-0 text-sm text-neutral-400"
            >
              {filteredPosts.length} {filteredPosts.length === 1 ? "insight" : "insights"}
            </p>
          </div>

          {latestPosts.length > 0 ? (
            <div className="grid grid-cols-1 border-l border-white/12 md:grid-cols-2">
              {latestPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/insights/${post.slug}`}
                  className="group flex min-w-0 flex-col border-b border-r border-white/12 bg-[#0d0e11] p-6 outline-none transition-[background-color,border-color] duration-200 hover:bg-[#121318] focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#d77938] motion-reduce:transition-none md:min-h-[340px] md:p-8"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#d77938]">
                    {getDisplayCategoryLabel(post.displayCategory)}
                  </p>
                  <h3 className="mt-4 text-2xl font-semibold leading-[1.08] tracking-[-0.035em] text-white md:text-[1.75rem]">
                    {post.title}
                  </h3>
                  <p className="mt-4 line-clamp-3 text-base leading-7 text-neutral-400">
                    {post.excerpt}
                  </p>
                  <div className="mt-7">
                    <ArticleMeta post={post} />
                  </div>
                  <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-white transition-colors group-hover:text-[#ee9557]">
                    Read insight
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
                    />
                  </span>
                </Link>
              ))}
            </div>
          ) : featuredPost ? null : (
            <div className="border-b border-x border-white/12 bg-[#0d0e11] px-6 py-14 text-center md:py-20">
              <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white">
                No insights found.
              </h3>
              <p className="mt-3 text-base text-neutral-400">
                Try another topic or clear your filters.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-7 min-h-11 rounded-sm border border-white/20 px-5 py-2 text-sm font-semibold text-white transition-colors hover:border-[#d77938] hover:bg-[#c06020]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d77938]"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        <section
          aria-labelledby="insights-cta-heading"
          className="relative mt-16 overflow-hidden border border-white/12 bg-[#101114] px-7 py-9 md:mt-20 md:px-11 md:py-12"
        >
          <div className="absolute inset-y-0 left-0 w-1 bg-[#c06020]" aria-hidden="true" />
          <div className="relative max-w-4xl">
            <h2
              id="insights-cta-heading"
              className="max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.04em] text-white md:text-4xl"
            >
              A legal question usually starts as a business decision.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-neutral-300 md:text-lg">
              If you’re working through a contract, ownership issue, employee
              decision, or another point of legal risk, let’s talk through what
              comes next.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/#contact"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-[linear-gradient(180deg,#d8844b,#b95518)] px-6 py-3 text-sm font-bold text-white outline-none transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#f3a36b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#101114] motion-reduce:transform-none motion-reduce:transition-none"
              >
                Schedule a Consultation
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <a
                href="mailto:tim@vertalislegal.com"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border border-white/20 px-6 py-3 text-sm font-semibold text-white outline-none transition-colors hover:border-white/35 hover:bg-white/[0.04] focus-visible:ring-2 focus-visible:ring-[#d77938] focus-visible:ring-offset-2 focus-visible:ring-offset-[#101114]"
              >
                Send Us a Question
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </div>

      <footer className="border-t border-white/10 bg-black/25">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-6 text-sm md:flex-row md:items-center md:justify-between">
          <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-5 gap-y-2 text-white/65">
            <Link href="/" className="transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d77938]">
              Home
            </Link>
            <Link href="/insights" className="transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d77938]">
              Insights
            </Link>
            <Link href="/terms-of-use" className="transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d77938]">
              Terms of Use
            </Link>
          </nav>
          <p className="text-xs tracking-[0.08em] text-white/50 md:text-sm">
            © 2026, Vertalis Legal Counsel, PLLC
          </p>
        </div>
      </footer>
    </>
  );
}

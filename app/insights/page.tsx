import type { Metadata } from "next";
import { Header } from "../page";
import { insightPosts } from "./data";
import InsightsLibrary, { type InsightListItem } from "./InsightsLibrary";
import {
  getDisplayCategoryLabel,
  getDisplayCategorySlug,
} from "./categories";

const title = "Vertalis Insights | Practical Legal Guidance for Growing Companies";
const description =
  "Practical legal guidance for growing companies on contracts, ownership, governance, employees, intellectual property, capital, risk, and business disputes.";
const canonicalUrl = "https://vertalislegal.com/insights";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title,
    description,
    url: canonicalUrl,
    siteName: "Vertalis",
    type: "website",
    images: ["https://vertalislegal.com/vertalis-shield-preview.png"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["https://vertalislegal.com/vertalis-shield-preview.png"],
  },
};

function postTimestamp(date?: string) {
  if (!date) return Number.NaN;
  return Date.parse(date);
}

function getSortedPosts() {
  return insightPosts
    .filter((post) => !post.hiddenFromListings)
    .map((post, index) => ({ post, index }))
    .sort((a, b) => {
      const aTime = postTimestamp(a.post.date);
      const bTime = postTimestamp(b.post.date);

      if (Number.isNaN(aTime) && Number.isNaN(bTime)) {
        return b.index - a.index;
      }

      if (Number.isNaN(aTime) || Number.isNaN(bTime) || aTime === bTime) {
        return b.index - a.index;
      }

      return bTime - aTime;
    })
    .map(({ post }) => post);
}

export default function InsightsPage() {
  const sortedPosts = getSortedPosts();
  const indexedPosts: InsightListItem[] = sortedPosts.map((post) => ({
    slug: post.slug,
    sourceCategory: post.category,
    displayCategory: getDisplayCategorySlug(post),
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    readTime: post.readTime,
  }));
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Vertalis Insights",
    description,
    url: canonicalUrl,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: indexedPosts.length,
      itemListElement: indexedPosts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${canonicalUrl}/${post.slug}`,
        name: post.title,
        description: post.excerpt,
        item: {
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          articleSection: getDisplayCategoryLabel(post.displayCategory),
          url: `${canonicalUrl}/${post.slug}`,
        },
      })),
    },
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0a0a0c] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <Header />
      <InsightsLibrary posts={indexedPosts} />
    </main>
  );
}

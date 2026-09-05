import type { MetadataRoute } from "next";
import { insightPosts } from "./insights/data";

const siteUrl = "https://vertalislegal.com";

function parsePostDate(date?: string): Date | undefined {
  if (!date) return undefined;
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/` },
    { url: `${siteUrl}/about/tim-nichols` },
    { url: `${siteUrl}/about/founders` },
    { url: `${siteUrl}/about/governance` },
    { url: `${siteUrl}/about/investors` },
    { url: `${siteUrl}/about/employees` },
    { url: `${siteUrl}/about/ip` },
    { url: `${siteUrl}/insights` },
    { url: `${siteUrl}/terms-of-use` },
  ];

  const articleRoutes: MetadataRoute.Sitemap = insightPosts.map((post) => {
    const lastModified = parsePostDate(post.updatedDate) ?? parsePostDate(post.date);
    return {
      url: `${siteUrl}/insights/${post.slug}`,
      ...(lastModified ? { lastModified } : {}),
    };
  });

  return [...staticRoutes, ...articleRoutes];
}

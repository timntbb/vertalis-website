import type { Metadata } from "next";
import { siteUrl } from "./site";

// Next.js replaces nested metadata objects; include these defaults in each override.
export const socialImage = `${siteUrl}/vertalis-shield-preview.png`;
export const sharedOpenGraph = {
  siteName: "Vertalis",
  images: [{ url: socialImage, alt: "Vertalis Legal Counsel shield" }],
} satisfies Metadata["openGraph"];
export const sharedTwitter = {
  card: "summary_large_image",
  images: [{ url: socialImage, alt: "Vertalis Legal Counsel shield" }],
} satisfies Metadata["twitter"];

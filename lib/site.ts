// Centralized, verified business information used across metadata and JSON-LD.
export const siteUrl = "https://vertalislegal.com";

export const siteInfo = {
  url: siteUrl,
  legalName: "Vertalis Legal Counsel, PLLC",
  brandName: "Vertalis",
  logo: `${siteUrl}/logo.png`,
  email: "tim@vertalislegal.com",
  areaServed: [
    "Frisco, TX",
    "McKinney, TX",
    "Prosper, TX",
    "Plano, TX",
    "North Dallas, TX",
    "Dallas-Fort Worth Metroplex",
  ],
  sameAs: [
    "https://www.linkedin.com/in/timntbb/",
    "https://www.instagram.com/tim_vertalis/",
    "https://www.youtube.com/channel/UCU0w5QzeDottl1T10P5kbcQ",
  ],
  founder: {
    name: "Tim Nichols",
    url: `${siteUrl}/about/tim-nichols`,
  },
} as const;

// Stable @id values so entities can be referenced from multiple JSON-LD blocks.
export const organizationId = `${siteUrl}/#organization`;
export const personId = `${siteUrl}/#person-tim-nichols`;

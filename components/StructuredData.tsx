import { organizationId, personId, siteInfo } from "@/lib/site";

// Reusable JSON-LD script renderer so structured data never needs ad-hoc <script> tags.
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Combined Organization + LegalService node for the business itself. Only
// verified, visibly published information is included (no invented address,
// phone number, bar number, price range, or reviews).
export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LegalService"],
    "@id": organizationId,
    name: siteInfo.legalName,
    alternateName: siteInfo.brandName,
    url: siteInfo.url,
    logo: siteInfo.logo,
    email: siteInfo.email,
    areaServed: siteInfo.areaServed,
    founder: { "@id": personId },
    sameAs: siteInfo.sameAs,
  };
}

// Person schema for Tim Nichols, linked back to the Organization via @id.
export function buildPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: siteInfo.founder.name,
    url: siteInfo.founder.url,
    email: siteInfo.email,
    jobTitle: "Founding Attorney",
    worksFor: { "@id": organizationId },
  };
}

// Shared author/publisher references for article structured data.
export function getArticleAuthor() {
  return {
    "@type": "Person",
    "@id": personId,
    name: siteInfo.founder.name,
    url: siteInfo.founder.url,
  };
}

export function getArticlePublisher() {
  return { "@id": organizationId };
}

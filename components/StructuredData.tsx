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
// Only verified, visibly published information is included (no bar number,
// address, phone number, award, rating, review, or social-media URL).
export function buildPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: siteInfo.founder.name,
    url: siteInfo.founder.url,
    email: siteInfo.email,
    jobTitle: "Business Attorney",
    worksFor: { "@id": organizationId },
    areaServed: siteInfo.areaServed,
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Attorney License",
      name: "Licensed to Practice Law in Texas",
    },
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "University of Missouri–Kansas City School of Law",
      },
      { "@type": "CollegeOrUniversity", name: "Rockhurst University" },
      { "@type": "CollegeOrUniversity", name: "Northern Arizona University" },
    ],
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

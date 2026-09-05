export const insightCategories = [
  { slug: "all", label: "All Insights" },
  { slug: "formation-ownership", label: "Formation & Ownership" },
  { slug: "governance", label: "Governance" },
  { slug: "contracts-risk", label: "Contracts & Risk" },
  { slug: "employees", label: "Employees" },
  { slug: "intellectual-property", label: "Intellectual Property" },
  { slug: "capital-growth", label: "Capital & Growth" },
  { slug: "business-disputes", label: "Business Disputes" },
] as const;

export type InsightCategorySlug = (typeof insightCategories)[number]["slug"];
export type DisplayInsightCategorySlug = Exclude<InsightCategorySlug, "all">;

const categoryLabels = new Map(
  insightCategories.map((category) => [category.slug, category.label]),
);

const sourceCategoryMap: Record<string, DisplayInsightCategorySlug> = {
  Founders: "formation-ownership",
  Governance: "governance",
  "Contract Strategy": "contracts-risk",
  Contracts: "contracts-risk",
  Employment: "employees",
  Employees: "employees",
  "Intellectual Property": "intellectual-property",
  "Capital Strategy": "capital-growth",
  Litigation: "business-disputes",
  Disputes: "business-disputes",
  "Legal Strategy": "contracts-risk",
};

const articleCategoryOverrides: Record<string, DisplayInsightCategorySlug> = {
  "employee-vs-contractor-structure": "employees",
};

export function getDisplayCategorySlug(post: {
  slug: string;
  category: string;
}): DisplayInsightCategorySlug {
  return (
    articleCategoryOverrides[post.slug] ??
    sourceCategoryMap[post.category] ??
    "contracts-risk"
  );
}

export function getDisplayCategoryLabel(slug: InsightCategorySlug) {
  return categoryLabels.get(slug) ?? "All Insights";
}

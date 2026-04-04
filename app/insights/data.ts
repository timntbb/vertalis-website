export type InsightPost = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  subtitle: string;
  sections: Array<{
    heading?: string;
    paragraphs?: string[];
    emphasis?: string;
    bullets?: string[];
  }>;
};

export const insightPosts: InsightPost[] = [
  {
    slug: "operating-agreement-backbone-of-your-company",
    category: "Governance",
    title: "The Operating Agreement: The Backbone of Your Company",
    excerpt:
      "Why operating agreements matter, what they should actually do, and how founders should think about governance before pressure exposes the gaps.",
    subtitle:
      "Structure isn’t optional. It’s what keeps companies from breaking under pressure.",
    sections: [
      {
        paragraphs: [
          "Starting a company is exciting. It’s momentum, vision, and a little bit of risk all rolled into one. Most founders are focused on building the product, finding customers, and creating traction, not thinking about deadlock provisions or indemnity clauses.",
          "That is exactly where problems begin.",
        ],
        emphasis: "Legal structure isn’t a formality. It’s infrastructure.",
        bullets: undefined,
      },
      {
        paragraphs: [
          "Most founder disputes do not come from bad people. They come from unclear agreements, and the most expensive operating agreement is often the one you did not have when things went wrong.",
        ],
      },
      {
        heading: "What Is an Operating Agreement?",
        paragraphs: [
          "An operating agreement is your company’s constitution. It defines who makes decisions, how those decisions get made, what happens when members disagree, and how the business actually operates day to day.",
          "Without it, your company falls back on default state rules, rules that were not written for your business, your capital strategy, or your founder dynamics.",
        ],
        emphasis:
          "Without an operating agreement, you are not fully running your company. The state is.",
      },
      {
        heading: "What It Should Actually Do",
        paragraphs: [
          "A strong operating agreement creates clarity around how the company actually functions. At a minimum, it should define:",
        ],
        bullets: [
          "who has authority to act",
          "how ownership is structured",
          "how profits and losses are allocated",
          "what decisions require consent",
          "what happens when a founder leaves",
          "how disputes get resolved",
          "what happens if the company winds down",
        ],
      },
      {
        paragraphs: [
          "This is not just paperwork. It is the governance layer that keeps momentum from turning into conflict.",
        ],
      },
      {
        heading: "How Founders Usually Handle This",
        paragraphs: [
          "Most founders take one of three paths.",
          "Templates are cheap and fast, but usually too generic to hold up when pressure hits.",
          "Automated platforms are a better starting point, but still fall short when structure actually matters.",
          "Attorney-built governance is where structure becomes strategy, where the document is built not just to exist, but to perform.",
        ],
        emphasis:
          "Most operating agreements are written to exist. The right ones are built to perform under pressure.",
      },
      {
        heading: "Build It Right the First Time",
        paragraphs: [
          "Great companies are not built on ideas alone. They are built on structure.",
          "At Vertalis, we help founders build governance that matches the company they are actually trying to create, not just the company the state assumes they have.",
          "Most founders wait until something breaks to fix this. By then, the leverage is gone.",
          "If you’re building something real, don’t leave this to a template. Let’s structure it correctly from day one.",
        ],
      },
    ],
  },
];

export function getInsightPost(slug: string) {
  return insightPosts.find((post) => post.slug === slug);
}

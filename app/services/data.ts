export type Practice = {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  shortDescription: string;
  intro: string;
  situations: string[];
  approach: string;
  relatedInsights: string[];
  image: string;
  imageAlt: string;
  matters: Array<{ title: string; description: string }>;
};

export const practices: Practice[] = [
  {
    slug: "company-ownership",
    title: "Company & Ownership",
    seoTitle: "Business Formation & Ownership Attorney Frisco, TX | Vertalis",
    seoDescription: "Vertalis advises North Texas businesses on LLC formation, operating agreements, ownership changes, governance, buy-sell agreements, and succession planning.",
    h1: "Business Formation, Ownership & Governance Counsel",
    shortDescription: "Clear structures for control, change, and succession.",
    intro:
      "Build a clear legal structure for who owns the company, who controls it, and what happens when the ownership group changes. Vertalis serves businesses in Frisco, McKinney, Prosper, Plano, North Dallas, and throughout DFW.",
    situations: ["You are forming an LLC and need the ownership and management structure documented.", "A founder or business partner is joining, leaving, or asking for different rights.", "The company needs a buy-sell or succession plan before a predictable transition becomes urgent."],
    approach: "Vertalis connects formation, operating agreements, governance, and succession so the documents reflect how the business actually makes decisions and shares value.",
    relatedInsights: ["what-is-vesting-and-why-founders-should-implement-it-early", "50-50-founder-equity-splits-hidden-risk-startup-deadlocks", "what-happens-to-a-texas-llc-when-a-member-dies"],
    image: "/services/company-ownership.png",
    imageAlt: "Three business owners gathered around a company",
    matters: [
      {
        title: "Operating Agreements",
        description:
          "Set the rules for ownership, voting, distributions, management, transfers, and the difficult situations owners rarely address early enough.",
      },
      {
        title: "Entity Formation & Restructuring",
        description:
          "Choose and implement a structure that fits the business today while leaving room for growth, tax planning, and future transactions.",
      },
      {
        title: "Adding or Removing Owners",
        description:
          "Document ownership changes carefully so economics, control, obligations, and releases are clear on both sides.",
      },
      {
        title: "Founder & Partner Issues",
        description:
          "Address unclear roles, deadlock, fiduciary obligations, performance problems, and disagreements before they destabilize the company.",
      },
      {
        title: "Buy-Sell & Succession Planning",
        description:
          "Create a practical path for death, disability, retirement, termination, or voluntary departure without putting the business at risk.",
      },
    ],
  },
  {
    slug: "contracts-transactions",
    title: "Contracts & Transactions",
    seoTitle: "Business Contract Attorney Frisco, TX | Vertalis",
    seoDescription: "Business contract counsel for Frisco and North Texas companies handling drafting, MSAs, leases, licensing, indemnification, guarantees, and commercial transactions.",
    h1: "Business Contracts & Commercial Transactions",
    shortDescription: "Practical agreements that protect the deal and the relationship.",
    intro:
      "Turn business expectations into workable agreements that protect the deal, allocate risk, and preserve important commercial relationships for companies across Frisco, McKinney, Prosper, Plano, North Dallas, and DFW.",
    situations: ["A customer sends you a contract that shifts broad risk to your company.", "You are negotiating a major vendor agreement, MSA, licensing deal, or strategic transaction.", "A commercial lease, guarantee, indemnity, or limitation of liability could expose the business to more than the deal is worth."],
    approach: "Vertalis translates the business deal into clear obligations, practical protections, and risk allocation that the company can understand and operate with after signing.",
    relatedInsights: ["contract-chaos", "what-to-review-before-signing-a-commercial-lease-in-texas", "personal-guarantee-for-a-business-loan", "can-a-business-cancel-a-contract-after-signing-it-in-texas"],
    image: "/services/contracts-transactions.png",
    imageAlt: "Contract papers with a pen and transaction arrows",
    matters: [
      {
        title: "Contract Drafting & Review",
        description:
          "Draft, revise, and negotiate agreements around the actual economics, operational realities, and risk of the transaction.",
      },
      {
        title: "MSAs, Vendor & Customer Agreements",
        description:
          "Build repeatable contracting systems for customers, suppliers, and service providers without losing sight of deal-specific risk.",
      },
      {
        title: "Commercial Leases",
        description:
          "Evaluate use restrictions, operating costs, guarantees, maintenance duties, default remedies, and exit rights before the space becomes a liability.",
      },
      {
        title: "Licensing & Strategic Agreements",
        description:
          "Define how intellectual property, data, branding, channels, and joint efforts may be used—and where the relationship stops.",
      },
      {
        title: "Indemnity, Guarantees & Risk Allocation",
        description:
          "Identify who bears which loss, how liability is limited, what insurance must respond, and when an owner may be personally exposed.",
      },
    ],
  },
  {
    slug: "people-operations",
    title: "People & Operations",
    seoTitle: "Employment & Business Operations Attorney | Vertalis",
    seoDescription: "Employment and business operations counsel for agreements, contractors, confidentiality, IP assignment, restrictive covenants, policies, and ongoing legal risk.",
    h1: "Employment, Contractors & Business Operations Counsel",
    shortDescription: "Sound agreements for the people who move the business.",
    intro:
      "Put practical legal structure around the employees, contractors, information, and policies that keep companies in Frisco, McKinney, Prosper, Plano, North Dallas, and DFW operating.",
    situations: ["A key employee or contractor needs clear duties, confidentiality, and ownership terms.", "The company is unsure whether a worker is properly classified as an employee or contractor.", "You need practical policies or ongoing counsel as hiring, operations, and employee mobility evolve."],
    approach: "Vertalis aligns agreements and policies with the real working relationship, protecting confidential information and company-owned work without creating unnecessary friction.",
    relatedInsights: ["intellectual-property-employees-ownership-problem", "you-paid-a-developer-to-build-your-app", "fractional-general-counsel"],
    image: "/services/people-operations.png",
    imageAlt: "Employees in front of a personnel clipboard",
    matters: [
      {
        title: "Employment Agreements",
        description:
          "Clarify compensation, duties, confidentiality, ownership of work product, termination rights, and other expectations for key employees.",
      },
      {
        title: "Independent Contractors",
        description:
          "Structure contractor relationships around the real working arrangement while protecting intellectual property and reducing classification risk.",
      },
      {
        title: "Confidentiality & IP Assignment",
        description:
          "Keep business information protected and make sure work created for the company is actually owned by the company.",
      },
      {
        title: "Noncompetes & Restrictive Covenants",
        description:
          "Draft and assess tailored restrictions involving competition, solicitation, confidential information, and employee mobility.",
      },
      {
        title: "Policies & Ongoing Business Counsel",
        description:
          "Develop practical policies and obtain responsive guidance as hiring, operations, and day-to-day legal questions evolve.",
      },
    ],
  },
  {
    slug: "growth-capital",
    title: "Growth & Capital",
    seoTitle: "Startup Financing & M&A Attorney Frisco, TX | Vertalis",
    seoDescription: "Vertalis advises North Texas companies on SAFEs, convertible instruments, equity investments, dilution, cap tables, acquisitions, and strategic transactions.",
    h1: "Startup Financing, Investment & Strategic Transactions",
    shortDescription: "Structure for investment, expansion, and strategic growth.",
    intro:
      "Structure investment and expansion so companies in Frisco, McKinney, Prosper, Plano, North Dallas, and DFW understand the economics, control rights, obligations, and long-term consequences of growth.",
    situations: ["You are preparing a SAFE, convertible note, or equity investment and need to understand dilution.", "Investors are asking for governance, information, economic, or protective rights.", "The company is evaluating an acquisition, business purchase, merger, or strategic partnership."],
    approach: "Vertalis makes financing and strategic transactions understandable at the ownership, governance, cap-table, and contract levels before the company commits.",
    relatedInsights: ["post-money-safe-ownership-dilution", "what-is-vesting-and-why-founders-should-implement-it-early", "fractional-general-counsel"],
    image: "/services/growth-capital.png",
    imageAlt: "Business buildings with an upward growth chart",
    matters: [
      {
        title: "SAFEs & Convertible Instruments",
        description:
          "Document early financing while making the conversion mechanics, valuation terms, and downstream ownership effects understandable.",
      },
      {
        title: "Equity Investments",
        description:
          "Negotiate ownership, governance, information, economic, and protective rights when new capital enters the company.",
      },
      {
        title: "Bringing in Investors",
        description:
          "Prepare the company, decision process, and core documents for an investment without creating avoidable governance or cap-table problems.",
      },
      {
        title: "Acquisitions & Business Purchases",
        description:
          "Evaluate and document the purchase or sale of a business, including diligence, structure, representations, closing conditions, and post-closing risk.",
      },
      {
        title: "Strategic Partnerships",
        description:
          "Define contributions, ownership, exclusivity, revenue, responsibility, and exit rights before two businesses begin operating as one initiative.",
      },
    ],
  },
  {
    slug: "disputes-litigation",
    title: "Disputes & Litigation",
    seoTitle: "Business Litigation Attorney Frisco, TX | Vertalis",
    seoDescription: "Business litigation counsel for Frisco and North Texas companies handling contract enforcement, partner disputes, commercial claims, and pre-litigation strategy.",
    h1: "Business Disputes & Commercial Litigation",
    shortDescription: "Focused strategy for resolving costly business conflict.",
    intro:
      "Assess the business problem early, preserve leverage, and pursue a resolution strategy for companies in Frisco, McKinney, Prosper, Plano, North Dallas, and DFW that accounts for both legal position and commercial cost.",
    situations: ["A counterparty breached a contract, stopped paying, or disputes what the agreement requires.", "A business partner is withholding information, taking company money, or making decisions without authority.", "You need a demand letter, emergency strategy, or realistic assessment before filing commercial litigation."],
    approach: "Vertalis evaluates the documents, facts, leverage, remedies, and business consequences together so the response is proportionate to what is at stake.",
    relatedInsights: ["can-a-business-cancel-a-contract-after-signing-it-in-texas", "client-wont-pay-invoice-texas", "business-partner-taking-money-from-company-texas", "can-my-business-partner-force-me-out-of-a-texas-llc"],
    image: "/services/disputes-litigation.png",
    imageAlt: "Two businesses separated by a bold dispute crack",
    matters: [
      {
        title: "Breach of Contract",
        description:
          "Evaluate the agreement, performance history, available remedies, defenses, evidence, and practical path to recovery or resolution.",
      },
      {
        title: "Owner & Partner Disputes",
        description:
          "Address control, access to information, distributions, fiduciary duties, deadlock, separation, and claims between business owners.",
      },
      {
        title: "Commercial Lease Disputes",
        description:
          "Navigate defaults, repairs, operating expenses, use restrictions, possession, guarantees, and other landlord-tenant conflicts.",
      },
      {
        title: "Demand Letters & Pre-Suit Strategy",
        description:
          "Build the factual record, frame the legal position, and pursue leverage before litigation becomes the only remaining option.",
      },
      {
        title: "Business Litigation",
        description:
          "Handle commercial claims with a focused strategy tied to the value at stake, operational impact, and realistic outcomes.",
      },
    ],
  },
];

export function getPractice(slug: string) {
  return practices.find((practice) => practice.slug === slug);
}

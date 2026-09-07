export type Practice = {
  slug: string;
  title: string;
  shortDescription: string;
  intro: string;
  image: string;
  imageAlt: string;
  matters: Array<{ title: string; description: string }>;
};

export const practices: Practice[] = [
  {
    slug: "company-ownership",
    title: "Company & Ownership",
    shortDescription: "Clear structures for control, change, and succession.",
    intro:
      "Build a clear legal structure for who owns the company, who controls it, and what happens when the ownership group changes.",
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
    shortDescription: "Practical agreements that protect the deal and the relationship.",
    intro:
      "Turn business expectations into workable agreements that protect the deal, allocate risk, and preserve important commercial relationships.",
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
    shortDescription: "Sound agreements for the people who move the business.",
    intro:
      "Put practical legal structure around the employees, contractors, information, and policies that keep the company operating.",
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
    shortDescription: "Structure for investment, expansion, and strategic growth.",
    intro:
      "Structure investment and expansion so the company understands the economics, control rights, obligations, and long-term consequences of growth.",
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
    shortDescription: "Focused strategy for resolving costly business conflict.",
    intro:
      "Assess the business problem early, preserve leverage, and pursue a resolution strategy that accounts for both legal position and commercial cost.",
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

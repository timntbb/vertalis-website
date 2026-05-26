import VertalisSAFETableCard from "@/components/VertalisSAFETableCard";
import LLCVsCCorpArticle from "./content/LLCVsCCorpArticle";
import FractionalGeneralCounselArticle from "./content/FractionalGeneralCounselArticle";
import ContractChaosArticle from "./content/ContractChaosArticle";
import TestCarouselArticle from "./content/TestCarouselArticle";

export type InsightPost = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  seoTitle?: string;
  seoDescription?: string;
  date?: string;
  readTime?: string;
  content?: React.ReactNode;
  fullWidthTool?: boolean;
  hiddenFromListings?: boolean;
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
    slug: "post-money-safe-ownership-dilution",
    category: "Capital Strategy",
    title: "Post-Money SAFEs: Ownership, Dilution, and the Structure Founders Get Wrong",
    excerpt:
      "A clear, founder-focused breakdown of how post-money SAFEs actually work, how dilution really happens, and how to structure a SAFE round intentionally.",
    date: "April 2026",
    readTime: "7 min read",
    subtitle: "",
    sections: [],
    fullWidthTool: true,
    content: (
      <div className="space-y-10 md:space-y-12">
        <div className="not-prose">
          <VertalisSAFETableCard />
        </div>

        <article className="mx-auto max-w-4xl text-neutral-300">
          <h2 className="text-4xl font-semibold tracking-[-0.035em] text-white md:text-5xl">
            Post-Money SAFEs: Ownership, Dilution, and the Structure Founders Get Wrong
          </h2>

          <h3 className="mt-12 text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
            I. The Post-Money SAFE and the Shift to Ownership Clarity
          </h3>
          <p className="mt-4 leading-8">
            The post-money SAFE changed early-stage financing by making ownership
            visible. Under pre-money SAFEs, founders were navigating dilution through
            variables they could not control, including future fundraising, option
            pool adjustments, and the interaction between multiple SAFEs. The result
            was a structure where capital could be raised without clearly
            understanding what had been sold.
          </p>
          <p className="mt-4 leading-8">
            The post-money SAFE corrected that by anchoring everything to a single
            concept, the post-money valuation cap. Because this valuation reflects
            the company immediately after the investment, ownership can be calculated
            directly at the time of the transaction. In practice, this reduces to a
            simple equation: the amount raised divided by the post-money valuation
            cap.
          </p>
          <p className="mt-4 leading-8">
            This was not just a technical improvement, but a structural correction
            that allows ownership to be immediately transparent and calculable.
          </p>

          <h3 className="mt-12 text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
            II. SAFEs as Independent Financing Events
          </h3>
          <p className="mt-4 leading-8">
            Many founders still treat SAFEs as temporary instruments that defer real
            consequences until a priced round. That is no longer accurate. The
            post-money SAFE functions as its own financing event, one that
            establishes ownership before institutional capital enters the business.
          </p>
          <p className="mt-4 leading-8">
            If a company raises $1 million on a $5 million cap, it has sold 20
            percent. That ownership exists before the Series A and becomes the
            baseline for every future financing.
          </p>
          <p className="mt-4 leading-8">
            The implication is straightforward. Founders cannot think in terms of
            dollars alone. Every raise is an ownership decision.
          </p>

          <h3 className="mt-12 text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
            III. Where Dilution Actually Happens
          </h3>
          <p className="mt-4 leading-8">
            While SAFEs determine initial ownership, most dilution occurs at the
            first priced round. At that point, SAFEs convert, new investors purchase
            preferred stock, and the option pool is expanded.
          </p>
          <p className="mt-4 leading-8">
            A defining feature of the post-money SAFE is that SAFEs do not dilute
            each other. Each investor’s ownership is calculated independently and
            aggregated into a fixed block prior to the priced round.
          </p>
          <p className="mt-4 leading-8">
            During the priced round, new investors typically take 20 to 30 percent of
            the company. At the same time, the option pool is often increased, which
            is usually borne by founders.
          </p>
          <p className="mt-4 leading-8">
            Pro rata rights further increase dilution by allowing SAFE investors to
            maintain their ownership in the priced round.
          </p>

          <h3 className="mt-12 text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
            IV. Designing a SAFE Round with Intent
          </h3>
          <p className="mt-4 leading-8">
            A properly structured SAFE round begins with ownership, not capital.
            Founders should first determine how much of the company they are willing
            to sell, then work backward to the valuation cap.
          </p>
          <p className="mt-4 leading-8">
            For example, if a founder is willing to sell 15 percent and plans to
            raise $750,000, the implied post-money cap is $5 million.
          </p>
          <p className="mt-4 leading-8">
            This ensures the raise aligns with long-term control rather than
            short-term funding.
          </p>
          <p className="mt-4 leading-8">
            We built a SAFE dilution simulator to allow founders to model these
            outcomes in real time and understand ownership before committing to
            terms.
          </p>

          <h3 className="mt-12 text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
            V. The Vertalis Perspective
          </h3>
          <p className="mt-4 leading-8">
            At Vertalis, SAFEs are not documents, they are structural decisions. The
            SAFE round is often the first meaningful allocation of ownership outside
            the founding team, and it sets the trajectory for every financing event
            that follows.
          </p>
          <p className="mt-4 leading-8">
            The post-money SAFE delivers clarity. Founders who use that clarity
            intentionally retain control. Those who do not often realize the
            consequences later.
          </p>
          <p className="mt-4 leading-8">
            Vertalis designs the legal architecture behind the company so each
            financing decision supports long-term control and scalability.
          </p>
        </article>
      </div>
    ),
  },
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
  {
    slug: "intellectual-property-risks-startups",
    category: "Intellectual Property",
    title: "Intellectual Property Risks in Startups: Five Ways IP Quietly Breaks a Company",
    excerpt:
      "Most founders assume their company owns what it builds. In reality, intellectual property issues quietly derail startups through ownership gaps, founder misalignment, and weak agreements.",
    date: "April 2026",
    readTime: "8 min read",
    subtitle: "",
    sections: [],
    content: (
      <article className="text-neutral-300 leading-relaxed">
        <h1 className="text-4xl font-semibold tracking-[-0.035em] text-white md:text-5xl">
          Intellectual Property Risks in Startups: Five Ways IP Quietly Breaks a Company
        </h1>

        <p className="mt-4">
          Most founders think intellectual property is something you protect later.
        </p>
        <p className="mt-4">After the product works.</p>
        <p className="mt-4">After customers show up.</p>
        <p className="mt-4">After revenue starts to matter.</p>
        <p className="mt-4">
          In reality, intellectual property is not a later-stage concern. It is a
          foundational one. It determines who owns a startup’s most valuable assets,
          whether those assets can be leveraged, and whether the company is even
          investable.
        </p>
        <p className="mt-4">
          The failure rarely happens all at once. There is no single moment where a
          company “loses” its intellectual property. Instead, it erodes quietly
          through early decisions, informal relationships, and agreements that were
          never properly structured.
        </p>
        <p className="mt-4">
          By the time the issue surfaces, during investor due diligence, a dispute,
          or a financing event, it is often expensive, disruptive, and in some cases
          impossible to fully correct.
        </p>
        <p className="mt-4">
          Below are five of the most common ways intellectual property issues in
          startups derail otherwise strong companies.
        </p>

        <h2 className="mt-12 text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
          1. The Company Does Not Actually Own Its Intellectual Property
        </h2>
        <p className="mt-4">The most dangerous assumption founders make is simple:</p>
        <p className="mt-4">“If we built it for the company, the company owns it.”</p>
        <p className="mt-4">That assumption is frequently wrong.</p>
        <p className="mt-4">
          Intellectual property ownership in startups does not automatically vest in
          the company simply because work was created for its benefit. Ownership
          depends on who created the work and whether there was a legally effective
          IP assignment agreement transferring that ownership.
        </p>
        <p className="mt-4">This issue commonly arises in early-stage development:</p>
        <ul className="mt-4 ml-6 list-disc">
          <li>A developer builds the initial product before the company is formed</li>
          <li>
            A contractor designs branding or writes code without a written IP
            assignment agreement
          </li>
          <li>
            A friend contributes in exchange for a vague promise of future equity
          </li>
          <li>
            Early work is done under informal arrangements or handshake deals
          </li>
        </ul>
        <p className="mt-4">
          In each of these scenarios, the default rule is that the individual
          creator owns the work, not the company.
        </p>
        <p className="mt-4">
          Without properly drafted assignment language, particularly present-tense
          assignment provisions, the company may have no enforceable ownership
          interest in the very asset it is built around.
        </p>
        <p className="mt-4">This becomes critical during:</p>
        <ul className="mt-4 ml-6 list-disc">
          <li>Venture capital due diligence</li>
          <li>Startup acquisition discussions</li>
          <li>Founder disputes over ownership</li>
        </ul>
        <p className="mt-4">
          At that point, the company is forced to retroactively secure ownership,
          often giving leverage to the original creator or paying to fix something
          that should have been structured correctly from the beginning.
        </p>
        <p className="mt-4">
          This is not a paperwork issue. It is a fundamental ownership failure that
          directly impacts startup valuation and investor confidence.
        </p>

        <h2 className="mt-12 text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
          2. Founder Misalignment on IP Ownership and Contribution
        </h2>
        <p className="mt-4">
          Intellectual property risk often originates inside the founding team.
        </p>
        <p className="mt-4">
          Early-stage companies tend to move quickly when dividing equity, often
          based on trust, relationships, or anticipated roles. What is rarely
          addressed with the same precision is how intellectual property is
          contributed, owned, and controlled among those founders.
        </p>
        <p className="mt-4">This creates structural misalignment:</p>
        <ul className="mt-4 ml-6 list-disc">
          <li>
            One founder develops the core technology while others contribute less
            tangible value
          </li>
          <li>
            Pre-existing work is brought into the company without clear assignment
            or licensing
          </li>
          <li>There is no distinction between individual IP and company IP</li>
          <li>Vesting is not tied to continued contribution</li>
        </ul>
        <p className="mt-4">The issue becomes visible when a founder leaves.</p>
        <p className="mt-4">
          Without clear founder agreements addressing intellectual property
          ownership:
        </p>
        <ul className="mt-4 ml-6 list-disc">
          <li>
            The departing founder may retain ownership or control over key
            intellectual property
          </li>
          <li>
            The company may lack the legal right to continue using or developing
            the product
          </li>
          <li>
            Remaining founders may face negotiation or litigation simply to
            continue operating
          </li>
        </ul>
        <p className="mt-4">
          From an investor’s perspective, this is a serious concern. A company
          cannot be cleanly capitalized if its core assets are tied to individuals
          who are no longer involved.
        </p>
        <p className="mt-4">
          Founder agreements in startups are not just about equity. They are about
          ensuring that all intellectual property necessary to operate the business
          is fully and continuously owned by the company.
        </p>

        <h2 className="mt-12 text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
          3. Pre-Existing Intellectual Property Creates Hidden Risk
        </h2>
        <p className="mt-4">
          Most startups are not built from scratch. Founders bring prior work into
          the business, and that is often a strength.
        </p>
        <p className="mt-4">
          The problem arises when that prior work is incorporated without clear
          structure.
        </p>
        <p className="mt-4">Common examples include:</p>
        <ul className="mt-4 ml-6 list-disc">
          <li>Code written before the company was formed</li>
          <li>Side projects that evolve into commercial products</li>
          <li>Tools or frameworks reused from prior roles or ventures</li>
          <li>Open-source software used without understanding licensing obligations</li>
        </ul>
        <p className="mt-4">
          Without clear documentation, this creates uncertainty:
        </p>
        <ul className="mt-4 ml-6 list-disc">
          <li>Does the company own that pre-existing intellectual property</li>
          <li>Is it licensed to the company</li>
          <li>
            Are there restrictions that affect how it can be used or commercialized
          </li>
        </ul>
        <p className="mt-4">
          In more serious situations, the company may be exposed to third-party
          claims, particularly where prior work was created under employment
          agreements or subject to restrictive covenants.
        </p>
        <p className="mt-4">From a structural standpoint, companies should clearly define:</p>
        <ul className="mt-4 ml-6 list-disc">
          <li>What intellectual property existed prior to formation</li>
          <li>Whether that IP is assigned or licensed to the company</li>
          <li>Any limitations attached to that IP</li>
        </ul>
        <p className="mt-4">
          Ignoring this step does not eliminate the issue. It simply delays it
          until the company is under investor scrutiny, when the consequences are
          significantly higher.
        </p>

        <h2 className="mt-12 text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
          4. Weak or Inconsistent Agreements Create Ownership Ambiguity
        </h2>
        <p className="mt-4">
          Many startups recognize the importance of intellectual property and
          attempt to address it through contracts.
        </p>
        <p className="mt-4">
          The issue is not the absence of agreements. It is that the agreements are
          often ineffective.
        </p>
        <p className="mt-4">This is especially common with:</p>
        <ul className="mt-4 ml-6 list-disc">
          <li>Contractor agreements for startups</li>
          <li>Employee intellectual property agreements</li>
          <li>Confidentiality and invention assignment agreements</li>
        </ul>
        <p className="mt-4">Common problems include:</p>
        <ul className="mt-4 ml-6 list-disc">
          <li>
            Assignment provisions that refer to future transfer rather than present
            ownership
          </li>
          <li>
            Misuse of “work made for hire” language without a fallback IP
            assignment
          </li>
          <li>Contributors who never sign the agreement</li>
          <li>Inconsistent terms across different agreements</li>
        </ul>
        <p className="mt-4">
          The result is a fragmented system where ownership is unclear and
          difficult to verify.
        </p>
        <p className="mt-4">
          This ambiguity may not impact day-to-day operations. The company
          continues to build and grow.
        </p>
        <p className="mt-4">
          However, it becomes critical when third parties evaluate the business.
        </p>
        <p className="mt-4">Investors and acquirers do not assume ownership. They verify it.</p>
        <p className="mt-4">
          If ownership cannot be clearly demonstrated through consistent,
          enforceable agreements, it introduces friction into the transaction. That
          friction often results in:
        </p>
        <ul className="mt-4 ml-6 list-disc">
          <li>Delays in closing</li>
          <li>Reduced startup valuation</li>
          <li>Additional legal costs</li>
          <li>In some cases, termination of the deal</li>
        </ul>
        <p className="mt-4">
          This is not about having documents in place. It is about having a system
          of agreements that works together to clearly establish intellectual
          property ownership across the company.
        </p>

        <h2 className="mt-12 text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
          5. IP Strategy Is Misaligned With the Business Model
        </h2>
        <p className="mt-4">Not all intellectual property risk is legal. Some of it is strategic.</p>
        <p className="mt-4">
          Early-stage companies often fall into one of two categories:
        </p>
        <ul className="mt-4 ml-6 list-disc">
          <li>Over-investing in patents or trademarks before the business is validated</li>
          <li>Ignoring intellectual property protection until it becomes a problem</li>
        </ul>
        <p className="mt-4">Both approaches create risk.</p>
        <p className="mt-4">
          Over-investment can drain capital on filings that do not yet align with a
          proven business model.
        </p>
        <p className="mt-4">Under-investment can lead to:</p>
        <ul className="mt-4 ml-6 list-disc">
          <li>Brand conflicts requiring costly rebranding</li>
          <li>Lack of protection around core intellectual property</li>
          <li>Reduced defensibility in competitive markets</li>
          <li>Investor concerns during due diligence</li>
        </ul>
        <p className="mt-4">The correct approach is alignment.</p>
        <p className="mt-4">
          Intellectual property strategy should reflect how the startup creates
          value.
        </p>
        <p className="mt-4">For example:</p>
        <ul className="mt-4 ml-6 list-disc">
          <li>Technology startups may require earlier protection of proprietary systems</li>
          <li>Brand-driven businesses may prioritize trademark protection sooner</li>
          <li>Service-based companies may focus more on confidentiality and internal processes</li>
        </ul>
        <p className="mt-4">
          The objective is not to maximize spending or minimize it. It is to make
          deliberate decisions that match the company’s stage, risk profile, and
          path to funding.
        </p>

        <h2 className="mt-12 text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
          Intellectual Property Is Structural, Not Administrative
        </h2>
        <p className="mt-4">Intellectual property is often treated as a legal formality.</p>
        <p className="mt-4">
          In practice, it functions as structural infrastructure within a startup.
        </p>
        <p className="mt-4">It determines:</p>
        <ul className="mt-4 ml-6 list-disc">
          <li>What the company actually owns</li>
          <li>Whether that ownership is enforceable</li>
          <li>How that ownership can be leveraged, financed, or transferred</li>
        </ul>
        <p className="mt-4">
          When properly structured, intellectual property supports growth,
          investment, and long-term enterprise value.
        </p>
        <p className="mt-4">
          When neglected, it creates friction that surfaces at the worst possible
          time, typically during investor due diligence or acquisition.
        </p>
        <p className="mt-4">
          Most companies do not fail because they ignored intellectual property
          entirely. They fail because they assumed it was handled, when in reality,
          it was never properly built into the foundation of the business.
        </p>
        <p className="mt-4">Founders build the company.</p>
        <p className="mt-4">The structure behind it determines whether it holds.</p>

        <h2 className="mt-12 text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
          A Practical Note for Founders
        </h2>
        <p className="mt-4">
          If you are building a company and are unsure whether your intellectual
          property is properly structured, the issue is rarely one missing document.
          It is usually a system problem.
        </p>
        <p className="mt-4">The question is not:</p>
        <p className="mt-4">“Do we have agreements in place?”</p>
        <p className="mt-4">The better question is:</p>
        <p className="mt-4">
          “Does the company clearly and defensibly own everything it relies on to
          operate and grow?”
        </p>
        <p className="mt-4">
          If that answer is uncertain, it is worth addressing early, while the
          company still has flexibility and leverage.
        </p>
      </article>
    ),
  },
  {
    slug: "llc-vs-c-corp",
    category: "Founders",
    title: "LLC vs C-Corp",
    excerpt:
      "Choosing between an LLC and a C-Corporation is one of the earliest structural decisions a founder makes. The right choice affects ownership, capital, governance, and how the company scales.",
    seoTitle: "LLC vs C-Corp | How to Choose the Right Business Entity for Your Startup",
    seoDescription:
      "Learn how founders should decide between an LLC and a C-Corporation based on ownership, capital strategy, governance, and long-term scalability.",
    date: "April 2026",
    readTime: "6 min read",
    subtitle: "How to Choose the Right Business Entity for Your Startup",
    sections: [],
    content: <LLCVsCCorpArticle />,
  },
  {
    slug: "employee-vs-contractor-structure",
    category: "Governance",
    title: "Employee vs. Independent Contractor: Structure, Not Labels",
    excerpt:
      "Worker classification is a structural allocation of cost, control, and risk. What begins as a handshake can turn into tax exposure, liability, and regulatory friction.",
    date: "April 2026",
    readTime: "5 min read",
    subtitle:
      "Classification is not a compliance box. It is part of your company's legal architecture.",
    sections: [],
    content: (
      <article className="text-neutral-300 leading-relaxed">
        <h1 className="text-4xl font-semibold tracking-[-0.035em] text-white md:text-5xl">
          Employee vs. Independent Contractor: Structure, Not Labels
        </h1>

        <h2 className="mt-12 text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
          The Cost of Informality
        </h2>
        <p className="mt-4">
          Founders move fast. Early hires come through networks, introductions, and
          "we'll figure it out later" conversations. A developer on a short-term
          build, a marketer from Upwork, a friend helping with operations, it all
          starts informally. But worker classification is one of those areas where
          informality doesn't scale. What begins as a handshake can quickly turn
          into tax exposure, liability, and regulatory friction that hits at
          exactly the wrong time.
        </p>

        <h2 className="mt-12 text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
          Structure, Not Paperwork
        </h2>
        <p className="mt-4">
          At its core, employee vs. contractor is not a paperwork distinction, it is
          a structural allocation of cost, control, and risk. Employees sit inside
          your company. You control how the work is performed, and in exchange, you
          take on payroll taxes, unemployment obligations, and compliance with wage
          and hour laws. Contractors sit outside your company. You pay for outcomes,
          not process, and they carry their own taxes, benefits, and operational
          risk. That flexibility is why early-stage companies lean heavily on
          contractors, but it only works if the relationship actually reflects
          independence.
        </p>
        <p className="mt-4">
          The distinction matters because the law does not care what you call
          someone. It looks at how the relationship functions. If a contractor
          starts to look embedded, taking direction, working set hours, relying on
          your business as a primary income source, the classification begins to
          collapse. And when it collapses, it does not do so gradually. It converts
          into back taxes, penalties, wage claims, and compliance obligations, often
          all at once.
        </p>

        <h2 className="mt-12 text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
          How the Law Actually Sees It
        </h2>
        <p className="mt-4">
          There is no single form or contract that determines classification. At the
          federal level, under Internal Revenue Code § 3121(d), the analysis reduces
          to control, who directs the work, who carries financial risk, and whether
          the relationship reflects a business or a job.
        </p>
        <p className="mt-4">
          Texas follows the same logic. Under the Texas Unemployment Compensation
          Act, a worker is presumed to be an employee when three elements exist:
          service, wages, and the right of direction and control. The key word is
          "right." You do not need to actively control the work. If you have the
          ability to, that is enough.
        </p>
        <p className="mt-4">
          What is often described as a "20-factor test" is better understood as a
          control analysis across three categories:
        </p>
        <ul className="mt-4 ml-6 list-disc space-y-2">
          <li>
            <strong className="text-white">Behavioral control:</strong> Are you
            directing how the work gets done, instructions, training, timing,
            reporting?
          </li>
          <li>
            <strong className="text-white">Financial control:</strong> Who bears the
            cost structure, tools, expenses, and profit or loss?
          </li>
          <li>
            <strong className="text-white">Independence and integration:</strong> Is
            this person operating a separate business, or are they embedded in
            yours?
          </li>
        </ul>
        <p className="mt-4">
          These are not checklists. They are signals. And they all point to a single
          question: is this person building their own business, or helping you run
          yours?
        </p>

        <h2 className="mt-12 text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
          Why Founders Get This Wrong
        </h2>
        <p className="mt-4">
          Most misclassification does not come from bad intent. It comes from
          informality.
        </p>
        <p className="mt-4">
          Early-stage companies rely on speed. Roles are loosely defined.
          Expectations evolve in real time. A contractor becomes "part of the team."
          They join Slack, attend meetings, take direction, and suddenly, without
          anyone realizing it, they are no longer operating independently.
        </p>
        <p className="mt-4">
          Handshake deals make this worse. Without clear agreements, there is no
          defined scope, no boundary on control, no allocation of risk. The
          relationship defaults to how it functions day-to-day, and that is exactly
          what regulators analyze. You cannot contract around a bad structure, and
          you cannot fix it after the fact without cost.
        </p>

        <h2 className="mt-12 text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
          The Real Risk: It Breaks When You Scale
        </h2>
        <p className="mt-4">
          Misclassification rarely causes problems when everything is small. It shows
          up when something changes:
        </p>
        <ul className="mt-4 ml-6 list-disc space-y-1">
          <li>A contractor files for unemployment</li>
          <li>A relationship ends poorly</li>
          <li>You raise capital and undergo diligence</li>
          <li>You grow and start formalizing operations</li>
        </ul>
        <p className="mt-4">
          At that point, classification is no longer theoretical. It becomes a line
          item, often with retroactive consequences.
        </p>
        <p className="mt-4">
          Unexpected tax liability, back unemployment contributions, wage claims,
          and potential penalties can all stack quickly. More importantly, it
          creates friction in the exact moments your company needs to be clean,
          scalable, and defensible.
        </p>

        <h2 className="mt-12 text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
          The Vertalis View
        </h2>
        <p className="mt-4">
          Classification is not a compliance box. It is part of your company's legal
          architecture.
        </p>
        <p className="mt-4">
          Employees are infrastructure. Contractors are external operators. The
          distinction should be intentional, designed into the role from the
          beginning, not inferred later based on convenience.
        </p>
        <p className="mt-4">
          If you want flexibility, structure for independence. If you want control,
          build for employment. But do not blur the two.
        </p>
        <p className="mt-4">
          Because in the early days, informality feels like speed.
        </p>
        <p className="mt-4">Later, it becomes cost.</p>
      </article>
    ),
  },
  {
    slug: "fractional-general-counsel",
    category: "Legal Strategy",
    title: "What Exactly Is Fractional General Counsel?",
    excerpt:
      "Why fractional general counsel matters for startups, how it differs from traditional outside counsel, and when founders should integrate legal guidance into the business.",
    date: "May 2026",
    readTime: "8 min read",
    subtitle:
      "Instead of hiring a lawyer only when problems arise, founders gain ongoing access to legal guidance from someone who already understands the company.",
    sections: [],
    content: <FractionalGeneralCounselArticle />,
  },
  {
    slug: "contract-chaos",
    category: "Contract Strategy",
    title: "Contract Chaos",
    excerpt:
      "Contract chaos occurs when contracts are created in isolation instead of functioning as part of a unified business structure. As companies grow, disconnected agreements across employment, sales, governance, intellectual property, and operations can create hidden legal risk, compliance failures, and structural instability.",
    date: "May 2026",
    readTime: "9 min read",
    subtitle:
      "How Poor Contract Management Creates Legal Risk and Structural Instability for Growing Companies",
    sections: [],
    content: <ContractChaosArticle />,
  },
  {
    slug: "test",
    category: "Tooling",
    title: "Test",
    excerpt: "Interactive Vertalis carousel preview and export tool.",
    date: "May 2026",
    readTime: "Interactive",
    subtitle: "",
    sections: [],
    fullWidthTool: true,
    hiddenFromListings: true,
    content: <TestCarouselArticle />,
  },
];

export function getInsightPost(slug: string) {
  return insightPosts.find((post) => post.slug === slug);
}

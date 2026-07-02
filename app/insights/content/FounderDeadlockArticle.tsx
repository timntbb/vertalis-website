import Link from "next/link";

export default function FounderDeadlockArticle() {
  return (
    <article className="mx-auto max-w-4xl text-neutral-300 leading-relaxed">
      <h1 className="text-4xl font-semibold tracking-[-0.035em] text-white md:text-5xl">
        50/50 Founder Equity Splits: The Hidden Risk of Startup Deadlocks
      </h1>

      <p className="text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
        A 50/50 split may look fair on day one, but without a deadlock mechanism,
        equal voting power can paralyze the company when major decisions matter most.
      </p>

      <p className="mt-6 leading-8">
        One of the most common startup equity splits is a 50/50 founder ownership
        structure. On its face, an equal equity split appears fair. Both founders
        share the risk, contribute to the company&apos;s growth, and participate
        equally in the potential upside. However, one of the most overlooked risks
        of a 50/50 founder equity split is the possibility of a startup deadlock.
      </p>

      <p className="mt-4 leading-8">
        A startup deadlock occurs when founders with equal ownership and equal
        voting power cannot agree on a significant business decision. Without a
        deadlock provision in the operating agreement, the company may become
        unable to move forward on critical issues such as fundraising, hiring,
        compensation, strategic direction, or even the sale of the business.
      </p>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
          How a 50/50 Founder Equity Split Can Create Deadlocks
        </h2>

        <p className="mt-6 leading-8">
          In the early stages of a startup, deadlocks rarely seem like a realistic
          concern. Founders are aligned, enthusiastic, and focused on building the
          company. The problem is that the most important decisions a company will
          ever face often arise years later, after significant time, money, and
          emotion have been invested into the business.
        </p>

        <p className="mt-4 leading-8">
          Imagine two founders who each own 50% of a startup. After several years
          of growth, the company receives an acquisition offer for $20 million. One
          founder wants to sell, believing the offer provides life-changing wealth
          and eliminates future business risk. The other founder believes the
          company is only beginning to gain traction and could be worth
          substantially more if they continue building for another five years.
        </p>

        <p className="mt-4 leading-8">
          Because both founders have equal voting power and no deadlock mechanism
          exists in the governing documents, neither founder can force a decision.
          The buyer eventually walks away due to uncertainty, employees become
          concerned about the company&apos;s future, and the relationship between the
          founders deteriorates. What began as a successful business opportunity
          becomes a source of conflict simply because the founders never
          established a process for resolving a tie on a major company decision.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
          Common Startup Decisions That Cause Founder Deadlocks
        </h2>

        <p className="mt-6 leading-8">
          Deadlocks can arise long before an acquisition offer is on the table.
          Consider a startup that needs additional capital to continue growing. One
          founder wants to raise venture capital, accept dilution, and
          aggressively hire employees to capture market share. The other founder
          wants to avoid outside investment, maintain ownership control, and grow
          more slowly using company revenue.
        </p>

        <p className="mt-4 leading-8">Founders may also disagree about:</p>

        <ul className="mt-4 ml-6 list-disc space-y-2 leading-8">
          <li>
            Raising capital through <Link href="/insights/post-money-safe-ownership-dilution">SAFEs or priced equity rounds</Link>
          </li>
          <li>Creating an employee stock option pool</li>
          <li>Hiring a key executive</li>
          <li>Founder salaries and distributions</li>
          <li>Taking on debt</li>
          <li>Bringing in additional co-founders</li>
          <li>Strategic pivots and business direction</li>
          <li>Selling the company</li>
        </ul>

        <p className="mt-6 leading-8">
          Each of these decisions can materially affect ownership, control,
          company finances, and long-term strategy. With a 50/50 ownership
          structure and no tie-breaking procedure, the company can become
          paralyzed at the exact moment decisive action is most critical.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
          Why Startup Deadlock Provisions Matter
        </h2>

        <p className="mt-6 leading-8">
          The solution is not necessarily to avoid equal equity splits altogether.
          In many situations, a 50/50 founder equity split may accurately reflect
          the founders&apos; contributions and expectations. The real issue arises when
          founders fail to plan for the possibility that they may one day disagree.
        </p>

        <p className="mt-4 leading-8">
          A properly drafted deadlock provision can establish a clear process for
          resolving disputes before they threaten the future of the company.
          Depending on the circumstances, this may involve mediation requirements,
          independent tie-breakers, buy-sell provisions, shotgun clauses, or other
          governance mechanisms designed to keep the business moving forward.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
          Founders Should Plan for Disagreement Before It Happens
        </h2>

        <p className="mt-6 leading-8">
          Founders often spend considerable time negotiating how startup equity
          will be divided, but comparatively little time discussing what happens
          when they reach an impasse. Yet some of the most consequential decisions
          a startup will ever face, raising capital, issuing equity, hiring
          executives, selling the company, or changing strategic direction, are
          also the decisions most likely to divide otherwise aligned founders.
        </p>

        <p className="mt-4 leading-8">
          A 50/50 founder equity split may feel fair on day one. The better
          question is what happens on day 1,000 when the founders no longer agree.
          The best time to address a startup deadlock is before one occurs.
        </p>

        <p className="mt-4 leading-8 font-medium text-white">
          If you are setting ownership terms now, pair deadlock planning with
          clean governance in your <Link href="/insights/operating-agreement-backbone-of-your-company">Operating Agreement</Link> and founder alignment tools like <Link href="/insights/what-is-vesting-and-why-founders-should-implement-it-early">vesting</Link>.
        </p>
      </section>
    </article>
  );
}
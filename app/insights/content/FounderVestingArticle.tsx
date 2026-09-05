import Link from "next/link";

export default function FounderVestingArticle() {
  return (
    <article className="mx-auto max-w-4xl text-neutral-300 leading-relaxed">
      <p className="text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
        Vesting is not about distrust. It is about protecting the company and ensuring ownership reflects contribution over time.
      </p>

      <p className="mt-6 leading-8">
        Your startup is in its earliest stages. You have a promising idea, but
        execution requires more than one person, so you bring on a few
        co-founders to help build the company.
      </p>

      <p className="mt-4 leading-8">
        At the beginning, everything feels exciting. There are late nights
        building the product, early customer wins, discussions about
        fundraising, and dreams of becoming the next Uber, Stripe, or OpenAI.
      </p>

      <p className="mt-4 leading-8">What many founders fail to consider is that people change.</p>

      <p className="mt-4 leading-8">
        Some founders lose interest. Some leave for another opportunity. Some
        become burned out after a difficult fundraising cycle. Others simply
        decide startup life is not for them.
      </p>

      <p className="mt-4 leading-8">
        Without a proper vesting schedule, an early departure can create a
        long-term problem that follows the company for years.
      </p>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
          The Problem: Dead Equity
        </h2>

        <p className="mt-6 leading-8">
          Imagine Founders A and B form a company and immediately split
          ownership 50/50.
        </p>

        <p className="mt-4 leading-8">Six months later, Founder B leaves.</p>

        <p className="mt-4 leading-8">
          Founder A spends the next ten years building the business through
          product development, hiring, fundraising, customer acquisition, and
          countless setbacks. Despite contributing nothing after month six,
          Founder B still owns 50% of the company.
        </p>

        <p className="mt-4 leading-8">
          If the company eventually sells for $100 million, Founder B receives
          the same economic benefit as the person who spent a decade creating
          that value.
        </p>

        <p className="mt-4 leading-8">
          This is commonly referred to as <strong>dead equity</strong>, equity
          owned by someone who is no longer contributing to the company&apos;s
          success.
        </p>

        <p className="mt-4 leading-8">
          Dead equity can create significant challenges when raising capital,
          recruiting key employees, negotiating acquisitions, and making
          strategic decisions, especially once ownership has to be modeled in financings like <Link href="/insights/post-money-safe-ownership-dilution">post-money SAFEs</Link>.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
          What Is Vesting?
        </h2>

        <p className="mt-6 leading-8">
          Vesting allows ownership to be earned over time rather than granted
          immediately.
        </p>

        <p className="mt-4 leading-8">The most common founder vesting schedule is:</p>

        <ul className="mt-4 ml-6 list-disc space-y-2 leading-8">
          <li>Four-year vesting period</li>
          <li>One-year cliff</li>
          <li>Monthly vesting thereafter</li>
        </ul>

        <p className="mt-6 leading-8">
          Assume four founders agree to an equal ownership split of 25% each.
        </p>

        <p className="mt-4 leading-8">Under a standard four-year vesting schedule:</p>

        <ul className="mt-4 ml-6 list-disc space-y-2 leading-8">
          <li>If a founder leaves before completing one year, they receive no vested equity.</li>
          <li>Upon reaching the one-year cliff, 25% of their equity grant vests.</li>
          <li>After the cliff, the remaining equity vests monthly over the next three years.</li>
          <li>At the end of four years, the founder is fully vested.</li>
        </ul>

        <p className="mt-6 leading-8">
          For example, a founder who leaves after three years would generally be
          approximately 75% vested. If that founder originally held a 25%
          ownership stake, they would retain roughly 18.75% ownership while the
          unvested portion would return to the company.
        </p>

        <p className="mt-4 leading-8">
          This ensures founders earn ownership through continued contribution
          rather than simply receiving it on day one.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
          Why Vesting Matters
        </h2>

        <p className="mt-6 leading-8">
          Equity is one of the most valuable assets a startup possesses.
        </p>

        <p className="mt-4 leading-8">
          Every share granted to a founder, employee, advisor, or investor
          reduces the amount available for future growth.
        </p>

        <p className="mt-4 leading-8">Vesting protects the company by:</p>

        <ul className="mt-4 ml-6 list-disc space-y-2 leading-8">
          <li>Preventing dead equity</li>
          <li>Aligning ownership with contribution</li>
          <li>Encouraging long-term commitment</li>
          <li>Preserving equity for future hires</li>
          <li>Making the company more attractive to investors</li>
        </ul>

        <p className="mt-6 leading-8">
          As the company grows, founders will likely need equity for executives,
          employees, advisors, and investors. A clean cap table with founder
          vesting is often viewed as a sign of good corporate governance and
          thoughtful planning.
        </p>

        <p className="mt-4 leading-8">
          In closely held companies, that governance usually also needs to be
          reflected in the <Link href="/insights/operating-agreement-backbone-of-your-company">Operating Agreement</Link> so founder departures and equity treatment are not left to assumption.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
          What Happens If the Company Is Sold Before Vesting Is Complete?
        </h2>

        <p className="mt-6 leading-8">
          Many founders worry that if the company is acquired before their
          shares are fully vested, they will lose the remaining unvested portion
          of their ownership.
        </p>

        <p className="mt-4 leading-8">
          That concern is typically addressed through <strong>acceleration provisions</strong>.
        </p>

        <p className="mt-4 leading-8">
          Acceleration provisions cause some or all unvested equity to vest upon
          certain triggering events.
        </p>

        <section className="mt-8">
          <h3 className="text-xl font-semibold tracking-[-0.025em] text-white md:text-2xl">
            Single-Trigger Acceleration
          </h3>

          <p className="mt-4 leading-8">
            Under a single-trigger acceleration provision, one event causes
            vesting to accelerate.
          </p>

          <p className="mt-4 leading-8">
            Most commonly, the triggering event is the sale or acquisition of
            the company.
          </p>

          <p className="mt-4 leading-8">
            For example, if Founder C is only 50% vested when the company is
            acquired, the acquisition itself may cause the remaining 50% to
            immediately vest.
          </p>

          <p className="mt-4 leading-8">
            As a result, Founder C receives the economic benefit of their entire
            equity stake in the transaction.
          </p>
        </section>

        <section className="mt-8">
          <h3 className="text-xl font-semibold tracking-[-0.025em] text-white md:text-2xl">
            Double-Trigger Acceleration
          </h3>

          <p className="mt-4 leading-8">
            Double-trigger acceleration is generally considered the market
            standard because it balances the interests of both founders and the
            acquiring company.
          </p>

          <p className="mt-4 leading-8">
            Under a double-trigger provision, two events must occur before
            acceleration takes place:
          </p>

          <ol className="mt-4 ml-6 list-decimal space-y-2 leading-8">
            <li>A change in control, such as the sale or acquisition of the company; and</li>
            <li>A qualifying employment event, such as termination without cause or resignation for good reason.</li>
          </ol>

          <section className="mt-8">
            <h4 className="text-lg font-semibold tracking-[-0.02em] text-white md:text-xl">
              Termination Without Cause
            </h4>

            <p className="mt-4 leading-8">
              After an acquisition, the buyer may decide to replace the founding
              team with new leadership.
            </p>

            <p className="mt-4 leading-8">
              If a founder is terminated for reasons unrelated to misconduct or
              performance, the founder&apos;s remaining unvested equity may
              immediately vest.
            </p>
          </section>

          <section className="mt-8">
            <h4 className="text-lg font-semibold tracking-[-0.02em] text-white md:text-xl">
              Resignation for Good Reason
            </h4>

            <p className="mt-4 leading-8">
              Sometimes a founder remains employed after an acquisition but
              experiences a significant reduction in responsibilities, authority,
              compensation, or title.
            </p>

            <p className="mt-4 leading-8">
              For example, a CEO who is demoted to a substantially lower-level
              management position may have grounds to resign for good reason.
            </p>

            <p className="mt-4 leading-8">
              When combined with a prior change in control, that resignation may
              trigger acceleration of the founder&apos;s remaining unvested equity.
            </p>
          </section>
        </section>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
          Final Thoughts
        </h2>

        <p className="mt-6 leading-8">
          Founder vesting is one of the simplest and most effective tools
          available to protect a startup&apos;s long-term health.
        </p>

        <p className="mt-4 leading-8">
          The founders who contribute to building the company should earn the
          ownership associated with that effort. Vesting helps ensure that
          happens while reducing the risk of dead equity and preserving
          flexibility for future growth.
        </p>

        <p className="mt-4 leading-8 font-medium text-white">
          The best time to implement founder vesting is at formation. The
          second-best time is before someone leaves, ideally alongside the broader legal structure discussed in <Link href="/insights/fractional-general-counsel">What Exactly Is Fractional General Counsel?</Link>.
        </p>
      </section>
    </article>
  );
}
import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "@/app/page";
import VertalisWord from "@/components/VertalisWord";
import { JsonLd, buildPersonSchema } from "@/components/StructuredData";
import ExpandableCard from "./ExpandableCard";

const title = "Tim Nichols | Frisco Business Attorney | Vertalis";
const description =
  "Texas business attorney Tim Nichols advises companies in Frisco, McKinney, Prosper, Plano, North Dallas, and across DFW on contracts and governance.";
const ogImage = "https://vertalislegal.com/vertalis-shield-preview.png";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/about/tim-nichols",
  },
  openGraph: {
    title,
    description,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
};

export default function TimNicholsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0c] text-neutral-100">
      <JsonLd data={buildPersonSchema()} />
      <Header />

      <section className="relative overflow-hidden py-14 md:py-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-8%] top-[8%] h-[420px] w-[420px] rounded-full blur-3xl bg-[rgba(192,96,32,0.14)]" />
          <div className="absolute right-[-6%] top-[24%] h-[360px] w-[360px] rounded-full blur-3xl bg-[rgba(72,90,120,0.12)]" />
        </div>

        <div className="relative mx-auto w-full max-w-5xl px-6">
          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(155deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-7 shadow-[0_28px_90px_-46px_rgba(0,0,0,0.82)] md:p-10">
            <p className="text-[0.78rem] uppercase tracking-[0.25em] text-neutral-400">
              The attorney behind{" "}
              <VertalisWord
                as="span"
                className="inline-block align-baseline font-semibold tracking-tight normal-case"
                style={{ fontSize: "156.25%", lineHeight: "inherit" }}
              >
                Vertalis
              </VertalisWord>
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.035em] text-white md:text-5xl">
              Tim Nichols
            </h1>

            <p className="mt-3 text-lg leading-8 text-neutral-300">
              Texas business attorney serving growing companies across Frisco, McKinney, Prosper, Plano, North Dallas, and the greater Dallas–Fort Worth area.
            </p>

            <div className="mt-6 max-w-3xl space-y-6 text-[1.02rem] leading-8 text-neutral-300">
              <p>
                Tim Nichols is the founder of Vertalis Legal Counsel, PLLC, a Frisco-area business law firm serving entrepreneurs, established businesses, and growing companies throughout North Texas. He helps clients navigate the contracts, ownership structures, governance systems, and disputes that shape how a business operates and grows.
              </p>

              <p>
                Tim’s practice includes commercial contract drafting and negotiation, business formation and restructuring, operating agreements, founder and ownership issues, employment and contractor matters, intellectual property ownership, startup financing, outside general counsel, and business disputes. His role is not simply to produce legal documents. It is to help business owners understand their options, evaluate risk, and make sound decisions before uncertainty becomes an expensive problem.
              </p>

              <p>
                His approach to legal counsel is shaped by a background spanning military leadership, business operations, and litigation. Before practicing law, Tim served as a Non-Commissioned Officer in the United States Air Force, supporting global operations during the post-9/11 era. He later worked in high-growth corporate environments, managing complex operational initiatives and cross-functional teams.
              </p>

              <p>
                That experience gives Tim a practical understanding of how businesses actually function—the operational pressure, competing priorities, and imperfect information behind important decisions. He approaches legal problems from both a legal and business perspective, helping clients find solutions that protect the company without unnecessarily slowing it down.
              </p>

              <p>
                Tim is licensed to practice law in Texas. He earned his Juris Doctor from the University of Missouri–Kansas City School of Law, his Master of Business Administration from Rockhurst University, and his Bachelor of Science in Public Administration from Northern Arizona University.
              </p>
            </div>

            <div className="mt-9 grid gap-5 md:grid-cols-2">
              <ExpandableCard title="Approach">
                <p>Strategic, direct, and business-minded.</p>
                <p>
                  Tim provides legal advice in plain language, with clear explanations of the available options, meaningful risks, and practical next steps. The objective is to give business owners the legal structure and judgment they need to move forward confidently—not layers of unnecessary complexity.
                </p>
                <p>
                  Whether the issue involves negotiating an important contract, restructuring ownership, managing a partner dispute, protecting intellectual property, hiring employees and contractors, or preparing the company for its next stage, Vertalis focuses on legal solutions that fit how the business actually operates.
                </p>
              </ExpandableCard>

              <ExpandableCard title="Serving Businesses Across North Texas">
                <p>
                  Vertalis is based in the Frisco area and serves businesses throughout Frisco, McKinney, Prosper, Plano, North Dallas, and the broader Dallas–Fort Worth region.
                </p>
                <p>
                  Tim works with small businesses, entrepreneurs, founders, executives, and growing companies that need responsive legal counsel for important business decisions, ongoing legal needs, or commercial disputes.
                </p>
              </ExpandableCard>

              <ExpandableCard title="Focus">
                <p>
                  Business law, commercial contracts, operating agreements, ownership and governance, business disputes, employment and contractor agreements, intellectual property ownership, startup financing, and outside general counsel.
                </p>
              </ExpandableCard>
            </div>

            <div className="mt-9">
              <h2 className="text-xl font-semibold tracking-[-0.02em] text-white">Start the Conversation</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-300">
                If your company is facing an important contract, ownership decision, business dispute, or structural issue, schedule a consultation with Vertalis Legal Counsel.
              </p>
              <div className="mt-5">
                <Link
                  href="/#contact"
                  className="relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-[linear-gradient(180deg,rgba(210,132,78,1)_0%,rgba(191,96,23,1)_100%)] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_28px_-18px_rgba(191,96,23,0.55),inset_0_1px_0_rgba(255,255,255,0.26)] transition-[transform,background,box-shadow] duration-200 ease-out hover:-translate-y-[2px] hover:bg-[linear-gradient(180deg,rgba(218,140,84,1)_0%,rgba(199,104,30,1)_100%)] hover:shadow-[0_16px_32px_-18px_rgba(191,96,23,0.62),inset_0_1px_0_rgba(255,255,255,0.3)] before:pointer-events-none before:absolute before:left-[8%] before:right-[8%] before:top-0 before:h-px before:bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,0.42),rgba(255,255,255,0))] before:content-['']"
                >
                  Start the conversation
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

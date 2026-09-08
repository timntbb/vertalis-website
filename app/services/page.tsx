import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "../page";
import { practices } from "./data";

const title = "Business Legal Services | Vertalis Legal Counsel";
const description =
  "Business legal services for growing companies in Frisco, McKinney, Prosper, Plano, North Dallas, and throughout the Dallas-Fort Worth area.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services" },
  openGraph: {
    title,
    description,
    url: "https://vertalislegal.com/services",
    siteName: "Vertalis",
    type: "website",
    images: ["https://vertalislegal.com/vertalis-shield-preview.png"],
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0a0a0c] text-neutral-100">
      <Header />

      <section className="relative isolate overflow-hidden border-b border-white/[0.08] bg-[#07080a] py-9 md:py-11">
        <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden="true">
          <div className="absolute right-[-7%] top-[-90%] h-[420px] w-[620px] rotate-[-4deg] opacity-25">
            <svg viewBox="0 0 720 360" className="h-full w-full">
              <g fill="none" stroke="#d66f24" strokeWidth="1">
                <path d="M46 270 176 174 304 232 431 91 575 159 690 54" />
                <path d="M176 174 159 55M304 232l91 82M431 91l-35-67M575 159l34 145M304 232l271-73" />
              </g>
              <g fill="#07080a" stroke="#d66f24" strokeWidth="1.5">
                {["46,270,5", "176,174,7", "159,55,4", "304,232,6", "395,314,4", "431,91,8", "396,24,4", "575,159,6", "609,304,4", "690,54,5"].map((node) => {
                  const [cx, cy, r] = node.split(",");
                  return <circle key={node} cx={cx} cy={cy} r={r} />;
                })}
              </g>
            </svg>
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_42%,rgba(214,111,36,0.08),transparent_32%)]" />
        </div>

        <div className="relative mx-auto grid w-full max-w-6xl gap-5 px-6 md:grid-cols-[1.55fr_.72fr] md:items-end md:gap-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d66f24]">How we help</p>
            <h1 className="mt-3 max-w-3xl text-[2.15rem] font-bold leading-[1.02] tracking-[-0.05em] text-[#f4f1ed] sm:text-5xl">
              Business legal services for <span className="text-[#d66f24]">growing companies.</span>
            </h1>
          </div>
          <p className="max-w-lg text-sm font-medium leading-6 text-neutral-400 md:text-[0.95rem]">
            Vertalis advises companies in Frisco, McKinney, Prosper, Plano, North Dallas, and across DFW on ownership, contracts, employment, financing, transactions, and commercial disputes.
          </p>
        </div>
      </section>

      <section className="py-7 md:py-8" aria-labelledby="practice-heading">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mb-5 flex items-end justify-between gap-6">
            <h2 id="practice-heading" className="text-xl font-semibold tracking-[-0.035em] text-white md:text-2xl">
              Five areas. One connected business.
            </h2>
            <p className="hidden text-[0.7rem] uppercase tracking-[0.16em] text-neutral-500 sm:block">
              Select a practice to see the full scope
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
            {practices.map((practice, index) => (
              <Link
                key={practice.slug}
                href={`/services/${practice.slug}`}
                className={`group flex min-w-0 flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#131316] shadow-[0_14px_38px_-28px_rgba(0,0,0,0.78)] transition duration-300 hover:-translate-y-0.5 hover:border-[#e26a2c]/50 hover:bg-[#17171b] hover:shadow-[0_18px_42px_-25px_rgba(192,96,32,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d66f24] ${index < 3 ? "md:col-span-2" : "md:col-span-3"}`}
              >
                <div className="relative flex h-36 items-center justify-center border-b border-white/[0.07] bg-[linear-gradient(160deg,rgba(192,96,32,0.10),rgba(255,255,255,0.025)_44%,rgba(8,8,10,0.82))] md:h-[118px]">
                  <Image
                    src={practice.image}
                    alt={practice.imageAlt}
                    width={512}
                    height={512}
                    className="h-[106px] w-[106px] object-contain transition duration-500 group-hover:scale-[1.035]"
                  />
                  <span className="absolute bottom-3 right-3 grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-sm text-white transition group-hover:border-[#c06020] group-hover:bg-[#c06020]" aria-hidden="true">
                    ↗
                  </span>
                </div>

                <div className="flex flex-1 flex-col px-4 py-3">
                  <h3 className="text-[1.22rem] font-semibold leading-tight tracking-[-0.025em] text-white">
                    {practice.title}
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-neutral-500">{practice.shortDescription}</p>
                  <ul className="mt-2 space-y-0.5">
                    {practice.matters.slice(0, 3).map((matter) => (
                      <li key={matter.title} className="flex gap-2 text-[0.82rem] leading-5 text-neutral-300">
                        <span className="text-[#d66f24]" aria-hidden="true">—</span>
                        <span>{matter.title}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="mt-2 flex items-center justify-between border-t border-white/[0.06] pt-2 text-xs font-semibold text-white">
                    Explore this practice
                    <ArrowRight className="h-4 w-4 text-[#e26a2c] transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.07] py-12 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d66f24]">A clearer next step</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">Not sure where your issue fits?</h2>
          <p className="mt-3 text-sm leading-6 text-neutral-400">Start with the business problem. Vertalis can help identify the legal path forward.</p>
          <Link href="/#contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[linear-gradient(180deg,#d2844e_0%,#bf6017_100%)] px-6 py-3 text-sm font-semibold tracking-[0.08em] text-white transition hover:brightness-110">
            Let’s talk <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}

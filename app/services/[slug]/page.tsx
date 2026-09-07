import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { Header } from "../../page";
import { getPractice, practices } from "../data";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return practices.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const practice = getPractice(slug);
  if (!practice) return {};

  return {
    title: `${practice.title} | Vertalis Legal Counsel`,
    description: practice.intro,
    alternates: { canonical: `/services/${practice.slug}` },
    openGraph: {
      title: `${practice.title} | Vertalis Legal Counsel`,
      description: practice.intro,
      url: `https://vertalislegal.com/services/${practice.slug}`,
      siteName: "Vertalis",
      type: "website",
      images: ["https://vertalislegal.com/vertalis-shield-preview.png"],
    },
  };
}

export default async function PracticePage({ params }: PageProps) {
  const { slug } = await params;
  const practice = getPractice(slug);
  if (!practice) notFound();

  const currentIndex = practices.findIndex((item) => item.slug === slug);
  const previous = practices[(currentIndex - 1 + practices.length) % practices.length];
  const next = practices[(currentIndex + 1) % practices.length];

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0a0a0c] text-neutral-100">
      <Header />

      <section className="relative overflow-hidden border-b border-white/[0.08] bg-[#07080a] py-10 md:py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_74%_40%,rgba(192,96,32,0.10),transparent_34%)]" />
        <div className="relative mx-auto grid w-full max-w-6xl gap-8 px-6 md:grid-cols-[1fr_.8fr] md:items-center md:gap-16">
          <div>
            <Link href="/services" className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-neutral-500 transition hover:text-[#d66f24]">
              <ArrowLeft className="h-3.5 w-3.5" /> All services
            </Link>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-[#d66f24]">How we help</p>
            <h1 className="mt-3 text-4xl font-bold leading-[0.98] tracking-[-0.055em] text-white sm:text-6xl">
              {practice.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-300">{practice.intro}</p>
          </div>
          <div className="flex min-h-64 items-center justify-center rounded-[1.75rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.035),rgba(255,255,255,0.012))] p-6">
            <Image src={practice.image} alt={practice.imageAlt} width={512} height={512} className="h-56 w-56 object-contain" priority />
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 md:grid-cols-[.55fr_1.45fr] md:gap-20">
          <div className="md:sticky md:top-32 md:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d66f24]">Common matters</p>
            <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.035em] text-white md:text-3xl">Practical counsel for the issues that move the business.</h2>
            <Link href="/#contact" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-[#e26a2c]">
              Discuss your situation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="border-t border-white/10">
            {practice.matters.map((matter) => (
              <article key={matter.title} className="grid gap-2 border-b border-white/10 py-6 sm:grid-cols-[1fr_1.2fr] sm:gap-8 sm:py-7">
                <h3 className="flex gap-3 text-lg font-semibold tracking-[-0.02em] text-white">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d66f24]" aria-hidden="true" />
                  {matter.title}
                </h3>
                <p className="text-sm leading-6 text-neutral-400">{matter.description}</p>
              </article>
            ))}

            <nav className="mt-8 flex flex-col justify-between gap-4 border-t border-white/[0.07] pt-6 text-sm sm:flex-row" aria-label="Other practices">
              <Link href={`/services/${previous.slug}`} className="inline-flex items-center gap-2 text-neutral-400 transition hover:text-[#d66f24]">
                <ArrowLeft className="h-4 w-4" /> {previous.title}
              </Link>
              <Link href={`/services/${next.slug}`} className="inline-flex items-center gap-2 text-neutral-400 transition hover:text-[#d66f24]">
                {next.title} <ArrowRight className="h-4 w-4" />
              </Link>
            </nav>
          </div>
        </div>
      </section>
    </main>
  );
}

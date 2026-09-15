import type { Metadata } from "next";
import { Header } from "../page";
import ConsultationClient from "./ConsultationClient";

const title = "Schedule a Business Law Consultation | Vertalis Legal Counsel";
const description = "Send a message or schedule a business-law consultation with Vertalis Legal Counsel in North Texas and the Dallas–Fort Worth area.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/consultation" },
  openGraph: { title, description, url: "https://vertalislegal.com/consultation", siteName: "Vertalis", type: "website" },
};

export default function ConsultationPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0a0a0c] text-neutral-100">
      <Header />
      <section className="border-b border-white/[0.08] bg-[radial-gradient(circle_at_72%_35%,rgba(214,111,36,0.10),transparent_32%),#07080a] py-10 md:py-12">
        <div className="mx-auto w-full max-w-6xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d66f24]">Start a conversation</p>
          <h1 className="mt-3 text-[2.5rem] font-bold leading-none tracking-[-0.055em] text-[#f4f1ed] sm:text-6xl">Schedule a Consultation</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-400">Tell us a little about your business. Send a message, or send your message and choose a time to talk.</p>
        </div>
      </section>
      <ConsultationClient />
    </main>
  );
}

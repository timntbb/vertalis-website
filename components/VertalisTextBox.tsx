// components/VertalisContactBox.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import VertalisWord from "@/components/VertalisWord";

type ContactFormState = {
  name: string;
  email: string;
  company: string;
  message: string;
  website: string;
};

const initialForm: ContactFormState = {
  name: "",
  email: "",
  company: "",
  message: "",
  website: "",
};

export default function VertalisTextBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<ContactFormState>(initialForm);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleClose = () => {
    if (isSubmitting) return;
    setIsOpen(false);
    setSubmitted(false);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill out your name, email, and message.");
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Something went wrong.");
      }

      setSubmitted(true);
      setForm(initialForm);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to send message.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full rounded-[32px] border border-white/8 bg-[linear-gradient(135deg,rgba(192,96,32,0.10)_0%,rgba(28,34,49,0.98)_45%,rgba(23,27,39,0.98)_100%)] shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_18px_60px_rgba(0,0,0,0.42)] overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-[310px_1fr] gap-0">
        <aside className="border-r border-white/6 bg-neutral-900/60 px-8 py-7 backdrop-blur-sm md:py-8">
          <Image
            src="/logo.png"
            alt="Vertalis shield"
            width={48}
            height={48}
            className="mb-4 h-auto w-12"
          />

          <VertalisWord
            className="select-none font-semibold leading-[0.95] tracking-[-0.035em] text-[#c06020]"
            style={{
              fontSize: "42pt",
              filter: "drop-shadow(0 10px 26px rgba(192,96,32,0.18))",
              marginLeft: "-10px",
            }}
          >
            Vertalis
          </VertalisWord>

          <div className="mt-1.5 text-sm uppercase tracking-[0.34em] text-white/38">
            Legal Counsel
          </div>

          <div className="mt-7 flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/timntbb/"
              target="_blank"
              rel="noreferrer"
              className="flex h-14 w-14 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white/85 transition-colors hover:text-white"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-6 w-6">
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6S0 4.88 0 3.5 1.11 1 2.49 1s2.49 1.12 2.49 2.5ZM.5 8h4V24h-4V8Zm7 0h3.83v2.18h.05c.53-1.01 1.84-2.18 3.8-2.18 4.06 0 4.82 2.67 4.82 6.14V24h-4v-7.02c0-1.67-.03-3.82-2.33-3.82-2.33 0-2.69 1.82-2.69 3.7V24h-4V8Z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/tim_vertalis/"
              target="_blank"
              rel="noreferrer"
              className="flex h-14 w-14 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white/85 transition-colors hover:text-white"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-6 w-6">
                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5A3.95 3.95 0 0 0 7.75 20.2h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5A3.95 3.95 0 0 0 16.25 3.8h-8.5Zm9.4 1.4a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Z" />
              </svg>
            </a>
          </div>

          <div className="mt-7 text-sm font-semibold uppercase tracking-[0.22em] text-white/82">
            Navigate
          </div>

          <nav className="mt-4 space-y-2.5 text-[1.05rem] text-white/78">
            <Link
              href="/"
              className="flex items-center justify-between border-b border-white/6 pb-3 transition-colors hover:text-white"
            >
              <span>Home</span>
              <ArrowRight className="h-4 w-4 text-white/36" />
            </Link>
            <Link
              href="/about/tim-nichols"
              className="flex items-center justify-between border-b border-white/6 pb-3 transition-colors hover:text-white"
            >
              <span>About</span>
              <ArrowRight className="h-4 w-4 text-white/36" />
            </Link>
            <Link
              href="/insights"
              className="flex items-center justify-between border-b border-white/6 pb-3 transition-colors hover:text-white"
            >
              <span>Insights</span>
              <ArrowRight className="h-4 w-4 text-white/36" />
            </Link>
            <a
              href="mailto:tim@vertalislegal.com"
              className="flex items-center justify-between border-b border-white/6 pb-3 transition-colors hover:text-white"
            >
              <span>Contact</span>
              <ArrowRight className="h-4 w-4 text-white/36" />
            </a>
          </nav>
        </aside>

        <div className="px-8 py-7 md:px-10 md:py-8">
          <div className="max-w-4xl">
            <h2 className="text-5xl md:text-[4.4rem] leading-[0.94] tracking-[-0.055em] font-semibold text-white">
              Start the conversation
            </h2>

            {!isOpen && !submitted && (
              <>
                <p className="mt-5 max-w-4xl text-[1.15rem] md:text-[1.28rem] leading-[1.76] text-white/70">
                  Tell me what you're building, where the friction is, and what
                  kind of legal support you need. Vertalis is built for founders
                  who want practical guidance on contracts, governance, capital
                  readiness, and AI risk.
                </p>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="inline-flex items-center gap-4 rounded-[24px] bg-gradient-to-b from-[#de8a46] to-[#c06020] px-9 py-5 text-[1.05rem] font-semibold text-white shadow-[0_14px_34px_rgba(192,96,32,0.30)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(192,96,32,0.36)]"
                  >
                    Start the conversation
                    <span>→</span>
                  </button>
                </div>

                <p className="mt-6 max-w-3xl text-[1.05rem] md:text-[1.15rem] leading-[1.68] text-white/46">
                  Best for founders who need sharp legal guidance on contracts,
                  governance, capital readiness, and AI risk.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  {["Contracts", "Governance", "AI + Capital Readiness"].map(
                    (item) => (
                      <span
                        key={item}
                        className="rounded-[18px] border border-white/12 bg-white/[0.03] px-5 py-3 text-[1rem] text-white/76"
                      >
                        {item}
                      </span>
                    )
                  )}
                </div>
              </>
            )}

            {isOpen && !submitted && (
              <div className="mt-8 rounded-[26px] border border-white/10 bg-black/20 p-5 md:p-6 backdrop-blur-sm">
                <div className="mb-4 flex justify-end">
                  <button
                    onClick={handleClose}
                    type="button"
                    className="text-sm text-white/48 transition hover:text-white"
                  >
                    Close ×
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-white/46">
                        Name
                      </span>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        autoComplete="name"
                        className="w-full rounded-[20px] border border-white/10 bg-white/[0.035] px-4 py-4 text-white outline-none placeholder:text-white/26 transition focus:border-[#c06020]/60 focus:bg-white/[0.05]"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-white/46">
                        Email
                      </span>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        autoComplete="email"
                        className="w-full rounded-[20px] border border-white/10 bg-white/[0.035] px-4 py-4 text-white outline-none placeholder:text-white/26 transition focus:border-[#c06020]/60 focus:bg-white/[0.05]"
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-white/46">
                      Company
                    </span>
                    <input
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Company name"
                      autoComplete="organization"
                      className="w-full rounded-[20px] border border-white/10 bg-white/[0.035] px-4 py-4 text-white outline-none placeholder:text-white/26 transition focus:border-[#c06020]/60 focus:bg-white/[0.05]"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-white/46">
                      Message
                    </span>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={6}
                      placeholder="Tell me what you're building, where the friction is, and what kind of legal support you need."
                      className="w-full resize-none rounded-[20px] border border-white/10 bg-white/[0.035] px-4 py-4 text-white outline-none placeholder:text-white/26 transition focus:border-[#c06020]/60 focus:bg-white/[0.05]"
                    />
                  </label>

                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website">
                      Website
                      <input
                        id="website"
                        name="website"
                        type="text"
                        value={form.website}
                        onChange={handleChange}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </label>
                  </div>

                  {error && (
                    <div className="rounded-[18px] border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                      {error}
                    </div>
                  )}

                  <div className="flex flex-col gap-4 pt-1 md:flex-row md:items-center md:justify-between">
                    <p className="max-w-2xl text-sm leading-7 text-white/40">
                      No pressure, no commitment. If it makes sense, we’ll go
                      deeper. If not, you’ll still leave with clarity.
                    </p>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-3 rounded-[22px] bg-gradient-to-b from-[#de8a46] to-[#c06020] px-8 py-4 text-[1rem] font-semibold text-white shadow-[0_14px_34px_rgba(192,96,32,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(192,96,32,0.34)] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isSubmitting ? "Sending..." : "Send to Vertalis"}
                      {!isSubmitting && <span>→</span>}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {submitted && (
              <div className="mt-8 rounded-[26px] border border-[#c06020]/20 bg-[linear-gradient(180deg,rgba(192,96,32,0.10),rgba(192,96,32,0.04))] px-6 py-7">
                <div className="text-sm uppercase tracking-[0.22em] text-[#df8a45]">
                  Message submitted
                </div>
                <h3 className="mt-3 text-2xl md:text-3xl font-semibold tracking-[-0.03em] text-white">
                  Your message has been sent to Vertalis.
                </h3>
                <p className="mt-4 max-w-3xl text-[1.02rem] leading-8 text-white/62">
                  Thank you for reaching out. We have your message and will
                  review it shortly. If it makes sense to go deeper, we’ll
                  follow up. If not, you’ll still hear back with clarity on the
                  next step.
                </p>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setIsOpen(false);
                    }}
                    className="text-sm text-white/48 transition hover:text-white"
                  >
                    Close ×
                  </button>
                </div>
              </div>
            )}

            <p className="mt-8 text-sm md:text-base text-white/34">
              Prefer email instead?{" "}
              <a
                href="mailto:tim@vertalislegal.com"
                className="text-white/58 transition hover:text-white"
              >
                tim@vertalislegal.com
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/25 px-6 py-5 md:px-8 md:py-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/65">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <Link href="/insights" className="transition-colors hover:text-white">
              Insights
            </Link>
            <Link href="/terms-of-use" className="transition-colors hover:text-white">
              Terms of Use
            </Link>
          </nav>

          <p className="text-xs tracking-[0.08em] text-white/50 md:text-sm">
            © 2026, Vertalis Legal Counsel, PLLC
          </p>
        </div>
      </div>
    </section>
  );
}
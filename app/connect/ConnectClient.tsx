"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  AtSign,
  Camera,
  Globe2,
  Mail,
  Phone,
} from "lucide-react";
import styles from "./connect.module.css";

const contactLinks = [
  { label: "Email", detail: "tim@vertalislegal.com", href: "mailto:tim@vertalislegal.com", icon: Mail },
  { label: "Call", detail: "(469) 731-4109", href: "tel:+14697314109", icon: Phone },
  { label: "LinkedIn", detail: "Connect", href: "https://www.linkedin.com/in/timntbb/", icon: AtSign },
  { label: "Instagram", detail: "Follow Vertalis", href: "https://www.instagram.com/tim_vertalis/", icon: Camera },
  { label: "Website", detail: "VertalisLegal.com", href: "https://vertalislegal.com", icon: Globe2 },
];

export default function ConnectClient() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function submitSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = data.get("email")?.toString().trim() || "";

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("error");
      setMessage("Enter a valid email address.");
      return;
    }

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/insights-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website: data.get("website") }),
      });

      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "Submission failed.");

      setStatus("success");
      setMessage("Thank you — you’re on the Vertalis updates list.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again or email tim@vertalislegal.com.");
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <section className={`${styles.card} ${styles.identity}`} aria-labelledby="tim-nichols">
          <div className={styles.logo}>
            <Image src="/logo.png" alt="Vertalis Legal Counsel" width={110} height={110} priority />
          </div>
          <div className={styles.brandName} aria-label="Vertalis Legal Counsel, PLLC">
            <strong>Vertalis</strong>
            <span>Legal Counsel, PLLC</span>
          </div>
          <h1 id="tim-nichols">Tim Nichols</h1>
          <p className={styles.role}>Attorney &amp; Founder</p>
          <p className={styles.positioning}>Business counsel for growing companies across North Texas.</p>

          <div className={styles.actions}>
            <a className={`${styles.button} ${styles.primary}`} href="https://cal.com/vertalislc/meeting-with-tim" target="_blank" rel="noreferrer">
              Schedule a Meeting <ArrowUpRight aria-hidden="true" />
            </a>
            <a className={`${styles.button} ${styles.secondary}`} href="/tim-nichols.vcf" download>
              Save My Contact
            </a>
          </div>

          <div className={styles.contactRows} aria-label="Contact and social links">
            {contactLinks.map(({ label, detail, href, icon: Icon }) => {
              const external = href.startsWith("http");
              return (
                <a className={styles.contactRow} href={href} key={label} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
                  <span className={styles.contactIcon}><Icon aria-hidden="true" /></span>
                  <span className={styles.contactCopy}><strong>{label}</strong><small>{detail}</small></span>
                  <ArrowRight className={styles.contactArrow} aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </section>

        <section className={`${styles.card} ${styles.contentCard}`} aria-labelledby="about-vertalis">
          <p className={styles.eyebrow}>Vertalis Legal Counsel</p>
          <h2 id="about-vertalis">Modern Counsel for Growing Companies.</h2>
          <p>Vertalis helps business owners navigate contracts, ownership issues, employees, transactions, growth, and business disputes with practical legal counsel built around the company they are actually trying to build.</p>
          <Link className={styles.textLink} href="/services">Explore Vertalis <ArrowUpRight aria-hidden="true" /></Link>
        </section>

        <section className={`${styles.card} ${styles.contentCard}`} aria-labelledby="vertalis-insights">
          <p className={styles.eyebrow}>Stay Connected</p>
          <h2 id="vertalis-insights">Get New Insights From Vertalis</h2>
          <p>Practical legal insights for business owners, founders, and growing companies — delivered occasionally when there is something worth sharing.</p>
          <form className={styles.form} onSubmit={submitSignup} noValidate>
            <input className={styles.honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" />
            <label htmlFor="connect-email">Email Address</label>
            <input id="connect-email" name="email" type="email" inputMode="email" autoComplete="email" placeholder="you@company.com" required />
            <button type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Get Vertalis Updates"}</button>
            <p className={styles.support}>No spam. Just useful legal and business insights from Vertalis.</p>
            <p className={`${styles.formStatus} ${styles[status]}`} aria-live="polite">{message}</p>
          </form>
        </section>

        <footer className={styles.footer}>
          <strong>Vertalis Legal Counsel, PLLC</strong>
          <p>Frisco · McKinney · Plano · Prosper · Dallas</p>
          <nav aria-label="Connect page footer"><Link href="/">Home</Link><Link href="/services">Services</Link><Link href="/insights">Insights</Link></nav>
        </footer>
      </div>
    </main>
  );
}

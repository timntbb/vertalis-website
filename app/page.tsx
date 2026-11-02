"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import VertalisTextBox from "@/components/VertalisTextBox";
import VertalisWord from "@/components/VertalisWord";
import HeroNetworkCanvas from "@/components/HeroNetworkCanvas";
import { JsonLd, buildOrganizationSchema } from "@/components/StructuredData";
import { practices } from "./services/data";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Check,
  Menu,
  X,
  Scale,
  Lock,
  BadgeCheck,
  FileText,
  ScrollText,
  MapPin,
  Mail,
  Handshake,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const tokens = {
  bg: "#0a0a0c",
  accent: "#c06020",
};

type IntroPoint = {
  title: string;
  desc: string;
  icon: React.ReactNode;
};

const introPoints: IntroPoint[] = [
  {
    title: "Founder-side judgment",
    desc: "Practical guidance for founders who need clarity, speed, and clean execution.",
    icon: <Handshake className="h-5 w-5" />,
  },
  {
    title: "Business-first counsel",
    desc: "Advice designed to support momentum, not slow the company down with unnecessary friction.",
    icon: <Scale className="h-5 w-5" />,
  },
  {
    title: "Clear legal execution",
    desc: "Direct advice and practical documents that support the business decisions at hand.",
    icon: <FileText className="h-5 w-5" />,
  },
];


const aboutNavigationLinks: Array<[string, string]> = [
  ["Our Approach", "/#about"],
  ["Meet the Attorney", "/about/tim-nichols"],
  ["Founders", "/about/founders"],
  ["Governance", "/about/governance"],
  ["Capital Strategy", "/about/investors"],
  ["Employees", "/about/employees"],
  ["Intellectual Property", "/about/ip"],
];

const homepageServiceCopy: Record<string, { description: string; examples: string[] }> = {
  "company-ownership": {
    description: "Build a clear foundation for ownership, management, and the future of your business.",
    examples: ["Operating agreements", "LLC formation & restructuring", "Ownership changes & buy-sell agreements"],
  },
  "contracts-transactions": {
    description: "Protect your business when entering, negotiating, or ending commercial agreements.",
    examples: ["Contract drafting & review", "Commercial leases", "Vendor & customer agreements"],
  },
  "people-operations": {
    description: "Navigate the legal decisions involved in hiring, managing, and protecting your team.",
    examples: ["Employment agreements", "Independent contractors", "Employee terminations & workplace issues"],
  },
  "growth-capital": {
    description: "Structure investment and expansion while protecting your company's ownership and control.",
    examples: ["SAFEs & convertible instruments", "Investor agreements & equity", "Business purchases & acquisitions"],
  },
  "disputes-litigation": {
    description: "Address commercial conflicts and protect your business when relationships break down.",
    examples: ["Unpaid invoices & collections", "Breach of contract", "Business partner disputes"],
  },
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-6">{children}</div>;
}

function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

function Divider() {
  return <div className="h-px w-full bg-white/10" />;
}

function Card({
  children,
  className,
  tone = "light",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  const base = tone === "dark" ? "bg-[#131316] text-white" : "bg-white/5 text-white";

  return (
    <div
      className={cx(
        "relative rounded-3xl border border-white/10 shadow-md",
        base,
        className
      )}
    >
      <div className="relative">{children}</div>
    </div>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  className,
  style,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  style?: React.CSSProperties;
}) {
  const pathname = usePathname();

  const base =
    "group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-colors duration-150 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20";

  const onClickScroll: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (!href.startsWith("#")) return;
    if (pathname !== "/") return;

    e.preventDefault();
    const id = href.slice(1);
    const el = document.getElementById(id);

    if (!el) {
      window.location.hash = href;
      return;
    }

    const headerOffset = 96;
    const y = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: Math.max(0, y - headerOffset), behavior: "smooth" });
    window.history.replaceState(null, "", href);
  };

  const finalHref = href.startsWith("#") && pathname !== "/" ? `/${href}` : href;

  if (variant === "primary") {
    return (
      <a
        href={finalHref}
        onClick={onClickScroll}
        className={cx(
          base,
          "relative overflow-hidden text-white bg-[linear-gradient(180deg,rgba(210,132,78,1)_0%,rgba(191,96,23,1)_100%)] shadow-[0_12px_28px_-18px_rgba(191,96,23,0.55),inset_0_1px_0_rgba(255,255,255,0.26)] transition-[transform,background,box-shadow] duration-200 ease-out hover:-translate-y-[2px] hover:bg-[linear-gradient(180deg,rgba(218,140,84,1)_0%,rgba(199,104,30,1)_100%)] hover:shadow-[0_16px_32px_-18px_rgba(191,96,23,0.62),inset_0_1px_0_rgba(255,255,255,0.3)] before:pointer-events-none before:absolute before:left-[8%] before:right-[8%] before:top-0 before:h-px before:bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,0.42),rgba(255,255,255,0))] before:content-['']",
          className
        )}
        style={style}
      >
        <span>{children}</span>
      </a>
    );
  }

  if (variant === "secondary") {
    return (
      <a
        href={finalHref}
        onClick={onClickScroll}
        className={cx(
          base,
          "border border-neutral-600 text-white hover:bg-neutral-800",
          className
        )}
        style={style}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      href={finalHref}
      onClick={onClickScroll}
      className={cx(base, "text-neutral-300 hover:text-white", className)}
      style={style}
    >
      {children}
    </a>
  );
}

export function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = React.useState(false);

  const onClickScroll: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (!href.startsWith("#")) return;
    if (pathname !== "/") return;

    e.preventDefault();
    const id = href.slice(1);
    const el = document.getElementById(id);

    if (!el) {
      window.location.hash = href;
      return;
    }

    const headerOffset = 96;
    const y = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: Math.max(0, y - headerOffset), behavior: "smooth" });
    window.history.replaceState(null, "", href);
  };

  const finalHref = href.startsWith("#") && pathname !== "/" ? `/${href}` : href;
  const isActive = !href.startsWith("#") && (pathname === href || pathname.startsWith(`${href}/`));

  return (
    <a
      href={finalHref}
      onClick={onClickScroll}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cx(
        "relative focus:outline-none focus-visible:ring-2 focus-visible:ring-white/15",
        isActive
          ? "text-[15px] font-medium tracking-[0.08em] text-white hover:text-[#e26a2c] transition-all duration-300 ease-out"
          : "text-[15px] font-medium tracking-[0.08em] text-white/70 hover:text-[#e26a2c] hover:-translate-y-[1px] transition-all duration-300 ease-out"
      )}
    >
      {label}
      {(isHovered || isActive) ? (
        <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-[#e26a2c] to-[#c7521e] shadow-[0_0_8px_rgba(226,106,44,0.5)]"></div>
      ) : null}
    </a>
  );
}

function AboutNavItem() {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isFocusedWithin, setIsFocusedWithin] = React.useState(false);
  const showMenu = isHovered || isOpen || isFocusedWithin;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsOpen(false);
      }}
      onFocus={() => setIsFocusedWithin(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsFocusedWithin(false);
          setIsOpen(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setIsOpen(false);
          setIsHovered(false);
          (event.currentTarget.querySelector("button") as HTMLButtonElement | null)?.focus();
        }
      }}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={showMenu}
        aria-controls="vertalis-about-menu"
        className={cx(
          "inline-flex items-center gap-1.5 text-[15px] font-medium tracking-[0.08em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d66f24]/50",
          showMenu ? "text-[#e26a2c]" : "text-white/70 hover:text-[#e26a2c]"
        )}
      >
        About
        <ChevronDown className={cx("h-3.5 w-3.5 transition-transform duration-200", showMenu && "rotate-180")} aria-hidden="true" />
      </button>
      <div
        id="vertalis-about-menu"
        className={cx(
          "absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-3 transition-all duration-150",
          showMenu ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
        )}
        aria-hidden={!showMenu}
      >
        <nav aria-label="About Vertalis" className="rounded-2xl border border-white/12 bg-[#101013]/95 p-2 shadow-[0_20px_55px_-25px_rgba(0,0,0,0.95)] backdrop-blur-xl">
          {aboutNavigationLinks.map(([label, href], index) => (
            <React.Fragment key={href}>
              {index === 2 ? <div className="mx-3 my-2 h-px bg-white/10" aria-hidden="true" /> : null}
              <a
                href={href}
                onClick={() => setIsOpen(false)}
                tabIndex={showMenu ? 0 : -1}
                className="block rounded-xl px-3 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/[0.05] hover:text-[#e9a778] focus-visible:bg-white/[0.05] focus-visible:text-[#e9a778] focus-visible:outline-none"
              >
                {label}
              </a>
            </React.Fragment>
          ))}
        </nav>
      </div>
    </div>
  );
}

function ServicesNavItem() {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isFocusedWithin, setIsFocusedWithin] = React.useState(false);

  const showMenu = isHovered || isFocusedWithin;

  const items: Array<[string, string]> = [
    ["Company & Ownership", "/services/company-ownership"],
    ["Contracts & Transactions", "/services/contracts-transactions"],
    ["People & Operations", "/services/people-operations"],
    ["Growth & Capital", "/services/growth-capital"],
    ["Disputes & Litigation", "/services/disputes-litigation"],
  ];

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocusedWithin(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setIsFocusedWithin(false);
        }
      }}
    >
      <a
        href="/services"
        aria-haspopup="menu"
        className={cx(
          "relative focus:outline-none focus-visible:ring-2 focus-visible:ring-white/15",
          showMenu
            ? "text-[15px] font-medium tracking-[0.08em] text-white hover:text-[#e26a2c] transition-all duration-300 ease-out"
            : "text-[15px] font-medium tracking-[0.08em] text-white/70 hover:text-[#e26a2c] hover:-translate-y-[1px] transition-all duration-300 ease-out"
        )}
      >
        Services
        {showMenu ? (
          <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-[#e26a2c] to-[#c7521e] shadow-[0_0_8px_rgba(226,106,44,0.5)]"></div>
        ) : null}
      </a>

      <div
        className={cx(
          "absolute left-1/2 top-full z-50 mt-0 w-64 -translate-x-1/2 pt-2",
          "transition-all duration-150",
          showMenu ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
        )}
      >
        <div className="rounded-2xl border border-white/12 bg-[linear-gradient(180deg,rgba(18,18,22,0.94),rgba(10,10,13,0.96))] shadow-[0_20px_55px_-32px_rgba(0,0,0,0.95)] backdrop-blur-xl">
          <div className="p-2" role="menu" aria-label="Services">
            {items.map(([label, href]) => (
              <a
                key={href}
                href={href}
                role="menuitem"
                className="block rounded-xl px-3 py-2.5 text-[15px] font-medium tracking-[0.04em] text-white/70 transition-all duration-300 ease-out hover:-translate-y-[1px] hover:text-[#e26a2c] hover:[text-shadow:0_0_12px_rgba(226,106,44,0.38)] focus:outline-none focus-visible:text-[#e26a2c] focus-visible:[text-shadow:0_0_12px_rgba(226,106,44,0.38)]"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  desc,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 py-16 md:scroll-mt-32 md:py-20">
      <Container>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            {eyebrow ? (
              <div className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-4 text-sm text-neutral-300">
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: tokens.accent }}
                />
                {eyebrow}
              </div>
            ) : null}
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
              {title}
            </h2>
            {desc ? (
              <p className="mt-3 max-w-2xl text-base leading-7 text-neutral-300">{desc}</p>
            ) : null}
          </div>
        </div>
        <div className="mt-12 md:mt-14">{children}</div>
      </Container>
    </section>
  );
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = React.useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = React.useState(false);

  const navItems: Array<[string, string]> = [
    ["About", "/#about"],
    ["Services", "/services"],
    ["Insights", "/insights"],
    ["Contact", "#contact"],
  ];

  const headerScale = 0.8;
  const scaled = (value: number, min = 0) => `${Math.max(min, Math.round(value * headerScale))}px`;

  const headerHeight = `calc(${scaled(78, 60)} + 30px)`;
  const logoSize = `calc(${scaled(84, 68)} + 10px)`;
  const logoTextSize = scaled(28, 22);
  const subTextSize = scaled(16, 12);
  const brandGap = scaled(24, 18);

  const mobileServiceLinks: Array<[string, string]> = [
    ["Company & Ownership", "/services/company-ownership"],
    ["Contracts & Transactions", "/services/contracts-transactions"],
    ["People & Operations", "/services/people-operations"],
    ["Growth & Capital", "/services/growth-capital"],
    ["Disputes & Litigation", "/services/disputes-litigation"],
  ];

  const onMobileLinkClick = (href: string): React.MouseEventHandler<HTMLAnchorElement> => {
    return (e) => {
      setMobileOpen(false);
      setMobileAboutOpen(false);
      setMobileServicesOpen(false);

      if (!href.startsWith("#")) return;
      if (pathname !== "/") return;

      e.preventDefault();
      const id = href.slice(1);
      const el = document.getElementById(id);

      if (!el) {
        window.location.hash = href;
        return;
      }

      const headerOffset = 96;
      const y = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: Math.max(0, y - headerOffset), behavior: "smooth" });
      window.history.replaceState(null, "", href);
    };
  };

  const toHref = (href: string) => (href.startsWith("#") && pathname !== "/" ? `/${href}` : href);

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/70 border-b border-white/5 shadow-[0_6px_24px_rgba(0,0,0,0.45)]"
        style={{ height: headerHeight }}
      >
        <Container>
          <div className="relative flex h-full items-center justify-between">
          <Link
            href="/"
            className="flex shrink-0 items-center transition-all duration-200 hover:opacity-90"
            style={{ gap: brandGap }}
          >
            <div className="relative flex items-center">
              <div className="absolute -z-10 w-[120px] h-[120px] bg-[radial-gradient(circle,rgba(255,122,44,0.25)_0%,rgba(255,122,44,0.05)_40%,transparent_70%)] blur-xl"></div>
              <Image
                src="/logo.png"
                alt="Vertalis logo"
                width={72}
                height={72}
                priority
                className="w-auto scale-[1.1]"
                style={{ height: logoSize }}
              />
            </div>
            <div className="leading-tight">
              <VertalisWord
                className="font-semibold tracking-tight"
                style={{ fontSize: logoTextSize, filter: "drop-shadow(0 10px 26px rgba(192,96,32,0.18))" }}
              >
                Vertalis
              </VertalisWord>
              <div
                className="tracking-wide text-neutral-300"
                style={{ fontSize: subTextSize }}
              >
                Legal Counsel, PLLC
              </div>
            </div>
          </Link>

          <nav
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 whitespace-nowrap lg:flex xl:gap-9"
          >
            {navItems.map(([label, href]) =>
              label === "Services" ? (
                <ServicesNavItem key={href} />
              ) : label === "About" ? (
                <AboutNavItem key={href} />
              ) : (
                <NavLink key={href} href={href} label={label} />
              )
            )}
          </nav>

          <div className="hidden shrink-0 lg:block">
            <Button
              href="/consultation"
              className="rounded-full px-6 py-2 text-sm tracking-[0.12em]"
            >
              Free Consultation
            </Button>
          </div>

          <div className="ml-2 lg:hidden">
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => {
                setMobileOpen((prev) => {
                  const next = !prev;
                  if (!next) {
                    setMobileAboutOpen(false);
                    setMobileServicesOpen(false);
                  }
                  return next;
                });
              }}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/12 bg-white/[0.03] text-neutral-200 transition-colors hover:bg-white/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
          </div>

          <div
            className={cx(
              "absolute left-0 right-0 top-full max-h-[calc(100dvh-92px)] overflow-y-auto border-b border-neutral-800 bg-[#0a0a0c]/98 px-6 pb-5 pt-3 backdrop-blur-md lg:hidden",
              mobileOpen ? "block" : "hidden"
            )}
          >
            <nav className="grid gap-2" aria-label="Mobile navigation">
              <a
                href={toHref("#top")}
                onClick={onMobileLinkClick("#top")}
                className="rounded-lg px-3 py-2.5 text-sm uppercase tracking-[0.16em] text-neutral-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                Home
              </a>

              <div className="rounded-lg border border-white/10 bg-white/[0.02]">
                <button
                  type="button"
                  onClick={() => setMobileAboutOpen((prev) => !prev)}
                  aria-expanded={mobileAboutOpen}
                  aria-controls="vertalis-mobile-about"
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm uppercase tracking-[0.16em] text-neutral-300 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <span>About</span>
                  <ChevronDown className={cx("h-4 w-4 transition-transform duration-200", mobileAboutOpen && "rotate-180")} aria-hidden="true" />
                </button>
                {mobileAboutOpen ? (
                  <div id="vertalis-mobile-about" className="grid gap-1 px-2 pb-2">
                    {aboutNavigationLinks.map(([label, href]) => (
                      <a
                        key={href}
                        href={toHref(href)}
                        onClick={onMobileLinkClick(href)}
                        className="rounded-md px-3 py-2 text-[15px] font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-[#e9a778]"
                      >
                        {label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="rounded-lg border border-white/10 bg-white/[0.02]">
                <div className="flex items-center justify-between">
                  <a
                    href="/services"
                    onClick={onMobileLinkClick("/services")}
                    className="flex-1 rounded-lg px-3 py-2.5 text-sm uppercase tracking-[0.16em] text-neutral-300 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    Services
                  </a>
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen((prev) => !prev)}
                    aria-label="Show service links"
                    aria-controls="vertalis-mobile-services"
                    aria-expanded={mobileServicesOpen}
                    className="rounded-lg px-3 py-2.5 text-neutral-300 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <ChevronDown className={cx("h-4 w-4 transition-transform duration-200", mobileServicesOpen && "rotate-180")} aria-hidden="true" />
                  </button>
                </div>
                {mobileServicesOpen ? (
                  <div id="vertalis-mobile-services" className="grid gap-1 px-2 pb-2">
                    {mobileServiceLinks.map(([label, href]) => (
                      <a
                        key={href}
                        href={href}
                        onClick={onMobileLinkClick(href)}
                        className="rounded-md px-3 py-2 text-[15px] font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-[#e9a778]"
                      >
                        {label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>

              {([["Insights", "/insights"], ["Contact", "#contact"]] as Array<[string, string]>).map(([label, href]) => (
                <a
                  key={label}
                  href={toHref(href)}
                  onClick={onMobileLinkClick(href)}
                  className="rounded-lg px-3 py-2.5 text-sm uppercase tracking-[0.16em] text-neutral-300 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {label}
                </a>
              ))}
            </nav>

            <div className="mt-4">
              <Button href="/consultation" className="w-full">
                Free Consultation
              </Button>
            </div>
          </div>
        </Container>
      </header>
      <div aria-hidden="true" style={{ height: headerHeight }} />
    </>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden text-neutral-100" style={{ backgroundColor: "#0a0a0c" }} id="pageRoot">
      <JsonLd data={buildOrganizationSchema()} />
      <Header />

      <section className="relative isolate overflow-hidden" id="top">
        <div
          className="relative min-h-[560px] overflow-hidden md:min-h-[clamp(590px,calc(80vh-96px),800px)]"
          style={{
            background:
              "radial-gradient(circle at 70% 42%, rgba(214,111,36,.08), transparent 32%), radial-gradient(circle at 50% 50%, rgba(255,255,255,.02), transparent 42%), #07080a",
          }}
        >
          <HeroNetworkCanvas className="absolute inset-0 block h-full w-full" />

          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at center, rgba(7,8,10,.18) 0%, rgba(7,8,10,.42) 56%, rgba(7,8,10,.72) 100%), linear-gradient(180deg, rgba(7,8,10,.08) 0%, rgba(7,8,10,.18) 68%, rgba(7,8,10,.78) 100%)",
            }}
          />

          <Container>
            <div className="relative z-10 flex min-h-[560px] items-center justify-center pb-20 pt-12 text-center md:min-h-[clamp(590px,calc(80vh-96px),800px)] md:pb-24 md:pt-14">
              <div className="w-full max-w-[900px] pt-4 md:pt-6">
                <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#cbc5bf] md:text-[13px]">
                  Business counsel for growing companies across North Texas
                </p>

                <h1 className="mx-auto max-w-[850px] text-[clamp(43px,5.6vw,86px)] font-bold leading-[0.94] tracking-[-0.055em] text-[#f4f1ed]">
                  Modern Counsel for <span className="text-[#d66f24]">Growing Companies.</span>
                </h1>

                <p className="mx-auto mt-6 max-w-[720px] text-[clamp(17px,1.45vw,21px)] font-semibold leading-[1.62] text-[#b8b3ae]">
                  Vertalis helps growing companies structure deals, navigate contracts, raise capital, resolve disputes, and make the legal decisions that shape what comes next.
                </p>

                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <a
                    href="/consultation"
                    className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full border border-[rgba(214,111,36,.65)] bg-[rgba(214,111,36,.16)] px-7 text-[15px] font-semibold text-white backdrop-blur-[8px] transition-[transform,background-color,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-[rgba(214,111,36,.9)] hover:bg-[rgba(214,111,36,.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d66f24] sm:w-auto"
                  >
                    Schedule a Free Consultation
                  </a>
                  <a
                    href="#services"
                    className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-white/[0.025] px-7 text-[15px] font-semibold text-neutral-200 transition-[transform,background-color,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-white/45 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:w-auto"
                  >
                    Explore Legal Services
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </Container>

          <div className="pointer-events-none absolute bottom-7 left-1/2 w-[min(92%,980px)] -translate-x-1/2 text-center text-[11px] uppercase tracking-[0.18em] text-[#726e6a]">
            Frisco · McKinney · Prosper · Plano · North Dallas · DFW
          </div>

          <div className="pointer-events-none absolute bottom-7 right-[clamp(24px,5vw,72px)] hidden text-[10px] uppercase tracking-[0.22em] text-[#716d69] [writing-mode:vertical-rl] md:block">
            Scroll to explore
          </div>
        </div>
      </section>

      <Divider />

      <section
        id="services"
        aria-labelledby="home-services-title"
        className="relative isolate scroll-mt-28 overflow-hidden border-b border-white/[0.07] bg-[#0b0b0e] py-14 md:scroll-mt-32 md:py-20"
      >
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_2%_18%,rgba(192,96,32,0.10),transparent_37%),radial-gradient(ellipse_at_95%_85%,rgba(192,96,32,0.045),transparent_34%)]" />
          <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.13)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_75%,transparent)]" />
        </div>
        <Container>
          <div className="relative">
            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start lg:gap-12">
              <div className="max-w-[790px]">
                <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#d98b58]">
                  <span className="h-px w-8 bg-[#c06020]" aria-hidden="true" />
                  Business Legal Services
                </p>
                <h2 id="home-services-title" className="mt-4 text-3xl font-semibold leading-[1.12] tracking-[-0.045em] text-[#f4f1ed] md:text-[2.65rem]">
                  Legal support for the <span className="text-[#d66f24]">decisions, deals, and disputes</span> that shape your business.
                </h2>
                <p className="mt-4 max-w-[730px] text-[15px] leading-7 text-neutral-300 md:text-base">
                  From operating agreements and commercial contracts to hiring, financing, and business disputes,
                  Vertalis provides practical legal guidance to growing companies across North Texas.
                </p>
              </div>
              <div className="hidden shrink-0 items-center gap-3 rounded-2xl border border-[#c06020]/20 bg-[linear-gradient(135deg,rgba(192,96,32,0.12),rgba(255,255,255,0.015))] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] lg:flex">
                <Image
                  src="/logo.png"
                  alt=""
                  width={46}
                  height={46}
                  className="h-11 w-auto object-contain"
                />
                <div className="leading-tight">
                  <VertalisWord as="span" className="block text-[22px] font-semibold tracking-tight">Vertalis</VertalisWord>
                  <span className="mt-1 block text-[9px] uppercase tracking-[0.21em] text-neutral-400">Legal Counsel, PLLC</span>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-3.5">
              {practices.map((practice) => {
                const copy = homepageServiceCopy[practice.slug];
                return (
                  <Link
                    key={practice.slug}
                    href={`/services/${practice.slug}`}
                    aria-label={`Explore ${practice.title} legal services`}
                    className="group relative isolate block overflow-hidden rounded-[22px] border border-white/[0.16] bg-[#141316] px-4 py-4 shadow-[0_12px_34px_-26px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.035)] transition-[border-color,background-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-[1px] hover:border-[#B65E2E]/75 hover:bg-[#191416] hover:shadow-[0_18px_45px_-27px_rgba(192,96,32,0.30),inset_0_1px_0_rgba(255,255,255,0.07)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B65E2E] sm:px-5 md:px-6 md:py-5"
                  >
                    <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(182,94,46,0.15),rgba(182,94,46,0.03)_26%,transparent_65%)] opacity-85 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
                    <span className="pointer-events-none absolute bottom-[16%] left-0 top-[16%] w-[2px] rounded-full bg-[#B65E2E] shadow-[0_0_14px_rgba(182,94,46,0.28)] transition-[background-color,box-shadow] group-hover:bg-[#e68b56] group-hover:shadow-[0_0_18px_rgba(182,94,46,0.48)]" aria-hidden="true" />

                    <div className="relative flex items-center gap-4 pr-6 sm:gap-5 sm:pr-12">
                      <div className="hidden h-[82px] w-[82px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#B65E2E]/30 bg-[linear-gradient(155deg,rgba(182,94,46,0.16),rgba(255,255,255,0.025)_65%,rgba(5,5,7,0.3))] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:flex">
                        <span
                          aria-hidden="true"
                          className="block h-[74px] w-[84px] shrink-0 bg-[url('/services/vertalis-practice-icons.avif')] bg-[length:84px_365px] bg-no-repeat transition-transform duration-300 group-hover:scale-[1.045]"
                          style={{ backgroundPosition: `center -${practices.findIndex((p) => p.slug === practice.slug) * 73}px` }}
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3">
                          <span className="hidden h-[2px] w-5 shrink-0 rounded-full bg-[#B65E2E] sm:block" aria-hidden="true" />
                          <h3 className="text-[20px] font-bold leading-tight tracking-[-0.032em] text-[#f4f1ed] transition-colors group-hover:text-white md:text-[23px]">
                            {practice.title}
                          </h3>
                        </div>

                        <p className="mt-2 max-w-[870px] text-[15px] font-medium leading-[1.65] text-[#ded9d5] md:text-[16px]">
                          {copy.description}
                        </p>
                        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[14px] font-medium leading-6 text-[#ebe4df] md:gap-x-7 md:text-[15px]">
                          {copy.examples.map((example) => (
                            <li key={example} className="inline-flex items-center gap-2.5">
                              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#cf7541]" aria-hidden="true" />
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <span
                      className="pointer-events-none absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-[#B65E2E]/45 bg-[#B65E2E]/[0.08] text-[#df8a57] opacity-80 transition-[background-color,border-color,color,opacity,transform] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-[#B65E2E]/80 group-hover:bg-[#B65E2E]/20 group-hover:text-[#f2b48d] group-hover:opacity-100 group-focus-visible:opacity-100 sm:right-5 sm:top-1/2 sm:-translate-y-1/2 sm:group-hover:-translate-y-[calc(50%+2px)]"
                      aria-hidden="true"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </Link>
                );
              })}
            </div>
            <Link
              href="/services"
              className="mt-7 inline-flex items-center gap-2 border-b border-[#c06020]/35 pb-1 text-sm font-semibold text-[#e9a778] transition-[gap,color,border-color] hover:gap-3 hover:border-[#c06020] hover:text-[#f0c4a3]"
            >
              Explore all legal services <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      <section id="about" className="scroll-mt-28 py-16 md:scroll-mt-32 md:py-20">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d66f24]">
                The Vertalis Approach
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white md:text-4xl">
                Business-minded counsel, built around how companies operate.
              </h2>
              <p className="mt-5 text-base leading-8 text-neutral-300">
                Legal issues rarely exist in isolation. A decision about ownership can affect governance,
                a new hire can raise intellectual property questions, and a commercial agreement can
                change the risk a company carries. Vertalis considers those connections while focusing
                on the practical issue in front of you.
              </p>
              <Link
                href="/about/founders"
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#e9a778] transition hover:text-[#f0c4a3]"
              >
                Explore our founder-side approach <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="grid gap-3">
              {introPoints.map((point) => (
                <div key={point.title} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#d66f24]/25 bg-[#d66f24]/10 text-[#e9a778]">
                    {point.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">{point.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-neutral-300">{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-8 md:py-10">
        <Container>
          <div className="rounded-[1.9rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.035),rgba(255,255,255,0.012))] p-6 shadow-[0_24px_70px_-42px_rgba(0,0,0,0.8)] md:p-7">
            <div className="pointer-events-none absolute" aria-hidden="true" />
            <div className="grid gap-6 md:grid-cols-[210px_1fr] md:items-center">
              <div className="relative overflow-hidden rounded-[1.35rem] border border-white/10 bg-[linear-gradient(160deg,rgba(192,96,32,0.16),rgba(255,255,255,0.03)_38%,rgba(8,8,10,0.92)_100%)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_50px_rgba(0,0,0,0.45)]">
                <div
                  className="absolute -left-8 -top-10 h-24 w-24 rounded-full blur-2xl"
                  style={{ background: "rgba(192,96,32,0.20)" }}
                />
                <div className="relative h-[190px] overflow-hidden rounded-[1rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.015)_40%,rgba(0,0,0,0.28)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
                  <Image
                    src="/Tim%20Nichols%20Portrait.png"
                    alt="Portrait of Tim Nichols"
                    fill
                    className="object-cover"
                    sizes="210px"
                  />
                </div>
              </div>

              <div>
                <p className="text-base uppercase tracking-[0.24em] text-neutral-400">
                  The attorney behind{" "}
                  <VertalisWord
                    as="span"
                    className="inline-block align-baseline font-semibold tracking-tight normal-case"
                    style={{
                      fontSize: "1.35em",
                      lineHeight: "inherit",
                      filter: "drop-shadow(0 10px 26px rgba(192,96,32,0.18))",
                    }}
                  >
                    Vertalis
                  </VertalisWord>
                </p>

                <h3 className="mt-2 text-[1.65rem] font-semibold tracking-[-0.03em] text-white md:text-[1.95rem]">
                  Meet Tim Nichols
                </h3>

                <p className="mt-3 max-w-[36rem] text-sm leading-7 text-neutral-300 md:text-[0.98rem]">
                  Tim Nichols delivers founder-side counsel with business-minded precision: helping companies make clean decisions under pressure, align legal structure with growth, and execute confidently in an AI-shaped market.
                </p>

                <ul className="mt-4 space-y-2.5 text-sm text-neutral-300">
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4" style={{ color: tokens.accent }} />
                    Business-minded legal counsel
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4" style={{ color: tokens.accent }} />
                    Founder-side judgment
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4" style={{ color: tokens.accent }} />
                    Modern AI-aware strategy
                  </li>
                </ul>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Button href="/about/tim-nichols">Meet Tim Nichols</Button>
                  <Button href="/consultation" variant="secondary">Schedule a Free Consultation</Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Divider />

      <section id="contact" className="contact-section">
  <Container>
    <VertalisTextBox />
  </Container>

  <style jsx>{`
    .contact-section {
      padding: 5rem 0 6rem;
    }

    .contact-intro {
      margin-bottom: 2rem;
      max-width: 48rem;
    }

    .contact-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 1.02rem 2.05rem;
      padding: 0.9rem 1.4rem;
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 999px;
      background: rgba(255,255,255,0.04);
      color: #d4d4d8;
      font-size: 0.9rem;
    }

    .contact-dot {
      width: 8px;
      height: 8px;
      border-radius: 999px;
      background: ${tokens.accent};
      flex-shrink: 0;
    }

    .contact-intro h2 {
      margin: 1rem 0 0;
      font-size: 2.25rem;
      line-height: 1.1;
      font-weight: 600;
      color: white;
    }

    .contact-intro p {
      margin: 0.75rem 0 0;
      max-width: 48rem;
      color: #c4c4c9;
      line-height: 1.7;
    }

    .contact-shell {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      padding: 1.25rem;
      border: 1px solid rgba(255,255,255,0.05);
      border-radius: 2rem;
      background: #0d0d10;
    }

    .contact-rail {
      border: 1px solid rgba(255,255,255,0.04);
      border-radius: 1.75rem;
      background:
        radial-gradient(circle at 20% 85%, rgba(192,96,32,0.08), transparent 72%),
        rgba(23,23,26,0.6);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      padding: 1.9rem 1.3rem 2rem;
    }

    .contact-brand {
      font-size: 2.25rem;
      line-height: 1;
      font-weight: 600;
      color: ${tokens.accent};
      text-shadow: 0 8px 25px rgba(192,96,32,0.35), 0 18px 50px rgba(0,0,0,0.6);
    }

    .contact-brand-mark {
      width: 52px;
      height: auto;
      margin-bottom: 0.8rem;
      margin-left: 0;
      opacity: 0.84;
      filter: saturate(0.9) brightness(1.04);
    }

    .contact-brand-sub {
      margin-top: 0.3rem;
      color: #71717a;
      font-size: 0.75rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
    }

    .contact-linkedin {
      display: inline-flex;
      width: 48px;
      height: 48px;
      margin-top: 3.2rem;
      align-items: center;
      justify-content: center;
      border-radius: 999px;
      border: 1px solid rgba(255,255,255,0.08);
      background: rgba(255,255,255,0.03);
      color: rgba(241,244,249,0.92);
      transition: border-color 180ms ease, background-color 180ms ease, transform 180ms ease, color 180ms ease;
    }

    .contact-linkedin:hover {
      border-color: rgba(255,255,255,0.14);
      background: rgba(255,255,255,0.07);
      color: #ffffff;
      transform: translateY(-1px);
    }

    .contact-linkedin svg {
      width: 22px;
      height: 22px;
      transform: translateX(1px);
    }

    .contact-links-title {
      margin-top: 2.9rem;
      color: rgba(245,247,252,0.95);
      font-size: 1.05rem;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    .contact-links {
      display: flex;
      flex-direction: column;
      gap: 0.95rem;
      margin-top: 1.45rem;
    }

    .contact-links a {
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.85rem;
      padding: 0.35rem 0;
      color: rgba(214,219,229,0.92);
      text-decoration: none;
      font-size: 1rem;
      line-height: 1.35;
      letter-spacing: 0.01em;
      transition: color 180ms ease, transform 180ms ease;
    }

    .contact-links a:hover {
      color: #ffffff;
      transform: translateX(2px);
    }

    .contact-links a :global(svg) {
      opacity: 0.72;
      transition: transform 180ms ease, opacity 180ms ease;
    }

    .contact-links a:hover :global(svg) {
      opacity: 1;
      transform: translateX(2px);
    }

    .contact-panel {
      position: relative;
      isolation: isolate;
      overflow: hidden;
      min-width: 0;
      flex: 1;
      border-radius: 2rem;
      border: 1px solid rgba(255,255,255,0.12);
      background:
        radial-gradient(circle at 14% 10%, rgba(130,88,58,0.08) 0%, rgba(130,88,58,0) 34%),
        radial-gradient(circle at 88% 92%, rgba(61,79,112,0.09) 0%, rgba(61,79,112,0) 42%),
        linear-gradient(152deg, #242129 0%, #21262f 48%, #171b23 100%);
      box-shadow: 0 28px 82px -46px rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.05) inset;
    }

    .contact-panel::before {
      content: "";
      position: absolute;
      top: -18%;
      left: -12%;
      width: 62%;
      height: 62%;
      pointer-events: none;
      border-radius: 999px;
      background: radial-gradient(circle, rgba(192,96,32,0.18) 0%, rgba(192,96,32,0.08) 36%, rgba(192,96,32,0) 72%);
      filter: blur(26px);
      opacity: 0.38;
      z-index: 0;
    }

    .contact-panel::after {
      content: "";
      position: absolute;
      inset: 0;
      pointer-events: none;
      border-radius: inherit;
      box-shadow: 0 0 0 1px rgba(88,101,128,0.12) inset, 0 32px 80px -56px rgba(35,46,70,0.42);
      opacity: 0.55;
      z-index: 0;
    }

    .contact-panel-inner {
      position: relative;
      z-index: 1;
      padding: 2rem;
      max-width: 52rem;
    }

    .contact-panel h3 {
      margin: 0;
      color: #fbfcff;
      font-size: 2.75rem;
      line-height: 1.01;
      letter-spacing: -0.018em;
      font-weight: 600;
    }

    .contact-panel-copy {
      margin-top: 2.05rem;
      color: rgba(224,230,240,0.76);
      font-size: 1.1rem;
      line-height: 1.72;
      max-width: 48rem;
    }

    .contact-cta {
      position: relative;
      overflow: hidden;
      display: inline-flex;
      width: auto;
      margin-top: 0;
      margin-inline: 0;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      padding: 1.4rem 1.65rem;
      border-radius: 1.15rem;
      text-decoration: none;
      color: white;
      font-size: 1.05rem;
      font-weight: 700;
      background: linear-gradient(180deg, rgba(210,132,78,1) 0%, rgba(191,96,23,1) 100%);
      box-shadow: 0 12px 28px -18px rgba(191,96,23,0.55), 0 1px 0 rgba(255,255,255,0.26) inset;
      transition: transform 180ms ease, background 180ms ease, box-shadow 180ms ease;
    }

    .contact-cta:hover {
      transform: translateY(-2px);
      background: linear-gradient(180deg, rgba(218,140,84,1) 0%, rgba(199,104,30,1) 100%);
      box-shadow: 0 16px 32px -18px rgba(191,96,23,0.62), 0 1px 0 rgba(255,255,255,0.3) inset;
    }

    .contact-cta::before {
      content: "";
      position: absolute;
      top: 0;
      left: 8%;
      right: 8%;
      height: 1px;
      background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.42), rgba(255,255,255,0));
      pointer-events: none;
    }

    .contact-panel-note {
      margin-top: 1.35rem;
      color: rgba(157,166,182,0.8);
      line-height: 1.7;
      max-width: 40rem;
    }

    .contact-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 1.45rem;
    }

    .contact-chips span {
      padding: 0.7rem 0.9rem;
      border-radius: 0.8rem;
      border: 1px solid rgba(255,255,255,0.15);
      background: rgba(255,255,255,0.04);
      color: #d4d4d8;
      font-size: 0.88rem;
      font-weight: 450;
      letter-spacing: 0.01em;
    }

    .contact-footer {
      margin-top: 3rem;
      padding: 0 0.5rem;
      color: #737373;
      font-size: 0.9rem;
    }

    .contact-footer-row {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .contact-footer-links {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .contact-footer-links a {
      color: #a3a3a3;
      text-decoration: none;
    }

    .contact-footer-note {
      margin-top: 1rem;
      color: #666;
      font-size: 0.78rem;
    }

    @media (min-width: 1024px) {
      .contact-shell {
        flex-direction: row;
        align-items: stretch;
        gap: 2rem;
      }

      .contact-rail {
        width: 240px;
        flex: 0 0 240px;
      }

      .contact-panel-inner {
        padding: 3rem;
      }

      .contact-footer-row {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
    }

    @media (max-width: 640px) {
      .contact-section {
        padding: 3.5rem 0 4.5rem;
      }

      .contact-intro h2 {
        font-size: 1.95rem;
      }

      .contact-panel h3 {
        font-size: 2rem;
      }

      .contact-panel-inner {
        padding: 1.35rem;
      }

      .contact-cta {
        width: 100%;
      }
    }
  `}</style>
</section>
    </main>
  );
}

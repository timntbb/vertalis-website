"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import VertalisNeuralNetworkAbout from "@/components/VertalisNeuralNetworkAbout";
import VertalisWord from "@/components/VertalisWord";
import {
  ArrowRight,
  Check,
  Menu,
  X,
  Scale,
  Cpu,
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
    title: "AI-aware legal strategy",
    desc: "A modern practice with a sharp eye on contracts, governance, and real-world AI risk.",
    icon: <Cpu className="h-5 w-5" />,
  },
];

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
  const isActive = !href.startsWith("#") && pathname === href;

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

function CapabilitiesNavItem() {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isFocusedWithin, setIsFocusedWithin] = React.useState(false);

  const showMenu = isOpen || isHovered || isFocusedWithin;

  const items: Array<[string, string]> = [
    ["Founders", "/about/founders"],
    ["Governance", "/about/governance"],
    ["Capital Strategy", "/about/investors"],
    ["Employees", "/about/employees"],
    ["Intellectual Property", "/about/ip"],
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
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={showMenu}
        aria-haspopup="menu"
        className={cx(
          "relative focus:outline-none focus-visible:ring-2 focus-visible:ring-white/15",
          showMenu
            ? "text-[15px] font-medium tracking-[0.08em] text-white hover:text-[#e26a2c] transition-all duration-300 ease-out"
            : "text-[15px] font-medium tracking-[0.08em] text-white/70 hover:text-[#e26a2c] hover:-translate-y-[1px] transition-all duration-300 ease-out"
        )}
      >
        Capabilities
        {showMenu ? (
          <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-[#e26a2c] to-[#c7521e] shadow-[0_0_8px_rgba(226,106,44,0.5)]"></div>
        ) : null}
      </button>

      <div
        className={cx(
          "absolute left-1/2 top-full z-50 mt-0 w-56 -translate-x-1/2 pt-2",
          "transition-all duration-150",
          showMenu ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
        )}
      >
        <div className="rounded-2xl border border-white/12 bg-[linear-gradient(180deg,rgba(18,18,22,0.94),rgba(10,10,13,0.96))] shadow-[0_20px_55px_-32px_rgba(0,0,0,0.95)] backdrop-blur-xl">
          <div className="p-2" role="menu" aria-label="Capabilities">
            {items.map(([label, href]) => (
              <a
                key={href}
                href={href}
                role="menuitem"
                className="block rounded-xl px-3 py-2.5 text-[15px] font-medium tracking-[0.08em] text-white/70 transition-all duration-300 ease-out hover:-translate-y-[1px] hover:text-[#e26a2c] hover:[text-shadow:0_0_12px_rgba(226,106,44,0.38)] focus:outline-none focus-visible:text-[#e26a2c] focus-visible:[text-shadow:0_0_12px_rgba(226,106,44,0.38)]"
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
  const [mobileCapabilitiesOpen, setMobileCapabilitiesOpen] = React.useState(false);

  const navItems: Array<[string, string]> = [
    ["Home", "#top"],
    ["About", "#about"],
    ["Insights", "/blog"],
    ["Contact", "#contact"],
    ["Attorney", "/about/tim-nichols"],
  ];

  const headerScale = 0.8;
  const scaled = (value: number, min = 0) => `${Math.max(min, Math.round(value * headerScale))}px`;

  const headerHeight = `calc(${scaled(78, 60)} + 30px)`;
  const logoSize = `calc(${scaled(84, 68)} + 10px)`;
  const logoTextSize = scaled(28, 22);
  const subTextSize = scaled(16, 12);
  const brandGap = scaled(24, 18);
  const navGap = scaled(16, 12);
  const navOffset = scaled(76, 56);
  const ctaPx = scaled(16, 12);
  const ctaPy = scaled(8, 6);
  const ctaTextSize = scaled(14, 12);

  const mobileLinks: Array<[string, string]> = [...navItems];

  const mobileCapabilityLinks: Array<[string, string]> = [
    ["Founders", "/about/founders"],
    ["Governance", "/about/governance"],
    ["Capital Strategy", "/about/investors"],
    ["Employees", "/about/employees"],
    ["Intellectual Property", "/about/ip"],
  ];

  const onMobileLinkClick = (href: string): React.MouseEventHandler<HTMLAnchorElement> => {
    return (e) => {
      setMobileOpen(false);
      setMobileCapabilitiesOpen(false);

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
          <a
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
                className="tracking-wide text-neutral-500"
                style={{ fontSize: subTextSize }}
              >
                Legal Counsel, PLLC
              </div>
            </div>
          </a>

          <nav
            className="absolute left-1/2 hidden -translate-x-1/2 transform whitespace-nowrap lg:flex items-center gap-10"
            style={{ marginLeft: navOffset }}
          >
            {navItems.map(([label, href]) => (
              <NavLink key={href} href={href} label={label} />
            ))}
            <CapabilitiesNavItem />
          </nav>

          <div className="ml-2 hidden shrink-0 lg:block">
            <Button
              href="#contact"
              className="ml-6 rounded-full px-6 py-2 text-sm tracking-[0.12em]"
            >
              Let’s talk
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
                  if (!next) setMobileCapabilitiesOpen(false);
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
              "absolute left-0 right-0 top-full border-b border-neutral-800 bg-[#0a0a0c]/98 px-6 pb-5 pt-3 backdrop-blur-md lg:hidden",
              mobileOpen ? "block" : "hidden"
            )}
          >
            <nav className="grid gap-1">
              {mobileLinks.map(([label, href]) => (
                <a
                  key={`mobile-${href}`}
                  href={toHref(href)}
                  onClick={onMobileLinkClick(href)}
                  className="rounded-lg px-3 py-2.5 text-sm uppercase tracking-[0.2em] text-neutral-300 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {label}
                </a>
              ))}

              <div className="rounded-lg border border-white/10 bg-white/[0.02]">
                <button
                  type="button"
                  onClick={() => setMobileCapabilitiesOpen((prev) => !prev)}
                  aria-expanded={mobileCapabilitiesOpen}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm uppercase tracking-[0.2em] text-neutral-300 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <span>Capabilities</span>
                  <ArrowRight
                    className={cx(
                      "h-4 w-4 transition-transform duration-200",
                      mobileCapabilitiesOpen ? "rotate-90" : "rotate-0"
                    )}
                  />
                </button>

                <div className={cx("grid gap-1 px-2 pb-2", mobileCapabilitiesOpen ? "block" : "hidden")}>
                  {mobileCapabilityLinks.map(([label, href]) => (
                    <a
                      key={`mobile-cap-${href}`}
                      href={toHref(href)}
                      onClick={onMobileLinkClick(href)}
                      className="rounded-md px-3 py-2 text-[15px] font-medium tracking-[0.08em] text-white/70 transition-all duration-300 ease-out hover:-translate-y-[1px] hover:text-[#e26a2c]"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </nav>

            <div className="mt-4">
              <Button href="#contact" className="w-full">
                Let’s talk
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
  const reduce = useReducedMotion();

  return (
    <main className="min-h-screen overflow-x-hidden text-neutral-100" style={{ backgroundColor: "#0a0a0c" }} id="pageRoot">
      <Header />

      <section className="relative isolate overflow-hidden pt-1.5 md:pt-3" id="top">

{/* ================= BACKGROUND SYSTEM ================= */}

<div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">

  <div className="absolute inset-0 bg-[#0a0a0c]" />

  <div
    className="absolute left-[-6%] top-[10%] h-[520px] w-[520px] rounded-full blur-3xl"
    style={{ background: "rgba(192,96,32,0.16)" }}
  />

  <div
    className="absolute right-[-6%] top-[20%] h-[480px] w-[480px] rounded-full blur-3xl"
    style={{ background: "rgba(72,90,120,0.12)" }}
  />

  <div
    className="absolute left-1/2 top-1/2 h-[760px] w-[760px] -translate-x-[40%] -translate-y-1/2 rounded-full blur-3xl"
    style={{ background: "rgba(192,96,32,0.10)" }}
  />

  {/* Shield watermark */}

  <motion.div
    className="absolute inset-0 flex items-center justify-center"
    style={{ opacity: 0.11 }}
    animate={
      reduce
        ? undefined
        : {
            rotate: [0, 0.6, -0.6, 0],
            y: [0, -6, 0, 6, 0],
          }
    }
    transition={
      reduce
        ? undefined
        : {
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut",
          }
    }
  >
    <img
      src="/logo-final.png"
      alt=""
      className="object-contain blur-[0.2px]"
      style={{ width: 780, height: 780 }}
    />
  </motion.div>

  {/* subtle grid */}

  <div
    className="absolute inset-0 opacity-[0.04]"
    style={{
      backgroundImage:
        "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
      backgroundSize: "72px 72px",
      maskImage: "radial-gradient(circle at center, black 35%, transparent 100%)",
      WebkitMaskImage:
        "radial-gradient(circle at center, black 35%, transparent 100%)",
    }}
  />

  <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b0d]/20 via-transparent to-[#0b0b0d]/80" />

</div>

{/* ================= HERO CONTENT ================= */}

<Container>

<div className="relative z-10 py-7 md:py-10">

<div className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-white/[0.015] px-6 py-10 shadow-[0_30px_90px_-50px_rgba(0,0,0,0.8)] md:px-10">

<div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/6" />

<div className="grid items-center gap-12 md:grid-cols-12">

{/* ================= LEFT SIDE ================= */}

<div className="md:col-span-7 md:pr-10 lg:pr-14">

<FadeIn>

<div className="max-w-[38rem] pt-0 md:pt-1.5">

<VertalisWord
  className="font-semibold leading-none tracking-tight"
  style={{
    fontSize: "34pt",
  }}
>
  Vertalis
</VertalisWord>

<p className="mt-5 text-[0.9rem] uppercase tracking-[0.28em] text-neutral-400">
  Founder-side legal architecture for companies built to scale
</p>

<h1 className="mt-8 text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl md:leading-[0.98]">
  Founders build the company. Vertalis designs the structure behind it.
</h1>

<p className="mt-7 max-w-[38rem] text-[1.15rem] leading-8 text-neutral-300">
  Vertalis helps founders install the legal systems that support scale, from
  governance and capital structure to hiring, operational risk, and ownership
  of what the company is building.
</p>

<div className="mt-10 flex flex-wrap gap-3">

<Button href="#contact">
Let’s talk
</Button>

<Button href="#about" variant="secondary">
About the practice
</Button>

</div>

{/* FEATURE TILES */}

<div className="mt-14 grid max-w-[520px] gap-4 sm:grid-cols-2">

<Card className="overflow-hidden border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-4 py-4 shadow-[0_24px_60px_-36px_rgba(0,0,0,0.75)]">

<div className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5">
<BadgeCheck className="h-4 w-4" style={{ color: tokens.accent }} />
</div>

<div className="text-sm font-semibold text-white">
Founder alignment
</div>

<div className="mt-2 text-[0.8rem] leading-6 text-neutral-300">
Roles, equity, authority, and vesting before misalignment compounds.
</div>

</Card>

<Card className="overflow-hidden border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-4 py-4 shadow-[0_24px_60px_-36px_rgba(0,0,0,0.75)]">

<div className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5">
<Lock className="h-4 w-4" style={{ color: tokens.accent }} />
</div>

<div className="text-sm font-semibold text-white">
Capital strategy
</div>

<div className="mt-2 text-[0.8rem] leading-6 text-neutral-300">
SAFE, seed, dilution, investor leverage, and control clarity.
</div>

</Card>

</div>

</div>

</FadeIn>

</div>

{/* ================= RIGHT PANEL ================= */}

<div className="md:col-span-5 lg:mt-6">

<FadeIn delay={0.08}>

<Card className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(152deg,#211e25_0%,#1b2028_45%,#13171f_100%)] p-8 shadow-[0_22px_56px_-34px_rgba(0,0,0,0.9)] md:p-10">

<div className="pointer-events-none absolute inset-0">

<div
className="absolute left-[-12%] top-[-12%] h-[240px] w-[240px] rounded-full blur-2xl"
style={{ background: "rgba(192,96,32,0.13)" }}
/>

<div
className="absolute right-[-10%] bottom-[-16%] h-[210px] w-[210px] rounded-full blur-2xl"
style={{ background: "rgba(72,90,120,0.11)" }}
/>


</div>

<div className="relative z-10">

<div className="text-[1.9rem] leading-none font-semibold tracking-[-0.03em] text-white md:text-[2.15rem]">
  Where Vertalis fits
</div>

<p className="mt-3 text-[1rem] leading-7 text-neutral-300">
If you are raising, scaling, or operating under pressure, this is where
Vertalis installs structure before legal gaps compound.
</p>

<div className="mt-7 grid gap-4">

<Card tone="dark" className="rounded-[1.5rem] border-white/10 bg-[#0f1014]/95 p-5">

<div className="flex items-center gap-2 text-xs uppercase tracking-wide text-neutral-400">
<ScrollText className="h-4 w-4" />
COMMON STARTING POINTS
</div>

<ul className="mt-3 space-y-2 text-sm text-neutral-300">

<li className="flex gap-2">
<Check className="h-4 w-4 mt-0.5" style={{ color: tokens.accent }} />
Founder alignment and governance cleanup
</li>

<li className="flex gap-2">
<Check className="h-4 w-4 mt-0.5" style={{ color: tokens.accent }} />
SAFE, seed, and dilution readiness
</li>

<li className="flex gap-2">
<Check className="h-4 w-4 mt-0.5" style={{ color: tokens.accent }} />
Hiring, IP, and contract risk controls
</li>

</ul>

</Card>

<Card tone="dark" className="rounded-[1.5rem] border-white/10 bg-[#0f1014]/95 p-5">

<div className="flex items-center gap-2 text-xs uppercase tracking-wide text-neutral-400">
<FileText className="h-4 w-4" />
THE VERTALIS APPROACH
</div>

<ul className="mt-3 space-y-2 text-sm text-neutral-300">

<li className="flex gap-2">
<Check className="h-4 w-4 mt-0.5" style={{ color: tokens.accent }} />
Plain English, business-first
</li>

<li className="flex gap-2">
<Check className="h-4 w-4 mt-0.5" style={{ color: tokens.accent }} />
Structural clarity before problems compound
</li>

<li className="flex gap-2">
<Check className="h-4 w-4 mt-0.5" style={{ color: tokens.accent }} />
Systems built to scale with the company
</li>

</ul>

</Card>

</div>

<p className="mt-6 text-sm text-neutral-400">
Built for founders who need real legal structure before growth exposes
the gaps.
</p>

</div>

</Card>

</FadeIn>

</div>

</div>

</div>

</div>

</Container>

</section>

      <Divider />

      <section id="about" className="scroll-mt-28 py-10 md:scroll-mt-32 md:py-14">
        <div className="mx-auto w-full max-w-[1320px] px-6">
          <VertalisNeuralNetworkAbout />
        </div>
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
                      fontSize: "inherit",
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
                  <Button href="#contact" variant="secondary">Start the conversation</Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Divider />

      <section id="contact" className="contact-section">
  <Container>
    <div className="contact-intro">
      <div className="contact-eyebrow">
        <span className="contact-dot" />
        Direct line
      </div>

      <h2>Let’s talk</h2>
      <p>
        If the company is starting to move, this is where the structure behind it gets installed.
      </p>
    </div>

    <div className="contact-shell">
      <aside className="contact-rail bg-neutral-900/60 backdrop-blur-sm flex flex-col justify-start">
        <Image
          src="/logo.png"
          alt="Vertalis shield"
          width={48}
          height={48}
          className="contact-brand-mark"
        />

        <VertalisWord
  className="font-semibold leading-[0.95] tracking-[-0.035em] select-none"
  style={{
    fontSize: "42pt",
    filter: "drop-shadow(0 10px 26px rgba(192,96,32,0.18))",
            marginLeft: "-10px",
  }}
>
  Vertalis
        </VertalisWord>

        <div className="contact-brand-sub">LEGAL COUNSEL</div>

        <a
          href="https://www.linkedin.com/in/timntbb/"
          target="_blank"
          rel="noreferrer"
          className="contact-linkedin"
          aria-label="LinkedIn"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6S0 4.88 0 3.5 1.11 1 2.49 1s2.49 1.12 2.49 2.5ZM.5 8h4V24h-4V8Zm7 0h3.83v2.18h.05c.53-1.01 1.84-2.18 3.8-2.18 4.06 0 4.82 2.67 4.82 6.14V24h-4v-7.02c0-1.67-.03-3.82-2.33-3.82-2.33 0-2.69 1.82-2.69 3.7V24h-4V8Z" />
          </svg>
        </a>

        <div className="contact-links-title">Navigate</div>

        <div className="contact-links">
          <a href="#top">Home <ArrowRight size={16} /></a>
          <a href="#about">About <ArrowRight size={16} /></a>
          <a href="/blog">Insights <ArrowRight size={16} /></a>
          <a href="#contact">Contact <ArrowRight size={16} /></a>
        </div>
      </aside>

      <div className="contact-panel transition-all duration-300 hover:translate-y-[-3px] hover:shadow-xl">
        <div className="contact-panel-inner">
          <h3 className="tracking-[-0.02em]">Start the conversation</h3>

          <p className="contact-panel-copy">
            Tell me what you're building, where the friction is, and what kind
            of legal support you need. Vertalis is built for founders who want
            practical guidance on contracts, governance, capital readiness,
            and AI risk.
          </p>

          <div className="mt-6">
            <a
              href="mailto:tim@vertalislegal.com?subject=Vertalis%20Consult%20Request"
              className="contact-cta"
            >
              <span>Email Vertalis</span>
              <ArrowRight size={18} />
            </a>
          </div>

          <p className="contact-panel-note">
            Best for founders who need sharp legal guidance on contracts,
            governance, capital readiness, and AI risk.
          </p>

          <div className="contact-chips">
            <span>Contracts</span>
            <span>Governance</span>
            <span>AI + Capital Readiness</span>
          </div>
        </div>
      </div>
    </div>

    <footer className="contact-footer">
      <div className="contact-footer-row">
        <div>© {new Date().getFullYear()} Vertalis Legal Counsel, PLLC</div>
        <div className="contact-footer-links">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <span>Built in DFW</span>
        </div>
      </div>

      <div className="contact-footer-note">
        This website provides general information, and does not create an
        attorney-client relationship.
      </div>
    </footer>
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
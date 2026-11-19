"use client";

import Image from "next/image";
import LegalContent from "./LegalContent";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function PixelTermsHeader() {
  const [capabilitiesOpen, setCapabilitiesOpen] = useState(false);
  const [mobileCapabilitiesOpen, setMobileCapabilitiesOpen] = useState(false);
  const closeCapabilitiesTimeoutRef = useRef<number | null>(null);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/#about" },
    { label: "Services", href: "/services" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/#contact" },
    { label: "Attorney", href: "/about/tim-nichols" },
    { label: "Capabilities", href: "/about/founders" },
  ];

  const capabilityItems = [
    { label: "Founders", href: "/about/founders" },
    { label: "Governance", href: "/about/governance" },
    { label: "Capital Strategy", href: "/about/investors" },
    { label: "Employees", href: "/about/employees" },
    { label: "Intellectual Property", href: "/about/ip" },
  ];

  const clearCapabilitiesCloseTimeout = () => {
    if (closeCapabilitiesTimeoutRef.current !== null) {
      window.clearTimeout(closeCapabilitiesTimeoutRef.current);
      closeCapabilitiesTimeoutRef.current = null;
    }
  };

  const openCapabilitiesMenu = () => {
    clearCapabilitiesCloseTimeout();
    setCapabilitiesOpen(true);
  };

  const scheduleCapabilitiesClose = () => {
    clearCapabilitiesCloseTimeout();
    closeCapabilitiesTimeoutRef.current = window.setTimeout(() => {
      setCapabilitiesOpen(false);
      closeCapabilitiesTimeoutRef.current = null;
    }, 220);
  };

  useEffect(() => {
    return () => {
      clearCapabilitiesCloseTimeout();
    };
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-[#c06020]/40 bg-black/80 shadow-[0_6px_24px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, rgba(255,255,255,0.045) 0px, rgba(255,255,255,0.045) 1px, transparent 1px, transparent 4px)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(192,96,32,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(192,96,32,0.04) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />
        </div>
        <div className="absolute bottom-0 left-0 h-[3px] w-full bg-[linear-gradient(90deg,#6a3313_0%,#c06020_18%,#f3a261_50%,#c06020_82%,#6a3313_100%)]" />

        <div className="relative mx-auto max-w-[1600px] px-4 md:px-6">
          <div className="relative flex min-h-[96px] items-center justify-between gap-4">
            <style jsx global>{`
              @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Bungee&display=swap');
            `}</style>

            {/* LEFT: LOGO + BRAND */}
            <Link
              href="/"
              className="flex shrink-0 items-center gap-3 hover:opacity-90"
            >
              <Image
                src="/logo.png"
                alt="Vertalis logo"
                width={72}
                height={72}
                className="h-[72px] w-auto"
                style={{
                  imageRendering: "pixelated",
                  filter: "contrast(1.15) saturate(1.1)",
                }}
              />

              <div className="leading-tight">
                <div
                  style={{
                    fontFamily: "'Bungee', cursive",
                    fontSize: "1.3rem",
                    color: "#c06020",
                    letterSpacing: "0.05em",
                    textShadow: "1px 1px 0 #5a2b11, 2px 2px 0 #5a2b11, 3px 3px 0 #3b1c0b, -1px -1px 0 #f3a261",
                  }}
                >
                  Vertalis
                </div>

                <div
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: "0.6rem",
                    color: "#9ca3af",
                    letterSpacing: "0.18em",
                    marginTop: "2px",
                  }}
                >
                  LEGAL COUNSEL, PLLC
                </div>
              </div>
            </Link>

            {/* CENTER: NAV */}
            <nav aria-label="Main navigation" className="hidden min-w-0 flex-1 items-center justify-center gap-5 whitespace-nowrap 2xl:flex">
              {navItems.map((item) => {
                if (item.label === "Capabilities") {
                  return (
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={openCapabilitiesMenu}
                      onMouseLeave={scheduleCapabilitiesClose}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          clearCapabilitiesCloseTimeout();
                          setCapabilitiesOpen((prev) => !prev);
                        }}
                        style={{
                          fontFamily: "'Press Start 2P', monospace",
                          fontSize: "0.65rem",
                          color: "#d4d4d8",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                        }}
                        className="m-0 border-0 bg-transparent p-0 leading-none hover:text-[#f3a261] transition-colors"
                        aria-expanded={capabilitiesOpen}
                        aria-haspopup="menu"
                      >
                        {item.label}
                      </button>

                      <div
                        className={`absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 pt-2 transition-all ${
                          capabilitiesOpen
                            ? "pointer-events-auto translate-y-0 opacity-100"
                            : "pointer-events-none -translate-y-1 opacity-0"
                        }`}
                        onMouseEnter={openCapabilitiesMenu}
                        onMouseLeave={scheduleCapabilitiesClose}
                      >
                        <div
                          className="border border-[#f3a261]/40 bg-[#101012] p-2 shadow-[4px_4px_0_#5a2b11]"
                          role="menu"
                          aria-label="Capabilities"
                        >
                          {capabilityItems.map((capability) => (
                            <Link
                              key={capability.label}
                              href={capability.href}
                              role="menuitem"
                              style={{
                                fontFamily: "'Press Start 2P', monospace",
                                fontSize: "0.56rem",
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                              }}
                              className="block border border-transparent px-2 py-2 text-[#d4d4d8] hover:border-[#f3a261]/40 hover:bg-[#1a1a1f] hover:text-[#f3a261]"
                              onClick={() => {
                                clearCapabilitiesCloseTimeout();
                                setCapabilitiesOpen(false);
                              }}
                            >
                              {capability.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: "0.65rem",
                      color: "#d4d4d8",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                    className="hover:text-[#f3a261] transition-colors"
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* RIGHT: CTA */}
            <div className="hidden shrink-0 whitespace-nowrap 2xl:block">
              <Link
                href="/consultation"
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.12em",
                }}
                className="bg-[#c06020] text-black px-6 py-2 border border-[#f3a261]/60 shadow-[3px_3px_0_#5a2b11] hover:translate-y-[-1px] hover:shadow-[4px_4px_0_#6b3212] transition-all"
              >
                FREE CONSULTATION
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 pb-4 2xl:hidden">
            {navItems
              .filter((item) => item.label !== "Capabilities")
              .map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-neutral-300 transition-colors duration-150 hover:text-[#f3a261]"
                >
                  {item.label}
                </Link>
              ))}

            <button
              type="button"
              onClick={() => setMobileCapabilitiesOpen((prev) => !prev)}
              className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-neutral-300 transition-colors duration-150 hover:text-[#f3a261]"
              aria-expanded={mobileCapabilitiesOpen}
              aria-controls="mobile-capabilities-menu"
            >
              Capabilities
            </button>

            {mobileCapabilitiesOpen ? (
              <div
                id="mobile-capabilities-menu"
                className="grid w-full gap-2 rounded border border-[#f3a261]/35 bg-[#101012] p-3"
              >
                {capabilityItems.map((capability) => (
                  <Link
                    key={capability.label}
                    href={capability.href}
                    style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: "0.56rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                    className="border border-transparent px-2 py-2 text-[#d4d4d8] hover:border-[#f3a261]/40 hover:bg-[#1a1a1f] hover:text-[#f3a261]"
                    onClick={() => setMobileCapabilitiesOpen(false)}
                  >
                    {capability.label}
                  </Link>
                ))}
              </div>
            ) : null}

            <Link
              href="/consultation"
              className="inline-flex items-center justify-center border border-[#f3a261]/60 bg-[#c06020] px-5 py-2 font-mono text-[0.66rem] font-bold uppercase tracking-[0.18em] text-black shadow-[3px_3px_0_0_#5a2b11] transition-colors duration-150 hover:bg-[#da7b3b]"
            >
              Free consultation
            </Link>
          </div>
        </div>
      </header>

    </>
  );
}

function VertalisClimbGame() {
  return (
    <div className="mb-10 overflow-hidden rounded-[1.4rem] border border-[#B65E2E]/30 bg-[#11151a] shadow-[0_28px_90px_-62px_rgba(182,94,46,0.65)]">
      <iframe
        title="Vertalis: The Climb — playable arcade platformer"
        src="/arcade/the-climb/index.html"
        loading="lazy"
        allowFullScreen
        className="block h-[525px] w-full border-0 sm:h-[630px] md:h-[840px] lg:h-[915px]"
        style={{ colorScheme: "dark" }}
      />
    </div>
  );
}

export default function TermsOfUsePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0c] text-white">
      <PixelTermsHeader />

      <section className="px-4 pb-14 pt-8 md:px-6 md:pb-20 md:pt-10">
        <div className="mx-auto max-w-6xl">
          <VertalisClimbGame />

          <div className="overflow-hidden rounded-[2.1rem] border border-white/10 bg-[linear-gradient(170deg,rgba(255,255,255,0.035),rgba(255,255,255,0.012))] shadow-[0_28px_90px_-56px_rgba(0,0,0,0.9)]">
            <div className="px-6 py-10 md:px-10 md:py-12 lg:px-14 lg:py-14">
              <div className="max-w-[780px]">
                <p className="inline-flex rounded-full border border-[#c06020]/25 bg-[#c06020]/10 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#d87a3b]">
                  Vertalis Legal
                </p>

                <h1 className="mt-6 text-[clamp(2.6rem,5vw,4.2rem)] font-semibold leading-[0.9] tracking-[-0.05em] text-white">
                  Privacy / Terms of Use
                </h1>

                <p className="mt-5 text-sm leading-7 text-neutral-400 md:text-base">
                  Effective Date: October 19, 2026
                </p>

                <p className="mt-4 text-sm leading-7 text-neutral-500">
                  Glad you got that out of your system. Now for the legal part.
                </p>
              </div>

              <article className="mt-10 max-w-[780px] text-left text-[1.02rem] leading-[1.9] text-neutral-300 [&_h2]:mb-4 [&_h2]:mt-14 [&_h2]:border-t [&_h2]:border-white/10 [&_h2]:pt-8 [&_h2]:text-[1.95rem] [&_h2]:font-bold [&_h2]:tracking-[-0.035em] [&_h2]:text-white [&_h2:first-of-type]:mt-12 [&_h2:first-of-type]:border-t-0 [&_h2:first-of-type]:pt-0 [&_p]:mt-5 [&_p]:leading-[1.9]">
                <LegalContent />
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

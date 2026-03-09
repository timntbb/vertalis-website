"use client";

import React from "react";
import Image from "next/image";

const tokens = {
  bg: "#0b0b0d",
  accent: "#c06020",
};

const vertalisTitleScheme: React.CSSProperties = {
  fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
  color: tokens.accent,
  textShadow:
    "0 1px 0 rgba(255,255,255,0.22), 0 14px 30px rgba(192,96,32,0.38), 0 26px 58px rgba(0,0,0,0.55)",
};

export function Header() {
  const navItems: Array<[string, string]> = [
    ["Services", "#services"],
    ["Packages", "#packages"],
    ["Insights", "/blog"],
    ["FAQ", "#faq"],
    ["Contact", "#contact"],
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10" style={{ backgroundColor: tokens.bg }}>
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="relative flex items-center justify-between py-5">
          <a href="#top" className="flex items-center gap-3 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Vertalis logo"
              width={72}
              height={72}
              priority
              className="h-11 w-auto"
            />
            <div className="leading-tight">
              <div
                className="text-xl font-semibold tracking-tight md:text-2xl"
                style={vertalisTitleScheme}
              >
                Vertalis
              </div>
              <div className="text-xs text-neutral-400 md:text-sm">Legal Counsel, PLLC</div>
            </div>
          </a>

          <nav className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-6 whitespace-nowrap">
            {navItems.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="text-sm font-medium text-white/80 transition-colors duration-150 hover:text-white"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="ml-2 hidden flex-shrink-0 sm:block">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white transition duration-200 hover:bg-white/[0.08]"
            >
              Book a consult
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

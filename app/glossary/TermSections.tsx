"use client";

import { useEffect, useRef } from "react";
import type { GlossarySection } from "./data";

export default function TermSections({ sections }: { sections: GlossarySection[] }) {
  const disclosure = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const reveal = () => {
      let id: string;
      try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
      if (!sections.some((section) => section.id === id)) return;
      if (disclosure.current) disclosure.current.open = true;
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: "start", behavior: "instant" }));
    };
    reveal();
    window.addEventListener("hashchange", reveal);
    return () => window.removeEventListener("hashchange", reveal);
  }, [sections]);
  if (!sections.length) return null;
  return (
    <details ref={disclosure} className="group mt-9 border-t border-white/10 pt-5">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm text-neutral-400 transition-colors hover:text-white [&::-webkit-details-marker]:hidden">
        <span>Types and key distinctions</span>
        <span aria-hidden="true" className="text-lg text-[#d77938] group-open:hidden">+</span>
        <span aria-hidden="true" className="hidden text-lg text-[#d77938] group-open:inline">−</span>
      </summary>
      <div className="mt-6 space-y-7">
        {sections.map((section) => (
          <section id={section.id} key={section.id} className="scroll-mt-32">
            <h2 className="text-base font-medium text-white md:text-lg">{section.title}</h2>
            <p className="mt-2 text-base leading-8 text-neutral-400">{section.text}</p>
          </section>
        ))}
      </div>
    </details>
  );
}

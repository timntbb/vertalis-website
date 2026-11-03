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
    <details ref={disclosure} className="group mt-8 overflow-hidden rounded-[1.5rem] border border-white/[0.12] bg-[#151316] p-6 sm:p-8">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-white transition-colors hover:text-[#f0a678] [&::-webkit-details-marker]:hidden">
        <span>Types and key distinctions</span>
        <span aria-hidden="true" className="text-2xl text-[#d77938] group-open:hidden">+</span>
        <span aria-hidden="true" className="hidden text-2xl text-[#d77938] group-open:inline">−</span>
      </summary>
      <div className="mt-7 space-y-5 border-t border-white/[0.10] pt-6">
        {sections.map((section) => (
          <section id={section.id} key={section.id} className="scroll-mt-32 rounded-xl border-l-2 border-[#B65E2E]/70 bg-white/[0.025] p-5">
            <h2 className="text-lg font-semibold text-white md:text-xl">{section.title}</h2>
            <p className="mt-3 text-base leading-8 text-neutral-300 md:text-lg">{section.text}</p>
          </section>
        ))}
      </div>
    </details>
  );
}

"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function ExpandableCard({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const contentId = useId();

  return (
    <div
      className={`group h-fit self-start overflow-hidden rounded-[1.35rem] border bg-[linear-gradient(145deg,rgba(255,255,255,0.035),rgba(255,255,255,0.012))] shadow-[inset_0_1px_0_rgba(255,255,255,0.055),0_18px_42px_-34px_rgba(0,0,0,0.95)] transition-[border-color,background-color,box-shadow] duration-300 ${
        open
          ? "border-[rgba(196,105,43,0.38)] shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_22px_50px_-34px_rgba(191,96,23,0.34)]"
          : "border-white/10 hover:border-white/[0.18]"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={contentId}
        className="flex min-h-[5.5rem] w-full items-center justify-between gap-5 px-6 py-5 text-left outline-none transition-colors duration-200 hover:bg-white/[0.018] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[rgba(210,132,78,0.85)] md:px-7"
      >
        <h2 className="max-w-[28rem] text-lg font-semibold leading-snug tracking-[-0.018em] text-white md:text-xl">
          {title}
        </h2>

        <span
          aria-hidden="true"
          className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border transition-[border-color,background-color,color] duration-200 ${
            open
              ? "border-[rgba(210,132,78,0.45)] bg-[rgba(191,96,23,0.12)] text-[#d2844e]"
              : "border-white/10 bg-white/[0.025] text-neutral-400 group-hover:border-white/20 group-hover:text-neutral-200"
          }`}
        >
          <ChevronDown
            className={`h-[1.05rem] w-[1.05rem] transition-transform duration-300 ease-out ${
              open ? "rotate-180" : ""
            }`}
          />
        </span>
      </button>

      <div
        id={contentId}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="mx-6 border-t border-white/[0.08] pb-7 pt-6 text-base leading-8 text-neutral-300 md:mx-7">
            <div className="space-y-5">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

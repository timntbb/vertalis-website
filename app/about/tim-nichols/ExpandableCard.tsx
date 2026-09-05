"use client";

import { useState } from "react";
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

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 p-6 text-left"
      >
        <h2 className="text-xl font-semibold tracking-[-0.02em] text-white">
          {title}
        </h2>
        <ChevronDown
          aria-hidden="true"
          className={`h-5 w-5 flex-shrink-0 text-neutral-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-3 px-6 pb-6 text-sm leading-7 text-neutral-300">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

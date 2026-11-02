import React from "react";

type PracticeArtworkProps = {
  slug: string;
  variant?: "row" | "tile";
};

const iconOrder: Record<string, number> = {
  "company-ownership": 0,
  "contracts-transactions": 1,
  "people-operations": 2,
  "growth-capital": 3,
  "disputes-litigation": 4,
};

/**
 * The same five copper illustrations are used on the homepage and Services page.
 * The source is an optimized five-icon sprite, ordered from top to bottom.
 */
export default function PracticeArtwork({ slug, variant = "row" }: PracticeArtworkProps) {
  const position = iconOrder[slug] ?? 0;
  const tile = variant === "tile";

  return (
    <span
      aria-hidden="true"
      className={[
        "relative shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#B65E2E]/30",
        "bg-[linear-gradient(155deg,rgba(182,94,46,0.16),rgba(255,255,255,0.025)_65%,rgba(5,5,7,0.3))]",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
        tile ? "flex h-[112px] w-[112px]" : "hidden h-[82px] w-[82px] sm:flex",
      ].join(" ")}
    >
      <span
        className={[
          "block h-[74px] w-[84px] shrink-0 bg-[url('/services/vertalis-practice-icons.avif')]",
          "bg-[length:84px_365px] bg-no-repeat",
          "transition-transform duration-300",
          tile ? "scale-[1.22] group-hover:scale-[1.27]" : "group-hover:scale-[1.045]",
        ].join(" ")}
        style={{ backgroundPosition: `center -${position * 73}px` }}
      />
    </span>
  );
}

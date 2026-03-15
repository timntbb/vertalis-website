import Image from "next/image";
import Link from "next/link";

type AboutNodeRailProps = {
  current: "founders" | "governance" | "investors" | "employees" | "ip";
};

const items: Array<{ slug: AboutNodeRailProps["current"]; label: string }> = [
  { slug: "founders", label: "Founders" },
  { slug: "governance", label: "Governance" },
  { slug: "investors", label: "Capital Strategy" },
  { slug: "employees", label: "Employees" },
  { slug: "ip", label: "Intellectual Property" },
];

export default function AboutNodeRail({ current }: AboutNodeRailProps) {
  return (
    <aside className="h-fit rounded-[1.75rem] border border-white/10 bg-[radial-gradient(circle_at_20%_85%,rgba(192,96,32,0.12),transparent_70%),rgba(0,0,0,0.16)] p-6 shadow-[0_28px_64px_-40px_rgba(0,0,0,0.9),0_16px_40px_-30px_rgba(192,96,32,0.55),inset_0_1px_0_rgba(255,255,255,0.04)]">
      <Image
        src="/logo.png"
        alt="Vertalis shield"
        width={48}
        height={48}
        className="h-auto w-[52px] opacity-85"
      />

      <div className="relative mt-2 inline-flex">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-5 -inset-y-3 rounded-full bg-[radial-gradient(circle,rgba(192,96,32,0.34)_0%,rgba(192,96,32,0.14)_42%,rgba(192,96,32,0)_74%)] blur-xl"
        />
        <div
          className="relative z-10 text-4xl font-semibold leading-none"
          style={{
            fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
            color: "#c06020",
            textShadow:
              "0 1px 0 rgba(255,255,255,0.22), 0 14px 30px rgba(192,96,32,0.4), 0 26px 58px rgba(0,0,0,0.55)",
          }}
        >
          Vertalis
        </div>
      </div>

      <div className="mt-1 text-[0.72rem] uppercase tracking-[0.18em] text-neutral-500">
        Legal Counsel
      </div>

      <div className="mt-8 text-sm font-semibold uppercase tracking-[0.08em] text-white/90">
        Navigate
      </div>

      <div className="mt-3 flex flex-col gap-2">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/about/${item.slug}`}
            className={[
              "rounded-lg px-3 py-2 text-[15px] font-medium tracking-[0.08em] transition-all duration-300 ease-out",
              item.slug === current
                ? "text-white hover:text-[#e26a2c]"
                : "text-white/70 hover:-translate-y-[1px] hover:text-[#e26a2c]",
            ].join(" ")}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <Link
        href="/#contact"
        className="relative mt-6 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl border border-[#c06020]/35 bg-[linear-gradient(180deg,rgba(210,132,78,1)_0%,rgba(191,96,23,1)_100%)] px-4 py-2.5 text-sm font-medium text-white shadow-[0_12px_28px_-18px_rgba(191,96,23,0.55),inset_0_1px_0_rgba(255,255,255,0.26)] transition-[transform,background,box-shadow] duration-200 ease-out hover:-translate-y-[2px] hover:bg-[linear-gradient(180deg,rgba(218,140,84,1)_0%,rgba(199,104,30,1)_100%)] hover:shadow-[0_16px_32px_-18px_rgba(191,96,23,0.62),inset_0_1px_0_rgba(255,255,255,0.3)] before:pointer-events-none before:absolute before:left-[8%] before:right-[8%] before:top-0 before:h-px before:bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,0.42),rgba(255,255,255,0))] before:content-['']"
      >
        Contact
      </Link>
    </aside>
  );
}

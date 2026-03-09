import Image from "next/image";
import Link from "next/link";

type AboutNodeRailProps = {
  current: "founders" | "governance" | "investors" | "employees" | "ip";
};

const items: Array<{ slug: AboutNodeRailProps["current"]; label: string }> = [
  { slug: "founders", label: "Founders" },
  { slug: "governance", label: "Governance" },
  { slug: "investors", label: "Investors" },
  { slug: "employees", label: "Employees" },
  { slug: "ip", label: "IP" },
];

export default function AboutNodeRail({ current }: AboutNodeRailProps) {
  return (
    <aside className="h-fit rounded-[1.75rem] border border-white/10 bg-[radial-gradient(circle_at_20%_85%,rgba(192,96,32,0.12),transparent_70%),rgba(0,0,0,0.16)] p-6 shadow-[0_28px_64px_-40px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.04)]">
      <Image
        src="/logo.png"
        alt="Vertalis shield"
        width={48}
        height={48}
        className="h-auto w-[52px] opacity-85"
      />

      <div
        className="mt-2 text-4xl font-semibold leading-none"
        style={{
          fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
          color: "#c06020",
          textShadow:
            "0 1px 0 rgba(255,255,255,0.22), 0 14px 30px rgba(192,96,32,0.38), 0 26px 58px rgba(0,0,0,0.55)",
        }}
      >
        Vertalis
      </div>

      <div className="mt-1 text-[0.72rem] uppercase tracking-[0.18em] text-neutral-500">
        Legal Counsel
      </div>

      <div className="mt-8 text-sm font-semibold uppercase tracking-[0.08em] text-white/90">
        Navigate
      </div>

      <div className="mt-3 flex flex-col gap-2">
        <Link
          href="/"
          className="rounded-lg px-3 py-2 text-sm text-neutral-300 transition-colors hover:bg-white/5 hover:text-white"
        >
          Home
        </Link>

        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/about/${item.slug}`}
            className={[
              "rounded-lg px-3 py-2 text-sm transition-colors",
              item.slug === current
                ? "bg-white/10 text-white"
                : "text-neutral-300 hover:bg-white/5 hover:text-white",
            ].join(" ")}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <Link
        href="/#contact"
        className="mt-6 inline-flex w-full items-center justify-center rounded-xl border border-[#c06020]/35 bg-[linear-gradient(180deg,rgba(210,132,78,1)_0%,rgba(191,96,23,1)_100%)] px-4 py-2.5 text-sm font-medium text-white transition hover:brightness-105"
      >
        Contact
      </Link>
    </aside>
  );
}

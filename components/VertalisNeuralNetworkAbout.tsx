"use client";

import React from "react";
import Link from "next/link";
import VertalisWord from "@/components/VertalisWord";

type NodeItem = {
  id: string;
  slug: "founders" | "governance" | "investors" | "employees" | "ip";
  label: string;
  title: string;
  subtitle: string;
  details: string[];
  x: number;
  y: number;
  pop: "right" | "left" | "down";
};

export default function VertalisNeuralNetworkAbout() {
  const [activeNode, setActiveNode] = React.useState<string | null>(null);
  const closeTimerRef = React.useRef<number | null>(null);

  const nodes: NodeItem[] = [
    {
      id: "founders",
      slug: "founders",
      label: "Founders",
      title: "Founder alignment",
      subtitle: "Defining the relationships that determine everything else.",
      details: ["Equity splits", "Vesting", "Roles", "Decision rights"],
      x: 50,
      y: 12,
      pop: "down",
    },
    {
      id: "governance",
      slug: "governance",
      label: "Governance",
      title: "Decision structure",
      subtitle: "Keeping authority, control, and accountability clean.",
      details: ["Board mechanics", "Manager authority", "Approvals", "Operating rules"],
      x: 18,
      y: 34,
      pop: "right",
    },
    {
      id: "investors",
      slug: "investors",
      label: "Capital Strategy",
      title: "Capital Strategy",
      subtitle: "Positioning companies for disciplined growth.",
      details: ["Fundraising structure", "Investor readiness", "Term sheet risk", "Dilution awareness"],
      x: 82,
      y: 34,
      pop: "left",
    },
    {
      id: "employees",
      slug: "employees",
      label: "Employees",
      title: "People Architecture",
      subtitle: "Building legal infrastructure around the team.",
      details: ["Hiring frameworks", "Equity incentives", "Offer letters", "Contractor risk"],
      x: 24,
      y: 74,
      pop: "right",
    },
    {
      id: "ip",
      slug: "ip",
      label: "Intellectual Property",
      title: "Intellectual Property",
      subtitle: "Protecting the assets that create leverage.",
      details: ["Assignment hygiene", "Brand protection", "IP ownership", "Commercial rights"],
      x: 76,
      y: 74,
      pop: "left",
    },
  ];

  const sideConnectorNodes = ["governance", "investors", "employees", "ip"];
  const center = { x: 50, y: 50 };

  const clearCloseTimer = React.useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const handleNodeEnter = React.useCallback(
    (id: string) => {
      clearCloseTimer();
      setActiveNode(id);
    },
    [clearCloseTimer]
  );

  const handleNodeLeave = React.useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setActiveNode(null);
      closeTimerRef.current = null;
    }, 140);
  }, [clearCloseTimer]);

  const handleCardEnter = React.useCallback(() => {
    clearCloseTimer();
  }, [clearCloseTimer]);

  const handleCardLeave = React.useCallback(() => {
    clearCloseTimer();
    setActiveNode(null);
  }, [clearCloseTimer]);

  const activeNodeData = React.useMemo(
    () => nodes.find((node) => node.id === activeNode) ?? null,
    [nodes, activeNode]
  );

  React.useEffect(() => {
    return () => {
      clearCloseTimer();
    };
  }, [clearCloseTimer]);

  return (
    <section className="relative overflow-hidden bg-transparent px-0 py-0 text-white">
      <div className="lg:hidden rounded-[28px] border border-white/10 bg-[#060608] px-5 py-6 shadow-[0_20px_70px_rgba(0,0,0,0.5)]">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c06020]/25 bg-[#c06020]/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.24em] text-[#e9b18a]">
          Interactive founder-side Architecture
        </div>
        <h2 className="text-2xl font-semibold tracking-[-0.04em] text-white">
          What is <VertalisWord as="span">Vertalis</VertalisWord>?
        </h2>
        <p className="mt-3 text-sm leading-7 text-white/70">
          Core legal systems for founder momentum, presented in a mobile-friendly structure.
        </p>

        <div className="mt-5 grid gap-3">
          {nodes.map((node) => (
            <div
              key={`mobile-${node.id}`}
              className="rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
            >
              <div className="text-xs uppercase tracking-[0.2em] text-[#d59a73]">{node.label}</div>
              <div className="mt-1 text-lg font-semibold tracking-[-0.03em] text-white">{node.title}</div>
              <p className="mt-2 text-sm leading-6 text-white/72">{node.subtitle}</p>
              <div className="mt-3 pt-2">
                <Link
                  href={`/about/${node.slug}`}
                  className="text-sm font-medium text-[#d59a73] transition-colors duration-150 hover:text-[#e9b18a]"
                >
                  Learn more
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative hidden origin-top scale-[0.92] overflow-hidden rounded-[36px] border border-white/10 bg-[#060608] px-6 py-8 shadow-[0_30px_120px_rgba(0,0,0,0.58)] md:px-10 md:py-10 lg:block">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_10%,rgba(192,96,32,0.24),transparent_28%),radial-gradient(circle_at_50%_48%,rgba(192,96,32,0.10),transparent_26%),radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.035),transparent_58%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_32%,transparent_74%,rgba(255,255,255,0.018))]" />
        <div className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:38px_38px]" />
      </div>

      <div className="relative z-10 mb-8 max-w-2xl">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#c06020]/25 bg-[#c06020]/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.28em] text-[#e9b18a]">
          Interactive founder-side Architecture
        </div>
        <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
          What is <VertalisWord as="span">Vertalis</VertalisWord>?
        </h2>
        <p className="mt-3 max-w-xl text-base leading-7 text-white/62 md:text-lg">
          Vertalis is legal architecture for growing companies. We design the structure behind ownership, governance, capital, and teams. So founders can scale what they are building with clarity and control.
        </p>
      </div>

      <div className="relative z-10 h-[640px] w-full overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,15,18,0.98),rgba(8,8,10,0.99))] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_30px_120px_rgba(0,0,0,0.58)]">
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-[0] h-[66%] w-[56%] min-w-[420px] max-w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c06020]/16" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-[0] h-[52%] w-[68%] min-w-[560px] max-w-[980px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/8" />

        <svg className="pointer-events-none absolute inset-0 z-[1] h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="vertalis-line" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(192,96,32,0.10)" />
              <stop offset="50%" stopColor="rgba(192,96,32,0.88)" />
              <stop offset="100%" stopColor="rgba(192,96,32,0.10)" />
            </linearGradient>
            <filter id="vertalis-glow">
              <feGaussianBlur stdDeviation="0.35" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {sideConnectorNodes.map((id) => {
            const node = nodes.find((n) => n.id === id);
            if (!node) return null;
            return (
              <line
                key={`line-${id}`}
                x1={center.x}
                y1={center.y}
                x2={node.x}
                y2={node.y}
                stroke="url(#vertalis-line)"
                strokeWidth="0.18"
                strokeDasharray="1.4 1"
                opacity="0.78"
                filter="url(#vertalis-glow)"
              />
            );
          })}
        </svg>

        <div
          className="pointer-events-none absolute left-1/2 top-[12%] z-[1] h-[21.75%] w-[2px] -translate-x-1/2 bg-[repeating-linear-gradient(to_bottom,rgba(192,96,32,0.95)_0px,rgba(192,96,32,0.95)_10px,transparent_10px,transparent_18px)] opacity-90"
          aria-hidden="true"
        />

        <div className="pointer-events-none absolute left-1/2 top-1/2 z-[2] h-[32.5%] w-[24.7%] min-w-[180px] max-w-[305px] -translate-x-1/2 -translate-y-1/2 rounded-[42px] border border-[#c06020]/32 bg-[linear-gradient(180deg,rgba(192,96,32,0.18),rgba(192,96,32,0.07)_40%,rgba(255,255,255,0.02)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_0_0_1px_rgba(192,96,32,0.08)] backdrop-blur-[6px]" />

        <div className="absolute inset-0 z-[3] flex items-center justify-center scale-[0.9] origin-center">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="pointer-events-none absolute inset-0 rounded-[34px] bg-[#c06020]/12 blur-3xl animate-[vertalisPulse_7s_ease-in-out_infinite]" />
            <div className="relative flex h-[182px] w-[182px] items-center justify-center rounded-[34px] border border-[#c06020]/40 bg-[linear-gradient(180deg,rgba(192,96,32,0.16),rgba(192,96,32,0.08)_42%,rgba(15,15,18,0.80)_100%)] shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_30px_90px_rgba(192,96,32,0.16),inset_0_1px_0_rgba(255,255,255,0.12)]">
              <div className="flex h-full w-full flex-col items-center justify-center p-7 text-center">
                <div>
                  <VertalisWord
                    className="mb-2 text-2xl tracking-[0.04em] md:text-3xl"
                  >
                    Vertalis
                  </VertalisWord>
                  <div className="mt-5 text-[24px] font-semibold leading-[1.08] tracking-[-0.04em] text-white text-center">
                    Legal
                    <br />
                    Architecture
                  </div>
                </div>
                
              </div>
            </div>
          </div>

          {nodes.map((node) => {
            return (
              <div
                key={node.id}
                className="group absolute"
                style={{ left: `${node.x}%`, top: `${node.y}%`, transform: "translate(-50%, -50%)" }}
                onMouseEnter={() => handleNodeEnter(node.id)}
                onMouseLeave={handleNodeLeave}
              >
                <div className="relative z-10 flex flex-col items-center">
                  <div className="pointer-events-none absolute h-36 w-36 rounded-full bg-[#c06020]/14 blur-2xl transition duration-500 group-hover:scale-125 group-hover:bg-[#c06020]/22 group-focus-within:scale-125 group-focus-within:bg-[#c06020]/24" />
                  <Link
                    href={`/about/${node.slug}`}
                    aria-label={`${node.label} details`}
                    onFocus={() => handleNodeEnter(node.id)}
                    onBlur={handleNodeLeave}
                    className="relative flex h-[136px] w-[136px] cursor-pointer items-center justify-center rounded-full border border-white/14 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.14),rgba(255,255,255,0.045)_38%,rgba(255,255,255,0.01)_72%,rgba(0,0,0,0.38)_100%)] shadow-[0_18px_40px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-[10px] transition focus:outline-none focus-visible:border-[#c06020]/55 focus-visible:ring-2 focus-visible:ring-[#c06020]/35 group-hover:border-[#c06020]/45 group-hover:shadow-[0_18px_44px_rgba(192,96,32,0.14),inset_0_1px_0_rgba(255,255,255,0.16)] group-focus-within:border-[#c06020]/55 group-focus-within:shadow-[0_18px_48px_rgba(192,96,32,0.18),inset_0_1px_0_rgba(255,255,255,0.18)]"
                  >
                    <div
                      className={[
                        "text-center font-semibold tracking-[-0.03em] text-white leading-[1.08] text-[18px]",
                        node.id === "ip" ? "max-w-[110px]" : "",
                      ].join(" ")}
                    >
                      {node.id === "investors" ? (
                        <>
                          <span className="block">Capital</span>
                          <span className="block">Strategy</span>
                        </>
                      ) : node.id === "ip" ? (
                        <>
                          <span className="block">Intellectual</span>
                          <span className="block">Property</span>
                        </>
                      ) : (
                        node.label
                      )}
                    </div>
                    <div className="absolute inset-0 rounded-full border border-white/10 opacity-0 transition duration-500 group-hover:opacity-100 group-hover:scale-[1.03] group-focus-within:opacity-100 group-focus-within:scale-[1.03]" />
                  </Link>
                </div>
              </div>
            );
          })}

          <div
            className={[
              "absolute left-1/2 top-1/2 z-30 w-[408px] -translate-x-1/2 -translate-y-1/2 rounded-[24px] border border-white/12 bg-[linear-gradient(180deg,rgba(15,15,18,0.985),rgba(9,9,11,0.97))] p-7 shadow-[0_30px_80px_rgba(0,0,0,0.58),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-all duration-300",
              activeNodeData ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
            ].join(" ")}
            onMouseEnter={handleCardEnter}
            onMouseLeave={handleCardLeave}
          >
            {activeNodeData ? (
              <>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[14px] uppercase tracking-[0.32em] text-[#d59a73]">{activeNodeData.label}</div>
                    <div className="mt-1 text-xl font-semibold tracking-[-0.03em] text-white">{activeNodeData.title}</div>
                  </div>
                  <div className="h-10 w-10 rounded-full border border-[#c06020]/25 bg-[#c06020]/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]" />
                </div>

                <p className="text-[18px] leading-7 text-white/70">{activeNodeData.subtitle}</p>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  {activeNodeData.details.map((detail) => (
                    <div
                      key={detail}
                      className="rounded-xl border border-white/8 bg-white/[0.03] px-5 py-3 text-base text-white/82 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                    >
                      {detail}
                    </div>
                  ))}
                </div>

                <div className="mt-4 border-t border-white/10 pt-3">
                  <Link
                    href={`/about/${activeNodeData.slug}`}
                    className="pointer-events-auto text-base font-medium text-[#d59a73] transition-colors duration-150 hover:text-[#e9b18a]"
                  >
                    Learn more
                  </Link>
                </div>
              </>
            ) : null}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-8 bottom-8 z-[4] flex max-w-[360px] items-center justify-between rounded-full border border-white/10 bg-white/[0.04] px-6 py-4 text-[11px] uppercase tracking-[0.32em] text-white/46 backdrop-blur-md">
          <span>Hover the system</span>
        </div>
      </div>
      <style jsx>{`
        @keyframes vertalisPulse {
          0%,100% {
            transform: scale(0.96);
            opacity: 0.10;
          }
          50% {
            transform: scale(1.04);
            opacity: 0.18;
          }
        }
      `}</style>
      </div>
    </section>
  );
}

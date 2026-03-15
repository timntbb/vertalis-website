"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type BarKey = "founderA" | "founderB" | "pool" | "advisors" | "investors";

type CapBar = {
  pct: number;
  name: string;
  shares: number;
};

type CapState = {
  raised: number;
  postMoney: number;
  preMoney: number;
  pps: number;
  shares: number;
  bars: Record<BarKey, CapBar>;
};

type ShareholderInput = {
  id: string;
  name: string;
  shares: number;
  equityPct?: number;
  sharesInput?: string;
  equityPctInput?: string;
  color: string;
};

type DisplayBar = {
  key: string;
  className?: string;
  name: string;
  pct: number;
  shares: number;
  swatch: string;
};

type ScenarioResult = {
  preShares: number;
  postShares: number;
  preMoney: number;
  investment: number;
  postMoney: number;
  pricePerShare: number;
  investorNewShares: number;
  bars: DisplayBar[];
};

const PRE_ROUND: CapState = {
  raised: 500000,
  postMoney: 8500000,
  preMoney: 8000000,
  pps: 0.85,
  shares: 10000000,
  bars: {
    founderA: { pct: 50, name: "Founder A", shares: 5000000 },
    founderB: { pct: 30, name: "Founder B", shares: 3000000 },
    pool: { pct: 10, name: "Option Pool", shares: 1000000 },
    advisors: { pct: 5, name: "Advisors", shares: 500000 },
    investors: { pct: 5, name: "Angels", shares: 500000 },
  },
};

const POST_ROUND: CapState = {
  raised: 3000000,
  postMoney: 15000000,
  preMoney: 12500000,
  pps: 1.25,
  shares: 12000000,
  bars: {
    founderA: { pct: 42, name: "Founder A", shares: 5040000 },
    founderB: { pct: 25, name: "Founder B", shares: 3000000 },
    pool: { pct: 10, name: "Option Pool", shares: 1200000 },
    advisors: { pct: 3, name: "Advisors", shares: 360000 },
    investors: { pct: 20, name: "Seed Fund", shares: 2400000 },
  },
};

const BAR_ORDER: { key: BarKey; className: string; swatch: string }[] = [
  { key: "founderA", className: "founderA", swatch: "#c06020" },
  { key: "founderB", className: "founderB", swatch: "#a6511b" },
  { key: "pool", className: "pool", swatch: "#a99b8f" },
  { key: "advisors", className: "advisors", swatch: "#877a71" },
  { key: "investors", className: "investors", swatch: "#d88a4b" },
];

const CUSTOM_COLORS = [
  "#c06020",
  "#a6511b",
  "#a99b8f",
  "#877a71",
  "#d88a4b",
  "#efb37d",
  "#b87333",
  "#9a6a3a",
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function mixBar(key: BarKey, t: number): CapBar {
  return {
    pct: lerp(PRE_ROUND.bars[key].pct, POST_ROUND.bars[key].pct, t),
    shares: lerp(PRE_ROUND.bars[key].shares, POST_ROUND.bars[key].shares, t),
    name: t < 0.55 ? PRE_ROUND.bars[key].name : POST_ROUND.bars[key].name,
  };
}

function formatMoney(value: number) {
  if (value >= 1000000) {
    const n = value / 1000000;
    return `$${n.toFixed(n % 1 === 0 ? 1 : 2)}M`;
  }
  if (value >= 1000) return `$${Math.round(value / 1000)}K`;
  return `$${Math.round(value)}`;
}

function formatPricePerShare(value: number) {
  return `$${value.toFixed(2)}`;
}

function formatShareCount(value: number) {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  return Math.round(value).toLocaleString();
}

function formatWholeShares(value: number) {
  return `${Math.round(value).toLocaleString()} shares`;
}

function visibleScaleFromPct(pct: number) {
  return Math.max(pct, 3.5) / 100;
}

function makeId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `id-${Math.random().toString(36).slice(2, 11)}`;
}

function sanitizeNumberInput(value: string, allowDecimal = false) {
  const cleaned = allowDecimal
    ? value.replace(/[^0-9.]/g, "")
    : value.replace(/[^0-9]/g, "");

  if (!allowDecimal) return cleaned;

  const firstDot = cleaned.indexOf(".");
  if (firstDot === -1) return cleaned;

  return cleaned.slice(0, firstDot + 1) + cleaned.slice(firstDot + 1).replace(/[.]/g, "");
}

function calculateCustomScenario(
  shareholders: ShareholderInput[],
  customPreMoney: number,
  customInvestment: number,
  customInvestorName: string,
  progress: number,
  inputMode: "shares" | "equity",
): ScenarioResult {
  const sanitizedHolders = shareholders.map((holder) => ({
    ...holder,
    shares: Math.max(0, Number.isFinite(holder.shares) ? holder.shares : 0),
    equityPct: Math.max(0, Number.isFinite(holder.equityPct ?? 0) ? holder.equityPct ?? 0 : 0),
  }));

  const derivedHolders =
    inputMode === "equity"
      ? (() => {
          const totalPct = sanitizedHolders.reduce((sum, holder) => sum + (holder.equityPct ?? 0), 0);
          const basisShares = 10000000;
          return sanitizedHolders.map((holder) => ({
            ...holder,
            shares: totalPct > 0 ? ((holder.equityPct ?? 0) / totalPct) * basisShares : 0,
          }));
        })()
      : sanitizedHolders;

  const preShares = derivedHolders.reduce((sum, holder) => sum + holder.shares, 0);
  const safePreMoney = Math.max(0, customPreMoney);
  const safeInvestment = Math.max(0, customInvestment);
  const pricePerShare = preShares > 0 ? safePreMoney / preShares : 0;
  const investorNewShares = pricePerShare > 0 ? safeInvestment / pricePerShare : 0;
  const postShares = preShares + investorNewShares;
  const postMoney = safePreMoney + safeInvestment;

  const bars: DisplayBar[] = derivedHolders.map((holder) => {
    const prePct = preShares > 0 ? (holder.shares / preShares) * 100 : 0;
    const postPct = postShares > 0 ? (holder.shares / postShares) * 100 : 0;

    return {
      key: holder.id,
      name: holder.name,
      pct: lerp(prePct, postPct, progress),
      shares: holder.shares,
      swatch: holder.color,
    };
  });

  if (safeInvestment > 0 && investorNewShares > 0) {
    bars.push({
      key: "custom-investor",
      name: customInvestorName || "New Investor",
      pct: lerp(0, postShares > 0 ? (investorNewShares / postShares) * 100 : 0, progress),
      shares: lerp(0, investorNewShares, progress),
      swatch: "#efb37d",
    });
  }

  return {
    preShares,
    postShares,
    preMoney: safePreMoney,
    investment: safeInvestment,
    postMoney,
    pricePerShare,
    investorNewShares,
    bars,
  };
}

function runInternalTests() {
  const base: ShareholderInput[] = [
    { id: "1", name: "A", shares: 5000000, sharesInput: "5000000", color: "#111111" },
    { id: "2", name: "B", shares: 5000000, sharesInput: "5000000", color: "#222222" },
  ];

  const s1 = calculateCustomScenario(base, 10000000, 2000000, "Investor", 0, "shares");
  console.assert(s1.preShares === 10000000, "preShares should equal 10,000,000");
  console.assert(Math.round(s1.pricePerShare * 100) / 100 === 1, "pps should equal 1.00");

  const s2 = calculateCustomScenario(base, 10000000, 2000000, "Investor", 1, "shares");
  console.assert(s2.postShares === 12000000, "postShares should equal 12,000,000");
  console.assert(s2.bars.length === 3, "should add one investor bar");
  console.assert(Math.round(s2.bars[0].pct) === 42, "A should dilute to about 42%");
  console.assert(Math.round(s2.bars[2].pct) === 17, "Investor should own about 17%");

  const s3 = calculateCustomScenario(base, 0, 2000000, "Investor", 1, "shares");
  console.assert(s3.investorNewShares === 0, "no pps means no new shares should be issued");

  const pctBase: ShareholderInput[] = [
    { id: "1", name: "A", shares: 0, equityPct: 60, sharesInput: "", equityPctInput: "60", color: "#111111" },
    { id: "2", name: "B", shares: 0, equityPct: 40, sharesInput: "", equityPctInput: "40", color: "#222222" },
  ];
  const s4 = calculateCustomScenario(pctBase, 10000000, 2000000, "Investor", 1, "equity");
  console.assert(s4.bars.length === 3, "equity mode should still add investor bar");
  console.assert(sanitizeNumberInput("0a1b2c3") === "0123", "integer sanitizer should strip letters");
  console.assert(sanitizeNumberInput("1a2.3.4b", true) === "12.34", "decimal sanitizer should strip letters and extra dots");
  console.assert(sanitizeNumberInput("abc") === "", "empty numeric field should stay blank when letters are typed");
}

if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
  runInternalTests();
}

export default function VertalisCapTableCard() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const currentRef = useRef(0);
  const targetRef = useRef(0);

  const [progress, setProgress] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [showBuilder, setShowBuilder] = useState(false);
  const [customPreMoney, setCustomPreMoney] = useState(8000000);
  const [customInvestment, setCustomInvestment] = useState(3000000);
  const [customPreMoneyInput, setCustomPreMoneyInput] = useState("8000000");
  const [customInvestmentInput, setCustomInvestmentInput] = useState("3000000");
  const [customInvestorName, setCustomInvestorName] = useState("New Investor");
  const [shareholders, setShareholders] = useState<ShareholderInput[]>([
    { id: "1", name: "Founder A", shares: 5000000, equityPct: 50, sharesInput: "5000000", equityPctInput: "50", color: "#c06020" },
    { id: "2", name: "Founder B", shares: 3000000, equityPct: 30, sharesInput: "3000000", equityPctInput: "30", color: "#a6511b" },
    { id: "3", name: "Option Pool", shares: 1000000, equityPct: 10, sharesInput: "1000000", equityPctInput: "10", color: "#a99b8f" },
    { id: "4", name: "Advisors", shares: 500000, equityPct: 5, sharesInput: "500000", equityPctInput: "5", color: "#877a71" },
    { id: "5", name: "Angels", shares: 500000, equityPct: 5, sharesInput: "500000", equityPctInput: "5", color: "#d88a4b" },
  ]);
  const [inputMode, setInputMode] = useState<"shares" | "equity">("shares");

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const animateTo = (target: number) => {
    targetRef.current = clamp01(target);

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const startValue = currentRef.current;
    const endValue = targetRef.current;
    const duration = 1800;
    const startTime = performance.now();

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const rawT = Math.min(elapsed / duration, 1);
      const easedT = easeInOutCubic(rawT);
      const next = lerp(startValue, endValue, easedT);

      currentRef.current = next;
      setProgress(next);

      if (rawT < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        currentRef.current = endValue;
        setProgress(endValue);
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  const handleMouseEnter = () => {
    setIsActive(true);
    animateTo(1);
  };

  const handleMouseLeave = () => {
    setIsActive(false);
    animateTo(0);

    if (cardRef.current) {
      cardRef.current.style.transform =
        "rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)";
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    const rx = (0.5 - py) * 5;
    const ry = (px - 0.5) * 6;
    const lift = isActive ? -6 : -2;

    el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateY(${lift}px) scale(1.006)`;
  };

  const updateShareholder = (
    id: string,
    field: keyof ShareholderInput,
    value: string | number,
  ) => {
    setShareholders((prev) =>
      prev.map((holder) =>
        holder.id === id ? { ...holder, [field]: value } : holder,
      ),
    );
  };

  const updateNumericShareholderField = (
    id: string,
    mode: "shares" | "equity",
    rawValue: string,
  ) => {
    const cleaned = sanitizeNumberInput(rawValue, mode === "equity");

    setShareholders((prev) =>
      prev.map((holder) => {
        if (holder.id !== id) return holder;

        if (mode === "shares") {
          return {
            ...holder,
            sharesInput: cleaned,
            shares: cleaned === "" ? 0 : Math.max(0, Number(cleaned)),
          };
        }

        return {
          ...holder,
          equityPctInput: cleaned,
          equityPct: cleaned === "" ? 0 : Math.max(0, Number(cleaned)),
        };
      }),
    );
  };

  const updateBuilderMoneyField = (
    mode: "preMoney" | "investment",
    rawValue: string,
  ) => {
    const cleaned = sanitizeNumberInput(rawValue, false);

    if (mode === "preMoney") {
      setCustomPreMoneyInput(cleaned);
      setCustomPreMoney(cleaned === "" ? 0 : Math.max(0, Number(cleaned)));
      return;
    }

    setCustomInvestmentInput(cleaned);
    setCustomInvestment(cleaned === "" ? 0 : Math.max(0, Number(cleaned)));
  };

  const addShareholder = () => {
    setShareholders((prev) => [
      ...prev,
      {
        id: makeId(),
        name: `Holder ${prev.length + 1}`,
        shares: 0,
        equityPct: 0,
        sharesInput: "",
        equityPctInput: "",
        color: CUSTOM_COLORS[prev.length % CUSTOM_COLORS.length],
      },
    ]);
  };

  const clearBuilder = () => {
    setCustomPreMoney(0);
    setCustomInvestment(0);
    setCustomPreMoneyInput("");
    setCustomInvestmentInput("");
    setCustomInvestorName("New Investor");
    setInputMode("shares");
    setShareholders([
      { id: makeId(), name: "Holder 1", shares: 0, equityPct: 0, sharesInput: "", equityPctInput: "", color: CUSTOM_COLORS[0] },
      { id: makeId(), name: "Holder 2", shares: 0, equityPct: 0, sharesInput: "", equityPctInput: "", color: CUSTOM_COLORS[1] },
    ]);
  };

  const removeShareholder = (id: string) => {
    setShareholders((prev) => (prev.length > 1 ? prev.filter((h) => h.id !== id) : prev));
  };

  const customScenario = useMemo(
    () =>
      calculateCustomScenario(
        shareholders,
        customPreMoney,
        customInvestment,
        customInvestorName,
        progress,
        inputMode,
      ),
    [shareholders, customPreMoney, customInvestment, customInvestorName, progress, inputMode],
  );

  const raised = showBuilder
    ? lerp(0, customScenario.investment, progress)
    : lerp(PRE_ROUND.raised, POST_ROUND.raised, progress);
  const postMoney = showBuilder
    ? lerp(customScenario.preMoney, customScenario.postMoney, progress)
    : lerp(PRE_ROUND.postMoney, POST_ROUND.postMoney, progress);
  const preMoney = showBuilder
    ? customScenario.preMoney
    : lerp(PRE_ROUND.preMoney, POST_ROUND.preMoney, progress);
  const pps = showBuilder
    ? customScenario.pricePerShare
    : lerp(PRE_ROUND.pps, POST_ROUND.pps, progress);
  const shares = showBuilder
    ? lerp(customScenario.preShares, customScenario.postShares, progress)
    : lerp(PRE_ROUND.shares, POST_ROUND.shares, progress);

  const displayBars: DisplayBar[] = showBuilder
    ? customScenario.bars
    : BAR_ORDER.map(({ key, className, swatch }) => {
        const bar = mixBar(key, progress);
        return {
          key,
          className,
          pct: bar.pct,
          name: bar.name,
          shares: bar.shares,
          swatch,
        };
      });

  return (
    <div className="page-shell">
      <section
        ref={cardRef}
        className={`vertalis-cap-card ${isActive ? "is-active" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        <div className="ambient" />
        <div className="grid" />
        <div className="noise" />
        <div className="sheen" />
        <div className="pulse-wave" />

        <div className="content">
          <div className="left">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              Vertalis Capital Structure
            </div>

            <h2 className="headline">
              Simulate funding rounds and see how ownership shifts.
            </h2>

            <p className="sub">
              Default mode shows a sample cap table moving from pre-money to post-round.
              Custom mode lets users input current share ownership, a pre-money valuation,
              and an expected investment amount to visualize dilution live.
            </p>

            <div className="status-row">
              <button
                className="builder-toggle"
                onClick={() => setShowBuilder((v) => !v)}
                type="button"
              >
                {showBuilder ? "Hide custom builder" : "Build your own dilution scenario"}
              </button>

              <div className="pill accent">
                <span className="swap">
                  <span className={`before ${isActive ? "hidden" : ""}`}>
                    Current structure
                  </span>
                  <span className={`after ${isActive ? "shown" : ""}`}>
                    Post-money structure
                  </span>
                </span>
              </div>

              <div className="pill">
                <span className="swap">
                  <span className={`before ${isActive ? "hidden" : ""}`}>
                    Hover to simulate round
                  </span>
                  <span className={`after ${isActive ? "shown" : ""}`}>
                    Dilution applied
                  </span>
                </span>
              </div>

              <div className="pill">Ownership-based graph</div>
            </div>

            {showBuilder && (
              <div className="builder-panel">
                <div className="builder-head">
                  <div className="builder-title">Custom shareholder builder</div>
                  <div className="builder-sub">
                    Enter the current stock situation, pre-money valuation, and expected
                    investment. Resting state is pre-money, hover state is post-money.
                  </div>
                </div>

                <div className="builder-grid builder-grid-top">
                  <div className="builder-card builder-financials">
                    <label>
                      <span>Pre-money valuation</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={customPreMoneyInput}
                        onChange={(e) => updateBuilderMoneyField("preMoney", e.target.value)}
                      />
                    </label>
                  </div>

                  <div className="builder-card builder-financials">
                    <label>
                      <span>Expected investment</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={customInvestmentInput}
                        onChange={(e) => updateBuilderMoneyField("investment", e.target.value)}
                      />
                    </label>
                  </div>

                  <div className="builder-card builder-financials builder-span-2">
                    <label>
                      <span>Investor name</span>
                      <input
                        type="text"
                        value={customInvestorName}
                        onChange={(e) => setCustomInvestorName(e.target.value)}
                      />
                    </label>
                  </div>
                </div>

                <div className="builder-actions">
                  <div className="mode-toggle" role="tablist" aria-label="Input mode">
                    <button
                      className={`mode-btn ${inputMode === "shares" ? "active" : ""}`}
                      type="button"
                      onClick={() => setInputMode("shares")}
                    >
                      Current shares
                    </button>
                    <button
                      className={`mode-btn ${inputMode === "equity" ? "active" : ""}`}
                      type="button"
                      onClick={() => setInputMode("equity")}
                    >
                      Equity percentage
                    </button>
                  </div>

                  <div className="builder-actions-right">
                    <button className="ghost-btn" type="button" onClick={clearBuilder}>
                      Clear data
                    </button>
                    <button className="add-holder" type="button" onClick={addShareholder}>
                      Add shareholder
                    </button>
                  </div>
                </div>

                <div className="builder-grid">
                  {shareholders.map((holder) => (
                    <div className="builder-card" key={holder.id}>
                      <div className="builder-card-top">
                        <input
                          value={holder.name}
                          onChange={(e) => updateShareholder(holder.id, "name", e.target.value)}
                          placeholder="Shareholder name"
                        />
                        <button
                          className="remove-holder"
                          type="button"
                          onClick={() => removeShareholder(holder.id)}
                          aria-label={`Remove ${holder.name}`}
                        >
                          ×
                        </button>
                      </div>

                      <div className="builder-row builder-row-single">
                        <label>
                          <span>{inputMode === "shares" ? "Current shares" : "Equity percentage"}</span>
                          <input
                            type="text"
                            inputMode={inputMode === "shares" ? "numeric" : "decimal"}
                            pattern={inputMode === "shares" ? "[0-9]*" : "[0-9]*[.]?[0-9]*"}
                            value={inputMode === "shares" ? holder.sharesInput ?? "" : holder.equityPctInput ?? ""}
                            onChange={(e) =>
                              updateNumericShareholderField(
                                holder.id,
                                inputMode === "shares" ? "shares" : "equity",
                                e.target.value,
                              )
                            }
                          />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="summary">
              {showBuilder && (
                <div className="custom-summary-banner">
                  <div className="custom-summary-item">
                    <div className="label">Current shares</div>
                    <div className="value small">{formatShareCount(customScenario.preShares)}</div>
                  </div>
                  <div className="custom-summary-item">
                    <div className="label">Pre-money</div>
                    <div className="value small">{formatMoney(customScenario.preMoney)}</div>
                  </div>
                  <div className="custom-summary-item">
                    <div className="label">Investment</div>
                    <div className="value small">{formatMoney(customScenario.investment)}</div>
                  </div>
                  <div className="custom-summary-item">
                    <div className="label">Post-money</div>
                    <div className="value small">{formatMoney(customScenario.postMoney)}</div>
                  </div>
                </div>
              )}

              <div className="summary-head">
                <div>
                  <div className="label">Total raised</div>
                  <div className="value">{formatMoney(raised)}</div>
                </div>

                <div className="secondary">
                  <div className="label">Post-money</div>
                  <div className="value small">{formatMoney(postMoney)}</div>
                </div>
              </div>

              <div className="metric-grid">
                <div className="metric">
                  <div className="k">Pre-money</div>
                  <div className="v">{formatMoney(preMoney)}</div>
                </div>

                <div className="metric">
                  <div className="k">Price / share</div>
                  <div className="v">{formatPricePerShare(pps)}</div>
                </div>

                <div className="metric">
                  <div className="k">Fully diluted shares</div>
                  <div className="v">{formatShareCount(shares)}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="right">
            <div className="chart-shell">
              <div className="chart-top">
                <div>
                  <div className="chart-title">Cap table allocation</div>
                  <div className="chart-phase">
                    <span className="swap">
                      <span className={`before ${isActive ? "hidden" : ""}`}>Pre-Money</span>
                      <span className={`after ${isActive ? "shown" : ""}`}>Post-Money</span>
                    </span>
                  </div>
                </div>

                <div className="chart-badge">
                  <span className="swap">
                    <span className={`before ${isActive ? "hidden" : ""}`}>
                      Percent ownership
                    </span>
                    <span className={`after ${isActive ? "shown" : ""}`}>
                      Ownership rebalanced
                    </span>
                  </span>
                </div>
              </div>

              <div className="graph-frame">
                <div className="y-axis">
                  <div className="y-label y100">100%</div>
                  <div className="y-label y75">75%</div>
                  <div className="y-label y50">50%</div>
                  <div className="y-label y25">25%</div>
                  <div className="y-label y0">0%</div>
                </div>

                <div className="plot-area">
                  <div className="grid-lines">
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>

                  <div className="baseline" />

                  <div className="bars">
                    {displayBars.map((bar) => {
                      const dynamicClass = bar.className || "custom-bar";
                      return (
                        <div className="bar-wrap" key={bar.key}>
                          <div className="bar-track">
                            <div
                              className={`bar ${dynamicClass}`}
                              style={{
                                background: !bar.className
                                  ? `linear-gradient(180deg, ${bar.swatch}cc 0%, ${bar.swatch} 56%, rgba(0, 0, 0, 0.45) 100%)`
                                  : undefined,
                                transform: `scaleY(${visibleScaleFromPct(bar.pct)})`,
                              }}
                            >
                              <div className="face" />
                            </div>
                          </div>

                          <div className="bar-label">
                            <div className="pct">{Math.round(bar.pct)}%</div>
                            <div className="name">{bar.name}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="legend w-full max-w-full overflow-hidden flex flex-wrap gap-3">
                {displayBars.map((bar) => (
                  <div
                    className="legend-item flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm min-w-0 shrink"
                    key={`${bar.key}-legend`}
                  >
                    <span className="legend-swatch" style={{ background: bar.swatch }} />
                    <div className="legend-text min-w-0 break-words">
                      <div className="t">{bar.name}</div>
                      <div className="s">{formatWholeShares(bar.shares)}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="footer-outside">
                <span>Bars map directly to ownership percentages and rebalance on hover.</span>
                <span className="live">
                  <span className="pulse-dot" />
                  Vertalis hover transition
                </span>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .page-shell {
            width: 100%;
            max-width: 1160px;
            margin: 0 auto;
            background: transparent;
            padding: 10px 8px;
          }

          .vertalis-cap-card {
            --bg: #0a0a0c;
            --bg-2: #111215;
            --border: rgba(255, 255, 255, 0.1);
            --text: #f4efe8;
            --muted: rgba(244, 239, 232, 0.58);
            --vertalis-primary: #c06020;
            --vertalis-highlight: #e0b087;
            --ease: cubic-bezier(0.22, 1, 0.36, 1);
            position: relative;
            overflow: hidden;
            width: 100%;
            border-radius: 24px;
            border: 1px solid var(--border);
            background:
              radial-gradient(900px 520px at 18% 20%, rgba(192, 96, 32, 0.16), transparent 55%),
              radial-gradient(760px 440px at 84% 82%, rgba(224, 176, 135, 0.08), transparent 58%),
              linear-gradient(180deg, var(--bg-2), var(--bg));
            box-shadow:
              0 44px 120px rgba(0, 0, 0, 0.58),
              0 18px 48px rgba(0, 0, 0, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.05);
            transform-style: preserve-3d;
            transition:
              transform 550ms var(--ease),
              box-shadow 550ms var(--ease),
              border-color 550ms var(--ease);
            isolation: isolate;
            color: var(--text);
          }

          .vertalis-cap-card:hover {
            border-color: rgba(224, 176, 135, 0.22);
            box-shadow:
              0 56px 140px rgba(0, 0, 0, 0.66),
              0 24px 56px rgba(0, 0, 0, 0.34),
              inset 0 1px 0 rgba(255, 255, 255, 0.08);
          }

          .ambient,
          .grid,
          .noise,
          .sheen,
          .pulse-wave {
            position: absolute;
            inset: 0;
            pointer-events: none;
          }

          .ambient::before,
          .ambient::after {
            content: "";
            position: absolute;
            border-radius: 999px;
            filter: blur(72px);
            transition: transform 1000ms var(--ease), opacity 800ms ease;
          }

          .ambient::before {
            width: 560px;
            height: 560px;
            left: -120px;
            bottom: -160px;
            background: radial-gradient(circle, rgba(192, 96, 32, 0.3), rgba(154, 71, 20, 0.1) 44%, transparent 70%);
            opacity: 0.95;
          }

          .ambient::after {
            width: 500px;
            height: 500px;
            right: -80px;
            top: -110px;
            background: radial-gradient(circle, rgba(224, 176, 135, 0.16), rgba(127, 116, 107, 0.1) 42%, transparent 72%);
            opacity: 0.85;
          }

          .vertalis-cap-card:hover .ambient::before {
            transform: translate3d(20px, -14px, 0) scale(1.06);
          }

          .vertalis-cap-card:hover .ambient::after {
            transform: translate3d(-18px, 16px, 0) scale(1.05);
          }

          .grid {
            opacity: 0.24;
            background:
              linear-gradient(to right, transparent 0, transparent calc(100% - 1px), rgba(255, 255, 255, 0.025) calc(100% - 1px)),
              linear-gradient(to bottom, transparent 0, transparent calc(100% - 1px), rgba(255, 255, 255, 0.025) calc(100% - 1px));
            background-size: 64px 64px;
            mask-image: linear-gradient(180deg, rgba(255, 255, 255, 0.14), transparent 72%);
          }

          .noise {
            opacity: 0.03;
            background-image: radial-gradient(rgba(255, 255, 255, 0.9) 0.6px, transparent 0.6px);
            background-size: 9px 9px;
            mix-blend-mode: soft-light;
          }

          .sheen {
            inset: -25%;
            background: linear-gradient(115deg, transparent 30%, rgba(255, 255, 255, 0.03) 42%, rgba(255, 255, 255, 0.08) 49%, rgba(255, 255, 255, 0.02) 56%, transparent 70%);
            transform: translateX(-56%) translateY(-8%) rotate(8deg);
            transition: transform 1400ms var(--ease);
            opacity: 0.65;
          }

          .vertalis-cap-card:hover .sheen {
            transform: translateX(14%) translateY(-8%) rotate(8deg);
          }

          .pulse-wave {
            opacity: 0;
            transition: opacity 250ms ease;
          }

          .is-active .pulse-wave {
            opacity: 1;
          }

          .pulse-wave::before {
            content: "";
            position: absolute;
            inset: 22% -12% 18% -12%;
            background: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(224, 176, 135, 0.03) 24%, rgba(224, 176, 135, 0.13) 45%, rgba(192, 96, 32, 0.09) 56%, rgba(255, 255, 255, 0) 80%);
            filter: blur(10px);
            animation: capitalPulse 1200ms var(--ease) forwards;
            transform: translateX(-35%);
          }

          .content {
            position: relative;
            z-index: 2;
            display: grid;
            grid-template-columns: 1.02fr 0.98fr;
            gap: 20px;
            padding: 24px;
          }

          .left,
          .right {
            transform: translateZ(40px);
          }

          .eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 7px 11px;
            border-radius: 999px;
            border: 1px solid rgba(255, 255, 255, 0.09);
            background: rgba(255, 255, 255, 0.03);
            color: rgba(244, 239, 232, 0.78);
            font-size: 11px;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
          }

          .eyebrow-dot {
            width: 8px;
            height: 8px;
            border-radius: 999px;
            background: linear-gradient(180deg, var(--vertalis-highlight), var(--vertalis-primary));
            box-shadow: 0 0 16px rgba(192, 96, 32, 0.8);
          }

          .headline {
            margin: 14px 0 8px;
            font-size: clamp(18px, 2.1vw, 28px);
            line-height: 0.97;
            letter-spacing: -0.05em;
            font-weight: 650;
            max-width: 500px;
          }

          .sub {
            margin: 0;
            max-width: 500px;
            font-size: 15px;
            line-height: 1.58;
            color: var(--muted);
          }

          .status-row {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-top: 18px;
            flex-wrap: wrap;
          }

          .pill {
            padding: 8px 11px;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.035);
            border: 1px solid rgba(255, 255, 255, 0.07);
            color: rgba(244, 239, 232, 0.84);
            font-size: 12px;
          }

          .pill.accent {
            background: linear-gradient(180deg, rgba(192, 96, 32, 0.16), rgba(192, 96, 32, 0.07));
            border-color: rgba(224, 176, 135, 0.18);
          }

          .builder-toggle,
          .add-holder,
          .remove-holder {
            cursor: pointer;
          }

          .builder-toggle,
          .add-holder {
            padding: 9px 13px;
            border-radius: 12px;
            border: 1px solid rgba(224, 176, 135, 0.22);
            background: linear-gradient(180deg, rgba(192, 96, 32, 0.22), rgba(192, 96, 32, 0.08));
            color: #fff4ea;
            font-size: 12px;
            font-weight: 600;
            transition: transform 220ms ease, border-color 220ms ease, background 220ms ease;
          }

          .builder-toggle:hover,
          .add-holder:hover {
            transform: translateY(-1px);
            border-color: rgba(224, 176, 135, 0.35);
          }

          .builder-panel {
            margin-top: 18px;
            padding: 14px;
            border-radius: 18px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            background: linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.018));
          }

          .builder-head {
            margin-bottom: 10px;
          }

          .builder-title {
            font-size: 16px;
            font-weight: 650;
            color: #f4efe8;
          }

          .builder-sub {
            margin-top: 4px;
            font-size: 12px;
            color: rgba(244, 239, 232, 0.58);
          }

          .builder-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
          }

          .builder-grid-top {
            margin-bottom: 10px;
          }

          .builder-span-2 {
            grid-column: span 2;
          }

          .builder-actions {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            margin-bottom: 10px;
            flex-wrap: wrap;
          }

          .builder-actions-right {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
          }

          .mode-toggle {
            display: inline-flex;
            padding: 3px;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.08);
            gap: 3px;
          }

          .mode-btn,
          .ghost-btn {
            cursor: pointer;
            border-radius: 9px;
            padding: 8px 11px;
            font-size: 11px;
            font-weight: 600;
            transition: background 180ms ease, color 180ms ease, border-color 180ms ease, transform 180ms ease;
          }

          .mode-btn {
            border: 1px solid transparent;
            background: transparent;
            color: rgba(244, 239, 232, 0.68);
          }

          .mode-btn.active {
            background: rgba(192, 96, 32, 0.18);
            border-color: rgba(224, 176, 135, 0.22);
            color: #fff4ea;
          }

          .ghost-btn {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(255, 255, 255, 0.03);
            color: rgba(244, 239, 232, 0.84);
          }

          .ghost-btn:hover,
          .mode-btn:hover {
            transform: translateY(-1px);
          }

          .builder-card {
            padding: 12px;
            border-radius: 14px;
            border: 1px solid rgba(255, 255, 255, 0.07);
            background: rgba(255, 255, 255, 0.025);
          }

          .builder-card-top {
            display: flex;
            gap: 8px;
            align-items: center;
          }

          .remove-holder {
            width: 34px;
            min-width: 34px;
            height: 34px;
            border-radius: 9px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            background: rgba(255, 255, 255, 0.04);
            color: #fff4ea;
            font-size: 19px;
            line-height: 1;
          }

          .builder-card input {
            width: 100%;
            border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            background: rgba(8, 8, 10, 0.65);
            color: #f4efe8;
            padding: 9px 10px;
            outline: none;
          }

          .builder-financials {
            display: grid;
            gap: 8px;
          }

          .builder-row {
            margin-top: 8px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
          }

          .builder-row-single {
            grid-template-columns: 1fr;
          }

          .builder-row label,
          .builder-financials label {
            display: grid;
            gap: 5px;
            font-size: 11px;
            color: rgba(244, 239, 232, 0.62);
          }

          .summary {
            margin-top: 20px;
            padding: 16px;
            border-radius: 18px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            background: linear-gradient(180deg, rgba(255, 255, 255, 0.045), rgba(255, 255, 255, 0.02));
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 18px 40px rgba(0, 0, 0, 0.16);
          }

          .custom-summary-banner {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 10px;
            margin-bottom: 14px;
          }

          .custom-summary-item {
            padding: 10px 11px;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.07);
            background: rgba(255, 255, 255, 0.025);
          }

          .summary-head {
            display: flex;
            justify-content: space-between;
            gap: 12px;
            margin-bottom: 14px;
            align-items: end;
          }

          .label {
            color: var(--muted);
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.15em;
            margin-bottom: 5px;
          }

          .value {
            font-size: 28px;
            font-weight: 650;
            line-height: 1;
            letter-spacing: -0.04em;
          }

          .value.small {
            font-size: 20px;
          }

          .metric-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
          }

          .metric {
            padding: 11px;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.07);
            background: rgba(255, 255, 255, 0.025);
            transition: transform 450ms var(--ease), background 350ms ease;
          }

          .is-active .metric {
            transform: translateY(-2px);
            background: rgba(255, 255, 255, 0.035);
          }

          .metric .k {
            color: var(--muted);
            font-size: 11px;
            margin-bottom: 6px;
          }

          .metric .v {
            font-size: 16px;
            font-weight: 600;
            letter-spacing: -0.02em;
          }

          .chart-shell {
            position: relative;
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            background: linear-gradient(180deg, rgba(255, 255, 255, 0.045), rgba(255, 255, 255, 0.02));
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 28px 70px rgba(0, 0, 0, 0.22);
            padding: 14px 14px 12px;
            min-height: 500px;
            overflow: hidden;
          }

          .chart-top {
            display: flex;
            justify-content: space-between;
            gap: 14px;
            align-items: flex-start;
            margin-bottom: 14px;
            position: relative;
            z-index: 2;
          }

          .chart-title {
            font-size: 13px;
            color: rgba(244, 239, 232, 0.84);
            letter-spacing: 0.02em;
          }

          .chart-phase {
            margin-top: 6px;
            font-size: 24px;
            font-weight: 650;
            letter-spacing: -0.04em;
            line-height: 1;
          }

          .chart-badge {
            padding: 6px 10px;
            border-radius: 999px;
            font-size: 11px;
            color: rgba(244, 239, 232, 0.72);
            background: rgba(255, 255, 255, 0.035);
            border: 1px solid rgba(255, 255, 255, 0.07);
            white-space: nowrap;
          }

          .graph-frame {
            position: relative;
            height: 340px;
            padding: 16px 10px 12px 46px;
            border-radius: 18px;
            border: 1px solid rgba(255, 255, 255, 0.07);
            background: linear-gradient(180deg, rgba(255, 255, 255, 0.025), rgba(255, 255, 255, 0.01));
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03), inset 0 -1px 0 rgba(255, 255, 255, 0.02);
            isolation: isolate;
            overflow: hidden;
          }

          .y-axis {
            position: absolute;
            left: 10px;
            top: 16px;
            bottom: 12px;
            width: 28px;
            z-index: 2;
          }

          .y-label {
            position: absolute;
            right: 0;
            transform: translateY(50%);
            font-size: 10px;
            color: rgba(244, 239, 232, 0.38);
          }

          .y0 {
            bottom: 0%;
          }

          .y25 {
            bottom: 25%;
          }

          .y50 {
            bottom: 50%;
          }

          .y75 {
            bottom: 75%;
          }

          .y100 {
            bottom: 100%;
          }

          .plot-area {
            position: absolute;
            left: 46px;
            right: 10px;
            top: 16px;
            bottom: 12px;
            z-index: 1;
          }

          .grid-lines {
            position: absolute;
            inset: 0;
            z-index: 1;
          }

          .grid-lines span {
            position: absolute;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent);
          }

          .grid-lines span:nth-child(1) {
            bottom: 0%;
          }

          .grid-lines span:nth-child(2) {
            bottom: 25%;
          }

          .grid-lines span:nth-child(3) {
            bottom: 50%;
          }

          .grid-lines span:nth-child(4) {
            bottom: 75%;
          }

          .grid-lines span:nth-child(5) {
            bottom: 100%;
          }

          .baseline {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 1px;
            background: rgba(255, 255, 255, 0.14);
            box-shadow: 0 0 16px rgba(255, 255, 255, 0.04);
            z-index: 2;
          }

          .bars {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            gap: 12px;
            padding: 0 4px;
            z-index: 3;
          }

          .bar-wrap {
            flex: 1;
            min-width: 0;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: center;
            gap: 8px;
          }

          .bar-track {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: flex-end;
            justify-content: center;
          }

          .bar {
            width: 100%;
            max-width: 78px;
            height: 100%;
            min-height: 12px;
            border-radius: 6px 6px 0 0;
            position: relative;
            overflow: hidden;
            transform-origin: bottom center;
            will-change: transform;
            box-shadow:
              0 16px 26px rgba(0, 0, 0, 0.28),
              0 6px 10px rgba(0, 0, 0, 0.18),
              inset 1px 0 0 rgba(255, 255, 255, 0.08),
              inset -1px 0 0 rgba(0, 0, 0, 0.16),
              inset 0 1px 0 rgba(255, 255, 255, 0.06);
          }

          .bar .face {
            position: absolute;
            inset: 0;
          }

          .bar .face::before {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(90deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.035) 14%, rgba(255, 255, 255, 0) 42%, rgba(0, 0, 0, 0.12) 100%);
          }

          .bar .face::after {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            height: 1px;
            background: rgba(255, 255, 255, 0.16);
          }

          .bar.founderA {
            background: linear-gradient(180deg, #d39a70 0%, #c06020 56%, #7f350f 100%);
          }

          .bar.founderB {
            background: linear-gradient(180deg, #bf8358 0%, #a6511b 56%, #6b3210 100%);
          }

          .bar.pool {
            background: linear-gradient(180deg, #cfc3b8 0%, #a99b8f 56%, #6d635c 100%);
          }

          .bar.advisors {
            background: linear-gradient(180deg, #b1a7a0 0%, #877a71 56%, #554e48 100%);
          }

          .bar.investors {
            background: linear-gradient(180deg, #efcaa9 0%, #d88a4b 56%, #8d4f1f 100%);
          }

          .is-active .bar {
            filter: saturate(1.05) brightness(1.04);
            box-shadow:
              0 22px 38px rgba(0, 0, 0, 0.34),
              0 10px 16px rgba(0, 0, 0, 0.2),
              inset 1px 0 0 rgba(255, 255, 255, 0.11),
              inset -1px 0 0 rgba(0, 0, 0, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.08);
          }

          .bar-label {
            width: 100%;
            display: grid;
            gap: 4px;
            text-align: center;
            position: relative;
            z-index: 4;
          }

          .pct {
            font-size: 16px;
            font-weight: 650;
            letter-spacing: -0.03em;
            color: #fff6ed;
          }

          .name {
            font-size: 11px;
            color: rgba(244, 239, 232, 0.58);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .legend {
            margin-top: 14px;
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            width: 100%;
            max-width: 100%;
            overflow: hidden;
          }

          .legend-item {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 9px;
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.028);
            border: 1px solid rgba(255, 255, 255, 0.06);
            min-width: 0;
            flex-shrink: 1;
          }

          .legend-swatch {
            width: 8px;
            height: 8px;
            border-radius: 2px;
            flex: 0 0 auto;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.08);
          }

          .legend-text {
            min-width: 0;
            overflow-wrap: anywhere;
          }

          .legend-text .t {
            font-size: 11px;
            color: rgba(244, 239, 232, 0.86);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .legend-text .s {
            font-size: 10px;
            color: rgba(244, 239, 232, 0.5);
            margin-top: 1px;
          }

          .footer-outside {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            margin-top: 12px;
            color: rgba(244, 239, 232, 0.44);
            font-size: 11px;
            padding: 0 2px;
          }

          .live {
            display: inline-flex;
            align-items: center;
            gap: 10px;
          }

          .pulse-dot {
            width: 8px;
            height: 8px;
            border-radius: 999px;
            background: var(--vertalis-primary);
            box-shadow: 0 0 0 0 rgba(192, 96, 32, 0.75);
            animation: pulseDot 2.3s infinite;
          }

          .swap {
            position: relative;
            display: inline-grid;
          }

          .swap > span {
            grid-area: 1 / 1;
            transition: opacity 220ms ease, transform 420ms var(--ease);
          }

          .swap .after {
            opacity: 0;
            transform: translateY(10px);
          }

          .swap .before.hidden {
            opacity: 0;
            transform: translateY(-10px);
          }

          .swap .after.shown {
            opacity: 1;
            transform: translateY(0);
          }

          @keyframes capitalPulse {
            0% {
              transform: translateX(-35%);
              opacity: 0;
            }
            12% {
              opacity: 1;
            }
            100% {
              transform: translateX(38%);
              opacity: 0;
            }
          }

          @keyframes pulseDot {
            0% {
              box-shadow: 0 0 0 0 rgba(192, 96, 32, 0.55);
            }
            70% {
              box-shadow: 0 0 0 12px rgba(192, 96, 32, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(192, 96, 32, 0);
            }
          }

          @media (max-width: 980px) {
            .content {
              grid-template-columns: 1fr;
              gap: 16px;
              padding: 18px;
            }

            .vertalis-cap-card {
              min-height: auto;
            }

            .chart-shell {
              min-height: 460px;
            }

            .graph-frame {
              height: 300px;
            }

            .custom-summary-banner {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }

          @media (max-width: 700px) {
            .page-shell {
              padding: 6px;
            }

            .content {
              padding: 14px;
            }

            .headline {
              font-size: 28px;
            }

            .metric-grid,
            .builder-grid,
            .custom-summary-banner {
              grid-template-columns: 1fr;
            }

            .builder-span-2 {
              grid-column: span 1;
            }

            .bar {
              max-width: 62px;
            }

            .footer-outside {
              flex-direction: column;
              align-items: flex-start;
            }
          }
        `}</style>
      </section>
    </div>
  );
}

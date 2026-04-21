"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type InputMode = "percentage" | "shares";
type ViewMode = "before" | "after";

type ShareholderInput = {
  id: string;
  name: string;
  percentage: number;
  percentageInput: string;
  shares: number;
  sharesInput: string;
  color: string;
};

type DisplayBar = {
  key: string;
  name: string;
  pct: number;
  shares?: number;
  swatch: string;
};

type SafeScenarioResult = {
  safeOwnershipPct: number;
  founderBeforePct: number;
  founderAfterPct: number;
  founderDilutionPts: number;
  safeEstimatedShares: number;
  totalSharesBefore: number;
  totalSharesAfter: number;
  preBars: DisplayBar[];
  postBars: DisplayBar[];
};

const DEFAULT_COLORS = [
  "#c06020",
  "#a6511b",
  "#a99b8f",
  "#877a71",
  "#d88a4b",
  "#efb37d",
  "#b87333",
  "#9a6a3a",
];

const OPTION_POOL_ID = "option-pool";

function makeOptionPoolHolder(): ShareholderInput {
  return {
    id: OPTION_POOL_ID,
    name: "Option Pool",
    percentage: 10,
    percentageInput: "10",
    shares: 1000000,
    sharesInput: "1000000",
    color: "#a99b8f",
  };
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

function formatCurrencyFromDigits(value: string) {
  const digits = value.replace(/[^0-9]/g, "");
  if (digits === "") return "";
  return `$${Number(digits).toLocaleString()}`;
}

function formatMoney(value: number) {
  if (!Number.isFinite(value) || value <= 0) return "$0";
  if (value >= 1_000_000_000) {
    const n = value / 1_000_000_000;
    return `$${n.toFixed(n % 1 === 0 ? 1 : 2)}B`;
  }
  if (value >= 1_000_000) {
    const n = value / 1_000_000;
    return `$${n.toFixed(n % 1 === 0 ? 1 : 2)}M`;
  }
  if (value >= 1_000) return `$${Math.round(value / 1000)}K`;
  return `$${Math.round(value)}`;
}

function formatPercent(value: number) {
  if (!Number.isFinite(value)) return "0.0%";
  return `${value.toFixed(1)}%`;
}

function formatCapTablePercent(value: number) {
  if (!Number.isFinite(value)) return "%0";
  const rounded = Math.round(value * 10) / 10;
  const isWhole = Math.abs(rounded - Math.round(rounded)) < 0.0000001;
  return isWhole ? `%${Math.round(rounded)}` : `%${rounded.toFixed(1)}`;
}

function formatShareCount(value: number) {
  if (!Number.isFinite(value) || value <= 0) return "0";
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`;
  return Math.round(value).toLocaleString();
}

function formatWholeShares(value: number) {
  if (!Number.isFinite(value) || value <= 0) return "0 shares";
  return `${Math.round(value).toLocaleString()} shares`;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function calculateSimpleSafeScenario(params: {
  shareholders: ShareholderInput[];
  safeAmount: number;
  safeCap: number;
  safeInvestorName: string;
  inputMode: InputMode;
}): SafeScenarioResult {
  const { shareholders, safeAmount, safeCap, safeInvestorName, inputMode } = params;

  const safeOwnershipPct =
    safeCap > 0 ? Math.min((safeAmount / safeCap) * 100, 100) : 0;

  const remainingPct = Math.max(100 - safeOwnershipPct, 0);

  if (inputMode === "percentage") {
    const normalized = shareholders.map((holder) => ({
      ...holder,
      percentage: Math.max(
        0,
        Number.isFinite(holder.percentage) ? holder.percentage : 0,
      ),
    }));

    const totalPct = normalized.reduce((sum, holder) => sum + holder.percentage, 0);

    const preBars: DisplayBar[] = normalized.map((holder) => ({
      key: holder.id,
      name: holder.name,
      pct: totalPct > 0 ? (holder.percentage / totalPct) * 100 : 0,
      swatch: holder.color,
    }));

    const postBars: DisplayBar[] = preBars.map((bar) => ({
      ...bar,
      pct: (bar.pct / 100) * remainingPct,
    }));

    if (safeOwnershipPct > 0) {
      postBars.push({
        key: "safe-investor",
        name: safeInvestorName || "SAFE Investor",
        pct: safeOwnershipPct,
        swatch: "#efb37d",
      });
    }

    const founderBeforePct = preBars.reduce((sum, bar) => {
      const lowered = bar.name.toLowerCase();
      const excluded =
        lowered.includes("option") ||
        lowered.includes("pool") ||
        lowered.includes("advisor") ||
        lowered.includes("angel") ||
        lowered.includes("investor");
      return excluded ? sum : sum + bar.pct;
    }, 0);

    const founderAfterPct = postBars.reduce((sum, bar) => {
      const lowered = bar.name.toLowerCase();
      const excluded =
        lowered.includes("option") ||
        lowered.includes("pool") ||
        lowered.includes("advisor") ||
        lowered.includes("angel") ||
        lowered.includes("investor");
      return excluded ? sum : sum + bar.pct;
    }, 0);

    return {
      safeOwnershipPct,
      founderBeforePct,
      founderAfterPct,
      founderDilutionPts: founderBeforePct - founderAfterPct,
      safeEstimatedShares: 0,
      totalSharesBefore: 0,
      totalSharesAfter: 0,
      preBars,
      postBars,
    };
  }

  const sanitizedShares = shareholders.map((holder) => ({
    ...holder,
    shares: Math.max(0, Number.isFinite(holder.shares) ? holder.shares : 0),
  }));

  const totalSharesBefore = sanitizedShares.reduce((sum, holder) => sum + holder.shares, 0);
  const safeOwnershipDecimal = safeOwnershipPct / 100;
  const safeEstimatedShares = totalSharesBefore * safeOwnershipDecimal;
  const totalSharesAfter = totalSharesBefore + safeEstimatedShares;

  const preBars: DisplayBar[] = sanitizedShares.map((holder) => ({
    key: holder.id,
    name: holder.name,
    shares: holder.shares,
    pct: totalSharesBefore > 0 ? (holder.shares / totalSharesBefore) * 100 : 0,
    swatch: holder.color,
  }));

  const postBars: DisplayBar[] = sanitizedShares.map((holder) => ({
    key: holder.id,
    name: holder.name,
    shares: holder.shares,
    pct: totalSharesAfter > 0 ? (holder.shares / totalSharesAfter) * 100 : 0,
    swatch: holder.color,
  }));

  if (safeEstimatedShares > 0) {
    postBars.push({
      key: "safe-investor",
      name: safeInvestorName || "SAFE Investor",
      shares: safeEstimatedShares,
      pct: totalSharesAfter > 0 ? (safeEstimatedShares / totalSharesAfter) * 100 : 0,
      swatch: "#efb37d",
    });
  }

  const founderBeforePct = preBars.reduce((sum, bar) => {
    const lowered = bar.name.toLowerCase();
    const excluded =
      lowered.includes("option") ||
      lowered.includes("pool") ||
      lowered.includes("advisor") ||
      lowered.includes("angel") ||
      lowered.includes("investor");
    return excluded ? sum : sum + bar.pct;
  }, 0);

  const founderAfterPct = postBars.reduce((sum, bar) => {
    const lowered = bar.name.toLowerCase();
    const excluded =
      lowered.includes("option") ||
      lowered.includes("pool") ||
      lowered.includes("advisor") ||
      lowered.includes("angel") ||
      lowered.includes("investor");
    return excluded ? sum : sum + bar.pct;
  }, 0);

  return {
    safeOwnershipPct,
    founderBeforePct,
    founderAfterPct,
    founderDilutionPts: founderBeforePct - founderAfterPct,
    safeEstimatedShares,
    totalSharesBefore,
    totalSharesAfter,
    preBars,
    postBars,
  };
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="metric-card">
      <div className="metric-label">{label}</div>
      <div className="metric-value">{value}</div>
    </div>
  );
}

export default function VertalisCapTableCard() {
  const [showSettings, setShowSettings] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [view, setView] = useState<ViewMode>("before");
  const [inputMode, setInputMode] = useState<InputMode>("percentage");

  const [safeAmountInput, setSafeAmountInput] = useState("$500,000");
  const [safeCapInput, setSafeCapInput] = useState("$5,000,000");
  const [safeInvestorName, setSafeInvestorName] = useState("SAFE Investor");
  const [includeOptionPool, setIncludeOptionPool] = useState(false);

  const [shareholders, setShareholders] = useState<ShareholderInput[]>([
    {
      id: "founder-a",
      name: "Founder A",
      percentage: 50,
      percentageInput: "50",
      shares: 5000000,
      sharesInput: "5000000",
      color: "#c06020",
    },
    {
      id: "founder-b",
      name: "Founder B",
      percentage: 40,
      percentageInput: "40",
      shares: 4000000,
      sharesInput: "4000000",
      color: "#a6511b",
    },
    {
      id: "advisors",
      name: "Advisors",
      percentage: 5,
      percentageInput: "5",
      shares: 500000,
      sharesInput: "500000",
      color: "#877a71",
    },
    {
      id: "angels",
      name: "Angels",
      percentage: 5,
      percentageInput: "5",
      shares: 500000,
      sharesInput: "500000",
      color: "#d88a4b",
    },
  ]);

  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  function animateTo(target: number) {
    const startValue = progressRef.current;
    const endValue = clamp01(target);
    const duration = 950;
    const startTime = performance.now();

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const rawT = Math.min(elapsed / duration, 1);
      const easedT = easeInOutCubic(rawT);
      const next = lerp(startValue, endValue, easedT);

      progressRef.current = next;
      setProgress(next);

      if (rawT < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        progressRef.current = endValue;
        setProgress(endValue);
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }

  const safeAmountDigits = sanitizeNumberInput(safeAmountInput);
  const safeCapDigits = sanitizeNumberInput(safeCapInput);
  const safeAmount = safeAmountDigits === "" ? 0 : Number(safeAmountDigits);
  const safeCap = safeCapDigits === "" ? 0 : Number(safeCapDigits);

  const scenario = useMemo(
    () =>
      calculateSimpleSafeScenario({
        shareholders,
        safeAmount,
        safeCap,
        safeInvestorName,
        inputMode,
      }),
    [shareholders, safeAmount, safeCap, safeInvestorName, inputMode],
  );

  const displayBars = useMemo(() => {
    const preMap = new Map(scenario.preBars.map((bar) => [bar.key, bar]));
    const postMap = new Map(scenario.postBars.map((bar) => [bar.key, bar]));

    const allKeys = Array.from(
      new Set([
        ...scenario.preBars.map((b) => b.key),
        ...scenario.postBars.map((b) => b.key),
      ]),
    );

    return allKeys.map((key) => {
      const preBar = preMap.get(key);
      const postBar = postMap.get(key);

      const startPct = preBar?.pct ?? 0;
      const endPct = postBar?.pct ?? 0;

      const startShares = typeof preBar?.shares === "number" ? preBar.shares : 0;
      const endShares = typeof postBar?.shares === "number" ? postBar.shares : 0;

      return {
        key,
        name: postBar?.name ?? preBar?.name ?? "",
        pct: lerp(startPct, endPct, progress),
        shares:
          inputMode === "shares"
            ? lerp(startShares, endShares, progress)
            : undefined,
        swatch: postBar?.swatch ?? preBar?.swatch ?? "#c06020",
      };
    });
  }, [scenario.preBars, scenario.postBars, progress, inputMode]);

  const legendBars = view === "before" ? scenario.preBars : scenario.postBars;

  function updateCurrencyInput(
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string,
  ) {
    setter(formatCurrencyFromDigits(value));
  }

  function updateHolderName(id: string, value: string) {
    setShareholders((prev) =>
      prev.map((holder) => (holder.id === id ? { ...holder, name: value } : holder)),
    );
  }

  function updateHolderField(id: string, mode: InputMode, value: string) {
    const cleaned = sanitizeNumberInput(value, mode === "percentage");

    setShareholders((prev) =>
      prev.map((holder) => {
        if (holder.id !== id) return holder;

        if (mode === "percentage") {
          return {
            ...holder,
            percentageInput: cleaned,
            percentage: cleaned === "" ? 0 : Math.max(0, Number(cleaned)),
          };
        }

        return {
          ...holder,
          sharesInput: cleaned,
          shares: cleaned === "" ? 0 : Math.max(0, Number(cleaned)),
        };
      }),
    );
  }

  function addHolder() {
    setShareholders((prev) => [
      ...prev,
      {
        id: makeId(),
        name: `Holder ${prev.length + 1}`,
        percentage: 0,
        percentageInput: "",
        shares: 0,
        sharesInput: "",
        color: DEFAULT_COLORS[prev.length % DEFAULT_COLORS.length],
      },
    ]);
  }

  function removeHolder(id: string) {
    if (id === OPTION_POOL_ID) {
      setIncludeOptionPool(false);
    }
    setShareholders((prev) => (prev.length > 1 ? prev.filter((h) => h.id !== id) : prev));
  }

  function toggleOptionPool(enabled: boolean) {
    setIncludeOptionPool(enabled);

    setShareholders((prev) => {
      const hasOptionPool = prev.some((holder) => holder.id === OPTION_POOL_ID);

      if (enabled) {
        if (hasOptionPool) return prev;

        const next = [...prev];
        const insertAt = Math.min(2, next.length);
        next.splice(insertAt, 0, makeOptionPoolHolder());
        return next;
      }

      return prev.filter((holder) => holder.id !== OPTION_POOL_ID);
    });
  }

  function resetDefaults() {
    setShowSettings(false);
    setHasRun(false);
    setView("before");
    setInputMode("percentage");
    setSafeAmountInput("$500,000");
    setSafeCapInput("$5,000,000");
    setSafeInvestorName("SAFE Investor");
    setIncludeOptionPool(false);
    setProgress(0);
    progressRef.current = 0;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    setShareholders([
      {
        id: "founder-a",
        name: "Founder A",
        percentage: 50,
        percentageInput: "50",
        shares: 5000000,
        sharesInput: "5000000",
        color: "#c06020",
      },
      {
        id: "founder-b",
        name: "Founder B",
        percentage: 40,
        percentageInput: "40",
        shares: 4000000,
        sharesInput: "4000000",
        color: "#a6511b",
      },
      {
        id: "advisors",
        name: "Advisors",
        percentage: 5,
        percentageInput: "5",
        shares: 500000,
        sharesInput: "500000",
        color: "#877a71",
      },
      {
        id: "angels",
        name: "Angels",
        percentage: 5,
        percentageInput: "5",
        shares: 500000,
        sharesInput: "500000",
        color: "#d88a4b",
      },
    ]);
  }

  function runSimulation() {
    setHasRun(true);
    setView("before");
    animateTo(0);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setView("after");
        animateTo(1);
      });
    });
  }

  const headlineText = "See how a Post-Money SAFE converts, then how ownership changes.";
  const chartPhase = view === "before" ? "Before SAFE" : "After SAFE";
  const safeConversionSummary =
    safeCap > 0
      ? `${formatMoney(safeAmount)} on ${formatMoney(safeCap)} cap = ${formatPercent(
          scenario.safeOwnershipPct,
        )}`
      : "—";

  return (
    <div className="page-shell">
      <section className="vertalis-safe-card">
        <div className="ambient" />
        <div className="grid" />
        <div className="noise" />

        <div className="content">
          <div className="left">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              Vertalis Capital Structure
            </div>

            <h2 className="headline">{headlineText}</h2>

            <p className="sub">
              This model keeps the math simple. Enter a Post-Money SAFE amount and valuation cap,
              then see what percentage the investor gets and how the rest of the company
              is diluted.
            </p>

            <div className="action-row">
              <button
                className="primary-btn"
                type="button"
                onClick={() => setShowSettings((v) => !v)}
              >
                {showSettings ? "Hide SAFE settings" : "Open SAFE settings"}
              </button>

              <div className="pill accent">
                {inputMode === "percentage" ? "Company % mode" : "Shares mode"}
              </div>

              <div className="pill">
                {hasRun ? "Simulation applied" : "Click run simulation"}
              </div>
            </div>

            {showSettings && (
              <div className="settings-panel">
                <div className="settings-head">
                  <div className="settings-title">SAFE settings</div>
                  <div className="settings-sub">
                    Default view is company percentage. Switch to shares only if you want
                    to see estimated share impact too.
                  </div>
                </div>

                <div className="mode-toggle" role="tablist" aria-label="SAFE input mode">
                  <button
                    type="button"
                    className={`mode-btn ${inputMode === "percentage" ? "active" : ""}`}
                    onClick={() => setInputMode("percentage")}
                  >
                    Company %
                  </button>
                  <button
                    type="button"
                    className={`mode-btn ${inputMode === "shares" ? "active" : ""}`}
                    onClick={() => setInputMode("shares")}
                  >
                    Shares
                  </button>
                </div>

                <div className="settings-grid">
                  <div className="settings-card">
                    <label>
                      <span>SAFE amount</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={safeAmountInput}
                        onChange={(e) =>
                          updateCurrencyInput(setSafeAmountInput, e.target.value)
                        }
                      />
                    </label>
                  </div>

                  <div className="settings-card">
                    <label>
                      <span>Valuation cap</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={safeCapInput}
                        onChange={(e) =>
                          updateCurrencyInput(setSafeCapInput, e.target.value)
                        }
                      />
                    </label>
                  </div>

                  <div className="settings-card settings-span-2">
                    <label>
                      <span>Investor name</span>
                      <input
                        type="text"
                        value={safeInvestorName}
                        onChange={(e) => setSafeInvestorName(e.target.value)}
                      />
                    </label>
                  </div>

                  <div className="settings-card settings-span-2">
                    <label className="toggle-row">
                      <input
                        type="checkbox"
                        checked={includeOptionPool}
                        onChange={(e) => toggleOptionPool(e.target.checked)}
                      />
                      <span>Include option pool in cap table</span>
                    </label>
                  </div>
                </div>

                <div className="settings-toolbar">
                  <button className="ghost-btn" type="button" onClick={resetDefaults}>
                    Reset defaults
                  </button>
                  <button className="ghost-btn" type="button" onClick={addHolder}>
                    Add shareholder
                  </button>
                </div>

                <div className="holder-grid">
                  {shareholders.map((holder) => (
                    <div className="holder-card" key={holder.id}>
                      <div className="holder-top">
                        <input
                          value={holder.name}
                          onChange={(e) => updateHolderName(holder.id, e.target.value)}
                          placeholder="Shareholder name"
                        />
                        <button
                          className="remove-holder"
                          type="button"
                          onClick={() => removeHolder(holder.id)}
                          aria-label={`Remove ${holder.name}`}
                        >
                          ×
                        </button>
                      </div>

                      <label>
                        <span>
                          {inputMode === "percentage"
                            ? "Current company %"
                            : "Current shares"}
                        </span>
                        <input
                          type="text"
                          inputMode={inputMode === "percentage" ? "decimal" : "numeric"}
                          value={
                            inputMode === "percentage"
                              ? holder.percentageInput
                              : holder.sharesInput
                          }
                          onChange={(e) =>
                            updateHolderField(holder.id, inputMode, e.target.value)
                          }
                        />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="summary">
              <div className="summary-head">
                <div>
                  <div className="label">SAFE ownership result</div>
                  <div className="value">{formatPercent(scenario.safeOwnershipPct)}</div>
                </div>

                <div className="secondary">
                  <div className="label">Founder dilution</div>
                  <div className="value small">
                    {formatPercent(scenario.founderDilutionPts)}
                  </div>
                </div>
              </div>

              <div className="metric-grid">
                <MetricCard label="SAFE amount" value={formatMoney(safeAmount)} />
                <MetricCard label="Valuation cap" value={formatMoney(safeCap)} />
                <MetricCard label="SAFE result" value={safeConversionSummary} />
                <MetricCard
                  label={
                    inputMode === "shares" ? "Estimated SAFE shares" : "Founder after SAFE"
                  }
                  value={
                    inputMode === "shares"
                      ? formatShareCount(scenario.safeEstimatedShares)
                      : formatPercent(scenario.founderAfterPct)
                  }
                />
              </div>

              {hasRun && (
                <div className="founder-band">
                  <div className="founder-step">
                    <div className="mini-label">Founder before</div>
                    <div className="mini-value">
                      {formatPercent(scenario.founderBeforePct)}
                    </div>
                  </div>
                  <div className="mini-arrow">→</div>
                  <div className="founder-step accent">
                    <div className="mini-label">Founder after</div>
                    <div className="mini-value">
                      {formatPercent(scenario.founderAfterPct)}
                    </div>
                  </div>
                </div>
              )}

              <div className="run-row">
                <button className="run-btn" type="button" onClick={runSimulation}>
                  Run Simulation
                </button>
              </div>
            </div>
          </div>

          <div className="right">
            <div className="chart-shell">
              <div className="chart-top">
                <div>
                  <div className="chart-title">Cap table allocation</div>
                  <div className="chart-phase">{chartPhase}</div>
                </div>

                <div className="chart-badge">
                  {inputMode === "percentage" ? "Percent ownership" : "Percent + shares"}
                </div>
              </div>

              <div className="phase-tabs">
                <button
                  type="button"
                  className={`phase-tab ${view === "before" ? "active" : ""}`}
                  onClick={() => {
                    setView("before");
                    animateTo(0);
                  }}
                >
                  Before
                </button>
                <button
                  type="button"
                  className={`phase-tab ${view === "after" ? "active" : ""}`}
                  onClick={() => {
                    setView("after");
                    animateTo(1);
                  }}
                >
                  After
                </button>
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
                    {displayBars.map((bar) => (
                      <div className="bar-wrap" key={bar.key}>
                        <div className="bar-track">
                          <div
                            className="bar"
                            style={{
                              background: `linear-gradient(180deg, ${bar.swatch}cc 0%, ${bar.swatch} 56%, rgba(0,0,0,0.45) 100%)`,
                              height: `${clamp01(bar.pct / 100) * 100}%`,
                              minHeight: bar.pct > 0 ? "2px" : "0px",
                            }}
                          >
                            <div className="face" />
                          </div>
                        </div>

                        <div className="bar-label">
                          <div className="pct">{formatCapTablePercent(bar.pct)}</div>
                          <div className="name">{bar.name}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="legend">
                {legendBars.map((bar) => (
                  <div className="legend-item" key={`${bar.key}-legend`}>
                    <span className="legend-swatch" style={{ background: bar.swatch }} />
                    <div className="legend-text">
                      <div className="t">{bar.name}</div>
                      <div className="s">
                        {inputMode === "shares" && typeof bar.shares === "number"
                          ? formatWholeShares(bar.shares)
                          : formatCapTablePercent(bar.pct)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="footer-outside">
                <span>
                  Example: {formatMoney(safeAmount)} on a {formatMoney(safeCap)} cap ={" "}
                  {formatPercent(scenario.safeOwnershipPct)} investor ownership.
                </span>
                <span className="live">
                  <span className="pulse-dot" />
                  Vertalis SAFE model
                </span>
              </div>
            </div>
          </div>
        </div>

        <p className="tool-disclaimer">
          This tool is provided for educational purposes only and does not
          constitute legal or financial advice. Results are illustrative and
          should not be relied upon without consulting a qualified attorney.
        </p>
      </section>

      <style jsx>{`
        .page-shell {
          width: 100%;
          max-width: 1160px;
          margin: 0 auto;
          background: transparent;
          padding: 10px 8px;
        }

        .vertalis-safe-card {
          --border: rgba(255, 255, 255, 0.1);
          --text: #f4efe8;
          --muted: rgba(244, 239, 232, 0.58);
          --vertalis-primary: #c06020;
          position: relative;
          overflow: hidden;
          width: 100%;
          border-radius: 24px;
          border: 1px solid var(--border);
          background:
            radial-gradient(900px 520px at 18% 20%, rgba(192, 96, 32, 0.16), transparent 55%),
            radial-gradient(760px 440px at 84% 12%, rgba(224, 176, 135, 0.06), transparent 54%),
            linear-gradient(180deg, #0d0d10 0%, #09090b 100%);
          box-shadow:
            0 24px 100px rgba(0, 0, 0, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.04);
          color: var(--text);
        }

        .ambient,
        .grid,
        .noise {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .ambient {
          background:
            radial-gradient(circle at 18% 15%, rgba(192, 96, 32, 0.12), transparent 28%),
            radial-gradient(circle at 82% 18%, rgba(224, 176, 135, 0.05), transparent 24%);
        }

        .grid {
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 36px 36px;
          mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.6), transparent 92%);
          opacity: 0.18;
        }

        .noise {
          opacity: 0.05;
          background-image: radial-gradient(rgba(255, 255, 255, 0.4) 0.8px, transparent 0.9px);
          background-size: 8px 8px;
        }

        .content {
          position: relative;
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(360px, 0.95fr);
          gap: 22px;
          padding: 22px;
          z-index: 1;
        }

        .left,
        .right {
          min-width: 0;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.03);
          color: rgba(244, 239, 232, 0.86);
          padding: 8px 12px;
          border-radius: 999px;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          font-weight: 700;
        }

        .eyebrow-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: var(--vertalis-primary);
          box-shadow: 0 0 18px rgba(192, 96, 32, 0.65);
        }

        .headline {
          margin: 18px 0 10px;
          font-size: clamp(1.64rem, 2.62vw, 3.12rem);
          line-height: 0.95;
          letter-spacing: -0.05em;
          max-width: 20ch;
        }

        .sub {
          margin: 0;
          max-width: 62ch;
          color: var(--muted);
          font-size: 1rem;
          line-height: 1.7;
        }

        .action-row {
          margin-top: 18px;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          align-items: center;
        }

        .primary-btn,
        .ghost-btn,
        .run-btn,
        .phase-tab,
        .remove-holder,
        .mode-btn {
          appearance: none;
          border: 0;
          cursor: pointer;
          transition: transform 160ms ease, background 160ms ease, opacity 160ms ease;
        }

        .primary-btn:hover,
        .ghost-btn:hover,
        .run-btn:hover,
        .phase-tab:hover,
        .remove-holder:hover,
        .mode-btn:hover {
          transform: translateY(-1px);
        }

        .primary-btn {
          border-radius: 999px;
          padding: 12px 18px;
          background: rgba(192, 96, 32, 0.15);
          color: #f7d7bc;
          border: 1px solid rgba(192, 96, 32, 0.32);
          font-size: 0.92rem;
          font-weight: 700;
        }

        .pill {
          border-radius: 999px;
          padding: 11px 14px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: rgba(244, 239, 232, 0.8);
          font-size: 0.88rem;
        }

        .pill.accent {
          background: rgba(192, 96, 32, 0.09);
          border-color: rgba(192, 96, 32, 0.24);
          color: #f0c6a5;
        }

        .settings-panel {
          margin-top: 18px;
          padding: 18px;
          border-radius: 22px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.025);
        }

        .settings-head {
          margin-bottom: 14px;
        }

        .settings-title {
          font-size: 1rem;
          font-weight: 700;
        }

        .settings-sub {
          margin-top: 6px;
          color: var(--muted);
          font-size: 0.92rem;
          line-height: 1.6;
        }

        .mode-toggle {
          display: inline-flex;
          gap: 6px;
          padding: 5px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          margin-bottom: 14px;
        }

        .mode-btn {
          border-radius: 999px;
          padding: 10px 14px;
          background: transparent;
          color: rgba(244, 239, 232, 0.78);
          font-size: 0.86rem;
          font-weight: 600;
        }

        .mode-btn.active {
          background: rgba(192, 96, 32, 0.14);
          color: #f7d7bc;
          border: 1px solid rgba(192, 96, 32, 0.28);
        }

        .settings-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }

        .settings-card,
        .holder-card,
        .metric-card {
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(0, 0, 0, 0.18);
          border-radius: 18px;
          padding: 14px;
          min-width: 0;
        }

        .settings-span-2 {
          grid-column: span 2;
        }

        .settings-card label,
        .holder-card label {
          display: block;
        }

        .settings-card span,
        .holder-card span {
          display: block;
          margin-bottom: 8px;
          font-size: 0.82rem;
          color: rgba(244, 239, 232, 0.74);
        }

        .settings-card input,
        .holder-card input {
          width: 100%;
          min-width: 0;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.04);
          color: var(--text);
          padding: 11px 12px;
          font-size: 0.95rem;
          outline: none;
        }

        .toggle-row {
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }

        .toggle-row input {
          width: 18px;
          height: 18px;
          accent-color: var(--vertalis-primary);
          border-radius: 4px;
          padding: 0;
          min-width: auto;
        }

        .toggle-row span {
          margin: 0;
          font-size: 0.92rem;
          color: rgba(244, 239, 232, 0.86);
        }

        .settings-toolbar {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 14px;
          margin-bottom: 14px;
        }

        .ghost-btn {
          border-radius: 999px;
          padding: 10px 14px;
          background: rgba(255, 255, 255, 0.06);
          color: var(--text);
          font-size: 0.88rem;
          font-weight: 600;
        }

        .holder-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }

        .holder-top {
          display: flex;
          gap: 10px;
          align-items: center;
          margin-bottom: 12px;
        }

        .holder-top input {
          flex: 1;
        }

        .remove-holder {
          width: 34px;
          height: 34px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.88);
          font-size: 1.2rem;
          line-height: 1;
          flex: 0 0 auto;
        }

        .summary {
          margin-top: 18px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background:
            radial-gradient(circle at 12% 18%, rgba(192, 96, 32, 0.14), transparent 38%),
            linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015));
          padding: 16px;
        }

        .summary-head {
          display: flex;
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 14px;
        }

        .label {
          color: rgba(244, 239, 232, 0.6);
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.14em;
        }

        .value {
          font-size: 1.8rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          margin-top: 4px;
        }

        .secondary {
          text-align: right;
        }

        .value.small {
          font-size: 1.1rem;
        }

        .metric-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
        }

        .metric-label {
          color: rgba(244, 239, 232, 0.68);
          font-size: 0.78rem;
          margin-bottom: 7px;
        }

        .metric-value {
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          word-break: break-word;
        }

        .founder-band {
          margin-top: 14px;
          display: flex;
          gap: 12px;
          align-items: center;
          flex-wrap: wrap;
        }

        .founder-step {
          min-width: 120px;
          padding: 12px 14px;
          border-radius: 16px;
          background: rgba(0, 0, 0, 0.18);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .founder-step.accent {
          border-color: rgba(192, 96, 32, 0.36);
          background: rgba(192, 96, 32, 0.08);
        }

        .mini-label {
          color: rgba(244, 239, 232, 0.62);
          font-size: 0.76rem;
          margin-bottom: 6px;
        }

        .mini-value {
          font-size: 1rem;
          font-weight: 700;
        }

        .mini-arrow {
          color: rgba(244, 239, 232, 0.5);
          font-size: 1rem;
        }

        .run-row {
          margin-top: 16px;
        }

        .run-btn {
          border-radius: 999px;
          padding: 12px 18px;
          background: linear-gradient(180deg, #d87732 0%, #b55218 100%);
          color: white;
          font-size: 0.92rem;
          font-weight: 700;
          box-shadow: 0 10px 26px rgba(192, 96, 32, 0.25);
        }

        .chart-shell {
          height: 100%;
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02));
          padding: 18px;
        }

        .chart-top {
          display: flex;
          justify-content: space-between;
          gap: 14px;
          align-items: center;
          margin-bottom: 10px;
          flex-wrap: wrap;
        }

        .chart-title {
          font-size: 1rem;
          font-weight: 700;
        }

        .chart-phase {
          margin-top: 4px;
          font-size: 0.9rem;
          color: rgba(244, 239, 232, 0.72);
        }

        .chart-badge {
          border-radius: 999px;
          padding: 10px 14px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.04);
          font-size: 0.85rem;
          color: rgba(244, 239, 232, 0.8);
        }

        .phase-tabs {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 12px;
        }

        .phase-tab {
          border-radius: 999px;
          padding: 10px 14px;
          background: rgba(255, 255, 255, 0.05);
          color: rgba(244, 239, 232, 0.82);
          font-size: 0.84rem;
          font-weight: 600;
        }

        .phase-tab.active {
          background: rgba(192, 96, 32, 0.12);
          border: 1px solid rgba(192, 96, 32, 0.26);
          color: #f4cba9;
        }

        .graph-frame {
          --plot-height: 320px;
          --label-band: 58px;
          display: grid;
          grid-template-columns: 44px minmax(0, 1fr);
          gap: 10px;
          min-height: calc(var(--plot-height) + var(--label-band));
          align-items: end;
        }

        .y-axis {
          position: relative;
          height: calc(var(--plot-height) + var(--label-band));
          color: rgba(244, 239, 232, 0.38);
          font-size: 0.72rem;
        }

        .y-label {
          position: absolute;
          left: 0;
          transform: translateY(50%);
        }

        .y100 { bottom: calc(var(--label-band) + var(--plot-height) - 14px); }
        .y75 { bottom: calc(var(--label-band) + (var(--plot-height) * 0.75)); }
        .y50 { bottom: calc(var(--label-band) + (var(--plot-height) * 0.5)); }
        .y25 { bottom: calc(var(--label-band) + (var(--plot-height) * 0.25)); }
        .y0 { bottom: var(--label-band); transform: none; }

        .plot-area {
          position: relative;
          min-width: 0;
          height: calc(var(--plot-height) + var(--label-band));
          padding: 0 6px;
        }

        .grid-lines {
          position: absolute;
          inset: 0 0 var(--label-band) 0;
          display: grid;
          grid-template-rows: repeat(5, 1fr);
          pointer-events: none;
        }

        .grid-lines span {
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .baseline {
          position: absolute;
          left: 0;
          right: 0;
          bottom: var(--label-band);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .bars {
          position: relative;
          height: calc(var(--plot-height) + var(--label-band));
          display: flex;
          align-items: stretch;
          justify-content: space-between;
          gap: 12px;
          padding: 0;
          min-width: 0;
        }

        .bar-wrap {
          flex: 1 1 0;
          min-width: 0;
          height: 100%;
          display: grid;
          grid-template-rows: var(--plot-height) 48px;
          align-items: center;
          gap: 10px;
        }

        .bar-track {
          position: relative;
          width: 100%;
          max-width: 64px;
          height: 100%;
          min-height: 0;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }

        .bar {
          position: relative;
          width: 100%;
          min-height: 0;
          transform-origin: bottom center;
          border-radius: 16px 16px 8px 8px;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.16),
            0 16px 40px rgba(0,0,0,0.3);
          will-change: height;
          overflow: hidden;
        }

        .face {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.16), transparent 26%),
            linear-gradient(90deg, rgba(255,255,255,0.1), transparent 38%, rgba(0,0,0,0.14));
        }

        .bar-label {
          text-align: center;
          min-width: 0;
        }

        .pct {
          font-size: 0.92rem;
          font-weight: 700;
          color: rgba(244, 239, 232, 0.95);
        }

        .name {
          margin-top: 4px;
          color: rgba(244, 239, 232, 0.64);
          font-size: 0.78rem;
          line-height: 1.35;
          word-break: break-word;
        }

        .legend {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 18px;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 10px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          padding: 10px 12px;
          min-width: 0;
        }

        .legend-swatch {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          flex: 0 0 auto;
        }

        .legend-text .t {
          font-size: 0.84rem;
          color: rgba(244,239,232,0.92);
        }

        .legend-text .s {
          font-size: 0.76rem;
          color: rgba(244,239,232,0.58);
          margin-top: 3px;
        }

        .footer-outside {
          margin-top: 14px;
          display: flex;
          justify-content: space-between;
          gap: 14px;
          flex-wrap: wrap;
          color: rgba(244,239,232,0.58);
          font-size: 0.8rem;
        }

        .tool-disclaimer {
          margin: 14px 18px 8px;
          color: rgba(244, 239, 232, 0.46);
          font-size: 11px;
          line-height: 1.6;
          letter-spacing: 0.01em;
        }

        .live {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: var(--vertalis-primary);
          box-shadow: 0 0 16px rgba(192, 96, 32, 0.6);
        }

        @media (max-width: 1100px) {
          .content {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 860px) {
          .settings-grid,
          .holder-grid,
          .metric-grid {
            grid-template-columns: 1fr;
          }

          .settings-span-2 {
            grid-column: span 1;
          }
        }

        @media (max-width: 640px) {
          .content {
            padding: 18px;
          }

          .headline {
            font-size: 1.8rem;
            max-width: none;
          }

          .graph-frame {
            grid-template-columns: 34px minmax(0, 1fr);
          }

          .bar-track {
            max-width: 46px;
          }

          .bars {
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
}
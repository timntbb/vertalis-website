"use client";

import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  ImageDown,
  Layers,
  Plus,
  RotateCcw,
  Sparkles,
  Trash2,
} from "lucide-react";

const ACCENT = "#ff7a2f";
const ACCENT_DARK = "#e05a1f";
const SLIDE_SIZE = 1080;
const PREVIEW_SCALE = 0.62;

type SlideType = "hook" | "breakdown" | "diagram" | "quote" | "cta";

type Slide = {
  type: SlideType;
  eyebrow: string;
  headline: string;
  body: string;
  footer: string;
  bullets?: string[];
  nodes?: string[];
};

type SlideFrameProps = {
  children: React.ReactNode;
  footer?: string;
  index: number;
  total: number;
};

type SlideRenderProps = {
  slide: Slide;
  index: number;
  total: number;
};

type FieldProps = {
  label: string;
  value?: string;
  onChange: (value: string) => void;
  multiline?: boolean;
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline";
};

const initialSlides: Slide[] = [
  {
    type: "hook",
    eyebrow: "FOUNDER INTELLIGENCE",
    headline: "YOUR COMPANY ISN'T BREAKING FROM GROWTH.",
    body: "It is breaking from structural misalignment.",
    footer: "STRATEGY. STRUCTURE. PROTECTION.",
  },
  {
    type: "breakdown",
    eyebrow: "THE HIDDEN PROBLEM",
    headline: "Most founder risk starts years before litigation appears.",
    bullets: [
      "Contracts evolve independently",
      "Operational systems drift",
      "Decision authority becomes unclear",
      "Teams scale without structure",
    ],
    body: "The company keeps growing, but the internal framework starts pulling apart.",
    footer: "VERTALIS / STRUCTURAL COUNSEL FOR FOUNDERS",
  },
  {
    type: "breakdown",
    eyebrow: "WHERE IT STARTS",
    headline: "Pressure compounds silently inside growing companies.",
    bullets: [
      "Sales promises conflict",
      "Employment obligations expand",
      "Vendor liability increases",
      "IP ownership fragments",
    ],
    body: "Most founders never notice the fracture until money, investors, or disputes expose it.",
    footer: "SYSTEMS BEFORE SCALING",
  },
  {
    type: "diagram",
    eyebrow: "HOW CHAOS COMPOUNDS",
    headline: "Small misalignments become expensive disputes.",
    nodes: ["Growth", "More contracts", "Operational friction", "Legal exposure", "Litigation"],
    body: "The issue is rarely one bad document. It is the lack of a unified structure.",
    footer: "STRUCTURAL THINKING",
  },
  {
    type: "quote",
    eyebrow: "VERTALIS PRINCIPLE",
    headline: "Legal structure should operate like infrastructure, not paperwork.",
    body: "Founders do not need more disconnected documents. They need systems capable of surviving pressure.",
    footer: "VERTALIS",
  },
  {
    type: "breakdown",
    eyebrow: "THE CONSEQUENCE",
    headline: "The cost of misalignment grows exponentially over time.",
    bullets: ["Founder disputes", "Compliance failures", "Investor hesitation", "Expensive litigation"],
    body: "Most operational collapse begins long before the visible breaking point.",
    footer: "RISK ACCELERATES WITH SCALE",
  },
  {
    type: "cta",
    eyebrow: "THE TAKEAWAY",
    headline: "Structure must scale before growth exposes the cracks.",
    body: "The strongest companies build systems capable of surviving pressure before pressure arrives.",
    footer: "STRATEGY. STRUCTURE. PROTECTION.",
  },
];

const slideTypes: SlideType[] = ["hook", "breakdown", "diagram", "quote", "cta"];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function cleanText(value: string) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim();
}

function wordCount(value: string) {
  return cleanText(value).split(" ").filter(Boolean).length;
}

function getHeadlineClass(type: SlideType, text: string) {
  const words = wordCount(text);
  const chars = String(text || "").length;

  if (type === "hook") {
    if (words <= 6) return "text-[112px] leading-[0.88] tracking-[-0.075em]";
    if (words <= 10) return "text-[94px] leading-[0.9] tracking-[-0.068em]";
    return "text-[76px] leading-[0.94] tracking-[-0.058em]";
  }

  if (type === "quote") {
    if (chars > 100) return "text-[58px] leading-[0.98] tracking-[-0.052em]";
    if (chars > 72) return "text-[70px] leading-[0.95] tracking-[-0.058em]";
    return "text-[86px] leading-[0.92] tracking-[-0.065em]";
  }

  if (chars > 92) return "text-[60px] leading-[0.98] tracking-[-0.052em]";
  if (chars > 64) return "text-[74px] leading-[0.94] tracking-[-0.06em]";
  return "text-[88px] leading-[0.91] tracking-[-0.066em]";
}

function highlight(text: string) {
  const terms = [
    "growth",
    "structure",
    "risk",
    "contracts",
    "founder",
    "founders",
    "misalignment",
    "exposure",
    "breaking",
    "pressure",
    "litigation",
  ];
  const regex = new RegExp(`\\b(${terms.join("|")})\\b`, "gi");

  return String(text || "")
    .split(regex)
    .map((part, index) =>
      terms.includes(part.toLowerCase()) ? (
        <span key={index} style={{ color: ACCENT }}>
          {part}
        </span>
      ) : (
        part
      ),
    );
}

function Button({ className, variant = "solid", type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cx(
        "inline-flex items-center justify-center gap-1 rounded-sm transition disabled:cursor-not-allowed disabled:opacity-50",
        variant === "outline" ? "border border-white/10 bg-white/[0.03]" : "",
        className,
      )}
      {...props}
    />
  );
}

function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={className}>{children}</div>;
}

function CardContent({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={className}>{children}</div>;
}

function Background() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[10px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(255,255,255,0.12),transparent_28%),radial-gradient(circle_at_78%_76%,rgba(255,122,47,0.19),transparent_33%)]" />
      <div
        className="absolute inset-0 opacity-[0.065]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "54px 54px",
        }}
      />
      <div className="absolute -right-28 top-24 h-96 w-96 rounded-sm border border-white/10" />
      <div className="absolute -right-10 top-40 h-64 w-64 rounded-sm border" style={{ borderColor: `${ACCENT_DARK}66` }} />
      <div className="absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-black/80 to-transparent" />
    </div>
  );
}

function SlideFrame({ children, footer, index, total }: SlideFrameProps) {
  return (
    <div
      className="relative h-[1080px] w-[1080px] overflow-hidden rounded-[10px] bg-black text-white shadow-2xl"
      style={{ border: `2px solid ${ACCENT}` }}
    >
      <Background />
      <div className="absolute left-[74px] top-[66px] h-[7px] w-[92px]" style={{ backgroundColor: ACCENT }} />
      <div className="relative z-10 flex h-full flex-col px-[74px] pb-[58px] pt-[116px]">
        <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
        <div className="flex h-[58px] shrink-0 items-end justify-between border-t border-white/10 pt-5 text-[12px] uppercase tracking-[0.34em] text-white/50">
          <div className="max-w-[760px] truncate">{footer || "STRATEGY. STRUCTURE. PROTECTION."}</div>
          <div className="text-white/35">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>
        </div>
      </div>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8 text-[14px] font-black uppercase tracking-[0.48em]" style={{ color: ACCENT }}>
      {children}
    </div>
  );
}

function Body({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cx("max-w-[810px] text-[34px] font-extrabold leading-[1.14] tracking-[-0.04em] text-white/78", className)}>
      {children}
    </div>
  );
}

function HookSlide({ slide, index, total }: SlideRenderProps) {
  return (
    <SlideFrame footer={slide.footer} index={index} total={total}>
      <div className="flex h-full flex-col justify-center pb-[34px]">
        <Eyebrow>{slide.eyebrow}</Eyebrow>
        <h1 className={cx("max-w-[875px] font-black uppercase text-[#f4f4f2]", getHeadlineClass("hook", slide.headline))}>
          {highlight(slide.headline)}
        </h1>
        <Body className="mt-11 max-w-[770px]">{highlight(slide.body)}</Body>
      </div>
    </SlideFrame>
  );
}

function BreakdownSlide({ slide, index, total }: SlideRenderProps) {
  const bullets = (slide.bullets || []).slice(0, 4);

  return (
    <SlideFrame footer={slide.footer} index={index} total={total}>
      <div className="grid h-full grid-rows-[auto_auto_1fr_auto] pb-[18px]">
        <Eyebrow>{slide.eyebrow}</Eyebrow>
        <h2 className={cx("max-w-[890px] font-black uppercase text-white", getHeadlineClass("breakdown", slide.headline))}>
          {highlight(slide.headline)}
        </h2>
        <div className="mt-8 grid grid-cols-2 content-center gap-4">
          {bullets.map((bullet, i) => (
            <div key={i} className="min-h-[130px] rounded-md border border-white/10 bg-white/[0.045] p-5 shadow-lg backdrop-blur-sm">
              <div className="mb-4 text-[12px] font-black tracking-[0.28em]" style={{ color: ACCENT }}>
                0{i + 1}
              </div>
              <div className="text-[28px] font-black leading-[1.04] tracking-[-0.04em] text-white/92">{highlight(bullet)}</div>
            </div>
          ))}
        </div>
        <Body className="mt-8 max-w-[840px] text-[30px]">{highlight(slide.body)}</Body>
      </div>
    </SlideFrame>
  );
}

function DiagramSlide({ slide, index, total }: SlideRenderProps) {
  const nodes = (slide.nodes || []).slice(0, 5);

  return (
    <SlideFrame footer={slide.footer} index={index} total={total}>
      <div className="grid h-full grid-rows-[auto_auto_1fr_auto] pb-[18px]">
        <Eyebrow>{slide.eyebrow}</Eyebrow>
        <h2 className={cx("max-w-[830px] font-black text-white", getHeadlineClass("diagram", slide.headline))}>{highlight(slide.headline)}</h2>
        <div className="my-8 grid grid-cols-5 content-center gap-3">
          {nodes.map((node, i) => (
            <div key={i} className="min-h-[166px] rounded-lg border bg-black/40 p-5 shadow-xl backdrop-blur-sm" style={{ borderColor: `${ACCENT_DARK}AA` }}>
              <div className="mb-7 text-[12px] font-black tracking-[0.24em]" style={{ color: ACCENT }}>
                0{i + 1}
              </div>
              <div className="text-[24px] font-black leading-[1.05] tracking-[-0.04em] text-white">{highlight(node)}</div>
            </div>
          ))}
        </div>
        <Body className="max-w-[840px] text-[30px]">{highlight(slide.body)}</Body>
      </div>
    </SlideFrame>
  );
}

function QuoteSlide({ slide, index, total }: SlideRenderProps) {
  return (
    <SlideFrame footer={slide.footer} index={index} total={total}>
      <div className="flex h-full flex-col justify-center pb-[28px]">
        <Eyebrow>{slide.eyebrow}</Eyebrow>
        <div className={cx("max-w-[875px] font-black text-white", getHeadlineClass("quote", slide.headline))}>"{highlight(slide.headline)}"</div>
        <div className="mt-11 flex max-w-[850px] gap-7">
          <div className="w-[5px] shrink-0 rounded-sm" style={{ backgroundColor: ACCENT }} />
          <Body className="text-[32px]">{highlight(slide.body)}</Body>
        </div>
      </div>
    </SlideFrame>
  );
}

function CtaSlide({ slide, index, total }: SlideRenderProps) {
  return (
    <SlideFrame footer={slide.footer} index={index} total={total}>
      <div className="flex h-full flex-col justify-center pb-[34px]">
        <Eyebrow>{slide.eyebrow}</Eyebrow>
        <h2 className={cx("max-w-[850px] font-black uppercase text-white", getHeadlineClass("cta", slide.headline))}>{highlight(slide.headline)}</h2>
        <Body className="mt-11 max-w-[800px]">{highlight(slide.body)}</Body>
        <div className="mt-12 inline-flex w-fit rounded-sm border px-6 py-3 text-sm font-black uppercase tracking-[0.25em]" style={{ borderColor: `${ACCENT_DARK}88`, backgroundColor: `${ACCENT_DARK}28`, color: ACCENT }}>
          VERTALIS
        </div>
      </div>
    </SlideFrame>
  );
}

function RenderSlide({ slide, index, total }: SlideRenderProps) {
  if (slide.type === "breakdown") return <BreakdownSlide slide={slide} index={index} total={total} />;
  if (slide.type === "diagram") return <DiagramSlide slide={slide} index={index} total={total} />;
  if (slide.type === "quote") return <QuoteSlide slide={slide} index={index} total={total} />;
  if (slide.type === "cta") return <CtaSlide slide={slide} index={index} total={total} />;
  return <HookSlide slide={slide} index={index} total={total} />;
}

function PreviewSlide({ slide, index, total }: SlideRenderProps) {
  return (
    <div style={{ width: SLIDE_SIZE * PREVIEW_SCALE, height: SLIDE_SIZE * PREVIEW_SCALE }} className="relative shrink-0">
      <div style={{ transform: `scale(${PREVIEW_SCALE})`, transformOrigin: "top left", width: SLIDE_SIZE, height: SLIDE_SIZE }}>
        <RenderSlide slide={slide} index={index} total={total} />
      </div>
    </div>
  );
}

function Field({ label, value, onChange, multiline = false }: FieldProps) {
  return (
    <label className="block">
      <div className="mb-2 text-sm font-bold text-white/85">{label}</div>
      {multiline ? (
        <textarea
          value={value || ""}
          onChange={(event) => onChange(event.target.value)}
          className="min-h-[92px] w-full resize-y rounded-sm border border-white/10 bg-black/40 p-3 text-sm leading-relaxed text-white outline-none transition focus:border-[#ff7a2f]"
        />
      ) : (
        <input
          value={value || ""}
          onChange={(event) => onChange(event.target.value)}
          className="h-11 w-full rounded-sm border border-white/10 bg-black/40 px-3 text-sm text-white outline-none transition focus:border-[#ff7a2f]"
        />
      )}
    </label>
  );
}

function makeSlide(type: SlideType = "hook"): Slide {
  return {
    type,
    eyebrow: type === "cta" ? "THE TAKEAWAY" : type === "diagram" ? "SYSTEM VIEW" : "FOUNDER INTELLIGENCE",
    headline: type === "hook" ? "THE SYSTEM BREAKS BEFORE THE COMPANY DOES." : "Add your strategic insight here.",
    body: "Add the founder-facing explanation here.",
    bullets: ["First pressure point", "Second pressure point", "Third pressure point", "Fourth pressure point"],
    nodes: ["Input", "Pressure", "Friction", "Exposure", "Cost"],
    footer: "STRATEGY. STRUCTURE. PROTECTION.",
  };
}

function getFirstSentence(value: string, fallback: string) {
  const text = cleanText(value);
  const match = text.match(/^(.+?[.!?])\s/);
  return match ? match[1] : text || fallback;
}

function buildPressurePoints(value: string) {
  const lower = cleanText(value).toLowerCase();
  const points: string[] = [];

  if (lower.includes("contract")) points.push("Contracts drift out of alignment");
  if (lower.includes("employee") || lower.includes("employment")) points.push("Employment obligations expand");
  if (lower.includes("ip") || lower.includes("intellectual")) points.push("IP ownership becomes unclear");
  if (lower.includes("vendor")) points.push("Vendor liability increases");
  if (lower.includes("founder")) points.push("Founder authority gets blurred");
  if (lower.includes("investor") || lower.includes("capital")) points.push("Investor diligence exposes gaps");
  if (lower.includes("litigation") || lower.includes("lawsuit")) points.push("Disputes become more expensive");
  if (lower.includes("compliance")) points.push("Compliance failures compound");

  return [
    ...points,
    "Contracts are created in isolation",
    "Decision authority becomes unclear",
    "Risk becomes harder to trace",
    "Execution slows under pressure",
  ].slice(0, 4);
}

function fileSafe(value: string) {
  return String(value || "vertalis-slide")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 52);
}

export default function TestCarouselArticle() {
  const [slides, setSlides] = useState<Slide[]>(initialSlides);
  const [active, setActive] = useState(0);
  const [brief, setBrief] = useState(
    "Contracts created in isolation create operational chaos as the company scales. Sales, employment, vendor, IP, and founder obligations begin pointing in different directions, and the risk becomes visible during funding, disputes, hiring, or litigation.",
  );
  const [status, setStatus] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const exportRefs = useRef<Array<HTMLDivElement | null>>([]);

  const current = slides[active];
  const json = useMemo(() => JSON.stringify(slides, null, 2), [slides]);

  function updateSlide(patch: Partial<Slide>) {
    setSlides((prev) => prev.map((slide, index) => (index === active ? { ...slide, ...patch } : slide)));
  }

  function updateList(key: "bullets" | "nodes", raw: string) {
    updateSlide({ [key]: raw.split("\n").map((item) => item.trim()).filter(Boolean) });
  }

  function addSlide() {
    setSlides((prev) => [...prev, makeSlide("hook")]);
    setActive(slides.length);
  }

  function duplicateSlide() {
    const copy = JSON.parse(JSON.stringify(current)) as Slide;
    setSlides((prev) => [...prev.slice(0, active + 1), copy, ...prev.slice(active + 1)]);
    setActive(active + 1);
  }

  function deleteSlide() {
    if (slides.length === 1) return;
    setSlides((prev) => prev.filter((_, index) => index !== active));
    setActive((prev) => Math.max(0, prev - 1));
  }

  function generateFromBriefLocal() {
    const source = cleanText(brief);
    if (!source) return;

    const opening = getFirstSentence(source, "The company keeps growing, but the structure underneath it starts pulling apart.");
    const bullets = buildPressurePoints(source);

    setSlides([
      {
        type: "hook",
        eyebrow: "FOUNDER INTELLIGENCE",
        headline: "THE COMPANY BREAKS WHERE THE STRUCTURE IS WEAKEST.",
        body: opening,
        footer: "STRATEGY. STRUCTURE. PROTECTION.",
      },
      {
        type: "breakdown",
        eyebrow: "THE HIDDEN PROBLEM",
        headline: "Growth exposes the systems founders forgot to build.",
        bullets,
        body: "The issue is rarely growth itself. The issue is whether the company has the structure to survive it.",
        footer: "VERTALIS / STRUCTURAL COUNSEL FOR FOUNDERS",
      },
      {
        type: "breakdown",
        eyebrow: "WHERE IT STARTS",
        headline: "Operational pressure rarely appears all at once.",
        bullets: ["Contracts evolve separately", "Obligations spread quietly", "Authority becomes informal", "Risk hides inside operations"],
        body: "By the time the problem is visible, the company has usually been misaligned for months or years.",
        footer: "SYSTEMS BEFORE SCALING",
      },
      {
        type: "diagram",
        eyebrow: "HOW CHAOS COMPOUNDS",
        headline: "Small misalignments become expensive disputes.",
        nodes: ["Growth", "Pressure", "Friction", "Exposure", "Dispute"],
        body: "The issue is not one bad document. It is the lack of a unified company structure.",
        footer: "STRUCTURAL THINKING",
      },
      {
        type: "quote",
        eyebrow: "VERTALIS PRINCIPLE",
        headline: "Legal structure should operate like infrastructure, not paperwork.",
        body: "Founders do not need more disconnected documents. They need systems capable of surviving pressure.",
        footer: "VERTALIS",
      },
      {
        type: "breakdown",
        eyebrow: "THE CONSEQUENCE",
        headline: "The cost of misalignment grows as the company scales.",
        bullets: ["Founder disputes", "Compliance failures", "Investor hesitation", "Litigation exposure"],
        body: "Most companies do not collapse because they grew. They collapse because their structure did not grow with them.",
        footer: "RISK ACCELERATES WITH SCALE",
      },
      {
        type: "cta",
        eyebrow: "THE TAKEAWAY",
        headline: "Structure must scale before growth exposes the cracks.",
        body: "The strongest companies build systems capable of surviving pressure before pressure arrives.",
        footer: "STRATEGY. STRUCTURE. PROTECTION.",
      },
    ]);
    setActive(0);
  }

  async function generateFromBrief() {
    const source = cleanText(brief);
    if (!source || isGenerating) return;

    try {
      setIsGenerating(true);
      setStatus("Generating carousel with OpenAI...");

      const response = await fetch("/api/carousel-generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: source }),
      });

      const data = (await response.json()) as {
        slides?: Slide[];
        error?: string;
        details?: string;
        warning?: string;
      };

      if (!response.ok || !Array.isArray(data.slides) || data.slides.length === 0) {
        const detail = typeof data.details === "string" && data.details.trim()
          ? ` (${data.details.slice(0, 180)})`
          : "";
        throw new Error((data.error || "Generation failed") + detail);
      }

      setSlides(data.slides);
      setActive(0);
      if (data.warning) {
        setStatus(`${data.warning} Generated ${data.slides.length}-slide carousel.`);
      } else {
        setStatus(`Generated ${data.slides.length}-slide carousel from your prompt.`);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Generation failed";
      setStatus(`OpenAI generation failed: ${message}. Verify OPENAI_API_KEY on the server and restart.`);
    } finally {
      setIsGenerating(false);
    }
  }

  async function copyJson() {
    await navigator.clipboard.writeText(json);
    setStatus("Copied carousel JSON.");
    setTimeout(() => setStatus(""), 1800);
  }

  async function exportAllJpg() {
    try {
      setStatus("Preparing JPG exports...");
      const { toJpeg } = await import("html-to-image");
      for (let index = 0; index < slides.length; index++) {
        const node = exportRefs.current[index];
        if (!node) {
          continue;
        }

        const dataUrl = await toJpeg(node, {
          quality: 0.96,
          pixelRatio: 1,
          backgroundColor: "#050505",
          canvasWidth: 1080,
          canvasHeight: 1080,
        });

        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `vertalis-${String(index + 1).padStart(2, "0")}-${fileSafe(slides[index].headline)}.jpg`;
        link.click();

        // Small stagger improves browser reliability for multiple downloads.
        await new Promise((resolve) => window.setTimeout(resolve, 120));
      }

      setStatus(`Exported ${slides.length} slide JPG${slides.length === 1 ? "" : "s"}.`);
    } catch {
      setStatus("Export needs html-to-image installed in your project: npm install html-to-image");
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] p-5 text-white">
      <div className="mx-auto grid max-w-[1720px] grid-cols-[390px_minmax(760px,1fr)_300px] gap-5">
        <Card className="rounded-[8px] border border-white/10 bg-[#0a0a0a] text-white shadow-2xl">
          <CardContent className="p-6">
            <div className="mb-5 flex items-center gap-3">
              <Layers className="h-7 w-7" style={{ color: ACCENT }} />
              <div>
                <div className="text-3xl font-black tracking-[-0.04em]">Vertalis Engine</div>
                <p className="mt-1 text-sm text-white/55">Preview-ready carousel builder.</p>
              </div>
            </div>

            <div className="mb-5 h-px" style={{ backgroundImage: `linear-gradient(to right, ${ACCENT_DARK}, transparent)` }} />

            <div className="mb-5 grid grid-cols-5 gap-2">
              {slideTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => updateSlide({ type })}
                  className={cx(
                    "rounded-sm border px-2 py-2 text-[11px] font-bold capitalize transition",
                    current.type === type ? "text-black" : "border-white/10 bg-white/[0.03] text-white/60 hover:text-white",
                  )}
                  style={current.type === type ? { backgroundColor: ACCENT, borderColor: ACCENT } : undefined}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="mb-5 flex gap-2 overflow-x-auto pb-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActive(index)}
                  className={cx("min-w-12 rounded-sm border px-3 py-2 text-sm font-black transition", active === index ? "text-black" : "border-white/10 bg-black text-white/50")}
                  style={active === index ? { backgroundColor: ACCENT, borderColor: ACCENT } : undefined}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <Field label="Eyebrow" value={current.eyebrow} onChange={(value) => updateSlide({ eyebrow: value })} />
              <Field label="Headline" value={current.headline} onChange={(value) => updateSlide({ headline: value })} multiline />
              <Field label="Body / Punchline" value={current.body} onChange={(value) => updateSlide({ body: value })} multiline />
              {current.type === "breakdown" && <Field label="Bullets, one per line" value={(current.bullets || []).join("\n")} onChange={(value) => updateList("bullets", value)} multiline />}
              {current.type === "diagram" && <Field label="Diagram nodes, one per line" value={(current.nodes || []).join("\n")} onChange={(value) => updateList("nodes", value)} multiline />}
              <Field label="Footer" value={current.footer} onChange={(value) => updateSlide({ footer: value })} />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button onClick={addSlide} className="h-12 font-bold text-black hover:opacity-90" style={{ backgroundColor: ACCENT }}>
                <Plus className="mr-2 h-4 w-4" /> Add
              </Button>
              <Button onClick={duplicateSlide} variant="outline" className="h-12 font-bold text-white hover:bg-white/10">
                <Copy className="mr-2 h-4 w-4" /> Duplicate
              </Button>
              <Button onClick={deleteSlide} variant="outline" className="h-12 font-bold text-white hover:bg-white/10">
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </Button>
              <Button onClick={() => { setSlides(initialSlides); setActive(0); }} variant="outline" className="h-12 font-bold text-white hover:bg-white/10">
                <RotateCcw className="mr-2 h-4 w-4" /> Reset
              </Button>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-3">
              <Button onClick={exportAllJpg} className="h-12 w-full font-black text-black hover:opacity-90" style={{ backgroundColor: ACCENT }}>
                <ImageDown className="mr-2 h-4 w-4" /> Export All JPGs
              </Button>
              <Button onClick={copyJson} className="h-12 w-full bg-white font-black text-black hover:bg-white/90">
                <Download className="mr-2 h-4 w-4" /> Copy Carousel JSON
              </Button>
            </div>

            {status && <div className="mt-3 rounded-sm border border-white/10 bg-white/[0.04] p-3 text-xs leading-relaxed text-white/70">{status}</div>}
          </CardContent>
        </Card>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex min-h-[calc(100vh-40px)] items-center justify-center rounded-[8px] border border-white/10 bg-[#090909] p-8 shadow-2xl">
          <div className="flex flex-col items-center">
            <PreviewSlide slide={current} index={active} total={slides.length} />
            <div className="mt-5 flex items-center justify-center gap-3">
              <Button disabled={active === 0} onClick={() => setActive((prev) => Math.max(0, prev - 1))} variant="outline" className="text-white hover:bg-white/10">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="text-sm font-bold text-white/50">Slide {active + 1} of {slides.length}</div>
              <Button disabled={active === slides.length - 1} onClick={() => setActive((prev) => Math.min(slides.length - 1, prev + 1))} variant="outline" className="text-white hover:bg-white/10">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="space-y-5">
          <div className="rounded-[8px] border border-white/10 bg-[#0a0a0a] p-5">
            <div className="mb-3 text-lg font-black tracking-[-0.03em]">Auto-build carousel</div>
            <p className="mb-4 text-sm leading-relaxed text-white/60">Paste a raw Vertalis idea or numbered format like Slide 1, Slide 2, Slide 3. The engine preserves your slide count and builds the carousel.</p>
            <textarea
              value={brief}
              onChange={(event) => setBrief(event.target.value)}
              className="min-h-[320px] w-full resize-y rounded-md border border-white/10 bg-black/50 p-4 text-sm leading-relaxed text-white outline-none transition focus:border-[#ff7a2f]"
            />
            <Button
              onClick={generateFromBrief}
              disabled={isGenerating}
              className="mt-4 h-12 w-full font-black text-black hover:opacity-90"
              style={{ backgroundColor: ACCENT }}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              {isGenerating ? "Generating..." : "Generate Carousel"}
            </Button>
          </div>

          <div className="rounded-[8px] border border-white/10 bg-[#0a0a0a] p-5">
            <div className="mb-3 text-lg font-black tracking-[-0.03em]">Recommended flow</div>
            <div className="space-y-2 text-sm font-semibold text-white/70">
              <div>01 Hook</div>
              <div>02 Problem</div>
              <div>03 Pressure Points</div>
              <div>04 System Diagram</div>
              <div>05 Vertalis Principle</div>
              <div>06 Consequence</div>
              <div>07 Strategic CTA</div>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none fixed -left-[20000px] top-0 z-[-1] flex flex-col gap-6 opacity-100">
        {slides.map((slide, index) => (
          <div
            key={`export-${index}`}
            ref={(node) => {
              exportRefs.current[index] = node;
            }}
            className="h-[1080px] w-[1080px] bg-black"
          >
            <RenderSlide slide={slide} index={index} total={slides.length} />
          </div>
        ))}
      </div>
    </div>
  );
}

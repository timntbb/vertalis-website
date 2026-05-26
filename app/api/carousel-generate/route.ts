import { NextResponse } from "next/server";

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

type CarouselPayload = {
  prompt?: string;
};

type SlideSourceBlock = {
  slide: number;
  lines: string[];
};

const DEFAULT_FOOTER = "STRATEGY. STRUCTURE. PROTECTION.";

const ALLOWED_TYPES: SlideType[] = ["hook", "breakdown", "diagram", "quote", "cta"];

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function countNumberedSlides(prompt: string) {
  const matches = prompt.match(/(?:^|\n)\s*[-*]?\s*slide\s*\d+/gi);
  return matches ? matches.length : 0;
}

function cleanInline(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function parseNumberedSlideBlocks(prompt: string): SlideSourceBlock[] {
  const lines = prompt.split(/\r?\n/).map((line) => line.trim());
  const blocks: SlideSourceBlock[] = [];
  let current: SlideSourceBlock | null = null;

  for (const rawLine of lines) {
    const line = rawLine.replace(/^[-*•]\s*/, "").trim();
    const slideMatch = line.match(/^slide\s*(\d+)\s*$/i);

    if (slideMatch) {
      if (current && current.lines.length > 0) {
        blocks.push(current);
      }
      current = {
        slide: Number(slideMatch[1]),
        lines: [],
      };
      continue;
    }

    if (!current) {
      continue;
    }

    const cleaned = line.replace(/^o\s+/i, "").replace(/^\s*/u, "").trim();
    if (cleaned) {
      current.lines.push(cleaned);
    }
  }

  if (current && current.lines.length > 0) {
    blocks.push(current);
  }

  return blocks.sort((a, b) => a.slide - b.slide);
}

function shortenWords(text: string, maxWords: number) {
  const words = cleanInline(text).split(" ").filter(Boolean);
  if (words.length <= maxWords) return cleanInline(text);
  return `${words.slice(0, maxWords).join(" ")}...`;
}

function normalizeEyebrow(value: string, fallback: string) {
  const cleaned = cleanInline(value).replace(/[.!?]+$/, "");
  const short = shortenWords(cleaned || fallback, 5).replace(/\.\.\.$/, "");
  return short.toUpperCase();
}

function splitSentences(value: string) {
  return cleanInline(value)
    .split(/(?<=[.!?])\s+/)
    .map((part) => cleanInline(part))
    .filter(Boolean);
}

function inferFallbackType(index: number, total: number): SlideType {
  if (index === 0) return "hook";
  if (index === total - 1) return "cta";
  if (index === Math.floor(total / 2)) return "diagram";
  if (index === Math.floor(total / 2) + 1) return "quote";
  return "breakdown";
}

function buildSlideFromLines(lines: string[], index: number, total: number): Slide {
  const cleaned = lines.map((line) => cleanInline(line)).filter(Boolean);
  const first = cleaned[0] || `Key founder insight ${index + 1}`;
  const support = cleaned.slice(1);
  const type = inferFallbackType(index, total);

  const bullets = type === "breakdown"
    ? (support.length > 0 ? support : cleaned.slice(0, 4)).slice(0, 4)
    : undefined;

  const nodes = type === "diagram"
    ? (cleaned.length > 0 ? cleaned : ["Growth", "Friction", "Exposure", "Dispute", "Cost"])
        .slice(0, 5)
        .map((item) => shortenWords(item.replace(/[.!?]+$/, ""), 4))
    : undefined;

  const bodySource = support.slice(0, 2).join(" ") || first;

  return {
    type,
    eyebrow: normalizeEyebrow(first, `SLIDE ${index + 1}`),
    headline: shortenWords(first, 14),
    body: cleanInline(bodySource),
    footer: DEFAULT_FOOTER,
    bullets,
    nodes,
  };
}

function chunkByCount(items: string[], count: number) {
  const safeCount = Math.max(1, count);
  const chunks: string[][] = Array.from({ length: safeCount }, () => []);
  items.forEach((item, index) => {
    chunks[Math.min(index, safeCount - 1)].push(item);
  });
  return chunks;
}

function buildFallbackSlides(prompt: string, targetCount: number, slideBlocks: SlideSourceBlock[]) {
  if (slideBlocks.length > 0) {
    return slideBlocks
      .slice(0, targetCount)
      .map((block, index) => buildSlideFromLines(block.lines, index, targetCount))
      .map((slide, index) => postProcessSlide(slide, index));
  }

  const sentences = splitSentences(prompt);
  const lines = sentences.length > 0 ? sentences : [cleanInline(prompt) || "Founder-focused legal strategy."];
  const chunks = chunkByCount(lines, targetCount);

  return chunks
    .map((chunk, index) => buildSlideFromLines(chunk, index, targetCount))
    .map((slide, index) => postProcessSlide(slide, index));
}

function postProcessSlide(slide: Slide, index: number): Slide {
  const fallbackEyebrow = `SLIDE ${index + 1}`;
  const headlineSentences = splitSentences(slide.headline);
  const bodySentences = splitSentences(slide.body);

  let headline = cleanInline(headlineSentences[0] || slide.headline);
  let body = cleanInline(slide.body);

  if (!headline || /^(slide\s*\d+)$/i.test(headline)) {
    headline = cleanInline(bodySentences[0] || "Key founder insight");
  }

  if (headline.length > 110 || headline.split(" ").length > 16) {
    headline = shortenWords(headline, 14);
  }

  if (!body || body === headline) {
    body = cleanInline(bodySentences.slice(1, 3).join(" "));
  }

  if (!body) {
    body = "Strategic legal alignment reduces downstream risk as the company scales.";
  }

  if (body.length > 230) {
    body = splitSentences(body).slice(0, 2).join(" ");
    if (!body) {
      body = shortenWords(slide.body, 28);
    }
  }

  const bullets = (slide.bullets || [])
    .map((item) => cleanInline(item))
    .filter(Boolean)
    .slice(0, 4);

  const nodes = (slide.nodes || [])
    .map((item) => cleanInline(item))
    .filter(Boolean)
    .slice(0, 5);

  return {
    ...slide,
    eyebrow: normalizeEyebrow(slide.eyebrow, fallbackEyebrow),
    headline,
    body,
    footer: cleanInline(slide.footer || "STRATEGY. STRUCTURE. PROTECTION."),
    bullets: bullets.length > 0 ? bullets : undefined,
    nodes: nodes.length > 0 ? nodes : undefined,
  };
}

function normalizeSlide(raw: unknown): Slide | null {
  if (!raw || typeof raw !== "object") return null;

  const obj = raw as Record<string, unknown>;
  const type = asString(obj.type) as SlideType;
  const eyebrow = asString(obj.eyebrow);
  const headline = asString(obj.headline);
  const body = asString(obj.body);
  const footer = asString(obj.footer);

  if (!ALLOWED_TYPES.includes(type)) return null;
  if (!eyebrow || !headline || !body || !footer) return null;

  const bullets = Array.isArray(obj.bullets)
    ? obj.bullets.map((item) => asString(item)).filter(Boolean).slice(0, 4)
    : undefined;
  const nodes = Array.isArray(obj.nodes)
    ? obj.nodes.map((item) => asString(item)).filter(Boolean).slice(0, 5)
    : undefined;

  return {
    type,
    eyebrow,
    headline,
    body,
    footer,
    bullets,
    nodes,
  };
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as CarouselPayload;
    const prompt = asString(body.prompt);

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY?.trim();
    const slideBlocks = parseNumberedSlideBlocks(prompt);
    const requestedSlideCount = countNumberedSlides(prompt);
    const targetCount = slideBlocks.length > 0 ? slideBlocks.length : requestedSlideCount > 0 ? requestedSlideCount : 7;

    if (!apiKey) {
      const fallbackSlides = buildFallbackSlides(prompt, targetCount, slideBlocks);
      return NextResponse.json({
        slides: fallbackSlides,
        warning: "OPENAI_API_KEY is not configured. Used built-in formatter fallback.",
      });
    }

    const model = process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini";

    const systemPrompt = `You generate a founder-focused legal carousel for Vertalis.
Return ONLY valid JSON matching this shape:
{
  "slides": [
    {
      "type": "hook|breakdown|diagram|quote|cta",
      "eyebrow": "string",
      "headline": "string",
      "body": "string",
      "footer": "string",
      "bullets": ["string", "string", "string", "string"],
      "nodes": ["string", "string", "string", "string", "string"]
    }
  ]
}
Rules:
- If the prompt includes numbered sections like "Slide 1", "Slide 2", etc., keep that exact slide count and sequence.
- If no numbered slides are provided, default to 7 slides with this type sequence:
  1 hook
  2 breakdown
  3 breakdown
  4 diagram
  5 quote
  6 breakdown
  7 cta
- Keep concise, high-impact founder language.
- Eyebrow, headline, and body must correspond to the source content for each slide.
- Do not invent a different narrative; preserve each slide's meaning and order.
- Use ALL CAPS only when natural.
- For non-breakdown slides, bullets may be omitted.
- For non-diagram slides, nodes may be omitted.
- If a slide clearly lists multiple short points, use bullets for that slide.
- Preserve the core meaning and order from the source prompt.

Formatting quality requirements:
- eyebrow: short strategic label (2-5 words), uppercase, specific to that slide's idea.
- headline: one strong sentence or phrase, readable on a social card (prefer 6-14 words).
- body: 1-2 concise sentences that explain the slide's exact point.
- For list-heavy source slides, convert list items into bullets (max 4), and keep body as a summary.
- Remove filler words and redundancy while keeping original intent.

Source-mapping requirements for numbered input:
- Treat each "Slide N" block as one output slide.
- Build that output slide only from text in the same Slide N block.
- If a block has multiple lines, promote the strongest line to headline and place supporting lines in body/bullets.
- If a block has a clear label line (example: "The problem?"), use it as headline or eyebrow depending on fit.
- Keep domain terms from source when present (contracts, governance, IP, compliance, litigation, founders, risk).`;

    const openAiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.7,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content:
              slideBlocks.length > 0
                ? `Generate a carousel from these normalized blocks. Target slide count: ${targetCount}.\n\n${JSON.stringify(
                    { title: cleanInline(prompt.split(/\r?\n/)[0] || ""), slideBlocks },
                    null,
                    2,
                  )}`
                : `Generate a carousel from this source. Target slide count: ${targetCount}.\n\n${prompt}`,
          },
        ],
      }),
    });

    if (!openAiResponse.ok) {
      const details = await openAiResponse.text();
      const fallbackSlides = buildFallbackSlides(prompt, targetCount, slideBlocks);
      return NextResponse.json(
        {
          slides: fallbackSlides,
          warning: "OpenAI request failed. Used built-in formatter fallback.",
          details,
        },
      );
    }

    const completion = (await openAiResponse.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    const content = completion.choices?.[0]?.message?.content || "";
    let parsed: unknown;
    try {
      parsed = JSON.parse(content);
    } catch {
      const fallbackSlides = buildFallbackSlides(prompt, targetCount, slideBlocks);
      return NextResponse.json(
        {
          slides: fallbackSlides,
          warning: "Model response was invalid JSON. Used built-in formatter fallback.",
        },
      );
    }

    const rawSlides =
      parsed && typeof parsed === "object" && Array.isArray((parsed as { slides?: unknown[] }).slides)
        ? (parsed as { slides: unknown[] }).slides
        : [];

    const slides = rawSlides
      .map(normalizeSlide)
      .filter((slide): slide is Slide => Boolean(slide))
      .map((slide, index) => postProcessSlide(slide, index));

    if (slides.length !== targetCount) {
      const fallbackSlides = buildFallbackSlides(prompt, targetCount, slideBlocks);
      return NextResponse.json(
        {
          slides: fallbackSlides,
          warning: `Model returned an unexpected slide count. Used built-in formatter fallback (${targetCount}).`,
        },
      );
    }

    return NextResponse.json({ slides });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}

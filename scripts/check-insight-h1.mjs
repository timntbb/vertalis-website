// Build-time guard: every insight article must render exactly one <h1>.
// The single H1 lives in app/insights/[slug]/page.tsx's hero section; article
// content files/entries must not include their own <h1>, or the page would
// render two. This script fails the build if that invariant is broken.
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const slugPagePath = path.join(root, "app/insights/[slug]/page.tsx");
const dataPath = path.join(root, "app/insights/data.tsx");
const contentDir = path.join(root, "app/insights/content");

let failed = false;

function countH1(source) {
  const matches = source.match(/<h1[\s>]/g);
  return matches ? matches.length : 0;
}

// 1. The shared article template must render exactly one H1 (the hero title).
const slugPageSource = readFileSync(slugPagePath, "utf8");
const slugPageH1Count = countH1(slugPageSource);
if (slugPageH1Count !== 1) {
  failed = true;
  console.error(
    `[check-insight-h1] Expected exactly 1 <h1> in ${slugPagePath}, found ${slugPageH1Count}.`,
  );
}

// 2. Article data/content must not introduce a second H1.
const dataSource = readFileSync(dataPath, "utf8");
const dataH1Count = countH1(dataSource);
if (dataH1Count !== 0) {
  failed = true;
  console.error(
    `[check-insight-h1] app/insights/data.tsx must not contain <h1> (found ${dataH1Count}). The article hero already renders the H1.`,
  );
}

for (const file of readdirSync(contentDir)) {
  if (!file.endsWith(".tsx")) continue;
  // TestCarouselArticle is not wired into any published post; skip it.
  if (file === "TestCarouselArticle.tsx") continue;

  const filePath = path.join(contentDir, file);
  const source = readFileSync(filePath, "utf8");
  const h1Count = countH1(source);
  if (h1Count !== 0) {
    failed = true;
    console.error(
      `[check-insight-h1] ${filePath} must not contain <h1> (found ${h1Count}). The article hero already renders the H1.`,
    );
  }
}

if (failed) {
  process.exit(1);
}

console.log("[check-insight-h1] OK: every insight article renders exactly one <h1>.");

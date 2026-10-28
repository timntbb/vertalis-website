import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = path => readFileSync(new URL(`../.next/${path}`, import.meta.url), "utf8");
const sitemap = read("server/app/sitemap.xml.body");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
const manifest = JSON.parse(read("prerender-manifest.json"));
let breadcrumbs = 0;
let services = 0;
for (const url of urls) {
  const path = new URL(url).pathname;
  const html = read(`server/app/${path === "/" ? "index" : path.slice(1)}.html`);
  assert.match(html, /<meta property="og:image" content="https:\/\/vertalislegal.com\/vertalis-shield-preview.png"/, url);
  assert.match(html, /<meta name="twitter:image" content="https:\/\/vertalislegal.com\/vertalis-shield-preview.png"/, url);
  assert.equal([...html.matchAll(/<h1[ >]/g)].length, 1, url);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)[1];
  assert.equal(canonical.replace(/\/$/, ""), url.replace(/\/$/, ""), url);
  assert.doesNotMatch(html, /<meta name="robots" content="[^"]*noindex/, url);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(match => JSON.parse(match[1]));
  if (path.startsWith("/insights/") || path.startsWith("/glossary/")) {
    assert.match(html, /<nav aria-label="Breadcrumb"/, url);
    assert.equal(schemas.filter(item => item["@type"] === "BreadcrumbList").length, 1, url);
    breadcrumbs++;
  }
  if (path.startsWith("/services/")) {
    const organization = schemas.find(item => item["@id"] === "https://vertalislegal.com/#organization");
    assert.equal(organization?.name, "Vertalis Legal Counsel, PLLC", url);
    assert.equal(organization?.url, "https://vertalislegal.com", url);
    const service = schemas.find(item => item["@type"] === "Service");
    assert.equal(service?.provider["@id"], organization["@id"], url);
    assert.equal(service?.["@id"], `${url}#service`, url);
    services++;
  }
}
assert.ok(!manifest.routes["/about-test"], "test route must not ship");
const connect = read("server/app/connect.html");
assert.match(connect, /<meta name="robots" content="noindex, nofollow"/);
assert.match(connect, /<link rel="canonical" href="https:\/\/vertalislegal.com\/connect"/);
assert.ok(!urls.some(url => url.endsWith("/connect")), "QR page must stay outside sitemap");
console.log(`SEO checks passed: ${urls.length} pages, ${breadcrumbs} article/glossary breadcrumbs, ${services} service entities; QR exclusion and test-route removal verified.`);

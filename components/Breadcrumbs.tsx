import Link from "next/link";
import { JsonLd } from "./StructuredData";

type Breadcrumb = { name: string; url: string };

export default function Breadcrumbs({ items }: { items: Breadcrumb[] }) {
  const currentUrl = items[items.length - 1].url;
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${currentUrl}#breadcrumb`,
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem", position: index + 1, name: item.name, item: item.url,
        })),
      }} />
      <nav aria-label="Breadcrumb" className="mb-6 text-sm leading-6 text-neutral-400">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {items.map((item, index) => (
            <li key={item.url} className="inline-flex min-w-0 items-baseline gap-2">
              {index > 0 && <span aria-hidden="true">/</span>}
              {index === items.length - 1
                ? <span aria-current="page" className="text-neutral-300">{item.name}</span>
                : <Link href={item.url} className="underline decoration-white/20 underline-offset-4 hover:text-white">{item.name}</Link>}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

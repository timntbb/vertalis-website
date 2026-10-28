import Link from "next/link";

export default function GlossaryFooter() {
  return (
    <footer className="border-t border-white/10 px-6 py-7 text-xs text-neutral-400 sm:text-sm">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
        <Link href="/" className="transition-colors hover:text-white">Vertalis Legal Counsel</Link>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link href="/terms-of-use" className="transition-colors hover:text-white">Privacy / Terms of Use</Link>
          <Link href="/consultation" className="transition-colors hover:text-[#e38a4e]">When the Next Move Matters.</Link>
        </div>
      </div>
    </footer>
  );
}

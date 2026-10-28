"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export default function AnalyticsEvents() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest("a[href]");
      if (!link) return;
      const url = new URL(link.getAttribute("href")!, window.location.origin);
      if (url.origin !== window.location.origin || url.pathname !== "/consultation") return;
      trackEvent("consultation_click", { source: link.closest("header, nav") ? "navigation" : "content" });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}

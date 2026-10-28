type AnalyticsEvent = "consultation_click" | "generate_lead" | "booking_confirmed" | "booking_requested";
type EventParameters = { source: "navigation" | "content" | "consultation" | "contact_box"; method?: "contact_form" | "cal_embed" };

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// Only fixed labels are accepted here. Never pass contact details or matter text.
export function trackEvent(name: AnalyticsEvent, parameters: EventParameters) {
  if (typeof window === "undefined") return;
  try {
    if (window.gtag) window.gtag("event", name, parameters);
    else {
      window.dataLayer ??= [];
      window.dataLayer.push(["event", name, parameters]);
    }
  } catch {
    // Measurement must never interrupt an inquiry or booking.
  }
}

// Keep booking identifiers in memory only; never send them to analytics.
const trackedBookings = new Set<string>();
export function trackBooking(data: { uid?: string; status?: string }) {
  if (!data.uid) return;
  if (data.status !== "ACCEPTED" && data.status !== "PENDING") return;
  const key = `${data.uid}:${data.status}`;
  if (trackedBookings.has(key)) return;
  trackedBookings.add(key);
  trackEvent(data.status === "ACCEPTED" ? "booking_confirmed" : "booking_requested", {
    source: "consultation", method: "cal_embed",
  });
}

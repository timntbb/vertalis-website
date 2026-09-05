import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | Vertalis Legal Counsel",
  description:
    "The terms and conditions governing use of the Vertalis Legal Counsel website and its content, effective January 1, 2026.",
  alternates: {
    canonical: "/terms-of-use",
  },
};

export default function TermsOfUseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

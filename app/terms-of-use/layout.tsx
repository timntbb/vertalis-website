import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy / Terms of Use | Vertalis Legal Counsel",
  description:
    "Privacy practices and terms governing use of the Vertalis Legal Counsel website, inquiries, and consultation scheduling.",
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

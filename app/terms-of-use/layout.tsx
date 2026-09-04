import type { Metadata } from "next";

export const metadata: Metadata = {
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

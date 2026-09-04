import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/about/investors",
  },
};

export default function InvestorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Startup Financing and SAFE Counsel | Vertalis",
  description:
    "Capital strategy counsel for founders raising SAFEs and equity financing while protecting ownership and control through each round.",
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

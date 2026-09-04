import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/about/governance",
  },
};

export default function GovernanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

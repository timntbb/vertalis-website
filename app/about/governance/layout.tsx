import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Texas LLC Governance and Operating Agreements | Vertalis",
  description:
    "Governance counsel that designs the decision architecture, operating agreements, and accountability structures companies need as they scale.",
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

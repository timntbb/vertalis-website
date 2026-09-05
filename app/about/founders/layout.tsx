import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Startup and Founder Legal Counsel in Texas | Vertalis",
  description:
    "Legal counsel for founders architecting company structure, ownership, hiring, governance, and intellectual property as traction begins to grow.",
  alternates: {
    canonical: "/about/founders",
  },
};

export default function FoundersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

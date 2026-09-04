import type { Metadata } from "next";

export const metadata: Metadata = {
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

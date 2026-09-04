import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/about/ip",
  },
};

export default function IPLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Intellectual Property and IP Assignment Counsel | Vertalis",
  description:
    "IP counsel that protects a company's code, brand, product design, and proprietary information through clear assignment and ownership structure.",
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

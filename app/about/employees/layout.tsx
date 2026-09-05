import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Employment and Contractor Agreements | Vertalis",
  description:
    "Counsel on employment agreements, contractor classification, incentives, and IP ownership as companies build their teams.",
  alternates: {
    canonical: "/about/employees",
  },
};

export default function EmployeesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

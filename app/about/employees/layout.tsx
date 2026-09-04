import type { Metadata } from "next";

export const metadata: Metadata = {
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

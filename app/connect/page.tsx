import type { Metadata } from "next";
import ConnectClient from "./ConnectClient";

export const metadata: Metadata = {
  title: "Tim Nichols | Vertalis Legal Counsel",
  description:
    "Connect with Tim Nichols, attorney and founder of Vertalis Legal Counsel.",
  robots: { index: false, follow: false },
};

export default function ConnectPage() {
  return <ConnectClient />;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Policies",
  description: "Rule status, severity, wallet impact, and evaluation telemetry.",
};

export default function PoliciesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

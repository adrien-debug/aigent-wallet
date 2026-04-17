import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wallets",
  description: "Treasury hierarchy, balances, policies, and agent assignment per wallet.",
};

export default function WalletsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transactions",
  description: "Ledger with search, filters, risk flags, and settlement states.",
};

export default function TransactionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

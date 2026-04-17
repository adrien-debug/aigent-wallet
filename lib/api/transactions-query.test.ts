import { describe, expect, it } from "vitest";
import {
  filterTransactions,
  parseTransactionStatus,
} from "@/lib/api/transactions-query";
import type { Transaction } from "@/types";

const rows: Transaction[] = [
  {
    id: "tx_a",
    hash: "0xaa",
    timestamp: "2026-01-01T00:00:00.000Z",
    walletId: "wal_1",
    walletName: "Treasury",
    counterparty: "0xbb",
    amount: 100,
    token: "USDC",
    network: "base",
    category: "treasury",
    status: "confirmed",
    riskFlag: "none",
  },
  {
    id: "tx_b",
    hash: "0xcc",
    timestamp: "2026-01-02T00:00:00.000Z",
    walletId: "wal_2",
    walletName: "Broker",
    counterparty: "Acme",
    amount: 50,
    token: "ETH",
    network: "ethereum",
    category: "m2m",
    status: "pending",
    riskFlag: "low",
  },
];

describe("parseTransactionStatus", () => {
  it("accepts all and empty", () => {
    expect(parseTransactionStatus(null)).toBe("all");
    expect(parseTransactionStatus("")).toBe("all");
    expect(parseTransactionStatus("all")).toBe("all");
  });

  it("returns null for invalid", () => {
    expect(parseTransactionStatus("nope")).toBeNull();
  });

  it("parses known status", () => {
    expect(parseTransactionStatus("blocked")).toBe("blocked");
  });
});

describe("filterTransactions", () => {
  it("filters by status and wallet and search", () => {
    const byStatus = filterTransactions(rows, { status: "pending", q: undefined });
    expect(byStatus).toHaveLength(1);
    expect(byStatus[0]?.id).toBe("tx_b");

    const byWallet = filterTransactions(rows, {
      status: "all",
      walletId: "wal_1",
    });
    expect(byWallet).toHaveLength(1);

    const byQ = filterTransactions(rows, { status: "all", q: "acme" });
    expect(byQ).toHaveLength(1);
  });
});

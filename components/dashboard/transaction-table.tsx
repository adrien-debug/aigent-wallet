"use client";

import type { Transaction } from "@/types";
import { formatNumber } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { StatusBadge, RiskBadge } from "@/components/dashboard/status-badge";

export function TransactionTable({
  rows,
  onSelect,
  selectedId,
}: {
  rows: Transaction[];
  onSelect?: (id: string) => void;
  selectedId?: string | null;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Hash</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Wallet</TableHead>
          <TableHead>Counterparty</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead>Token</TableHead>
          <TableHead>Network</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Risk</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((tx) => (
          <TableRow
            key={tx.id}
            data-state={selectedId === tx.id ? "selected" : undefined}
            className={onSelect ? "cursor-pointer" : undefined}
            onClick={() => onSelect?.(tx.id)}
          >
            <TableCell className="font-mono text-xs">{tx.hash}</TableCell>
            <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
              {new Date(tx.timestamp).toLocaleString()}
            </TableCell>
            <TableCell>{tx.walletName}</TableCell>
            <TableCell className="max-w-[160px] truncate font-mono text-xs">
              {tx.counterparty}
            </TableCell>
            <TableCell className="text-right font-mono">
              {formatNumber(tx.amount, 0)}
            </TableCell>
            <TableCell>
              <Badge variant="outline" className="font-mono text-[11px]">
                {tx.token}
              </Badge>
            </TableCell>
            <TableCell className="text-muted-foreground">{tx.network}</TableCell>
            <TableCell className="capitalize text-muted-foreground">
              {tx.category}
            </TableCell>
            <TableCell>
              <StatusBadge kind="transaction" value={tx.status} />
            </TableCell>
            <TableCell>
              <RiskBadge flag={tx.riskFlag} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

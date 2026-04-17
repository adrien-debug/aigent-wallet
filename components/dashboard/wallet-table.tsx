"use client";

import type { Wallet } from "@/types";
import { formatUsd } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Badge } from "@/components/ui/badge";

export function WalletTable({
  rows,
  onSelect,
  selectedId,
}: {
  rows: Wallet[];
  onSelect?: (id: string) => void;
  selectedId?: string | null;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Wallet</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Network</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Balance</TableHead>
          <TableHead>Policy</TableHead>
          <TableHead>Agent</TableHead>
          <TableHead className="text-right">Daily cap</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((w) => (
          <TableRow
            key={w.id}
            data-state={selectedId === w.id ? "selected" : undefined}
            className={onSelect ? "cursor-pointer" : undefined}
            onClick={() => onSelect?.(w.id)}
          >
            <TableCell className="font-medium">{w.name}</TableCell>
            <TableCell className="capitalize text-muted-foreground">{w.type}</TableCell>
            <TableCell>
              <Badge variant="outline" className="font-mono text-[11px]">
                {w.network}
              </Badge>
            </TableCell>
            <TableCell>
              <StatusBadge kind="wallet" value={w.status} />
            </TableCell>
            <TableCell className="text-right font-mono">
              {formatUsd(w.balanceUsd)}
            </TableCell>
            <TableCell className="max-w-[180px] truncate text-muted-foreground">
              {w.policyName}
            </TableCell>
            <TableCell className="text-muted-foreground">{w.agent}</TableCell>
            <TableCell className="text-right font-mono text-muted-foreground">
              {formatUsd(w.dailyCapUsd)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

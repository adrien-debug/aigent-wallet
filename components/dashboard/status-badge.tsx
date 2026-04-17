import type { ComponentProps } from "react";
import type { Transaction, Wallet } from "@/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type TxStatus = Transaction["status"];
type WalletStatus = Wallet["status"];

const txMap: Record<
  TxStatus,
  { label: string; variant: ComponentProps<typeof Badge>["variant"] }
> = {
  confirmed: { label: "Confirmed", variant: "success" },
  pending: { label: "Pending", variant: "warning" },
  failed: { label: "Failed", variant: "danger" },
  blocked: { label: "Blocked", variant: "danger" },
};

const walletMap: Record<
  WalletStatus,
  { label: string; variant: ComponentProps<typeof Badge>["variant"] }
> = {
  active: { label: "Active", variant: "success" },
  paused: { label: "Paused", variant: "warning" },
  frozen: { label: "Frozen", variant: "danger" },
};

export function StatusBadge({
  kind,
  value,
  className,
}: {
  kind: "transaction" | "wallet";
  value: TxStatus | WalletStatus;
  className?: string;
}) {
  const meta =
    kind === "transaction"
      ? txMap[value as TxStatus]
      : walletMap[value as WalletStatus];
  return (
    <Badge variant={meta.variant} className={cn("font-mono text-[11px]", className)}>
      {meta.label}
    </Badge>
  );
}

export function RiskBadge({
  flag,
  className,
}: {
  flag: Transaction["riskFlag"];
  className?: string;
}) {
  const meta: Record<
    Transaction["riskFlag"],
    { label: string; variant: ComponentProps<typeof Badge>["variant"] }
  > = {
    none: { label: "Clean", variant: "muted" },
    low: { label: "Low", variant: "secondary" },
    medium: { label: "Medium", variant: "warning" },
    high: { label: "High", variant: "danger" },
  };
  const m = meta[flag];
  return (
    <Badge variant={m.variant} className={cn("font-mono text-[11px]", className)}>
      {m.label}
    </Badge>
  );
}

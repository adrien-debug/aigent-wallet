import type { Wallet } from "@/types";
import { formatUsd } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { cn } from "@/lib/utils";

export function WalletCard({
  wallet,
  selected,
  onSelect,
  className,
}: {
  wallet: Wallet;
  selected?: boolean;
  onSelect?: () => void;
  className?: string;
}) {
  return (
    <Card
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (!onSelect) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className={cn(
        "border-border/80 bg-card/80 transition-colors",
        selected && "border-primary/40 ring-1 ring-primary/30",
        onSelect && "cursor-pointer hover:bg-muted/20",
        className,
      )}
    >
      <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0 pb-3">
        <div>
          <CardTitle className="text-base">{wallet.name}</CardTitle>
          <p className="mt-1 text-xs text-muted-foreground">{wallet.agent}</p>
        </div>
        <StatusBadge kind="wallet" value={wallet.status} />
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Balance</span>
          <span className="font-mono font-medium">{formatUsd(wallet.balanceUsd)}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="outline" className="text-[11px]">
            {wallet.network}
          </Badge>
          {wallet.tags.slice(0, 2).map((t) => (
            <Badge key={t} variant="muted" className="text-[11px]">
              {t}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

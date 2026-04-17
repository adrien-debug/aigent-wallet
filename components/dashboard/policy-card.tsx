import type { ComponentProps } from "react";
import type { PolicyRule } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const severityVariant: Record<
  PolicyRule["severity"],
  ComponentProps<typeof Badge>["variant"]
> = {
  info: "muted",
  low: "secondary",
  medium: "warning",
  high: "danger",
  critical: "danger",
};

const statusLabel: Record<PolicyRule["status"], string> = {
  enforced: "Enforced",
  shadow: "Shadow",
  draft: "Draft",
};

export function PolicyCard({
  policy,
  selected,
  onSelect,
  className,
}: {
  policy: PolicyRule;
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
        "border-border/80 bg-card/80",
        selected && "border-primary/40 ring-1 ring-primary/30",
        onSelect && "cursor-pointer hover:bg-muted/20",
        className,
      )}
    >
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="text-[11px]">
            {statusLabel[policy.status]}
          </Badge>
          <Badge variant={severityVariant[policy.severity]} className="text-[11px]">
            {policy.severity}
          </Badge>
        </div>
        <CardTitle className="text-base">{policy.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{policy.description}</p>
      </CardHeader>
      <CardContent className="space-y-2 text-xs text-muted-foreground">
        <p>
          <span className="text-foreground">Condition:</span>{" "}
          <span className="font-mono">{policy.condition}</span>
        </p>
        <p>
          Wallets impacted:{" "}
          <span className="font-mono text-foreground">{policy.walletsAffected}</span> ·
          Evaluations (24h):{" "}
          <span className="font-mono text-foreground">{policy.executions24h}</span>
        </p>
      </CardContent>
    </Card>
  );
}

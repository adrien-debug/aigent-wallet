import type { ComponentProps } from "react";
import type { RiskAlert } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const sev: Record<RiskAlert["severity"], ComponentProps<typeof Badge>["variant"]> = {
  low: "muted",
  medium: "warning",
  high: "danger",
  critical: "danger",
};

export function RiskPanel({
  alerts,
  className,
}: {
  alerts: RiskAlert[];
  className?: string;
}) {
  return (
    <Card className={cn("border-border/80 bg-card/80", className)}>
      <CardHeader>
        <CardTitle className="text-base">Anomaly feed</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((a) => (
          <div
            key={a.id}
            className="rounded-xl border border-border/70 bg-background/40 p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-medium">{a.title}</p>
              <Badge variant={sev[a.severity]} className="text-[11px]">
                {a.severity}
              </Badge>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{a.wallet}</p>
            <p className="mt-2 text-sm text-muted-foreground">{a.detail}</p>
            <p className="mt-2 font-mono text-[11px] text-muted-foreground">
              {new Date(a.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

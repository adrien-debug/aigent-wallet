import type { ComponentProps } from "react";
import type { AuditEvent } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const resultVariant: Record<
  AuditEvent["result"],
  ComponentProps<typeof Badge>["variant"]
> = {
  allow: "success",
  deny: "danger",
  review: "warning",
  alert: "warning",
};

export function AuditTimeline({
  events,
  className,
}: {
  events: AuditEvent[];
  className?: string;
}) {
  return (
    <Card className={cn("border-border/80 bg-card/80", className)}>
      <CardHeader>
        <CardTitle className="text-base">Recent audit events</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="relative space-y-6 border-l border-border/80 pl-6">
          {events.map((e) => (
            <li key={e.id} className="relative">
              <span className="absolute -left-[25px] mt-1.5 h-2 w-2 rounded-full bg-primary" />
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-medium capitalize">
                  {e.eventType.replaceAll("_", " ")}
                </p>
                <Badge variant={resultVariant[e.result]} className="text-[11px]">
                  {e.result}
                </Badge>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {e.actor} · {e.wallet}
              </p>
              <p className="mt-2 font-mono text-[11px] text-muted-foreground">
                trace <span className="text-foreground">{e.traceId}</span> ·{" "}
                {new Date(e.timestamp).toLocaleString()}
              </p>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}

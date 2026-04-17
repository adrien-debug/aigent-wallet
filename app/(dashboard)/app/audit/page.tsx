import type { Metadata } from "next";
import { AuditTimeline } from "@/components/dashboard/audit-timeline";
import { auditEvents } from "@/data/audit";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { ComponentProps } from "react";
import type { AuditEvent } from "@/types";

export const metadata: Metadata = {
  title: "Audit",
  description: "Immutable-style event trail with actors, results, timestamps, and trace IDs.",
};

const resultVariant: Record<
  AuditEvent["result"],
  ComponentProps<typeof Badge>["variant"]
> = {
  allow: "success",
  deny: "danger",
  review: "warning",
  alert: "warning",
};

export default function AuditPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Audit</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Evidence-grade trail from policy evaluation through execution and operator actions.
        </p>
      </div>
      <AuditTimeline events={auditEvents} />
      <div className="overflow-x-auto rounded-2xl border border-border/80 bg-card/80">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Actor</TableHead>
              <TableHead>Wallet</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>Result</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Trace</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {auditEvents.map((e) => (
              <TableRow key={e.id}>
                <TableCell className="font-mono text-xs">{e.actor}</TableCell>
                <TableCell>{e.wallet}</TableCell>
                <TableCell className="capitalize">
                  {e.eventType.replaceAll("_", " ")}
                </TableCell>
                <TableCell>
                  <Badge variant={resultVariant[e.result]} className="text-[11px]">
                    {e.result}
                  </Badge>
                </TableCell>
                <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                  {new Date(e.timestamp).toLocaleString()}
                </TableCell>
                <TableCell className="font-mono text-xs">{e.traceId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

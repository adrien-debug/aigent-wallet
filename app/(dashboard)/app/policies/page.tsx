"use client";

import { useMemo, useState } from "react";
import { policies } from "@/data/policies";
import { PolicyCard } from "@/components/dashboard/policy-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function PoliciesPage() {
  const [selectedId, setSelectedId] = useState<string | null>(policies[0]?.id ?? null);
  const selected = useMemo(
    () => policies.find((p) => p.id === selectedId) ?? null,
    [selectedId],
  );

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Policies</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Rules engine with shadow mode, severity tiers, and execution counters.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {policies.map((p) => (
          <PolicyCard
            key={p.id}
            policy={p}
            selected={selectedId === p.id}
            onSelect={() => setSelectedId(p.id)}
          />
        ))}
      </div>
      {selected ? (
        <Card className="border-border/80 bg-card/80">
          <CardHeader>
            <CardTitle className="text-base">Rule detail</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <p className="text-muted-foreground">{selected.description}</p>
            <Separator />
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-xs text-muted-foreground">Condition</p>
                <p className="mt-1 font-mono text-xs">{selected.condition}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Last evaluated</p>
                <p className="mt-1 font-mono text-xs">
                  {new Date(selected.lastEvaluated).toLocaleString()}
                </p>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Execution log (mock)</p>
              <pre className="mt-2 overflow-x-auto rounded-xl border border-border bg-background/60 p-3 font-mono text-[11px] text-muted-foreground">
                {`[${selected.lastEvaluated}] policy=${selected.id} result=allow wallets=${selected.walletsAffected} trace=tr_mock_policy`}
              </pre>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}

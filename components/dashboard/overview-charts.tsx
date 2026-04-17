"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ChartPoint, WalletSpend } from "@/types";

export function VolumeChart({ data }: { data: ChartPoint[] }) {
  return (
    <Card className="border-border/80 bg-card/80">
      <CardHeader>
        <CardTitle className="text-base">Weekly volume</CardTitle>
      </CardHeader>
      <CardContent className="h-64 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="vol" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(210 100% 52%)" stopOpacity={0.35} />
                <stop offset="100%" stopColor="hsl(210 100% 52%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
              vertical={false}
            />
            <XAxis
              dataKey="label"
              stroke="hsl(var(--muted-foreground))"
              fontSize={11}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={11}
              tickFormatter={(v) => `${(v / 1e6).toFixed(1)}M`}
            />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 12,
                fontSize: 12,
              }}
              formatter={(value: number, name) => [
                name === "volume" ? `$${(value / 1e6).toFixed(2)}M` : value,
                name === "volume" ? "Volume" : "Tx count",
              ]}
            />
            <Area
              type="monotone"
              dataKey="volume"
              stroke="hsl(210 100% 52%)"
              fill="url(#vol)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function TxCountChart({ data }: { data: ChartPoint[] }) {
  return (
    <Card className="border-border/80 bg-card/80">
      <CardHeader>
        <CardTitle className="text-base">Transaction throughput</CardTitle>
      </CardHeader>
      <CardContent className="h-64 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
              vertical={false}
            />
            <XAxis
              dataKey="label"
              stroke="hsl(var(--muted-foreground))"
              fontSize={11}
            />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 12,
                fontSize: 12,
              }}
            />
            <Bar dataKey="count" fill="hsl(199 89% 48%)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function SpendByWalletChart({ data }: { data: WalletSpend[] }) {
  return (
    <Card className="border-border/80 bg-card/80">
      <CardHeader>
        <CardTitle className="text-base">Spend by wallet</CardTitle>
      </CardHeader>
      <CardContent className="h-64 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart layout="vertical" data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
              horizontal={false}
            />
            <XAxis
              type="number"
              stroke="hsl(var(--muted-foreground))"
              fontSize={11}
              tickFormatter={(v) => `$${(v / 1e6).toFixed(1)}M`}
            />
            <YAxis
              type="category"
              dataKey="walletName"
              width={120}
              stroke="hsl(var(--muted-foreground))"
              fontSize={11}
            />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 12,
                fontSize: 12,
              }}
              formatter={(value: number) => [`$${(value / 1e6).toFixed(2)}M`, "Spend"]}
            />
            <Bar dataKey="spendUsd" fill="hsl(210 100% 52%)" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function RiskTrendChart({ data }: { data: ChartPoint[] }) {
  return (
    <Card className="border-border/80 bg-card/80">
      <CardHeader>
        <CardTitle className="text-base">Risk activity trend</CardTitle>
      </CardHeader>
      <CardContent className="h-56 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="risk" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(38 92% 50%)" stopOpacity={0.35} />
                <stop offset="100%" stopColor="hsl(38 92% 50%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
              vertical={false}
            />
            <XAxis
              dataKey="label"
              stroke="hsl(var(--muted-foreground))"
              fontSize={11}
            />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 12,
                fontSize: 12,
              }}
            />
            <Area
              type="monotone"
              dataKey="volume"
              name="score"
              stroke="hsl(38 92% 50%)"
              fill="url(#risk)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

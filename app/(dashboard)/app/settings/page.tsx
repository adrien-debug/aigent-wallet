import { teamMembers } from "@/data/team";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Organization defaults, approvals, and access controls (mock UI).
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/80 bg-card/80">
          <CardHeader>
            <CardTitle className="text-base">Organization</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="org-name">Legal name</Label>
              <Input id="org-name" defaultValue="Aigent Labs, Inc." />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="org-slug">Slug</Label>
              <Input id="org-slug" defaultValue="aigent-labs" className="font-mono" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/80 bg-card/80">
          <CardHeader>
            <CardTitle className="text-base">Environments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {["Production", "Staging", "Sandbox"].map((env) => (
              <div
                key={env}
                className="flex items-center justify-between rounded-xl border border-border/70 px-3 py-2"
              >
                <span>{env}</span>
                <Badge variant="outline" className="text-[11px]">
                  {env === "Production" ? "locked" : "editable"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="border-border/80 bg-card/80">
          <CardHeader>
            <CardTitle className="text-base">Wallet defaults</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Require human approval &gt; $50k</p>
                <p className="text-xs text-muted-foreground">Applies to new wallets.</p>
              </div>
              <Switch defaultChecked aria-label="Require human approval above threshold" />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Stablecoin-first treasury</p>
                <p className="text-xs text-muted-foreground">Outbound limited to USDC/USDT.</p>
              </div>
              <Switch defaultChecked aria-label="Stablecoin first treasury" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/80 bg-card/80">
          <CardHeader>
            <CardTitle className="text-base">Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm">Pager on wallet freeze</p>
              <Switch defaultChecked aria-label="Pager on wallet freeze" />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm">Weekly risk digest</p>
              <Switch aria-label="Weekly risk digest" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/80 bg-card/80 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">API keys</CardTitle>
            <Button size="sm" type="button">
              Create key
            </Button>
          </CardHeader>
          <CardContent className="space-y-3 font-mono text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border/70 bg-background/40 px-3 py-2">
              <span>aigent_live_••••••••4f91</span>
              <Badge variant="success">active</Badge>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border/70 bg-background/40 px-3 py-2">
              <span>aigent_sandbox_••••••••b21a</span>
              <Badge variant="muted">rotating</Badge>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/80 bg-card/80 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Team</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {teamMembers.map((m) => (
              <div
                key={m.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border/70 px-3 py-2"
              >
                <div>
                  <p className="text-sm font-medium">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{m.role}</Badge>
                  <Badge variant={m.status === "active" ? "success" : "warning"}>
                    {m.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

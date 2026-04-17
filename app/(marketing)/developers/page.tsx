import type { Metadata } from "next";
import { FadeInView } from "@/components/shared/fade-in-view";
import { PageWrapper } from "@/components/shared/page-wrapper";
import { SectionHeader } from "@/components/marketing/section-header";
import { CodeBlock } from "@/components/marketing/code-block";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { developerSnippets } from "@/data/developer-snippets";
import { getConsoleEntryHref } from "@/lib/supabase/env";

export const metadata: Metadata = {
  title: "Developers",
  description:
    "SDK quickstart, policy evaluation, signed webhooks, and CI-friendly fixtures for agent treasuries.",
};

export default function DevelopersPage() {
  return (
    <div className="border-b border-border/60 py-16 sm:py-20">
      <PageWrapper>
        <FadeInView>
          <SectionHeader
            eyebrow="Developers"
            title="Integrate like any other critical service"
            description="Typed SDKs, signed webhooks, and policy hooks that mirror how you ship infrastructure: versioned configs, reproducible simulations, and CI-friendly fixtures."
          />
        </FadeInView>
        <FadeInView className="mt-10 grid gap-6 lg:grid-cols-3">
          {[
            {
              t: "Quickstart",
              d: "Create an org, mint sandbox wallets, attach policies, and stream webhooks locally.",
            },
            {
              t: "SDK features",
              d: "Wallet orchestration, policy evaluation, approvals, and typed audit queries.",
            },
            {
              t: "Webhooks",
              d: "Signed delivery for approvals, alerts, and lifecycle events with replay protection.",
            },
          ].map((c) => (
            <Card key={c.t} className="border-border/80 bg-card/80">
              <CardHeader>
                <CardTitle className="text-base">{c.t}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{c.d}</p>
              </CardContent>
            </Card>
          ))}
        </FadeInView>
        <FadeInView className="mt-12">
          <Tabs defaultValue={developerSnippets[0]?.id}>
            <TabsList>
              {developerSnippets.map((s) => (
                <TabsTrigger key={s.id} value={s.id}>
                  {s.title}
                </TabsTrigger>
              ))}
            </TabsList>
            {developerSnippets.map((s) => (
              <TabsContent key={s.id} value={s.id} className="mt-4">
                <CodeBlock code={s.code} language={s.language} />
              </TabsContent>
            ))}
          </Tabs>
        </FadeInView>
        <FadeInView className="mt-12 flex flex-wrap gap-3">
          <Button asChild>
            <Link href={getConsoleEntryHref()}>Open sandbox console</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/pricing">View pricing</Link>
          </Button>
        </FadeInView>
      </PageWrapper>
    </div>
  );
}

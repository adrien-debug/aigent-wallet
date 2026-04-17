import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingBackground } from "@/components/marketing/background";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4">
      <MarketingBackground />
      <div className="relative z-10 max-w-md text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          404
        </p>
        <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight">
          This page is not part of the treasury graph
        </h1>
        <p className="mt-3 text-pretty text-sm text-muted-foreground">
          The route you requested does not exist or was moved. Return to the marketing site or
          open the console.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden />
              Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/app">Console</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

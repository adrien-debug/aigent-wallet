"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const KEY = "aigent_onboarding_dismissed";

export function OnboardingBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      setVisible(localStorage.getItem(KEY) !== "1");
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  function dismiss() {
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  return (
    <Card className="mb-8 border-primary/25 bg-primary/5">
      <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold">Welcome to the Aigent console</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Explore policies, risk signals, and audit trails with production-shaped mock
            data. Connect a backend when you are ready to move beyond simulation.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Button variant="secondary" onClick={dismiss}>
            Dismiss
          </Button>
          <Button variant="ghost" size="icon" onClick={dismiss} aria-label="Fermer">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

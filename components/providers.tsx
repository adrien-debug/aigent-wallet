"use client";

import * as React from "react";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppToaster } from "@/components/app-toaster";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider delayDuration={200}>
        {children}
        <AppToaster />
      </TooltipProvider>
    </ThemeProvider>
  );
}

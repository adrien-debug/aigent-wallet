"use client";

import { useTheme } from "next-themes";
import { Toaster } from "sonner";

export function AppToaster() {
  const { resolvedTheme } = useTheme();
  return (
    <Toaster
      position="top-center"
      theme={resolvedTheme === "light" ? "light" : "dark"}
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast:
            "rounded-xl border border-border bg-card text-foreground shadow-lg font-sans",
        },
      }}
    />
  );
}

"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function SettingsSaveBar() {
  return (
    <div className="sticky bottom-6 z-20 flex flex-col gap-2 rounded-2xl border border-border/80 bg-card/90 p-4 shadow-lg backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Changes apply to this session only until a control plane is connected.
      </p>
      <Button
        type="button"
        onClick={() =>
          toast.success("Settings saved", {
            description: "Mock persist — wire to your API when ready.",
          })
        }
      >
        Save changes
      </Button>
    </div>
  );
}

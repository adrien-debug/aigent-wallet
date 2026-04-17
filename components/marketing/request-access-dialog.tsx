"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RequestAccessDialog() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setOpen(false);
      setSent(false);
    }, 900);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Request access</Button>
      </DialogTrigger>
      <DialogContent aria-describedby="request-access-desc">
        <DialogHeader>
          <DialogTitle>Request access</DialogTitle>
          <DialogDescription id="request-access-desc">
            Join the design partner program. We respond within two business days with
            sandbox credentials and architecture guidance.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="work-email">Work email</Label>
            <Input
              id="work-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="org">Organization</Label>
            <Input id="org" name="org" required placeholder="Acme Autonomous" />
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="submit" disabled={sent}>
              {sent ? "Queued" : "Submit request"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

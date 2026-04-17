"use client";

import { Bell, ChevronDown } from "lucide-react";
import { ENVIRONMENTS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ThemeToggle } from "@/components/theme-toggle";
import { CommandPalette } from "@/components/dashboard/command-palette";

export function Topbar() {
  return (
    <header className="flex h-16 items-center gap-3 border-b border-border/60 bg-background/70 px-4 backdrop-blur sm:px-6">
      <div className="flex flex-1 items-center gap-3">
        <CommandPalette />
      </div>
      <div className="flex items-center gap-2">
        <Select defaultValue="Production">
          <SelectTrigger className="h-9 w-[140px]" aria-label="Environment">
            <SelectValue placeholder="Environment" />
          </SelectTrigger>
          <SelectContent>
            {ENVIRONMENTS.map((e) => (
              <SelectItem key={e} value={e}>
                {e}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <NetworkSelector />
        <ThemeToggle />
        <Button variant="outline" size="icon" aria-label="Notifications">
          <Bell className="h-4 w-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 px-3">
              <span className="hidden text-sm sm:inline">Elena Vasquez</span>
              <ChevronDown className="h-4 w-4 opacity-60" aria-hidden />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Session</DropdownMenuLabel>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>API tokens</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

function NetworkSelector() {
  return (
    <Select defaultValue="multi">
      <SelectTrigger className="h-9 w-[150px]" aria-label="Network scope">
        <SelectValue placeholder="Networks" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="multi">All networks</SelectItem>
        <SelectItem value="eth">Ethereum</SelectItem>
        <SelectItem value="arb">Arbitrum</SelectItem>
        <SelectItem value="base">Base</SelectItem>
        <SelectItem value="pol">Polygon</SelectItem>
      </SelectContent>
    </Select>
  );
}

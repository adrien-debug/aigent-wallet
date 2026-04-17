import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { getServerUser } from "@/lib/supabase/session";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getServerUser();
  return <DashboardShell userEmail={user?.email ?? null}>{children}</DashboardShell>;
}

export const PRODUCT_NAME = "Aigent";

export const MARKETING_NAV = [
  { href: "/product", label: "Product" },
  { href: "/security", label: "Security" },
  { href: "/developers", label: "Developers" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
] as const;

export const DASHBOARD_NAV = [
  { href: "/app", label: "Overview", icon: "LayoutDashboard" },
  { href: "/app/wallets", label: "Wallets", icon: "Wallet" },
  { href: "/app/policies", label: "Policies", icon: "Shield" },
  { href: "/app/transactions", label: "Transactions", icon: "ArrowLeftRight" },
  { href: "/app/risk", label: "Risk", icon: "Activity" },
  { href: "/app/audit", label: "Audit", icon: "ScrollText" },
  { href: "/app/settings", label: "Settings", icon: "Settings" },
] as const;

export const ENVIRONMENTS = ["Production", "Staging", "Sandbox"] as const;

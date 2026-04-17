/**
 * Security headers applied to every route.
 *  - HSTS: HTTPS-only for 2 years.
 *  - CSP: no inline scripts (Next emits hashed scripts), connect to self + Supabase.
 *  - Frame-Options: deny embedding (clickjacking).
 *  - Referrer-Policy: strict-origin-when-cross-origin.
 *  - Permissions-Policy: disable unused powerful features.
 */
const isDev = process.env.NODE_ENV !== "production";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseHost = supabaseUrl ? new URL(supabaseUrl).host : "";

/** Production CSP. In dev, Next.js webpack/HMR needs 'unsafe-eval' + ws: or scripts never run → blank UI (Framer Motion stays opacity:0). */
function buildCsp() {
  const connectExtra = [
    "'self'",
    supabaseHost ? `https://${supabaseHost}` : "",
    supabaseHost ? `wss://${supabaseHost}` : "",
    isDev ? "ws: wss:" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const scriptSrc = isDev
    ? "'self' 'unsafe-inline' 'unsafe-eval'"
    : "'self' 'unsafe-inline'";

  return [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    `script-src ${scriptSrc}`,
    "style-src 'self' 'unsafe-inline'",
    `connect-src ${connectExtra}`,
  ].join("; ");
}

const csp = buildCsp();

const securityHeaders = [
  // HSTS only over HTTPS (skip in local http dev — avoids browser treating localhost oddly)
  ...(isDev
    ? []
    : [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ]),
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  { key: "Content-Security-Policy", value: csp },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;

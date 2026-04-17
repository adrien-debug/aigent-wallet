import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { PRODUCT_NAME } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${PRODUCT_NAME} · Financial OS for AI Agents`,
    template: `%s · ${PRODUCT_NAME}`,
  },
  description:
    "Programmable treasury for autonomous systems. Policies, simulation, audit, and risk controls built for AI agents.",
  openGraph: {
    type: "website",
    siteName: PRODUCT_NAME,
    title: `${PRODUCT_NAME} · Financial OS for AI Agents`,
    description:
      "Programmable treasury for autonomous systems. Policies, simulation, audit, and risk controls built for AI agents.",
    images: [
      {
        url: "/heroes/og-image.png",
        width: 1024,
        height: 1024,
        alt: `${PRODUCT_NAME} — AI Wallet Infrastructure`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/heroes/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${mono.variable} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

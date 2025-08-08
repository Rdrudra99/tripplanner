import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { OrganizationSchema, WebsiteSchema } from "@/components/json-ld";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://westairtrip.vercel.app'),
  title: {
    default: "West Airlines Trip Planner",
    template: "%s | West Airlines Trip Planner"
  },
  description: "Plan your perfect getaway with West Airlines' smart travel planning portal. Discover destinations, compare prices, and book your next adventure.",
  keywords: ["travel", "airlines", "trip planner", "vacation", "flights", "hotels", "west airlines"],
  authors: [{ name: "West Airlines" }],
  creator: "West Airlines",
  publisher: "West Airlines",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://westairtrip.vercel.app",
    siteName: "West Airlines Trip Planner",
    title: "West Airlines Trip Planner",
    description: "Plan your perfect getaway with West Airlines' smart travel planning portal.",
    images: [
      {
        url: "/hero.png",
        width: 1200,
        height: 630,
        alt: "West Airlines Trip Planner"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "West Airlines Trip Planner",
    description: "Plan your perfect getaway with West Airlines' smart travel planning portal.",
    images: ["/hero.png"],
    creator: "@westairlines"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <ClerkProvider>
    <html lang="en">
      <head>
        <link rel="canonical" href="https://westairtrip.vercel.app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0046FF" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="robots" content="index, follow" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <OrganizationSchema />
        <WebsiteSchema />
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}

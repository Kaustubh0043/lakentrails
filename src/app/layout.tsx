import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const luxurySerif = Cormorant_Garamond({
  variable: "--font-luxury-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const luxurySans = Inter({
  variable: "--font-luxury-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lakentrails.in"),
  title: "Lake N Trails Exotic Glamping | Luxury Lakeside Tropical Escape Khopoli",
  description:
    "Experience the ultimate luxury lakeside tropical getaway at Lake N Trails Exotic Glamping in Khopoli. Featuring premium stays, private pool parties, bonfires under the stars, custom group celebrations, events, rain dance, and kayaking in a dreamy Bali-inspired tropical vibe.",
  keywords: [
    "Lake N Trails",
    "Lake N Trails Exotic Glamping",
    "Khopoli resort",
    "lakeside resort",
    "tropical resort Maharashtra",
    "luxury lakeside camping",
    "group events Khopoli",
    "pool party resort",
    "pet-friendly resort Khopoli",
    "kayaking boating Khopoli",
    "Adoshi Dam resort",
  ],
  authors: [{ name: "Lake N Trails Exotic Glamping" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Lake N Trails Exotic Glamping | Luxury Lakeside Tropical Escape",
    description:
      "Escape Ordinary, Experience Exotic. Immerse yourself in a luxurious tropical Bali vibe with dynamic nightlife, kayaking, pool parties, and stargazing.",
    url: "https://lakentrails.in",
    siteName: "Lake N Trails Exotic Glamping",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://lakentrails.in/images/resort_background_hd_4k.jpg",
        width: 1200,
        height: 630,
        alt: "Lake N Trails Exotic Glamping",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lake N Trails Exotic Glamping | Luxury Lakeside Tropical Escape",
    description:
      "Escape Ordinary, Experience Exotic. Immerse yourself in a luxurious tropical Bali vibe with dynamic nightlife, kayaking, pool parties, and stargazing.",
    images: ["https://lakentrails.in/images/resort_background_hd_4k.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${luxurySerif.variable} ${luxurySans.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const saved = localStorage.getItem('theme');
                  if (saved === 'light') {
                    document.documentElement.classList.add('light');
                  } else {
                    document.documentElement.classList.remove('light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-[#030a16] text-[#fcfbf7] selection:bg-sunset selection:text-white">
        {children}
        <Analytics />
      </body>
    </html>
  );
}

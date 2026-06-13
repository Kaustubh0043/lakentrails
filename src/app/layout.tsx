import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

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
  title: "LakeNtrails | Luxury Lakeside Tropical Escape Khopoli",
  description:
    "Experience the ultimate luxury lakeside tropical getaway at LakeNtrails in Khopoli. Featuring premium stays, private pool parties, bonfires under the stars, weddings, events, rain dance, and kayaking in a dreamy Bali-inspired tropical vibe.",
  keywords: [
    "LakeNtrails",
    "Khopoli resort",
    "lakeside resort",
    "tropical resort Maharashtra",
    "luxury lakeside camping",
    "destination wedding Khopoli",
    "pool party resort",
    "pet-friendly resort Khopoli",
    "kayaking boating Khopoli",
    "Adoshi Dam resort",
  ],
  authors: [{ name: "LakeNtrails Resort" }],
  openGraph: {
    title: "LakeNtrails | Luxury Lakeside Tropical Escape",
    description:
      "Your lakeside escape begins here. Immerse yourself in a luxurious tropical Bali vibe with dynamic nightlife, kayaking, pool parties, and stargazing.",
    url: "https://lakentrails.com",
    siteName: "LakeNtrails",
    locale: "en_US",
    type: "website",
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
    >
      <body className="font-sans antialiased bg-[#030a16] text-[#fcfbf7] selection:bg-sunset selection:text-white">
        {children}
      </body>
    </html>
  );
}

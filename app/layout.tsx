import type { Metadata } from "next";
import { Geist, DM_Sans, Inter } from "next/font/google";
import { Playfair_Display, Jost } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Geometric grotesk used for tracked all-caps accents (donor names, giving
// tiers). Its wide, even caps hold up at small sizes where DM Sans goes soft.
const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://goldhelmetaward.com"),
  title: "Gold Helmet Award - Colorado's Premier High School Football Honor",
  description:
    "The Gold Helmet Award recognizes excellence, leadership, and character in Colorado high school football since 1951. View winners, apply, and support student-athletes.",
  keywords:
    "Gold Helmet Award, Colorado football, high school football, sports award",
  openGraph: {
    title: "Gold Helmet Award",
    description:
      "Recognizing excellence, leadership, and character in Colorado high school football since 1951.",
    images: [{ url: "/images/1280x720-social-share.png", width: 1280, height: 720 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gold Helmet Award",
    description:
      "Recognizing excellence, leadership, and character in Colorado high school football since 1951.",
    images: ["/images/1280x720-social-share.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The font variables live on <html>, not <body>: globals.css builds
    // --font-body and --font-accent on :root, and a custom property whose
    // var() can't resolve on its own element becomes guaranteed-invalid
    // rather than falling through to the next name in the list. Declared on
    // <body> they were invisible to :root, so every --font-* chain collapsed
    // and the whole site rendered in the default system stack.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${dmSans.variable} ${inter.variable} ${playfair.variable} ${jost.variable}`}
    >
      <body
        className="antialiased"
        style={{
          "--font-display": "var(--font-playfair), Georgia, serif",
        } as React.CSSProperties}
      >
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

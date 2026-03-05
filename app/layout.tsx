import type { Metadata } from "next";
import { Geist, DM_Sans } from "next/font/google";
import { Playfair_Display } from "next/font/google";
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

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Gold Helmet Award - Colorado's Premier High School Football Honor",
  description:
    "The Gold Helmet Award recognizes excellence, leadership, and character in Colorado high school football since 1951. View winners, apply, and support student-athletes.",
  keywords:
    "Gold Helmet Award, Colorado football, high school football, scholarship, sports award",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${dmSans.variable} ${playfair.variable} antialiased`}
        style={{
          "--font-display": "var(--font-playfair), Georgia, serif",
        } as React.CSSProperties}
      >
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

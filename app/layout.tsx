/**
 * Root layout — shared across all routes.
 * Loads fonts (Space Grotesk + Inter), renders the persistent navbar,
 * ambient orb background, and footer. SEO metadata defined here as defaults.
 */
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";

/* ── Fonts ─────────────────────────────────────────────────────────────────── */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

/* ── SEO / Open Graph defaults (pages can override via their own metadata) ── */
export const metadata: Metadata = {
  title: {
    default: "Saurabh Dusane — AI/ML Engineer & Data Scientist",
    template: "%s | Saurabh Dusane",
  },
  description:
    "Portfolio of Saurabh Dusane — AI/ML Engineer, Data Scientist, and Full-Stack AI Builder. M.S. Computer Engineering @ Arizona State University.",
  metadataBase: new URL("https://saurabhdusane.com"),
  openGraph: {
    title: "Saurabh Dusane — AI/ML Engineer & Data Scientist",
    description:
      "Explore projects, writing, and experience from Saurabh Dusane — building production-grade intelligent systems.",
    url: "https://saurabhdusane.com",
    siteName: "Saurabh Dusane Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saurabh Dusane — AI/ML Engineer",
    description:
      "Portfolio of Saurabh Dusane — AI/ML, Data Science, Full-Stack AI.",
  },
  icons: { icon: "/favicon.ico" },
};

/* ── Layout ────────────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        <AnimatedBackground />
        <div className="dot-grid" aria-hidden="true" />
        <Navbar />
        <main className="relative z-10 pt-16 min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

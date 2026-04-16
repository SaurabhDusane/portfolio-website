import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Saurabh Dusane | AI/ML Engineer & Data Scientist",
  description:
    "Portfolio of Saurabh Dusane — AI/ML Engineer, Data Scientist, and Full-Stack AI Builder. M.S. Computer Engineering @ ASU.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        <AnimatedBackground />
        <Navbar />
        <main className="relative z-10 pt-20 min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

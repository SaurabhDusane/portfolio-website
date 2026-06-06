import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ShellLayout from "@/components/ShellLayout";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Saurabh Dusane | AI/ML Engineer & Data Scientist",
  description:
    "Portfolio of Saurabh Nilesh Dusane — AI/ML Engineer, Data Scientist, and Full-Stack AI Builder. Projects, writing, and experience.",
  openGraph: {
    title: "Saurabh Dusane | AI/ML Engineer",
    description: "AI/ML Engineer · Data Scientist · Full-Stack AI Builder",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-bg text-text antialiased">
        <ShellLayout>{children}</ShellLayout>
      </body>
    </html>
  );
}

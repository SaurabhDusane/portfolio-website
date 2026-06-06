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
    "Portfolio of Saurabh Nilesh Dusane \u2014 AI/ML Engineer, Data Scientist, and Full-Stack AI Builder.",
  openGraph: {
    title: "Saurabh Dusane | AI/ML Engineer",
    description: "AI/ML Engineer \u00b7 Data Scientist \u00b7 Full-Stack AI Builder",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t)}else if(window.matchMedia('(prefers-color-scheme:light)').matches){document.documentElement.setAttribute('data-theme','light')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="antialiased" style={{ background: "var(--bg)", color: "var(--text)", transition: "background-color 0.2s, color 0.2s" }}>
        <ShellLayout>{children}</ShellLayout>
      </body>
    </html>
  );
}

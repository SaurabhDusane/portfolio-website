import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SiteBackground from "@/components/SiteBackground";
import { SITE_URL } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});


const DESCRIPTION =
  "Saurabh Nilesh Dusane is an AI/ML engineer building agents from first principles and data pipelines that hold up in production.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Saurabh Nilesh Dusane — AI/ML Engineer",
    template: "%s — Saurabh Dusane",
  },
  description: DESCRIPTION,
  applicationName: "Saurabh Dusane",
  authors: [{ name: "Saurabh Nilesh Dusane" }],
  keywords: [
    "Saurabh Dusane",
    "AI Engineer",
    "ML Engineer",
    "Machine Learning",
    "Data Engineering",
    "LLM Agents",
    "Portfolio",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Saurabh Dusane",
    title: "Saurabh Nilesh Dusane — AI/ML Engineer",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Saurabh Nilesh Dusane — AI/ML Engineer",
    description: DESCRIPTION,
    creator: "@SaurabhDusane",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf9f6" },
    { media: "(prefers-color-scheme: dark)", color: "#12100e" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){document.documentElement.classList.add('js');try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t)}else if(window.matchMedia('(prefers-color-scheme:light)').matches){document.documentElement.setAttribute('data-theme','light')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="antialiased flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 btn btn-primary"
        >
          Skip to content
        </a>
        <SiteBackground />
        <SiteHeader />
        <main id="main" className="relative z-[1] flex-1 pt-12 sm:pt-16">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}

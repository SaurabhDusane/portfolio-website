import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ShellLayout from "@/components/ShellLayout";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Set NEXT_PUBLIC_SITE_URL in .env (or Vercel env) once the custom domain is live
// so OG/canonical URLs resolve to the production host.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://saurabhdusane.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Saurabh Nilesh Dusane \u2014 AI/ML Engineer",
    template: "%s \u2014 Saurabh Dusane",
  },
  description:
    "Portfolio of Saurabh Nilesh Dusane \u2014 AI/ML Engineer, Data Scientist, and Full-Stack AI Builder. Building intelligent ML systems that turn messy data into decisions.",
  applicationName: "Saurabh Dusane Portfolio",
  authors: [{ name: "Saurabh Nilesh Dusane" }],
  keywords: [
    "Saurabh Dusane",
    "AI Engineer",
    "ML Engineer",
    "Data Scientist",
    "Deep Learning",
    "NLP",
    "Computer Vision",
    "Portfolio",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Saurabh Dusane \u2014 Portfolio",
    title: "Saurabh Nilesh Dusane \u2014 AI/ML Engineer",
    description:
      "AI/ML Engineer \u00b7 Data Scientist \u00b7 Full-Stack AI Builder. Predictive analytics, conversational AI, and scalable ML systems.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Saurabh Nilesh Dusane \u2014 AI/ML Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saurabh Nilesh Dusane \u2014 AI/ML Engineer",
    description: "AI/ML Engineer \u00b7 Data Scientist \u00b7 Full-Stack AI Builder",
    images: ["/og-image.png"],
    creator: "@SaurabhDusane",
  },
  robots: { index: true, follow: true },
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

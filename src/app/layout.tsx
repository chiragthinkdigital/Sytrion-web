import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono, Syne } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Sytrion Data Labs | Intelligent Operations & AI Solutions",
  description:
    "AI-powered intelligent operations company helping enterprises automate workflows, strengthen data foundations, and transform business processes across shipping, healthcare, and banking.",
  keywords: [
    "intelligent operations",
    "AI automation",
    "data engineering",
    "business transformation",
    "process automation",
    "enterprise AI",
  ],
  openGraph: {
    title: "Sytrion Data Labs | Intelligent Operations & AI Solutions",
    description:
      "AI-powered intelligent operations company helping enterprises automate workflows, strengthen data foundations, and transform business processes.",
    type: "website",
    locale: "en_US",
    siteName: "Sytrion Data Labs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sytrion Data Labs | Intelligent Operations & AI Solutions",
    description:
      "AI-powered intelligent operations company helping enterprises automate workflows and transform business processes.",
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
      dir="ltr"
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-black">
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}

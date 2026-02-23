import type { Metadata, Viewport } from "next";
import { Playfair_Display, Sora } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Sarvam AI Podcast Generator",
  description: "AI-powered document analysis using Mistral OCR and podcast generation using Sarvam AI APIs. Transform any PDF into a multilingual podcast.",
  keywords: ["Sarvam AI", "podcast", "AI", "multilingual", "document analysis", "OCR", "Mistral AI", "text-to-speech"],
  authors: [{ name: "Sarvam AI Team" }],
  creator: "Sarvam AI",
  publisher: "Sarvam AI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://sarvam-podcast-generator.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Sarvam AI Podcast Generator',
    description: 'Transform documents into multilingual podcasts with AI',
    url: 'https://sarvam-podcast-generator.vercel.app',
    siteName: 'Sarvam AI Podcast Generator',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sarvam AI Podcast Generator',
    description: 'Transform documents into multilingual podcasts with AI',
    creator: '@sarvam_ai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="color-scheme" content="dark light" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${sora.variable} ${playfair.variable} font-sans min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

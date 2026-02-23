import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Sora } from 'next/font/google';
import './globals.css';

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
  title: 'Sarvam AI Cookbook Showcase',
  description:
    'Interactive Sarvam AI demos, notebooks, sample data, and developer workflows built for Indian language-first AI products.',
  keywords: ['Sarvam AI', 'AI', 'machine learning', 'Indian languages', 'multilingual', 'chatbot', 'translation', 'speech'],
  authors: [{ name: 'Sarvam AI Team' }],
  creator: 'Sarvam AI',
  publisher: 'Sarvam AI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://sarvam-ai-cookbook.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Sarvam AI Cookbook Showcase',
    description: 'Interactive Sarvam AI demos for Indian language-first AI products',
    url: 'https://sarvam-ai-cookbook.vercel.app',
    siteName: 'Sarvam AI Cookbook',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sarvam AI Cookbook Showcase',
    description: 'Interactive Sarvam AI demos for Indian language-first AI products',
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
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#050608' },
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
        <meta name="theme-color" content="#050608" />
        <meta name="color-scheme" content="dark light" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${sora.variable} ${playfair.variable} font-sans antialiased min-h-screen`}>
        {children}
      </body>
    </html>
  );
}

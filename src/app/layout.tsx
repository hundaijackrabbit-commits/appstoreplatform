import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://startova.space"),
  applicationName: "StartOva",
  title: {
    default: "Own Your Website | No Subscriptions | StartOva",
    template: "%s | StartOva",
  },
  description:
    "Build and own your website with full code, GitHub-ready files, ZIP delivery, and live deployment. No subscriptions. No lock-in. Launch your business in days.",
  keywords: [
    "own your website",
    "website without subscription",
    "website with source code",
    "buy website with source code",
    "Wix alternative ownership",
    "Shopify alternative ownership",
    "website builder without lock-in",
    "ready made business website",
    "launch website with code",
    "StartOva",
  ],
  authors: [{ name: "StartOva" }],
  creator: "StartOva",
  publisher: "StartOva",
  alternates: {
    canonical: "/",
    languages: {
      "en-CA": "https://startova.space",
      "x-default": "https://startova.space",
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "StartOva - Own Your Website, Code, and Launch",
    description:
      "Get a real website or app you fully own. Includes GitHub-ready files, ZIP delivery, and live deployment. No platform lock-in.",
    url: "https://startova.space",
    siteName: "StartOva",
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Own Your Website - StartOva",
    description:
      "Stop renting your website. Own your code, get the files, and launch in days.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DE2MKQSRRC"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DE2MKQSRRC');
          `}
        </Script>

        <Script id="clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "w8ukff2950");
          `}
        </Script>

        <Script
          src="https://tools.luckyorange.com/core/lo.js?site-id=69225886"
          strategy="afterInteractive"
        />

        <Script id="startova-structured-data" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "StartOva",
            url: "https://startova.space",
            logo: "https://startova.space/apple-touch-icon.png",
            description:
              "StartOva helps entrepreneurs and small business owners own their websites, source code, and deployed digital business assets.",
            sameAs: [],
          })}
        </Script>

        <Script id="startova-website-structured-data" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "StartOva",
            url: "https://startova.space",
            description:
              "Build and own your website with full code, ZIP delivery, GitHub-ready files, and live deployment.",
          })}
        </Script>

        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
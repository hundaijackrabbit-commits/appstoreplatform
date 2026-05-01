"use client";

import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "StartOva",
  url: "https://startova.space",
  logo: "https://startova.space/apple-touch-icon.png",
  description:
    "StartOva helps entrepreneurs and small business owners own their websites, source code, and deployed digital business assets.",
  sameAs: [],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "StartOva",
  url: "https://startova.space",
  description:
    "Build and own your website with full code, ZIP delivery, GitHub-ready files, and live deployment.",
};

export default function ClientSideServices() {
  return (
    <>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-DE2MKQSRRC" strategy="afterInteractive" />
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
      <Script src="https://tools.luckyorange.com/core/lo.js?site-id=69225886" strategy="afterInteractive" />
      <Script id="startova-structured-data" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(organizationSchema)}
      </Script>
      <Script id="startova-website-structured-data" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(websiteSchema)}
      </Script>
      <Analytics />
      <SpeedInsights />
    </>
  );
}

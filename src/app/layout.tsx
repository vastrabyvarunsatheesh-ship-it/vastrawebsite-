import type { Metadata, Viewport } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import { siteConfig } from "@/config/site";
import { RootProvider } from "@/providers/root-provider";
import { RootLayoutWrapper } from "@/components/layouts/root-layout-wrapper";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | ${siteConfig.subtitle}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Sarees",
    "Luxury Kurtis",
    "Dress Materials",
    "Women's Ethnic Wear",
    "Indian Fashion",
    "Vastra by Varun",
    "Couture Sarees",
  ],
  authors: [{ name: "Varun Satheesh" }],
  creator: "Vastra Couture",
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0F0F11",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: siteConfig.name,
              url: siteConfig.url,
              logo: `${siteConfig.url}/logo.png`,
              sameAs: [siteConfig.socials.instagram, siteConfig.socials.facebook],
            }),
          }}
        />
      </head>
      <body>
        <RootProvider>
          <RootLayoutWrapper>{children}</RootLayoutWrapper>
        </RootProvider>
      </body>
    </html>
  );
}

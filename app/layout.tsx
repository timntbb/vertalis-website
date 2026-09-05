import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
  metadataBase: new URL("https://vertalislegal.com"),
  title: "Frisco Business Attorney for Growing Companies | Vertalis",
  description:
    "Vertalis Legal Counsel helps businesses across Frisco, McKinney, Prosper, Plano, and North Dallas with contracts, governance, ownership disputes, employment matters, financing, and intellectual property.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    images: ["https://vertalislegal.com/vertalis-shield-preview.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://vertalislegal.com/vertalis-shield-preview.png"],
  },
  icons: {
    icon: [{ url: "/icon.png?v=2", type: "image/png" }],
    shortcut: [{ url: "/icon.png?v=2" }],
    apple: [{ url: "/icon.png?v=2" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FJRW82VFMM"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FJRW82VFMM');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

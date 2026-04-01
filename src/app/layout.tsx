import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://esgbrasil.com.br"),
  title: {
    default: "ESG Brasil — Referência em ESG e SST no Brasil",
    template: "%s | ESG Brasil",
  },
  description: "O portal de referência para ESG (Environmental, Social and Governance) e SST (Saúde e Segurança do Trabalho) no Brasil. Notícias, análises e conformidade.",
  keywords: ["ESG", "SST", "sustentabilidade", "governança corporativa", "saúde e segurança", "conformidade", "NR", "Brasil"],
  authors: [{ name: "Redação ESG Brasil" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://esgbrasil.com.br",
    siteName: "ESG Brasil",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@esgbrasil",
  },
  robots: { index: true, follow: true },
  other: {
    "google-adsense-account": "ca-pub-9112303692826966",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="pt-BR" className={`${inter.variable} ${sora.variable}`}>
      <body className="min-h-screen flex flex-col bg-white font-sans antialiased">
        <Script
          id="adsense"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9112303692826966"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}</Script>
          </>
        )}
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

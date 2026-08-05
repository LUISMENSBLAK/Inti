import type { Metadata } from "next";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import { BrandIntro } from "@/src/components/brand-intro";
import { SiteFooter } from "@/src/components/site-footer";
import { SiteHeader } from "@/src/components/site-header";
import { WhatsAppFab } from "@/src/components/whatsapp-fab";
import { siteConfig } from "@/src/config/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: { default: "Solee Konn | La forma íntima del lujo", template: "%s | Solee Konn" },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Solee Konn",
    description: "Alta joyería de presencia íntima. Forma, color y luz.",
    url: "/",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "Solee Konn, la forma íntima del lujo" }],
  },
  twitter: { card: "summary_large_image", title: "Solee Konn", description: "La forma íntima del lujo.", images: ["/og.png"] },
  icons: { icon: "/favicon.png", apple: "/apple-touch-icon.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <a className="skip-link" href="#contenido">Saltar al contenido</a>
        <BrandIntro />
        <SiteHeader />
        <div id="contenido">{children}</div>
        <SiteFooter />
        <WhatsAppFab />
      </body>
    </html>
  );
}

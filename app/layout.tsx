import type { Metadata } from "next";
import { SiteFooter } from "@/src/components/site-footer";
import { SiteHeader } from "@/src/components/site-header";
import { siteConfig } from "@/src/config/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "Inti Joyería | Piezas que guardan una historia", template: "%s | Inti Joyería" },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Inti Joyería",
    description: "Piezas que guardan una historia.",
    url: "/",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "Inti Joyería, piezas que guardan una historia" }],
  },
  twitter: { card: "summary_large_image", title: "Inti Joyería", description: "Piezas que guardan una historia.", images: ["/og.png"] },
  icons: { icon: "/brand/symbol-secondary.jpg", shortcut: "/brand/symbol-secondary.jpg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <a className="skip-link" href="#contenido">Saltar al contenido</a>
        <SiteHeader />
        <div id="contenido">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}

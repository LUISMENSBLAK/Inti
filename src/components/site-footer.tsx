import Link from "next/link";
import { buildWhatsAppUrl, siteConfig } from "@/src/config/site";
import { WhatsAppIcon } from "./whatsapp-icon";
import { Image } from "./image";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <p>Una pieza comienza<br />con una conversación.</p>
        <a className="footer-whatsapp" href={buildWhatsAppUrl()} target="_blank" rel="noreferrer"><WhatsAppIcon /> {siteConfig.whatsappDisplay}</a>
      </div>
      <div className="footer-wordmark">SOLEE KONN</div>
      <div className="footer-grid">
        <div className="footer-signature"><Image src={siteConfig.brand.signatureIvory} alt="Emblema secundario de Solee Konn" width={110} height={110} /><p>La forma íntima del lujo.</p></div>
        <div><p className="footer-heading">Descubrir</p><Link href="/catalogo">Piezas</Link><Link href="/colecciones/edicion-primera">Edición Primera</Link><Link href="/nosotros">La casa</Link></div>
        <div><p className="footer-heading">Atención</p><Link href="/contacto">Contacto</Link><Link href="/preguntas-frecuentes">Preguntas frecuentes</Link><Link href="/envios">Envíos</Link></div>
        <div><p className="footer-heading">Información</p><Link href="/cuidados">Cuidados</Link><Link href="/privacidad">Privacidad</Link>{siteConfig.instagram && <a href={siteConfig.instagram}>Instagram</a>}{siteConfig.email && <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>}</div>
      </div>
      <div className="footer-base"><span>© {new Date().getFullYear()} Solee Konn</span><span>Alta joyería · México</span></div>
    </footer>
  );
}

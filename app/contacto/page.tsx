import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/src/components/info-page";
import { WhatsAppIcon } from "@/src/components/whatsapp-icon";
import { buildWhatsAppUrl, siteConfig } from "@/src/config/site";

export const metadata: Metadata = { title: "Contacto", description: "Atención personalizada de Solee Konn." };

export default function ContactPage() {
  return (
    <InfoPage eyebrow="Contacto" title="Estamos para acompañarte." intro="Cuéntanos qué pieza te interesa y qué información necesitas. La conversación se abre en WhatsApp con un mensaje preparado.">
      <div className="contact-card">
        <div><p className="eyebrow">Atención directa</p><h2>Consulta disponibilidad, precio y envío.</h2><p>El botón abre WhatsApp; ningún mensaje se envía automáticamente.</p><p className="contact-details"><strong>{siteConfig.whatsappDisplay}</strong><br />{siteConfig.hours}</p></div>
        <a className="whatsapp-button" href={buildWhatsAppUrl()} target="_blank" rel="noreferrer"><WhatsAppIcon /> Abrir WhatsApp</a>
      </div>
      <p className="contact-note">¿Prefieres explorar primero? <Link className="text-link" href="/catalogo">Visita todas las piezas.</Link></p>
    </InfoPage>
  );
}

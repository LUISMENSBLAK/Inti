import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { InfoPage } from "@/src/components/info-page";
import { buildWhatsappUrl } from "@/src/config/site";

export const metadata: Metadata = { title: "Contacto", description: "Atención personalizada de Inti Joyería." };

const message = "Hola, quisiera recibir atención personalizada sobre las piezas de Inti Joyería. ¿Podrían ayudarme?";

export default function ContactPage() {
  return (
    <InfoPage eyebrow="Contacto" title="Estamos para acompañarte." intro="Cuéntanos qué pieza te interesa y qué información necesitas. La conversación se abre en WhatsApp con un mensaje preparado.">
      <div className="contact-card">
        <div><p className="eyebrow">Atención directa</p><h2>Consulta disponibilidad, precio y envío.</h2><p>El botón abre WhatsApp; ningún mensaje se envía automáticamente.</p></div>
        <a className="whatsapp-button" href={buildWhatsappUrl(message)} target="_blank" rel="noreferrer"><MessageCircle /> Abrir WhatsApp</a>
      </div>
      <p className="contact-note">¿Prefieres explorar primero? <Link className="text-link" href="/catalogo">Visita el catálogo completo.</Link></p>
    </InfoPage>
  );
}

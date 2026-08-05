import type { Metadata } from "next";
import { InfoPage } from "@/src/components/info-page";

export const metadata: Metadata = { title: "Aviso de privacidad" };

export default function PrivacyPage() {
  return (
    <InfoPage eyebrow="Revisión legal pendiente" title="Aviso de privacidad." intro="Este sitio estático no solicita registro, no procesa pagos y no administra cuentas de cliente en su etapa actual.">
      <div className="legal-copy">
        <div className="legal-warning">Documento informativo sujeto a revisión legal antes de su publicación comercial definitiva.</div>
        <h2>Alcance actual</h2><p>La navegación, la búsqueda, los favoritos y los productos vistos recientemente funcionan en el navegador del visitante. Los dos últimos se guardan localmente en su dispositivo.</p>
        <h2>Contacto externo</h2><p>Al elegir WhatsApp se abre un servicio de terceros. El tratamiento de información dentro de esa plataforma se rige por sus propios términos y por las comunicaciones que la persona decida enviar.</p>
        <h2>Sin formularios ni cuentas</h2><p>En esta fase no se reciben formularios, pedidos, pagos ni credenciales a través del sitio.</p>
      </div>
    </InfoPage>
  );
}

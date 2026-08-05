import type { Metadata } from "next";
import { InfoPage } from "@/src/components/info-page";

export const metadata: Metadata = { title: "Política de envíos" };

export default function ShippingPage() {
  return (
    <InfoPage eyebrow="Información editable" title="Política de envíos." intro="Las condiciones definitivas se confirman antes de cada operación. Este contenido puede actualizarse sin modificar el catálogo.">
      <div className="legal-copy">
        <h2>Cotización</h2><p>El costo, cobertura, paquetería y plazo se informan de forma individual según destino, valor y características de la pieza.</p>
        <h2>Preparación</h2><p>El tiempo de preparación se confirma junto con la disponibilidad. No se considera un pedido confirmado hasta acordar por escrito todos sus detalles.</p>
        <h2>Seguimiento y recepción</h2><p>Cuando exista un envío confirmado, se compartirán los datos de seguimiento disponibles. Revisa el empaque al recibirlo y conserva la evidencia en caso de incidencia.</p>
        <h2>Importante</h2><p>Esta página es informativa y debe revisarse antes de habilitar pagos o pedidos en una etapa posterior.</p>
      </div>
    </InfoPage>
  );
}

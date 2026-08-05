import type { Metadata } from "next";
import { InfoPage } from "@/src/components/info-page";

export const metadata: Metadata = { title: "Cuidados", description: "Guía general para cuidar tus joyas." };

export default function CarePage() {
  return (
    <InfoPage eyebrow="Guía esencial" title="Conservar su luz." intro="Algunos hábitos sencillos ayudan a proteger el acabado, los engastes y la presencia de cada pieza.">
      <div className="care-grid">
        <article><span>01</span><h2>Al usarla</h2><p>Evita golpes, ejercicio, albercas, mar y contacto directo con perfumes, cremas o productos de limpieza.</p></article>
        <article><span>02</span><h2>Al guardarla</h2><p>Separa cada pieza en una bolsa suave o compartimento individual para evitar fricción y rayaduras.</p></article>
        <article><span>03</span><h2>Al limpiarla</h2><p>Usa un paño limpio, seco y sin pelusa. Antes de aplicar líquidos, consulta el cuidado específico del material y las piedras.</p></article>
        <article><span>04</span><h2>Al revisarla</h2><p>Si un engaste se mueve o la pieza recibe un golpe, deja de usarla y solicita una revisión profesional.</p></article>
      </div>
    </InfoPage>
  );
}

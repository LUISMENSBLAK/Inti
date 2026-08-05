import type { Metadata } from "next";
import Image from "next/image";
import { InfoPage } from "@/src/components/info-page";

export const metadata: Metadata = { title: "Nosotros", description: "Conoce la mirada detrás de Inti Joyería." };

export default function AboutPage() {
  return (
    <InfoPage eyebrow="La casa" title="Joyería para mirar despacio." intro="Inti nace como una boutique digital donde la fotografía, la forma y la conversación recuperan el tiempo de elegir bien.">
      <div className="prose-grid">
        <div><h2>Una selección con intención</h2><p>Trabajamos con una edición breve para que cada pieza tenga espacio, contexto y atención. No presentamos datos que no han sido confirmados: materiales, medidas y disponibilidad se consultan de forma personalizada.</p></div>
        <div className="prose-image"><Image src="/brand/logo-primary.avif" alt="Monograma principal de Inti Joyería" fill sizes="(max-width: 800px) 100vw, 42vw" /></div>
        <div><h2>La experiencia</h2><p>Las imágenes originales son el centro del catálogo. Las vistas 3D son reconstrucciones visuales aproximadas para comprender el volumen, nunca sustitutos de una ficha técnica o un modelo de fabricación.</p></div>
      </div>
    </InfoPage>
  );
}

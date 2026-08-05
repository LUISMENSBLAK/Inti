import type { Metadata } from "next";
import { InfoPage } from "@/src/components/info-page";
import { Image } from "@/src/components/image";
import { siteConfig } from "@/src/config/site";

export const metadata: Metadata = { title: "La casa", description: "Conoce la mirada de Solee Konn." };

export default function AboutPage() {
  return (
    <InfoPage eyebrow="La casa" title="Joyería para mirar despacio." intro="Solee Konn es una casa joven con una mirada definida: observar la forma, el color y la luz hasta encontrar un gesto esencial.">
      <div className="prose-grid">
        <div><h2>Una selección con intención</h2><p>Trabajamos con una edición breve para que cada pieza tenga espacio, contexto y atención. No presentamos datos que no han sido confirmados: materiales, medidas y disponibilidad se consultan de forma personalizada.</p></div>
        <div className="prose-image"><Image src={siteConfig.brand.monogramTerracotta} alt="Monograma principal de Solee Konn" fill sizes="(max-width: 800px) 100vw, 42vw" /></div>
        <div><h2>La experiencia</h2><p>Las imágenes originales son el centro del catálogo. Las vistas 3D son reconstrucciones visuales aproximadas para comprender el volumen, nunca sustitutos de una ficha técnica o un modelo de fabricación.</p></div>
      </div>
    </InfoPage>
  );
}

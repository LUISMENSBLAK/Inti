import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogExplorer } from "@/src/components/catalog-explorer";
import { getProducts } from "@/src/repositories/catalog-repository";

export const metadata: Metadata = { title: "Catálogo", description: "Explora todas las piezas de la Selección Inti." };

export default function CatalogPage() {
  return (
    <main>
      <section className="catalog-hero section-shell"><p className="eyebrow">Catálogo</p><h1>Una selección breve,<br />mirada de cerca.</h1><p>Busca por nombre, filtra por categoría y guarda tus piezas favoritas en este dispositivo.</p></section>
      <Suspense fallback={<div className="catalog-loading section-shell">Preparando la selección…</div>}><CatalogExplorer products={getProducts()} /></Suspense>
    </main>
  );
}

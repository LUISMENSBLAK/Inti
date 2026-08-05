"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/src/types/catalog";
import { ProductCard } from "./product-card";

type Sort = "featured" | "name-asc" | "new";

export function CatalogExplorer({ products }: { products: Product[] }) {
  const params = useSearchParams();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<Sort>("featured");
  const [favoritesOnly, setFavoritesOnly] = useState(params.get("favoritos") === "1");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    const update = () => {
      try {
        setFavorites(JSON.parse(localStorage.getItem("inti-favorites") ?? "[]"));
      } catch {
        setFavorites([]);
      }
    };
    update();
    window.addEventListener("inti:favorites", update);
    return () => window.removeEventListener("inti:favorites", update);
  }, []);

  const visible = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("es");
    return products
      .filter((product) => category === "all" || product.category === category)
      .filter((product) => !favoritesOnly || favorites.includes(product.id))
      .filter((product) =>
        [product.name, product.subtitle, product.shortDescription, product.color]
          .join(" ")
          .toLocaleLowerCase("es")
          .includes(normalized),
      )
      .sort((a, b) => {
        if (sort === "name-asc") return a.name.localeCompare(b.name, "es");
        if (sort === "new") return Number(b.isNew) - Number(a.isNew);
        return Number(b.featured) - Number(a.featured);
      });
  }, [category, favorites, favoritesOnly, products, query, sort]);

  return (
    <section className="catalog-explorer" aria-label="Explorar catálogo">
      <div className="catalog-toolbar">
        <label className="search-field">
          <span>Buscar piezas</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Nombre, color o detalle" />
        </label>
        <button className="filter-trigger" onClick={() => setDrawer(true)}>
          <SlidersHorizontal /> Filtros
        </button>
        <div className={drawer ? "filter-panel is-open" : "filter-panel"}>
          <button className="filter-close" onClick={() => setDrawer(false)} aria-label="Cerrar filtros"><X /></button>
          <label>
            Categoría
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              <option value="all">Todas</option>
              <option value="anillos">Anillos</option>
              <option value="dijes">Dijes</option>
            </select>
          </label>
          <label>
            Ordenar
            <select value={sort} onChange={(event) => setSort(event.target.value as Sort)}>
              <option value="featured">Destacados</option>
              <option value="new">Nuevos primero</option>
              <option value="name-asc">Nombre A–Z</option>
            </select>
          </label>
          <label className="check-field">
            <input type="checkbox" checked={favoritesOnly} onChange={(event) => setFavoritesOnly(event.target.checked)} />
            Solo favoritos
          </label>
        </div>
      </div>
      <div className="catalog-count" aria-live="polite">{visible.length} {visible.length === 1 ? "pieza" : "piezas"}</div>
      {visible.length ? (
        <div className="product-grid">{visible.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      ) : (
        <div className="empty-state">
          <p className="eyebrow">Sin coincidencias</p>
          <h2>No encontramos una pieza con esos filtros.</h2>
          <button onClick={() => { setQuery(""); setCategory("all"); setFavoritesOnly(false); }}>Ver todo el catálogo</button>
        </div>
      )}
    </section>
  );
}

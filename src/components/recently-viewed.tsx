"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/src/types/catalog";
import { ProductCard } from "./product-card";

export function RecentlyViewed({ products, currentId }: { products: Product[]; currentId?: string }) {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved: string[] = JSON.parse(localStorage.getItem("inti-recent") ?? "[]");
      const next = currentId ? [currentId, ...saved.filter((id) => id !== currentId)].slice(0, 4) : saved;
      if (currentId) localStorage.setItem("inti-recent", JSON.stringify(next));
      setIds(next);
    } catch {
      setIds([]);
    }
  }, [currentId]);

  const visible = useMemo(
    () => ids.filter((id) => id !== currentId).map((id) => products.find((product) => product.id === id)).filter((product): product is Product => Boolean(product)).slice(0, 3),
    [currentId, ids, products],
  );

  if (!visible.length) return null;
  return (
    <section className="recent-section section-shell">
      <div className="section-heading"><p className="eyebrow">Tu recorrido</p><h2>Vistos recientemente</h2></div>
      <div className="product-grid compact">{visible.map((product) => <ProductCard key={product.id} product={product} />)}</div>
    </section>
  );
}

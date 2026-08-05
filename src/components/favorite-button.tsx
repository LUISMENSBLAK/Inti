"use client";

import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

export function FavoriteButton({ productId, showLabel = false }: { productId: string; showLabel?: boolean }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    try {
      const saved: string[] = JSON.parse(localStorage.getItem("inti-favorites") ?? "[]");
      setActive(saved.includes(productId));
    } catch {
      setActive(false);
    }
  }, [productId]);

  function toggle() {
    const saved: string[] = JSON.parse(localStorage.getItem("inti-favorites") ?? "[]");
    const next = saved.includes(productId)
      ? saved.filter((id) => id !== productId)
      : [...saved, productId];
    localStorage.setItem("inti-favorites", JSON.stringify(next));
    setActive(next.includes(productId));
    window.dispatchEvent(new Event("inti:favorites"));
  }

  return (
    <button
      type="button"
      className={active ? "favorite-button is-active" : "favorite-button"}
      aria-pressed={active}
      aria-label={active ? "Quitar de favoritos" : "Guardar en favoritos"}
      onClick={toggle}
    >
      <Heart fill={active ? "currentColor" : "none"} />
      {showLabel && <span>{active ? "Guardado" : "Guardar"}</span>}
    </button>
  );
}

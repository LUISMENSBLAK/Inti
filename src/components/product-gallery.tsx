"use client";

import { ChevronLeft, ChevronRight, ImageOff, Maximize2, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ProductImage } from "@/src/types/catalog";
import { Image } from "./image";

export function ProductGallery({ images, name }: { images: ProductImage[]; name: string }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [startX, setStartX] = useState<number | null>(null);
  const [loaded, setLoaded] = useState<string[]>([]);
  const [failed, setFailed] = useState<string[]>([]);
  const closeRef = useRef<HTMLButtonElement>(null);
  const zoomTriggerRef = useRef<HTMLButtonElement>(null);
  const move = useCallback((direction: number) => setActive((current) => (current + direction + images.length) % images.length), [images.length]);

  useEffect(() => {
    if (!zoom) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setZoom(false); zoomTriggerRef.current?.focus(); }
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
      if (event.key === "Tab") { event.preventDefault(); closeRef.current?.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previous; document.removeEventListener("keydown", onKey); };
  }, [zoom, move]);

  function onPointerUp(event: React.PointerEvent) {
    if (startX === null) return;
    const delta = event.clientX - startX;
    if (Math.abs(delta) > 45) move(delta > 0 ? -1 : 1);
    setStartX(null);
  }

  const current = images[active];
  return (
    <div className="gallery">
      <div className={loaded.includes(current.src) ? "gallery-stage is-ready" : "gallery-stage"} onPointerDown={(event) => setStartX(event.clientX)} onPointerUp={onPointerUp}>
        {failed.includes(current.src) ? <div className="image-fallback" role="status"><ImageOff /><span>Esta fotografía no pudo cargarse.</span></div> : <Image className={loaded.includes(current.src) ? "is-loaded" : ""} src={current.src} alt={current.alt} fill priority sizes="(max-width: 900px) 100vw, 66vw" onLoad={() => setLoaded((items) => [...new Set([...items, current.src])])} onError={() => setFailed((items) => [...new Set([...items, current.src])])} />}
        <span className="perspective-label">{current.perspective}</span>
        <span className="gallery-count" aria-live="polite">{String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>
        <span className="gallery-progress" style={{ transform: `scaleX(${(active + 1) / images.length})` }} />
        <button ref={zoomTriggerRef} className="zoom-trigger" onClick={() => setZoom(true)} aria-label={`Ampliar ${name}`}><Maximize2 /></button>
        {images.length > 1 && <><button className="gallery-arrow previous" onClick={() => move(-1)} aria-label="Fotografía anterior"><ChevronLeft /></button><button className="gallery-arrow next" onClick={() => move(1)} aria-label="Fotografía siguiente"><ChevronRight /></button></>}
      </div>
      <div className="gallery-thumbs" role="tablist" aria-label="Vistas de la pieza">{images.map((image, index) => <button key={image.src} role="tab" aria-selected={active === index} className={active === index ? "is-active" : ""} onClick={() => setActive(index)}><Image src={image.src} alt="" fill sizes="88px" /><span>{image.perspective}</span></button>)}</div>
      {zoom && <div className="lightbox" role="dialog" aria-modal="true" aria-label={`Vista ampliada de ${name}`}><button ref={closeRef} className="lightbox-close" onClick={() => { setZoom(false); zoomTriggerRef.current?.focus(); }} aria-label="Cerrar vista ampliada"><X /></button><div className="lightbox-image">{failed.includes(current.src) ? <div className="image-fallback"><ImageOff /><span>Esta fotografía no pudo cargarse.</span></div> : <Image src={current.src} alt={current.alt} fill sizes="100vw" />}</div><span className="lightbox-counter">{active + 1} / {images.length}</span><button className="gallery-arrow previous" onClick={() => move(-1)} aria-label="Fotografía anterior"><ChevronLeft /></button><button className="gallery-arrow next" onClick={() => move(1)} aria-label="Fotografía siguiente"><ChevronRight /></button></div>}
    </div>
  );
}

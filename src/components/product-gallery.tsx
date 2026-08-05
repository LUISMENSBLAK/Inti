"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, ImageOff, Maximize2, X } from "lucide-react";
import { useState } from "react";
import type { ProductImage } from "@/src/types/catalog";

export function ProductGallery({ images, name }: { images: ProductImage[]; name: string }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [startX, setStartX] = useState<number | null>(null);
  const [loaded, setLoaded] = useState<string[]>([]);
  const [failed, setFailed] = useState<string[]>([]);

  function move(direction: number) {
    setActive((current) => (current + direction + images.length) % images.length);
  }

  function onPointerUp(event: React.PointerEvent) {
    if (startX === null) return;
    const delta = event.clientX - startX;
    if (Math.abs(delta) > 45) move(delta > 0 ? -1 : 1);
    setStartX(null);
  }

  return (
    <div className="gallery">
      <div className={loaded.includes(images[active].src) ? "gallery-stage is-ready" : "gallery-stage"} onPointerDown={(event) => setStartX(event.clientX)} onPointerUp={onPointerUp}>
        {failed.includes(images[active].src) ? (
          <div className="image-fallback" role="status"><ImageOff /><span>Esta fotografía no pudo cargarse.</span></div>
        ) : (
          <Image
            className={loaded.includes(images[active].src) ? "is-loaded" : ""}
            src={images[active].src}
            alt={images[active].alt}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 60vw"
            onLoad={() => setLoaded((items) => [...new Set([...items, images[active].src])])}
            onError={() => setFailed((items) => [...new Set([...items, images[active].src])])}
          />
        )}
        <span className="perspective-label">{images[active].perspective}</span>
        <button className="zoom-trigger" onClick={() => setZoom(true)} aria-label={`Ampliar ${name}`}><Maximize2 /></button>
        {images.length > 1 && (
          <>
            <button className="gallery-arrow previous" onClick={() => move(-1)} aria-label="Fotografía anterior"><ChevronLeft /></button>
            <button className="gallery-arrow next" onClick={() => move(1)} aria-label="Fotografía siguiente"><ChevronRight /></button>
          </>
        )}
      </div>
      <div className="gallery-thumbs" role="tablist" aria-label="Vistas de la pieza">
        {images.map((image, index) => (
          <button key={image.src} role="tab" aria-selected={active === index} className={active === index ? "is-active" : ""} onClick={() => setActive(index)}>
            <Image src={image.src} alt="" fill sizes="88px" />
            <span>{image.perspective}</span>
          </button>
        ))}
      </div>
      {zoom && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`Vista ampliada de ${name}`}>
          <button className="lightbox-close" onClick={() => setZoom(false)} aria-label="Cerrar vista ampliada"><X /></button>
          <div className="lightbox-image">
            {failed.includes(images[active].src) ? <div className="image-fallback"><ImageOff /><span>Esta fotografía no pudo cargarse.</span></div> : <Image src={images[active].src} alt={images[active].alt} fill sizes="100vw" />}
          </div>
          <button className="gallery-arrow previous" onClick={() => move(-1)} aria-label="Fotografía anterior"><ChevronLeft /></button>
          <button className="gallery-arrow next" onClick={() => move(1)} aria-label="Fotografía siguiente"><ChevronRight /></button>
        </div>
      )}
    </div>
  );
}

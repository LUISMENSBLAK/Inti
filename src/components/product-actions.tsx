"use client";

import { MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";
import { buildWhatsappUrl } from "@/src/config/site";
import { FavoriteButton } from "./favorite-button";

export function ProductActions({ productId, message }: { productId: string; message: string }) {
  const [shared, setShared] = useState(false);

  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ url });
    } else {
      await navigator.clipboard.writeText(url);
      setShared(true);
      window.setTimeout(() => setShared(false), 1800);
    }
  }

  function openWhatsapp() {
    const finalMessage = message.replace("[URL DEL PRODUCTO]", window.location.href);
    window.open(buildWhatsappUrl(finalMessage), "_blank", "noopener,noreferrer");
  }

  return (
    <div className="product-actions">
      <button className="whatsapp-button" onClick={openWhatsapp}><MessageCircle /> Solicitar información por WhatsApp</button>
      <div>
        <FavoriteButton productId={productId} showLabel />
        <button className="share-button" onClick={share}><Share2 /> {shared ? "Enlace copiado" : "Compartir"}</button>
      </div>
    </div>
  );
}

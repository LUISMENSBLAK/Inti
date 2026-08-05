"use client";

import { Share2 } from "lucide-react";
import { useState } from "react";
import { buildWhatsAppUrl } from "@/src/config/site";
import { FavoriteButton } from "./favorite-button";
import { WhatsAppIcon } from "./whatsapp-icon";

export function ProductActions({ productId, message }: { productId: string; message: string }) {
  const [shared, setShared] = useState(false);
  async function share() {
    const url = window.location.href;
    if (navigator.share) await navigator.share({ url });
    else { await navigator.clipboard.writeText(url); setShared(true); window.setTimeout(() => setShared(false), 1800); }
  }
  function openWhatsApp() {
    const finalMessage = message.replace("[URL DEL PRODUCTO]", window.location.href);
    window.open(buildWhatsAppUrl(finalMessage), "_blank", "noopener,noreferrer");
  }
  return (
    <div className="product-actions">
      <button className="whatsapp-button" onClick={openWhatsApp}><WhatsAppIcon /> Solicitar información por WhatsApp</button>
      <div><FavoriteButton productId={productId} showLabel /><button className="share-button" onClick={share}><Share2 /> {shared ? "Enlace copiado" : "Compartir"}</button></div>
    </div>
  );
}

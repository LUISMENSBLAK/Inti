"use client";

import { useEffect, useState } from "react";
import { buildWhatsAppUrl } from "@/src/config/site";
import { WhatsAppIcon } from "./whatsapp-icon";

export function WhatsAppFab() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <a className={visible ? "whatsapp-fab is-visible" : "whatsapp-fab"} href={buildWhatsAppUrl()} target="_blank" rel="noreferrer" aria-label="Conversar con Solee Konn por WhatsApp">
      <WhatsAppIcon size={25} />
      <span>WhatsApp</span>
    </a>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { buildWhatsAppUrl, siteConfig } from "@/src/config/site";
import { BrandMark } from "./brand-mark";
import { WhatsAppIcon } from "./whatsapp-icon";

const focusable = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [favorites, setFavorites] = useState(0);
  const panelRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 48);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const update = () => {
      try { setFavorites(JSON.parse(localStorage.getItem("sk:favorites") ?? "[]").length); }
      catch { setFavorites(0); }
    };
    update();
    window.addEventListener("sk:favorites", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("sk:favorites", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const priorOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    const nodes = Array.from(panel?.querySelectorAll<HTMLElement>(focusable) ?? []);
    const focusTimer = window.setTimeout(() => firstLinkRef.current?.focus(), 80);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); triggerRef.current?.focus(); }
      if (event.key === "Tab" && nodes.length) {
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { window.clearTimeout(focusTimer); document.body.style.overflow = priorOverflow; document.removeEventListener("keydown", onKey); };
  }, [open]);

  const onHero = pathname === "/" && !scrolled && !open;
  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}${onHero ? " is-over-hero" : ""}`}>
      <div className="header-inner">
        <button ref={triggerRef} className="icon-button menu-trigger" aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((value) => !value)}>
          {open ? <X /> : <Menu />}
        </button>
        <Link href="/" className="brand-lockup" aria-label="Solee Konn, inicio"><BrandMark tone={onHero ? "light" : "dark"} /></Link>
        <nav className="desktop-nav" aria-label="Navegación principal">
          {siteConfig.navigation.map((link) => <Link key={link.href} className={pathname === link.href ? "is-active" : ""} href={link.href}>{link.label}</Link>)}
        </nav>
        <div className="header-actions">
          <Link href="/catalogo" className="icon-button" aria-label="Buscar en el catálogo"><Search /></Link>
          <Link href="/catalogo?favoritos=1" className="favorite-nav" aria-label={`${favorites} favoritos`}><Heart /><span>{favorites}</span></Link>
        </div>
      </div>
      <nav ref={panelRef} id="mobile-menu" className={open ? "mobile-menu is-open" : "mobile-menu"} aria-label="Menú principal" aria-hidden={!open}>
        <span className="mobile-menu-monogram" aria-hidden="true">SK</span>
        <div className="mobile-menu-links">
          {siteConfig.navigation.map((link, index) => <Link ref={index === 0 ? firstLinkRef : undefined} key={link.href} tabIndex={open ? 0 : -1} href={link.href} onClick={() => setOpen(false)}><span>0{index + 1}</span>{link.label}</Link>)}
          <Link tabIndex={open ? 0 : -1} href="/contacto" onClick={() => setOpen(false)}><span>05</span>Contacto</Link>
        </div>
        <a tabIndex={open ? 0 : -1} className="mobile-whatsapp" href={buildWhatsAppUrl()} target="_blank" rel="noreferrer"><WhatsAppIcon /> Conversar por WhatsApp</a>
      </nav>
    </header>
  );
}

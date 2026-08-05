"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { href: "/catalogo", label: "Catálogo" },
  { href: "/colecciones/seleccion-inti", label: "Colección" },
  { href: "/categorias/anillos", label: "Anillos" },
  { href: "/categorias/dijes", label: "Dijes" },
  { href: "/nosotros", label: "Nosotros" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [favorites, setFavorites] = useState(0);

  useEffect(() => {
    const update = () => {
      try {
        setFavorites(JSON.parse(localStorage.getItem("inti-favorites") ?? "[]").length);
      } catch {
        setFavorites(0);
      }
    };
    update();
    window.addEventListener("inti:favorites", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("inti:favorites", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  return (
    <header className="site-header">
      <div className="header-inner">
        <button
          className="icon-button menu-trigger"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <Link href="/" className="brand-lockup" aria-label="Inti Joyería, inicio">
          <Image src="/brand/logo-primary.avif" alt="" width={46} height={46} priority />
          <span>INTI</span>
        </Link>
        <nav className={open ? "main-nav is-open" : "main-nav"} aria-label="Navegación principal">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link href="/catalogo" className="icon-button" aria-label="Buscar en el catálogo">
            <Search />
          </Link>
          <Link href="/catalogo?favoritos=1" className="favorite-nav" aria-label={`${favorites} favoritos`}>
            <Heart />
            <span>{favorites}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

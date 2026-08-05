import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-mark">
        <Image src="/brand/symbol-secondary.avif" alt="Símbolo de Inti Joyería" width={88} height={88} />
        <p>Piezas que guardan una historia.</p>
      </div>
      <div className="footer-links">
        <div>
          <p className="footer-heading">Descubrir</p>
          <Link href="/catalogo">Catálogo</Link>
          <Link href="/colecciones/seleccion-inti">Selección Inti</Link>
          <Link href="/cuidados">Cuidados</Link>
        </div>
        <div>
          <p className="footer-heading">Atención</p>
          <Link href="/contacto">Contacto</Link>
          <Link href="/preguntas-frecuentes">Preguntas frecuentes</Link>
          <Link href="/envios">Envíos</Link>
        </div>
        <div>
          <p className="footer-heading">La casa</p>
          <Link href="/nosotros">Nosotros</Link>
          <Link href="/privacidad">Aviso de privacidad</Link>
        </div>
      </div>
      <div className="footer-base">
        <span>© {new Date().getFullYear()} Inti Joyería</span>
        <span>Boutique digital · México</span>
      </div>
    </footer>
  );
}

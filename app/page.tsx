import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/src/components/product-card";
import { RecentlyViewed } from "@/src/components/recently-viewed";
import { getFeaturedProducts, getProducts } from "@/src/repositories/catalog-repository";

export default function Home() {
  const featured = getFeaturedProducts();
  const products = getProducts();
  return (
    <main>
      <section className="home-hero">
        <div className="hero-copy">
          <p className="eyebrow">Selección Inti · Edición actual</p>
          <h1>Piezas que guardan una historia.</h1>
          <p>Joyería de carácter íntimo, contada a través del color, la forma y la luz.</p>
          <Link className="primary-link" href="/catalogo">Descubrir el catálogo <ArrowRight /></Link>
        </div>
        <div className="hero-image">
          <Image src="/products/anillo-zafiro-azul/frontal.avif" alt="Anillo con piedra azul de la Selección Inti" fill priority sizes="(max-width: 800px) 100vw, 62vw" />
          <span className="hero-number">01 / 04</span>
        </div>
        <div className="hero-monogram" aria-hidden="true">I</div>
      </section>

      <section className="manifesto section-shell">
        <p className="eyebrow">Una boutique pausada</p>
        <h2>Mirar de cerca.<br />Elegir con intención.</h2>
        <p>Cada pieza se presenta sin prisa: múltiples perspectivas, detalle macro y una reconstrucción 3D para comprender mejor su silueta.</p>
      </section>

      <section className="featured-section section-shell">
        <div className="section-heading split">
          <div><p className="eyebrow">Selección editorial</p><h2>Piezas protagonistas</h2></div>
          <Link className="text-link" href="/catalogo">Ver todas <ArrowRight /></Link>
        </div>
        <div className="product-grid">{featured.map((product, index) => <ProductCard key={product.id} product={product} priority={index < 2} />)}</div>
      </section>

      <section className="collection-feature">
        <div className="collection-actual-image"><Image src="/products/anillo-piedras-rosas/frontal.avif" alt="Anillo dorado con una secuencia de piedras rosas y lilas" fill sizes="(max-width: 800px) 100vw, 52vw" /></div>
        <div className="collection-copy">
          <p className="eyebrow">La edición actual</p>
          <h2>Selección Inti</h2>
          <p>Cuatro piezas, cuatro maneras de habitar el color: del azul profundo al rosa, del símbolo al gesto esencial.</p>
          <Link className="primary-link dark" href="/colecciones/seleccion-inti">Conocer la colección <ArrowRight /></Link>
        </div>
      </section>

      <section className="craft-section section-shell">
        <div className="craft-copy">
          <p className="eyebrow">El valor del detalle</p>
          <h2>Una mirada cercana a cada forma.</h2>
          <p>La galería conserva las perspectivas disponibles de cada pieza y permite ampliarlas sin perder el protagonismo de la fotografía.</p>
          <Link className="text-link" href="/cuidados">Cómo cuidar tus piezas</Link>
        </div>
        <div className="craft-image"><Image src="/products/anillo-zafiro-azul/detalle.avif" alt="Detalle macro de una piedra azul ovalada" fill sizes="(max-width: 800px) 100vw, 55vw" /></div>
      </section>

      <section className="personal-service section-shell">
        <Image src="/brand/logo-primary.avif" alt="" width={170} height={170} />
        <div><p className="eyebrow">Atención personalizada</p><h2>Una conversación antes de elegir.</h2><p>Consulta disponibilidad, precio, materiales y opciones de envío directamente por WhatsApp.</p></div>
        <Link className="primary-link" href="/contacto">Hablar con Inti <ArrowRight /></Link>
      </section>

      <RecentlyViewed products={products} />
    </main>
  );
}

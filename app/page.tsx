import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { ModelViewer } from "@/src/components/model-viewer";
import { Image } from "@/src/components/image";
import { ProductCard } from "@/src/components/product-card";
import { RecentlyViewed } from "@/src/components/recently-viewed";
import { Reveal } from "@/src/components/reveal";
import { WhatsAppIcon } from "@/src/components/whatsapp-icon";
import { buildWhatsAppUrl, siteConfig } from "@/src/config/site";
import { getProducts } from "@/src/repositories/catalog-repository";

export default function Home() {
  const products = getProducts();
  const featured = products;
  const flagship = products[0];
  return (
    <main>
      <section className="home-hero">
        <div className="hero-ghost" aria-hidden="true">SK</div>
        <div className="hero-image"><Image src={flagship.mainImage} alt="Anillo de metal dorado con piedra azul ovalada" fill priority sizes="(max-width: 800px) 100vw, 72vw" /></div>
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow light">Colección 01 · Edición Primera</p>
          <h1>La forma íntima<br />del lujo.</h1>
          <p>Joyería de presencia serena, donde el color y la precisión encuentran su propia luz.</p>
          <div className="hero-actions"><Link className="primary-link light" href="/catalogo">Descubrir las piezas <ArrowRight /></Link><a className="quiet-link" href={buildWhatsAppUrl()} target="_blank" rel="noreferrer"><WhatsAppIcon /> Atención personal</a></div>
        </div>
        <span className="hero-number">01 <i /> 04</span>
        <a className="scroll-cue" href="#manifiesto"><span>Descender</span><ArrowDown /></a>
      </section>

      <section id="manifiesto" className="manifesto section-shell">
        <Reveal><p className="eyebrow">La casa</p><h2>La belleza aparece<br />{" "}cuando nada sobra.</h2></Reveal>
        <Reveal className="manifesto-note" delay={0.1}><p>Solee Konn nace de una mirada precisa: observar una forma hasta encontrar su gesto esencial. Cada pieza se presenta con tiempo, cercanía y una atención profundamente personal.</p><span>Forma · Materia · Presencia</span></Reveal>
      </section>

      <section className="flagship section-shell">
        <Reveal className="flagship-image"><Image src="/products/anillo-zafiro-azul/detalle.avif" alt="Detalle macro del zafiro azul y su engaste dorado" fill sizes="(max-width: 800px) 100vw, 58vw" /></Reveal>
        <Reveal className="flagship-copy" delay={0.12}><p className="eyebrow">Pieza 01</p><h2>{flagship.name}</h2><p>{flagship.description}</p><Link className="text-link" href={`/joyas/${flagship.slug}`}>Descubrir la pieza <ArrowRight /></Link></Reveal>
      </section>

      <section className="editorial-selection section-shell">
        <div className="section-heading"><Reveal><p className="eyebrow">Selección editorial</p><h2>Cuatro presencias.<br />Una misma intención.</h2></Reveal><Link className="text-link" href="/catalogo">Ver todas <ArrowRight /></Link></div>
        <div className="editorial-grid">{featured.map((product, index) => <ProductCard key={product.id} product={product} priority={index < 2} index={index} />)}</div>
      </section>

      <section className="macro-story">
        <div className="macro-image"><Image src="/products/anillo-solitario/detalle-grabado.avif" alt="Detalle interior del anillo solitario sobre fondo oscuro" fill sizes="100vw" /></div>
        <Reveal className="macro-copy"><p className="eyebrow light">Lo que se revela de cerca</p><h2>La precisión también<br />puede sentirse.</h2><p>Superficies, engastes y perfiles se observan sin distancia. La fotografía conserva lo que hace singular a cada pieza.</p></Reveal>
      </section>

      <section className="collection-feature section-shell">
        <Reveal className="collection-copy"><p className="eyebrow">Colección 01</p><h2>Edición<br />Primera</h2><p>Una selección breve unida por el color, la proporción y una interpretación contemporánea del gesto clásico.</p><Link className="primary-link" href="/colecciones/edicion-primera">Entrar a la colección <ArrowRight /></Link></Reveal>
        <Reveal className="collection-image" delay={0.1}><Image src="/products/anillo-piedras-rosas/frontal.avif" alt="Anillo dorado con cinco piedras rosas y lilas" fill sizes="(max-width: 800px) 100vw, 54vw" /><span>Color como lenguaje</span></Reveal>
      </section>

      <section className="house-story section-shell">
        <Reveal><p className="eyebrow">Una historia en construcción</p><h2>Una casa joven.<br />Una mirada definida.</h2></Reveal>
        <Reveal delay={0.12}><p>Nuestra historia comienza con una convicción: la joyería más significativa no necesita imponerse. Habla desde la proporción, el detalle y la relación que cada persona crea con ella.</p><Link className="text-link" href="/nosotros">Conocer la mirada de la casa <ArrowRight /></Link></Reveal>
      </section>

      <section className="home-3d section-shell">
        <div className="section-heading"><Reveal><p className="eyebrow">Volumen digital</p><h2>Observar desde<br />cada ángulo.</h2></Reveal><p>Una reconstrucción aproximada permite comprender la silueta antes de iniciar una conversación personal.</p></div>
        <ModelViewer src={flagship.model3D} poster={flagship.poster3D} name={flagship.name} />
      </section>

      <section className="concierge section-shell">
        <Image src={siteConfig.brand.signatureTerracotta} alt="" width={170} height={170} />
        <Reveal><p className="eyebrow">Atención personal</p><h2>Elegir una joya<br />también es conversar.</h2><p>Consulte disponibilidad, precio, materiales y opciones de envío directamente con la casa.</p></Reveal>
        <a className="whatsapp-button" href={buildWhatsAppUrl()} target="_blank" rel="noreferrer"><WhatsAppIcon /> Conversar por WhatsApp</a>
      </section>

      <section className="care-teaser section-shell">
        <div><p className="eyebrow">El gesto que permanece</p><h2>Cuidar una pieza<br />es continuar su historia.</h2></div>
        <div><p>Pequeños hábitos conservan la luz, el acabado y la presencia de cada joya.</p><Link className="text-link" href="/cuidados">Guía de cuidados <ArrowRight /></Link></div>
      </section>
      <RecentlyViewed products={products} />
    </main>
  );
}

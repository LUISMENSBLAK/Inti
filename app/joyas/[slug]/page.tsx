import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ModelViewer } from "@/src/components/model-viewer";
import { ProductActions } from "@/src/components/product-actions";
import { ProductCard } from "@/src/components/product-card";
import { ProductGallery } from "@/src/components/product-gallery";
import { RecentlyViewed } from "@/src/components/recently-viewed";
import { siteConfig } from "@/src/config/site";
import { getProductBySlug, getProducts } from "@/src/repositories/catalog-repository";

export function generateStaticParams() { return getProducts().map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const product = getProductBySlug((await params).slug);
  if (!product) return {};
  return {
    title: product.seoTitle,
    description: product.seoDescription,
    alternates: { canonical: `/joyas/${product.slug}` },
    openGraph: { title: product.seoTitle, description: product.seoDescription, images: [product.mainImage] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = getProductBySlug((await params).slug);
  if (!product) notFound();
  const allProducts = getProducts();
  const related = allProducts.filter((item) => item.id !== product.id && item.category === product.category).slice(0, 3);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images.map((image) => `${siteConfig.url}${image.src}`),
    description: product.seoDescription,
    sku: product.id,
    brand: { "@type": "Brand", name: siteConfig.name },
  };
  return (
    <main>
      <nav className="breadcrumbs section-shell" aria-label="Migas de pan"><Link href="/">Inicio</Link><span>/</span><Link href="/catalogo">Catálogo</Link><span>/</span><span>{product.name}</span></nav>
      <section className="product-detail section-shell">
        <ProductGallery images={product.images} name={product.name} />
        <div className="product-summary">
          <p className="eyebrow">Selección Inti · {product.id}</p>
          <h1>{product.name}</h1>
          <p className="product-subtitle">{product.subtitle}</p>
          <p className="product-description">{product.description}</p>
          <div className="product-status"><span>{product.priceLabel}</span><span>{product.availabilityLabel}</span></div>
          <ProductActions productId={product.id} message={product.whatsappMessage} />
          <dl className="product-specs">
            <div><dt>Material</dt><dd>{product.material}</dd></div>
            <div><dt>Piedras</dt><dd>{product.stone}</dd></div>
            <div><dt>Color</dt><dd>{product.color}</dd></div>
            <div><dt>Dimensiones</dt><dd>{product.dimensions}</dd></div>
          </dl>
        </div>
      </section>
      <section className="model-section section-shell">
        <div className="section-heading model-heading"><p className="eyebrow">Comprender la forma</p><h2>Explora la pieza en 3D</h2><p>Gira, acerca y restablece la vista. La reconstrucción traduce las perspectivas disponibles a un objeto tridimensional ligero.</p></div>
        <ModelViewer src={product.model3D} poster={product.poster3D} name={product.name} />
      </section>
      <section className="care-note section-shell"><p className="eyebrow">Cuidados</p><h2>Conservar su luz.</h2><p>{product.care}</p><Link className="text-link" href="/cuidados">Ver guía completa</Link></section>
      {related.length > 0 && <section className="related-section section-shell"><div className="section-heading"><p className="eyebrow">También puede interesarte</p><h2>Piezas relacionadas</h2></div><div className="product-grid compact">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div></section>}
      <RecentlyViewed products={allProducts} currentId={product.id} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </main>
  );
}

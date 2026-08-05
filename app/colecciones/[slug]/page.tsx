import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCard } from "@/src/components/product-card";
import { Image } from "@/src/components/image";
import { getCollectionBySlug, getCollections, getProductsByCollection } from "@/src/repositories/catalog-repository";

export function generateStaticParams() { return getCollections().map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const collection = getCollectionBySlug((await params).slug);
  return collection ? { title: collection.name, description: collection.description } : {};
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) notFound();
  const products = getProductsByCollection(slug);
  return (
    <main>
      <section className="collection-hero">
        <div><p className="eyebrow">{collection.eyebrow}</p><h1>{collection.name}</h1><p>{collection.description}</p></div>
        <div><Image src={collection.image} alt="Anillo protagonista de Edición Primera" fill priority sizes="(max-width: 800px) 100vw, 55vw" /></div>
      </section>
      <section className="section-shell collection-list"><div className="section-heading"><p className="eyebrow">{products.length} piezas</p><h2>La selección completa</h2></div><div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div></section>
    </main>
  );
}

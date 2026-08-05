import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCard } from "@/src/components/product-card";
import { getCategories, getCategoryBySlug, getProductsByCategory } from "@/src/repositories/catalog-repository";

export function generateStaticParams() { return getCategories().map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const category = getCategoryBySlug((await params).slug);
  return category ? { title: category.name, description: category.description } : {};
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();
  const products = getProductsByCategory(slug);
  return (
    <main>
      <section className="catalog-hero section-shell"><p className="eyebrow">Categoría</p><h1>{category.name}</h1><p>{category.description}</p></section>
      <section className="section-shell collection-list"><div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div></section>
    </main>
  );
}

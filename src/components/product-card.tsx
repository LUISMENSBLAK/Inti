import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/src/types/catalog";
import { FavoriteButton } from "./favorite-button";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const secondary = product.images[1]?.src ?? product.mainImage;
  return (
    <article className="product-card">
      <Link href={`/joyas/${product.slug}`} className="product-card-image" aria-label={`Ver ${product.name}`}>
        <Image className="primary-image" src={product.mainImage} alt={product.images[0].alt} fill sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw" priority={priority} />
        <Image className="secondary-image" src={secondary} alt="" fill sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw" />
        {product.isNew && <span className="product-badge">Nuevo</span>}
      </Link>
      <div className="product-card-copy">
        <div>
          <p>{product.category === "anillos" ? "Anillo" : "Dije"}</p>
          <h3><Link href={`/joyas/${product.slug}`}>{product.name}</Link></h3>
          <span>{product.priceLabel}</span>
        </div>
        <FavoriteButton productId={product.id} />
      </div>
    </article>
  );
}

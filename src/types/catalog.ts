export type ProductImage = {
  src: string;
  alt: string;
  perspective: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: "anillos" | "dijes";
  collection: "seleccion-inti";
  shortDescription: string;
  description: string;
  material: string;
  stone: string;
  color: string;
  dimensions: string;
  care: string;
  priceLabel: string;
  availabilityLabel: string;
  featured: boolean;
  isNew: boolean;
  images: ProductImage[];
  mainImage: string;
  model3D: string;
  poster3D: string;
  whatsappMessage: string;
  seoTitle: string;
  seoDescription: string;
};

export type Collection = {
  slug: string;
  name: string;
  eyebrow: string;
  description: string;
  image: string;
};

export type Category = {
  slug: Product["category"];
  name: string;
  description: string;
};

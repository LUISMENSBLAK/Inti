import type { MetadataRoute } from "next";
import { siteConfig } from "@/src/config/site";
import { getCategories, getCollections, getProducts } from "@/src/repositories/catalog-repository";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/catalogo", "/nosotros", "/contacto", "/cuidados", "/preguntas-frecuentes", "/envios", "/privacidad"];
  return [
    ...staticRoutes.map((route) => ({ url: `${siteConfig.url}${route}`, changeFrequency: "monthly" as const, priority: route === "" ? 1 : 0.7 })),
    ...getProducts().map((product) => ({ url: `${siteConfig.url}/joyas/${product.slug}`, changeFrequency: "weekly" as const, priority: 0.9 })),
    ...getCollections().map((collection) => ({ url: `${siteConfig.url}/colecciones/${collection.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...getCategories().map((category) => ({ url: `${siteConfig.url}/categorias/${category.slug}`, changeFrequency: "monthly" as const, priority: 0.75 })),
  ];
}

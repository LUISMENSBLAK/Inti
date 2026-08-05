import { categories } from "@/src/data/categories";
import { collections } from "@/src/data/collections";
import { products } from "@/src/data/products";

export function getProducts() {
  return products;
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getFeaturedProducts() {
  return products.filter((product) => product.featured);
}

export function getNewProducts() {
  return products.filter((product) => product.isNew);
}

export function getProductsByCategory(category: string) {
  return products.filter((product) => product.category === category);
}

export function getProductsByCollection(collection: string) {
  return products.filter((product) => product.collection === collection);
}

export function getCollections() {
  return collections;
}

export function getCollectionBySlug(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}

export function getCategories() {
  return categories;
}

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

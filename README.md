# Inti Joyería

Boutique digital estática construida con Next.js, TypeScript y vinext. La primera
etapa contiene únicamente datos locales: no usa base de datos, autenticación,
pagos, formularios ni servicios simulados.

## Uso local

```bash
npm install
npm run dev
npm run build
```

## Contenido

- `src/data/products.ts`: fichas locales de las piezas.
- `src/data/collections.ts`: colecciones locales.
- `src/data/categories.ts`: categorías locales.
- `src/config/site.ts`: marca y número de WhatsApp configurable.
- `src/repositories/catalog-repository.ts`: única capa de acceso al catálogo.
- `public/products/`: fotografías originales organizadas, versiones AVIF y GLB.

## Preparación para la segunda etapa

Cuando se incorpore un origen remoto, la implementación puede sustituirse dentro
de `src/repositories/catalog-repository.ts` conservando funciones como
`getProducts()`, `getProductBySlug()` y `getCollections()`. Los componentes no
dependen del archivo de datos concreto. No se ha instalado ni configurado
Supabase, Firebase ni otra base de datos.

Antes de publicar para atención comercial, configura el número real con código
de país en `src/config/site.ts`.

# Solee Konn

Experiencia editorial estática para una casa de alta joyería. Presenta cuatro piezas con fotografía original, consulta centralizada por WhatsApp y modelos 3D cargados bajo demanda.

## Desarrollo

```bash
npm install
npm run brand:assets
npm run dev
```

## Verificación

```bash
npm run lint
npx tsc --noEmit
npm run build
```

El origen canónico se configura con `NEXT_PUBLIC_SITE_URL`. Los datos de producto viven en `src/data` y la configuración pública de contacto en `src/config/site.ts`.

export const siteConfig = {
  name: "Solee Konn",
  displayName: "SOLEE KONN",
  description:
    "Alta joyería de presencia íntima: formas precisas, color y luz en una experiencia editorial.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "es_MX",
  currency: "MXN",
  whatsappDisplay: "+52 55 4050 2681",
  whatsappNumber: "525540502681",
  whatsappMessage: "Hola Solee Konn, me gustaría recibir atención personalizada.",
  email: "",
  instagram: "",
  city: "México",
  hours: "Lunes a sábado · 10:00–19:00 h (hora del centro de México)",
  navigation: [
    { href: "/catalogo", label: "Piezas" },
    { href: "/colecciones/edicion-primera", label: "Colección" },
    { href: "/nosotros", label: "La casa" },
    { href: "/cuidados", label: "Cuidados" },
  ],
  brand: {
    monogramTerracotta: "/brand/solee-konn-monogram-terracotta.png",
    monogramIvory: "/brand/solee-konn-monogram-ivory.png",
    signatureTerracotta: "/brand/solee-konn-signature-terracotta.png",
    signatureIvory: "/brand/solee-konn-signature-ivory.png",
  },
} as const;

export function buildWhatsAppUrl(message: string = siteConfig.whatsappMessage) {
  const recipient = siteConfig.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${recipient}?text=${encodeURIComponent(message)}`;
}

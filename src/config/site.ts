export const siteConfig = {
  name: "Inti Joyería",
  shortName: "Inti",
  description:
    "Boutique digital de joyería: piezas de carácter, fotografía de detalle y atención personalizada.",
  url: "https://inti-joyeria.sites.openai.com",
  locale: "es_MX",
  whatsappNumber: "",
  email: "contacto@inti-joyeria.mx",
  instagram: "@inti.joyeria",
  city: "México",
} as const;

export function buildWhatsappUrl(message: string) {
  const recipient = siteConfig.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${recipient ? recipient : ""}?text=${encodeURIComponent(message)}`;
}

import Link from "next/link";
import { Image } from "@/src/components/image";

export default function NotFound() {
  return (
    <main className="not-found section-shell">
      <Image src="/brand/solee-konn-signature-terracotta.png" alt="" width={110} height={110} />
      <p className="eyebrow">Error 404</p>
      <h1>Esta pieza no está en la selección.</h1>
      <p>La página cambió de lugar o ya no está disponible.</p>
      <Link className="primary-link" href="/catalogo">Volver al catálogo</Link>
    </main>
  );
}

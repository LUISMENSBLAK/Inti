import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found section-shell">
      <Image src="/brand/symbol-secondary.avif" alt="" width={110} height={110} />
      <p className="eyebrow">Error 404</p>
      <h1>Esta pieza no está en la selección.</h1>
      <p>La página cambió de lugar o ya no está disponible.</p>
      <Link className="primary-link" href="/catalogo">Volver al catálogo</Link>
    </main>
  );
}

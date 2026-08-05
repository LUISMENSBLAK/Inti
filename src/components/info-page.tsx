import Link from "next/link";

export function InfoPage({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: React.ReactNode }) {
  return (
    <main>
      <section className="info-hero section-shell">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{intro}</p>
      </section>
      <section className="prose-section section-shell">{children}</section>
      <section className="info-cta section-shell">
        <p className="eyebrow">Atención personal</p>
        <h2>Conversemos sobre la pieza que te acompaña.</h2>
        <Link className="text-link" href="/contacto">Contactar a Inti</Link>
      </section>
    </main>
  );
}

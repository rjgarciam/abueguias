import { GuideCard } from "@/components/collection/GuideCard";
import { publicGuides } from "@/lib/guides/registry";

export default function CatalogPage() {
  return (
    <main id="contenido" className="catalog-shell">
      <header className="catalog-intro">
        <p className="eyebrow">Una pequeña biblioteca para aprender con calma</p>
        <h1>abueguias</h1>
        <p className="lede">Guías prácticas, claras y sin prisas. Elige una y avanza a tu manera.</p>
      </header>
      <section aria-labelledby="guias-disponibles">
        <h2 id="guias-disponibles">Guías</h2>
        <div className="guide-grid">
          {publicGuides.map((guide) => <GuideCard key={guide.id} guide={guide} />)}
        </div>
      </section>
      <footer className="site-footer"><p>Tu avance se guarda solo en este navegador. No necesitas una cuenta.</p></footer>
    </main>
  );
}

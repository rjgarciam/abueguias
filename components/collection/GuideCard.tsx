import Link from "next/link";
import type { Guide } from "@/lib/guides/types";

export function GuideCard({ guide }: { guide: Guide }) {
  const published = guide.status === "published";
  return (
    <article className="guide-card" style={{ "--accent": guide.accent } as React.CSSProperties}>
      <p className="status-label">{published ? "Publicada" : "En preparación"}</p>
      <h3>{guide.title}</h3><p>{guide.summary}</p>
      {published ? <Link className="card-link" href={`/guias/${guide.slug}/`}>Abrir la guía <span aria-hidden="true">→</span></Link> : <p className="muted">Disponible próximamente</p>}
    </article>
  );
}

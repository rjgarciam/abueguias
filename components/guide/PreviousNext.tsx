import Link from "next/link";
import type { Guide, GuideUnit } from "@/lib/guides/types";

export function PreviousNext({ guide, unit }: { guide: Guide; unit: GuideUnit }) {
  const published = guide.navigation.filter((item) => item.status === "published");
  const index = published.findIndex((item) => item.id === unit.id);
  const previous = published[index - 1]; const next = published[index + 1];
  const href = (item: GuideUnit) => `/guias/${guide.slug}/${item.path.join("/")}/`;
  return <nav className="previous-next" aria-label="Navegación entre lecturas"><div>{previous && <><span>Anterior</span><Link href={href(previous)}>{previous.title}</Link></>}</div><div className="next-link">{next ? <><span>Siguiente</span><Link href={href(next)}>{next.title}</Link></> : <><span>Has llegado al final disponible</span><Link href={`/guias/${guide.slug}/`}>Volver al índice</Link></>}</div></nav>;
}

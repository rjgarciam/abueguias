import Link from "next/link";
import type { Guide } from "@/lib/guides/types";

export function GuideHeader({ guide }: { guide: Guide }) {
  return <header className="guide-header"><Link href="/" className="brand-link">abueguias</Link><Link href={`/guias/${guide.slug}/`} className="guide-name">{guide.title}</Link><Link href={`/guias/${guide.slug}/botiquin/`} className="kit-link">Abrir el Botiquín</Link></header>;
}

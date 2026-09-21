import Link from "next/link";
import type { Guide } from "@/lib/guides/types";
import { GuideHeader } from "./GuideHeader";
import { GuideToc } from "./GuideToc";
import { ProgressSummary } from "./ProgressControl";
import { withoutComponents } from "@/lib/guides/serialize";

export function GuideHome({ guide }: { guide: Guide }) {
  const first = guide.navigation.find((unit) => unit.status === "published");
  return <div style={{ "--accent": guide.accent } as React.CSSProperties}><GuideHeader guide={guide}/><main id="contenido"><section className="guide-cover"><div><p className="eyebrow">{guide.cover.eyebrow}</p><h1>{guide.title}</h1><p className="lede">{guide.cover.promise}</p>{first && <Link className="button-link" href={`/guias/${guide.slug}/${first.path.join("/")}/`}>Empezar por la introducción</Link>}</div><div className="cover-mark" aria-hidden="true"><span>IA</span><span>sin</span><span>miedo</span></div></section><section className="guide-overview"><div><p className="eyebrow">Tu recorrido</p><h2>Índice de la guía</h2><p>Los dos primeros capítulos ya están listos. Los demás muestran el camino que seguirá la guía.</p></div><GuideToc guide={guide}/><ProgressSummary guide={withoutComponents(guide)}/></section></main></div>;
}

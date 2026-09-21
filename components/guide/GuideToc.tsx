import Link from "next/link";
import type { Guide } from "@/lib/guides/types";

export function GuideToc({ guide }: { guide: Guide }) {
  return <ol className="toc-list">{guide.navigation.filter((unit) => unit.kind !== "kit").map((unit) => <li key={unit.id} className={unit.status === "coming-soon" ? "is-upcoming" : ""}><span className="toc-number">{unit.kind === "introduction" ? "Inicio" : unit.order}</span><div>{unit.status === "published" ? <Link href={`/guias/${guide.slug}/${unit.path.join("/")}/`}>{unit.title}</Link> : <span>{unit.title}</span>}<p>{unit.description}</p>{unit.status === "coming-soon" && <small>En preparación</small>}</div></li>)}</ol>;
}

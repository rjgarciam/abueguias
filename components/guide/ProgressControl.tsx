"use client";

import { useEffect, useState } from "react";
import type { Guide, GuideUnit } from "@/lib/guides/types";
import { progressKey, readProgress, writeProgress } from "@/lib/progress";

function useGuideProgress(guide: Guide) {
  const key = progressKey(guide.id, guide.contentVersion);
  const [completed, setCompleted] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => { setCompleted(readProgress(key)); setReady(true); }, [key]);
  const save = (ids: string[]) => { setCompleted(ids); writeProgress(key, ids); };
  return { completed, save, ready };
}

export function ProgressControl({ guide, unit }: { guide: Guide; unit: GuideUnit }) {
  const { completed, save, ready } = useGuideProgress(guide);
  if (!guide.features.progress) return null;
  const checked = completed.includes(unit.id);
  return <section className="progress-control" aria-labelledby="progress-title"><div><h2 id="progress-title">¿Has terminado esta parte?</h2><p>Es solo una ayuda para recordar por dónde ibas.</p></div><label><input type="checkbox" checked={ready && checked} onChange={(event) => save(event.target.checked ? [...new Set([...completed, unit.id])] : completed.filter((id) => id !== unit.id))}/><span>{checked ? "Hecho" : "Marcar como hecho"}</span></label></section>;
}

export function ProgressSummary({ guide }: { guide: Guide }) {
  const { completed, save, ready } = useGuideProgress(guide);
  const published = guide.navigation.filter((unit) => unit.status === "published").length;
  const count = guide.navigation.filter((unit) => unit.status === "published" && completed.includes(unit.id)).length;
  if (!guide.features.progress) return null;
  const reset = () => { if (window.confirm("¿Quieres borrar el progreso guardado de esta guía? Podrás seguir leyendo con normalidad.")) save([]); };
  return <aside className="progress-summary" aria-live="polite"><h3>Tu avance en este navegador</h3><p>{ready ? `${count} de ${published} partes marcadas como hechas.` : "Consultando tu avance…"}</p><button className="text-button" type="button" onClick={reset} disabled={!ready || count === 0}>Borrar mi progreso</button></aside>;
}

import type { Guide, GuideUnit } from "@/lib/guides/types";
import { GuideHeader } from "./GuideHeader";
import { PreviousNext } from "./PreviousNext";
import { ProgressControl } from "./ProgressControl";
import { withoutComponents } from "@/lib/guides/serialize";

export function LessonLayout({ guide, unit, children }: { guide: Guide; unit: GuideUnit; children: React.ReactNode }) {
  return <div style={{ "--accent": guide.accent } as React.CSSProperties}><GuideHeader guide={guide}/><main id="contenido"><article className="lesson"><header className="lesson-title"><p className="eyebrow">{unit.kind === "chapter" ? `Capítulo ${unit.order}` : unit.kind === "kit" ? "Ayuda rápida" : "Introducción"}</p><h1>{unit.title}</h1><p>{unit.description}</p>{unit.durationMinutes && <p className="duration">Unos {unit.durationMinutes} minutos</p>}</header><div className="prose">{children}</div><ProgressControl guide={withoutComponents(guide)} unit={{ ...unit, Component: undefined }}/><PreviousNext guide={guide} unit={unit}/></article></main></div>;
}

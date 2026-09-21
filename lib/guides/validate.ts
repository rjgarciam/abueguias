import type { Guide } from "./types";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateGuides(guides: Guide[]) {
  const errors: string[] = [];
  const ids = new Set<string>(); const slugs = new Set<string>(); const orders = new Set<number>();
  for (const guide of guides) {
    if (ids.has(guide.id)) errors.push(`id de guía duplicado: ${guide.id}`); ids.add(guide.id);
    if (slugs.has(guide.slug)) errors.push(`slug de guía duplicado: ${guide.slug}`); slugs.add(guide.slug);
    if (orders.has(guide.order)) errors.push(`orden de guía duplicado: ${guide.order}`); orders.add(guide.order);
    if (!slugPattern.test(guide.slug)) errors.push(`slug de guía inválido: ${guide.slug}`);
    if (!["published", "coming-soon", "hidden"].includes(guide.status)) errors.push(`estado inválido: ${guide.status}`);
    if (!guide.cover?.eyebrow || !guide.cover?.promise) errors.push(`${guide.slug}: falta portada`);
    const unitIds = new Set<string>(); const unitOrders = new Set<number>(); const unitPaths = new Set<string>();
    for (const unit of guide.navigation) {
      const path = unit.path.join("/");
      if (unitIds.has(unit.id)) errors.push(`${guide.slug}: id de unidad duplicado ${unit.id}`); unitIds.add(unit.id);
      if (unitOrders.has(unit.order)) errors.push(`${guide.slug}: orden duplicado ${unit.order}`); unitOrders.add(unit.order);
      if (unitPaths.has(path)) errors.push(`${guide.slug}: ruta duplicada ${path}`); unitPaths.add(path);
      if (!unit.path.length || unit.path.some((part) => !slugPattern.test(part))) errors.push(`${guide.slug}: ruta inválida ${path}`);
      if (unit.status === "published" && !unit.Component) errors.push(`${guide.slug}: falta contenido publicado para ${unit.id}`);
      if (unit.status === "coming-soon" && unit.Component) errors.push(`${guide.slug}: contenido en preparación no debe tener ruta: ${unit.id}`);
    }
    if (guide.status === "published" && !guide.navigation.some((unit) => unit.kind === "introduction" && unit.status === "published")) errors.push(`${guide.slug}: falta introducción publicada`);
  }
  if (errors.length) throw new Error(`Contenido no válido:\n- ${errors.join("\n- ")}`);
  return true;
}

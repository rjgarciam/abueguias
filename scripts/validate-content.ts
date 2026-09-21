import manifestData from "../guides/ia-sin-miedo/guide.json";
import type { Guide, GuideManifest } from "../lib/guides/types";
import { validateGuides } from "../lib/guides/validate";

const manifest = manifestData as GuideManifest;
const guide: Guide = { ...manifest, navigation: manifest.navigation.map((unit) => ({ ...unit, Component: unit.status === "published" ? (() => null) : undefined })) };
const allGuides = [guide];
validateGuides(allGuides);
console.log(`Contenido válido: ${allGuides.length} guía(s), ${allGuides.reduce((sum, guide) => sum + guide.navigation.length, 0)} unidades.`);

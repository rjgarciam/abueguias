import manifestData from "@/guides/ia-sin-miedo/guide.json";
import Introduction from "@/guides/ia-sin-miedo/content/introduccion.mdx";
import ChapterOne from "@/guides/ia-sin-miedo/content/chapters/01-que-es-la-ia.mdx";
import ChapterTwo from "@/guides/ia-sin-miedo/content/chapters/02-hablar-con-gemini.mdx";
import ChapterThree from "@/guides/ia-sin-miedo/content/chapters/03-primeras-cosas-utiles.mdx";
import ChapterFour from "@/guides/ia-sin-miedo/content/chapters/04-trabajar-con-documentos.mdx";
import ChapterFive from "@/guides/ia-sin-miedo/content/chapters/05-notebooklm.mdx";
import ChapterSix from "@/guides/ia-sin-miedo/content/chapters/06-preparar-ponencia.mdx";
import ChapterSeven from "@/guides/ia-sin-miedo/content/chapters/07-escribir-articulo.mdx";
import ChapterEight from "@/guides/ia-sin-miedo/content/chapters/08-fiarse.mdx";
import ChapterNine from "@/guides/ia-sin-miedo/content/chapters/09-recetas.mdx";
import ChapterTen from "@/guides/ia-sin-miedo/content/chapters/10-mi-proyecto.mdx";
import EmergencyKit from "@/guides/ia-sin-miedo/content/botiquin.mdx";
import type { Guide, GuideManifest } from "./types";
import { validateGuides } from "./validate";

const manifest = manifestData as GuideManifest;
const components = {
  introduccion: Introduction,
  "capitulo-1": ChapterOne,
  "capitulo-2": ChapterTwo,
  "capitulo-3": ChapterThree,
  "capitulo-4": ChapterFour,
  "capitulo-5": ChapterFive,
  "capitulo-6": ChapterSix,
  "capitulo-7": ChapterSeven,
  "capitulo-8": ChapterEight,
  "capitulo-9": ChapterNine,
  "capitulo-10": ChapterTen,
  botiquin: EmergencyKit
} as const;

const iaSinMiedo: Guide = {
  ...manifest,
  navigation: manifest.navigation.map((unit) => ({ ...unit, Component: components[unit.id as keyof typeof components] }))
};

export const allGuides: Guide[] = [iaSinMiedo].sort((a, b) => a.order - b.order);
validateGuides(allGuides);

export const publicGuides = allGuides.filter((guide) => guide.status !== "hidden");
export const findGuide = (slug: string) => allGuides.find((guide) => guide.slug === slug);
export const findUnit = (guide: Guide, path: string[]) => guide.navigation.find((unit) => unit.path.join("/") === path.join("/"));

import manifestData from "@/guides/ia-sin-miedo/guide.json";
import Introduction from "@/guides/ia-sin-miedo/content/introduccion.mdx";
import ChapterOne from "@/guides/ia-sin-miedo/content/chapters/01-que-es-la-ia.mdx";
import ChapterTwo from "@/guides/ia-sin-miedo/content/chapters/02-hablar-con-gemini.mdx";
import EmergencyKit from "@/guides/ia-sin-miedo/content/botiquin.mdx";
import type { Guide, GuideManifest } from "./types";
import { validateGuides } from "./validate";

const manifest = manifestData as GuideManifest;
const components = { introduccion: Introduction, "capitulo-1": ChapterOne, "capitulo-2": ChapterTwo, botiquin: EmergencyKit } as const;

const iaSinMiedo: Guide = {
  ...manifest,
  navigation: manifest.navigation.map((unit) => ({ ...unit, Component: components[unit.id as keyof typeof components] }))
};

export const allGuides: Guide[] = [iaSinMiedo].sort((a, b) => a.order - b.order);
validateGuides(allGuides);

export const publicGuides = allGuides.filter((guide) => guide.status !== "hidden");
export const findGuide = (slug: string) => allGuides.find((guide) => guide.slug === slug);
export const findUnit = (guide: Guide, path: string[]) => guide.navigation.find((unit) => unit.path.join("/") === path.join("/"));

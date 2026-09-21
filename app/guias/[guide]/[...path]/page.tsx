import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LessonLayout } from "@/components/guide/LessonLayout";
import { allGuides, findGuide, findUnit } from "@/lib/guides/registry";

type Props = { params: Promise<{ guide: string; path: string[] }> };

export function generateStaticParams() {
  return allGuides.filter((guide) => guide.status === "published").flatMap((guide) =>
    guide.navigation.filter((unit) => unit.status === "published").map((unit) => ({ guide: guide.slug, path: unit.path }))
  );
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { guide: slug, path } = await params;
  const guide = findGuide(slug);
  const unit = guide ? findUnit(guide, path) : undefined;
  return unit ? { title: unit.title, description: unit.description } : {};
}

export default async function ContentPage({ params }: Props) {
  const { guide: slug, path } = await params;
  const guide = findGuide(slug);
  const unit = guide ? findUnit(guide, path) : undefined;
  if (!guide || guide.status !== "published" || !unit || unit.status !== "published" || !unit.Component) notFound();
  return <LessonLayout guide={guide} unit={unit}><unit.Component /></LessonLayout>;
}

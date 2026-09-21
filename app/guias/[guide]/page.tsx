import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideHome } from "@/components/guide/GuideHome";
import { allGuides, findGuide } from "@/lib/guides/registry";

type Props = { params: Promise<{ guide: string }> };

export function generateStaticParams() {
  return allGuides.filter((guide) => guide.status === "published").map((guide) => ({ guide: guide.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = findGuide((await params).guide);
  return guide ? { title: guide.title, description: guide.summary } : {};
}

export default async function GuidePage({ params }: Props) {
  const guide = findGuide((await params).guide);
  if (!guide || guide.status !== "published") notFound();
  return <GuideHome guide={guide} />;
}

import type { ComponentType } from "react";

export type GuideStatus = "published" | "coming-soon" | "hidden";
export type UnitStatus = "published" | "coming-soon";
export type UnitKind = "introduction" | "chapter" | "kit";

export interface GuideManifest {
  id: string; slug: string; title: string; summary: string; status: GuideStatus;
  contentVersion: number; language: string; order: number; accent: string; audience?: string;
  cover: { eyebrow: string; promise: string };
  features: { progress: boolean; copyBlocks: boolean; emergencyKit: boolean };
  navigation: Array<{ id: string; kind: UnitKind; slug: string; title: string; description: string; order: number; durationMinutes?: number; status: UnitStatus; path: string[] }>;
}

export type GuideUnit = GuideManifest["navigation"][number] & { Component?: ComponentType };
export interface Guide extends Omit<GuideManifest, "navigation"> { navigation: GuideUnit[] }

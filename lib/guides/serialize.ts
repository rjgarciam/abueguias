import type { Guide } from "./types";

export function withoutComponents(guide: Guide): Guide {
  return { ...guide, navigation: guide.navigation.map(({ Component: _Component, ...unit }) => unit) };
}

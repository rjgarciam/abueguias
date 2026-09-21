export function progressKey(guideId: string, contentVersion: number) {
  return `abueguias:${guideId}:${contentVersion}:progress`;
}

export function readProgress(key: string): string[] {
  try {
    const value = JSON.parse(window.localStorage.getItem(key) ?? "[]");
    return Array.isArray(value) && value.every((item) => typeof item === "string") ? value : [];
  } catch { return []; }
}

export function writeProgress(key: string, ids: string[]) {
  try { window.localStorage.setItem(key, JSON.stringify(ids)); return true; }
  catch { return false; }
}

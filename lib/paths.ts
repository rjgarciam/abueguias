export function normalizeBasePath(value = process.env.NEXT_PUBLIC_BASE_PATH ?? "") {
  if (!value || value === "/") return "";
  return `/${value.replace(/^\/+|\/+$/g, "")}`;
}

export const basePath = normalizeBasePath();

export function withBasePath(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalized}`;
}

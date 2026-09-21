import { describe, expect, it } from "vitest";
import { normalizeBasePath } from "../lib/paths";
import { progressKey } from "../lib/progress";

describe("rutas y progreso", () => {
  it("normaliza el prefijo de despliegue", () => { expect(normalizeBasePath("")).toBe(""); expect(normalizeBasePath("/abueguias/")).toBe("/abueguias"); });
  it("aísla el progreso por guía y versión", () => { expect(progressKey("ia-sin-miedo",1)).toBe("abueguias:ia-sin-miedo:1:progress"); expect(progressKey("ia-sin-miedo",2)).not.toBe(progressKey("ia-sin-miedo",1)); });
});

# abueguias

`abueguias` es una colección de guías web claras, prácticas y accesibles. El sitio es una aplicación Next.js compartida que se exporta por completo como archivos estáticos. La primera guía es **IA sin miedo**.

## Puesta en marcha

Necesitas Node.js 22 y pnpm 11.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Abre `http://localhost:3000`. En desarrollo el prefijo está vacío.

## Comprobar y construir

```bash
pnpm check
pnpm build:root
pnpm audit:export
pnpm build:pages
pnpm audit:export
```

- `check` ejecuta TypeScript, validación de manifiestos/contenido y tests.
- `build:root` exporta para un dominio raíz.
- `build:pages` exporta con el prefijo `/abueguias`.
- `audit:export` comprueba páginas esperadas, `.nojekyll` y URLs de HTML, CSS y JavaScript.

El resultado estático queda en `out/`. No necesita un servidor Next.js.

## Publicar en GitHub Pages

1. Sube el repositorio a GitHub con rama principal `main`.
2. En **Settings → Pages**, elige **GitHub Actions** como fuente.
3. Envía un cambio a `main` o ejecuta manualmente **Deploy abueguias to GitHub Pages**.

El workflow instala con el lockfile de pnpm, comprueba el proyecto, obtiene el prefijo del nombre real del repositorio, genera `out` y lo publica con las acciones oficiales de Pages. Si el repositorio termina en `.github.io`, usa prefijo vacío; para `abueguias`, usa `/abueguias`.

## Añadir una guía

1. Copia `guides/_template` como `guides/<slug>`.
2. Completa `guide.json`: identificador estable, slug, estado, versión, portada, capacidades y navegación.
3. Crea los módulos `.mdx` indicados por la navegación. Una unidad `published` debe tener contenido; una `coming-soon` no genera ruta.
4. En `lib/guides/registry.ts`, importa el manifiesto y sus módulos, y añade una sola entrada al registro.
5. Coloca recursos propios bajo `public/guides/<slug>/` y construye su URL con `withBasePath` de `lib/paths.ts`.
6. Ejecuta `pnpm check` y los dos builds.

No copies `app`, `components` ni `lib`: catálogo, portada, lectura, navegación, bloques y progreso pertenecen al motor común. Los estados disponibles son `published`, `coming-soon` y `hidden`. El progreso se aísla mediante `abueguias:<id>:<contentVersion>:progress`.

## Estructura

```text
app/                 rutas compartidas
components/          catálogo, lector y bloques pedagógicos
lib/guides/          tipos, registro y validación
guides/<slug>/       manifiesto y contenido propio
public/guides/       recursos estáticos por guía
scripts/             validación y auditoría de la exportación
tests/               pruebas automáticas
```

Los documentos editoriales y técnicos maestros permanecen en `docs/`. Las comprobaciones humanas pendientes están en `EDITORIAL-VERIFICATION.md`; las imágenes futuras están especificadas en `visual-assets.json`.

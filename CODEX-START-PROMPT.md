# Prompt inicial para Codex

Trabaja en este repositorio como responsable de producción del primer prototipo de **abueguias**, una colección extensible de guías web. No te limites a proponer un plan: implementa, comprueba y deja funcionando el MVP.

Antes de escribir código, lee completos, en este orden:

- `README.md`
- `docs/01-GUIA-EDITORIAL.md`
- `docs/02-ARQUITECTURA-CONTENIDO.md`
- `docs/03-ESPECIFICACION-PLATAFORMA.md`
- `docs/04-GITHUB-PAGES.md`
- `guides/ia-sin-miedo/guide.json`
- `guides/ia-sin-miedo/content/chapters/README.md`

## Encargo

Construye un único sitio estático llamado `abueguias` con Next.js, React, TypeScript y contenido Markdown o MDX. Debe tener:

1. una portada-catálogo de la colección;
2. una plataforma común y reutilizable para todas las guías;
3. `ia-sin-miedo` como primera guía;
4. portada, introducción, capítulos 1 y 2, Botiquín, navegación, ejercicios, botones Copiar, pequeños desplegables y progreso local para esa guía;
5. una forma documentada y sencilla de añadir futuras guías sin duplicar la aplicación;
6. exportación completamente estática y despliegue automático en GitHub Pages.

## Requisitos no negociables de GitHub Pages

- Configura `output: 'export'` y no uses funciones de servidor, API routes, middleware, ISR, optimización de imágenes dependiente de servidor ni ninguna función incompatible con exportación estática.
- El repositorio se llamará `abueguias`. En producción, el sitio vivirá bajo `/abueguias/` salvo que se configure como site de usuario/organización.
- Obtén el prefijo de una variable de entorno, por ejemplo `NEXT_PUBLIC_BASE_PATH`, y aplica de forma coherente `basePath` y, si es necesario, `assetPrefix`. En desarrollo local el prefijo debe poder ser vacío.
- Nunca escribas enlaces internos o rutas de recursos suponiendo que el origen es `/`. Centraliza la construcción de URLs o utiliza mecanismos del framework compatibles con `basePath`.
- Las rutas de contenido deben ser deterministas y estáticas, por ejemplo `/guias/ia-sin-miedo/...`, y deben generarse durante el build.
- Usa `images.unoptimized: true` o imágenes HTML normales.
- Añade `.nojekyll` al resultado publicado si el flujo elegido lo requiere.
- Implementa `.github/workflows/deploy-pages.yml` usando las acciones oficiales de Pages, con permisos mínimos y publicación del directorio `out`.
- El workflow debe pasar el nombre del repositorio como base path de proyecto, pero permitir prefijo vacío para un site `usuario.github.io`.
- Añade scripts claros para desarrollo, build local de raíz, build de Pages y comprobación.

## Arquitectura de colección

- Mantén el motor compartido fuera de `guides/`.
- Cada guía vive en `guides/<slug>/`, con un `guide.json` validable, contenido y recursos propios.
- Crea un registro tipado de guías. El catálogo y la generación de rutas deben derivarse de ese registro o de los manifiestos, no de páginas duplicadas a mano.
- Define un contrato mínimo para las guías y documenta cómo copiar `guides/_template` para añadir otra.
- Aísla el progreso en el navegador por guía y versión; no mezcles datos entre guías.
- El catálogo debe poder marcar guías como `publicada`, `en preparación` o `oculta`.

## Contenido y experiencia

Respeta literalmente el enfoque editorial del documento 01: tipografía grande, lenguaje cotidiano, una idea nueva cada vez y acciones claras. La interfaz debe parecer una publicación editorial, no un panel de administración.

Escribe contenido real y útil para introducción y capítulos 1 y 2. No uses lorem ipsum. Cuando una pantalla actual de Gemini o NotebookLM no pueda confirmarse, evita inventarla y registra la revisión pendiente en `EDITORIAL-VERIFICATION.md`.

Usa recursos provisionales sobrios donde falten ilustraciones y crea `visual-assets.json` con una ficha por imagen futura: identificador, guía, ubicación, finalidad pedagógica, tipo, descripción, texto alternativo y ruta final.

## Forma de trabajar y entregables

1. Inspecciona el repositorio y conserva estos documentos maestros.
2. Crea `IMPLEMENTATION-PLAN.md` con decisiones breves y verificables.
3. Implementa el MVP completo.
4. Ejecuta las comprobaciones disponibles: tipos, tests pertinentes y ambos builds (raíz y `/abueguias`).
5. Inspecciona el contenido de `out` y verifica que HTML, JavaScript, CSS, imágenes, enlaces y navegación no apunten accidentalmente a la raíz del dominio.
6. Deja actualizado `README.md` con instrucciones sencillas para desarrollo, publicación y adición de una guía.
7. Crea `EDITORIAL-VERIFICATION.md` y `visual-assets.json`.
8. Resume al final qué funciona, qué comprobaste y qué queda pendiente.

Toma decisiones técnicas pequeñas por tu cuenta. Pregunta solamente si falta una decisión editorial o de producto que cambie materialmente el resultado. No publiques todavía en un repositorio remoto ni actives GitHub Pages: deja el repositorio listo para que su propietario lo suba a GitHub.


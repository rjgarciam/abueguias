# Plan de implementación

## Decisiones

- Next.js con App Router, React, TypeScript y `@next/mdx`; exportación estática con barra final.
- Registro explícito y tipado en `lib/guides/registry.ts`: cada guía aporta un manifiesto y módulos MDX, no páginas.
- Una única ruta dinámica opcional genera portada, introducción, capítulos y Botiquín durante el build.
- `NEXT_PUBLIC_BASE_PATH` se normaliza una sola vez. Next aplica `basePath`; los recursos públicos usan `withBasePath`.
- El progreso usa `abueguias:<id>:<contentVersion>:progress` y nunca condiciona la lectura.
- Validación ejecutable comprueba manifiestos, órdenes, rutas, contenido mínimo y recursos.

## Comprobaciones verificables

- `pnpm check`: TypeScript, validación de contenido y tests.
- `pnpm build:root`: exportación con prefijo vacío.
- `pnpm build:pages`: exportación con `/abueguias`.
- `pnpm audit:export`: revisa páginas esperadas, `.nojekyll` y URLs de HTML/CSS/JS.
- Prueba manual recomendada: teclado, copia, desplegables, progreso, móvil y zoom al 200 %.

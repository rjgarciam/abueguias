# Especificación de la plataforma abueguias

## Objetivo

Un solo sitio web estático, rápido y accesible que publique varias guías desde un mismo motor. Primera implementación: `ia-sin-miedo`.

## Tecnología preferida

- Next.js con App Router, React y TypeScript.
- Markdown/MDX para contenido.
- Exportación estática (`output: 'export'`).
- CSS mantenible con variables de diseño; evitar una dependencia visual pesada sin necesidad.
- `localStorage` únicamente para progreso y preferencias locales.

Codex podrá ajustar versiones concretas si explica la decisión y mantiene compatibilidad con GitHub Pages.

## Estructura objetivo

```text
abueguias/
├── app/                         rutas y layouts compartidos
│   ├── page.*                   catálogo
│   └── guias/[guide]/...        rutas estáticas de guía
├── components/
│   ├── collection/              catálogo
│   └── guide/                   lector y bloques pedagógicos
├── lib/
│   ├── guides/                  registro, tipos, carga y validación
│   ├── paths.*                  URLs conscientes del base path
│   └── progress.*               estado local aislado
├── guides/
│   ├── _template/
│   └── ia-sin-miedo/
│       ├── guide.json
│       ├── content/
│       └── public/images/
├── public/                      marca y recursos globales
├── docs/
├── tests/
├── next.config.*
└── .github/workflows/deploy-pages.yml
```

La implementación puede variar, pero debe conservar la separación colección/motor/guías.

## Rutas

- `/`: catálogo.
- `/guias/ia-sin-miedo/`: portada de la guía.
- `/guias/ia-sin-miedo/introduccion/`.
- `/guias/ia-sin-miedo/capitulos/<slug>/`.
- `/guias/ia-sin-miedo/botiquin/`.

Usar URLs canónicas del contenido sin incorporar manualmente `/abueguias`. El prefijo de despliegue es una preocupación centralizada de la plataforma.

## Base path y recursos

En local, `NEXT_PUBLIC_BASE_PATH` puede ser vacío. Para Pages de proyecto vale `/abueguias`. `next.config` deriva de ahí `basePath`; `assetPrefix` se configurará solo si resulta necesario y se probará. Los recursos de cada guía deben publicarse en rutas estables que no colisionen con otras guías.

No usar cadenas como `/images/foo.webp` directamente. Crear una utilidad para recursos o importar archivos de forma que el resultado respete el prefijo. Probar rutas con caracteres, recarga directa y navegación cliente.

## Manifiestos y validación

Definir tipos y validación en build. Fallar con un mensaje claro si hay slugs duplicados, estado inválido, recurso ausente, orden duplicado, enlace interno roto o una guía publicada sin portada/contenido mínimo.

El registro puede ser explícito para asegurar compatibilidad con el bundler, siempre que añadir una guía solo requiera una entrada breve y no duplicar páginas.

## Componentes mínimos

- `GuideCard`, `GuideHeader`, `GuideToc`.
- `LessonLayout`, `PreviousNext`, `ProgressControl`.
- `TryIt`, `CopyText`, `Reveal`, `Callout`, `Checklist`.
- Botiquín consultable sin perder la posición de lectura.

Todos deben tener HTML semántico, teclado, foco visible, estados comprensibles y texto en español.

## Progreso

Clave versionada, por ejemplo `abueguias:<guide-id>:<content-version>:progress`. La lectura funciona sin almacenamiento disponible. Incluir una acción explícita para borrar el progreso de esa guía y una confirmación antes de hacerlo.

## Diseño

El catálogo debe sentirse como una pequeña biblioteca; el lector, como un libro contemporáneo. Tipografía grande, columna cómoda, mucho aire y jerarquía clara. La guía puede aportar color de acento y portada mediante tokens, sin cambiar la estructura accesible común.

## Exclusiones del MVP

Sin cuentas, base de datos, comentarios, analítica, búsqueda global, IA integrada, CMS remoto ni contenido obtenido en tiempo de ejecución.

## Criterios de aceptación

- Añadir una guía de prueba desde `_template` no exige copiar componentes o páginas.
- Catálogo y rutas se derivan de datos tipados.
- Build estático funciona con prefijo vacío y `/abueguias`.
- Una inspección del directorio exportado no encuentra enlaces internos o recursos que eludan el prefijo.
- Recargar una ruta publicada funciona según la estrategia documentada de Pages.
- Navegación, Copiar, desplegables y progreso funcionan con ratón y teclado.
- La interfaz es usable a 200% de zoom y en móvil.
- No hay contenido ficticio presentado como terminado.


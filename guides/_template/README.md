# Plantilla de una nueva guía

1. Copia esta carpeta como `guides/<slug>`.
2. Completa `guide.json` sin reutilizar el `id` de otra guía.
3. Añade contenido y recursos propios.
4. Registra la guía en el archivo tipado que cree la plataforma.
5. Ejecuta validación y ambos builds.

El registro necesita solo un bloque breve: importa el JSON, importa los módulos MDX y asocia cada `id` publicado con su componente. La ruta compartida genera automáticamente todas las páginas.

Cada unidad de `navigation` declara `id`, `kind`, `slug`, `title`, `description`, `order`, `status` y `path`; añade `durationMinutes` cuando ayude. Mantén los identificadores y slugs estables al editar títulos.

Los recursos propios se publican en `public/guides/<slug>/` y se referencian mediante `withBasePath`. No escribas `/images/...` ni incluyas `/abueguias` en el contenido.

No copies `app`, `components` ni `lib`. Si una guía necesita un bloque nuevo que pueda beneficiar a otras, añádelo al motor compartido. Un componente exclusivo requiere una justificación y un registro explícito.

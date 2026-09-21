# Arquitectura de la colección y del contenido

## La colección

`abueguias` es el producto principal. Su inicio es un catálogo sereno y fácil de explorar. Cada guía tiene identidad editorial propia, pero comparte estructura, accesibilidad, componentes, navegación y mantenimiento.

Estados posibles:

- `published`: aparece en el catálogo y se puede abrir.
- `coming-soon`: puede aparecer como próxima, sin enlace engañoso.
- `hidden`: no aparece en navegación pública.

Una futura guía no debe exigir copiar la aplicación. Debe aportar un manifiesto, contenido, recursos y, solo si es imprescindible, pequeños componentes registrados explícitamente.

## Contrato conceptual de una guía

Cada `guides/<slug>/guide.json` define al menos: identificador estable, slug, título, resumen, estado, versión de contenido, idioma, orden, portada, navegación y capacidades activadas. El contenido se organiza en unidades ordenadas y contiene metadatos de título, descripción, duración aproximada y prerequisitos.

## IA sin miedo

### Parte I · Perderle el miedo

1. **¿Qué es esto de la IA?** Qué hace, qué no hace, por qué parece entender y por qué se equivoca.
2. **Aprender a hablar con Gemini.** Pedir, dar contexto, continuar, corregir y mejorar.
3. **Mis primeras cosas útiles.** Explicar, resumir, comparar, idear, transformar textos y trabajar con PDF.

### Parte II · Trabajar con IA

4. **Trabajar con mis documentos.** Preguntas, resúmenes y extracción de información.
5. **NotebookLM: conversar con mis fuentes.** Cuadernos, fuentes, relaciones y elección entre herramientas.

### Parte III · Escribir y pensar mejor

6. **Preparar una ponencia con IA.** Audiencia, investigación, estructura, borrador, revisión y ensayo.
7. **Escribir un artículo sin dejar de ser yo.** Ideas, estructura, voz, crítica y edición.
8. **¿Me puedo fiar de esto?** Errores, fuentes, citas, comprobación y privacidad.

### Parte IV · Hacerla una herramienta propia

9. **Mis recetas de IA.** Entre 15 y 20 situaciones reutilizables.
10. **Mi proyecto.** Artículo o ponencia completa con Gemini y NotebookLM.

### Botiquín permanente

- No sé qué hacer ahora.
- Gemini ha contestado algo absurdo.
- He perdido una conversación.
- No encuentro cómo añadir un documento.
- No entiendo una palabra.
- Quiero empezar de nuevo.

## Alcance del primer MVP

Debe quedar terminado y navegable:

- catálogo de `abueguias`;
- portada de `IA sin miedo`;
- introducción;
- capítulo 1;
- capítulo 2;
- Botiquín;
- progreso local, navegación anterior/siguiente y regreso claro al catálogo;
- contenido suficiente para una prueba real con la lectora.

Los capítulos 3–10 aparecen en el índice como plan editorial, pero no deben fingir estar terminados. Se pueden mostrar como “en preparación” sin rutas vacías.

## Veinte recetas previstas

Explicar algo difícil; resumir un texto; comparar opciones; ordenar notas; proponer preguntas; mejorar claridad; reducir longitud; conservar la voz; preparar una entrevista; encontrar objeciones; crear un esquema; revisar una ponencia; ensayar preguntas difíciles; transformar notas en borrador; extraer fechas y nombres; estudiar un PDF; detectar afirmaciones que verificar; planear una investigación; preparar una lista de comprobación; empezar de nuevo cuando el resultado no sirve.

## Convenciones de contenido

- Slugs estables en minúsculas y guiones.
- Identificadores internos independientes del título visible.
- Enlaces internos declarativos y validados durante el build.
- Nada de URLs absolutas del despliegue dentro de MDX.
- Metadatos suficientes para construir índice, anterior/siguiente y progreso sin duplicarlos a mano.


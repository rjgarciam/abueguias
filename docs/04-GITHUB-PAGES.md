# Publicación en GitHub Pages

## Modelo de despliegue

Se publicará como site de proyecto del repositorio `abueguias`:

```text
https://<usuario>.github.io/abueguias/
```

El código fuente permanece en la rama principal. GitHub Actions genera la exportación estática y Pages publica el artefacto; no es necesario mantener una rama `gh-pages` manualmente.

## Configuración requerida

En el repositorio de GitHub, abrir **Settings → Pages** y elegir **GitHub Actions** como fuente. El workflow debe:

1. ejecutarse al enviar cambios a la rama principal y manualmente;
2. instalar dependencias de forma reproducible;
3. construir con `NEXT_PUBLIC_BASE_PATH=/abueguias` (idealmente derivado de `github.event.repository.name`);
4. subir únicamente `out` como artefacto Pages;
5. desplegar con las acciones oficiales;
6. declarar `contents: read`, `pages: write` e `id-token: write`, con concurrencia segura.

El archivo de workflow incluido es una especificación inicial y puede ser completado por Codex al crear `package.json` y decidir el gestor de paquetes.

## Dos modos que deben funcionar

| Modo | Prefijo | Uso |
|---|---:|---|
| Desarrollo / dominio raíz | vacío | entorno local o `usuario.github.io` |
| Pages de proyecto | `/abueguias` | repositorio solicitado |

No se resolverá esto con búsquedas y reemplazos posteriores al build.

## Restricciones

- No existe servidor Next.js en Pages.
- No usar rutas API, acciones de servidor, cookies de servidor ni contenido dinámico en petición.
- Todas las rutas dinámicas deben conocerse en build.
- Desactivar optimización de imágenes que necesite servidor.
- Preferir rutas con barra final si ello produce directorios `index.html` robustos.
- No depender de una página 404 para corregir rutinariamente enlaces mal construidos.

## Lista de comprobación antes de subir

- El build normal termina correctamente.
- El build de Pages termina con `/abueguias`.
- Existe `out/index.html` y una página exportada por cada ruta pública.
- CSS y JavaScript de los HTML exportados contienen el prefijo adecuado.
- Portadas, favicon e imágenes cargan bajo el prefijo.
- Los enlaces del catálogo y anterior/siguiente no apuntan a `/guias/...` en la raíz del dominio.
- No hay enlaces a rutas en preparación.
- Se puede abrir directamente una URL de capítulo publicada.
- El workflow y Pages usan la rama principal real (`main`, salvo decisión documentada).

## Dominio personalizado futuro

Si más adelante se usa un dominio propio o un repositorio `usuario.github.io`, el prefijo podrá quedar vacío sin reescribir contenidos. Un posible `CNAME` se añadirá entonces, no en este paquete.


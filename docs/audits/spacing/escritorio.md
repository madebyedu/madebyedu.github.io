# Espaciados implementados · Escritorio y tablet

Verificación: 29 de octubre de 2026. Sustituye como referencia del estado actual a la auditoría inicial de `ce59338`. La propuesta conserva la identidad visual y diferencia escala fija, relaciones fluidas y excepciones funcionales.

## Resultado medido a 1440 × 900

| Relación | Antes | Implementado |
| --- | --- | --- |
| Secciones principales | 27 px | 35,13 px |
| Home H1 → presentación | 24 px | 21,38 px |
| About H1 → presentación | 32 px | 24 px |
| Contact H1 → presentación | 8 px | 24 px |
| About H2 → contenido | 32 px | 24 px |
| Ficha H2 → texto | 16 px | 16 px |
| Galerías: separación entre filas | 32 px | 29,38 px |
| Destacado: imagen → título | 32 px | 24 px |
| What I do → primer título de área | 60 px | 49 px |
| Párrafo → enlaces en áreas, mínimo | 32 px | 24 px |
| Último campo → botón | 32 px | 24 px |
| Botón → legal con estado vacío | 43 px | 35,13 px |
| Contenido largo → enlaces sociales, mínimo | 70 px | 86,25 px |

Las seis fichas comparten la misma estructura y tokens. Los metadatos conservan 4 px; las tarjetas normales conservan 16 px entre imagen y descripción y un mínimo de 16 px hasta el texto de la acción. Los paddings ópticos de campos (12,8 px) y botón (12/30 px) se conservan como tokens.

El espacio entre columnas y filas de galería usa ahora la misma relación de retícula. Las fórmulas del eje derecho, tres columnas de About y alineación de datos de fichas se han migrado conjuntamente.

Los huecos bajo columnas cortas, la anchura máxima de retratos, las proporciones de medios y la distribución 55/45 o 50/50 se conservan. Contact puede seguir mostrando más blanco antes del footer porque su contenido es corto: se mantiene la fila `1fr`.

## Continuidad entre tamaños

Medidas reales del navegador a 900 px de alto; se conserva la reserva de scrollbar del entorno de prueba.

| Ancho | Secciones | H1 About → presentación | Galería |
| --- | --- | --- | --- |
| 320 px | 32 px | 16 px | 16 px |
| 390 px | 32 px | 16 px | 16 px |
| 599 px | 32 px | 17,84 px | 16,76 px |
| 600 px | 32 px | 17,84 px | 16,77 px |
| 754 px | 32 px | 19,38 px | 19,09 px |
| 755 px | 32 px | 19,4 px | 19,1 px |
| 768 px | 32 px | 19,52 px | 19,3 px |
| 1024 px | 33,05 px | 22,08 px | 23,14 px |
| 1440 px | 35,13 px | 24 px | 29,38 px |
| 1920 px | 37,53 px | 24 px | 32 px |
| 2560 px | 40 px | 24 px | 32 px |

Los espacios editoriales no se duplican en 600 px ni se reducen bruscamente en 755 px. El cambio de navegación y columnas en 755 px sigue siendo estructural. El footer conserva su relación con el inset del nombre de cabecera, que cambia con esa navegación.

A 1440 px de ancho, la separación de secciones es la misma en alturas de 600, 900 y 1200 px. Se conserva `dvh` para altura mínima de página, menú y límite de retratos; no para el ritmo editorial.

## Verificación y límites

- Nueve páginas × once anchos × tres alturas: **297 combinaciones**, sin desbordamiento horizontal, solapamiento de cabecera ni fallos en las relaciones medidas.
- Texto al 200 %: **36 vistas** sin desbordamientos. Se permite partir palabras largas en los bloques de About; no se cambian sus tamaños ni interlineados.
- **16 vistas de estados del formulario**: vacío, éxito, error y errores de campo. El nodo vivo no se oculta ni se retira. Son fixtures temporales del servidor de pruebas: no se ejecutó ningún envío.
- Menú: cuatro combinaciones de viewport, apertura/cierre, Tab y Shift+Tab, Escape y retorno del foco. Carrusel: End y ArrowLeft, salida lateral y compensación de foco. Ejes de retícula: seis comprobaciones en About y Porsche a 768, 1440 y 2560 px; diferencias de redondeo de hasta 0,02 px.
- Muestreo visual de páginas representativas. Sin comprobación en dispositivos físicos, lector de pantalla, zoom del navegador ni gestos táctiles sintetizados. La prueba de texto al 200 % utiliza vistas locales sin scripts.

La tipografía y JavaScript permanecen iguales a la base. Los resultados son de layout y de las interacciones citadas, no una certificación de accesibilidad.

## Fuentes actuales

- [Guía del sistema](../../spacing-system.md).
- [Comprobaciones y matriz](checks.json).
- [Valores únicos](unique-values.csv) y [declaraciones](declarations.json).
- CSS: `assets/css/style.css`; el inventario y las comprobaciones comparten su SHA-256.

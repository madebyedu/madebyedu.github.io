# Sistema de espaciados del portfolio

Implementación de la propuesta aprobada el 28 de octubre de 2026. Se aplica a Home, About, Contact y las seis fichas mediante `assets/css/style.css`. La tipografía, contenidos, proporciones de medios y lógica JavaScript se conservan.

## Escala y relaciones

La escala fija parte de `--space-1: 0.25rem` y contiene los pasos 1, 2, 3, 4, 6, 8 y 12: 4, 8, 12, 16, 24, 32 y 48 px con raíz de 16 px. No cambia en los breakpoints. La raíz sigue respetando la preferencia del navegador.

Los componentes utilizan tokens por función. No se deben reintroducir los aliases `--space-unit`, `--space-xs`, `--space-s` o `--space-m`: mezclaban relaciones diferentes y duplicaban sus valores en 600 px.

| Token | Función | Intervalo con raíz de 16 px |
| --- | --- | --- |
| `--page-gutter` | Margen lateral y referencia lateral del menú | 32–80 px |
| `--page-inset-block` | Padding superior/inferior del documento | 32 px |
| `--section-gap` | Separación de secciones principales | 32–40 px |
| `--intro-gap` | H1 → introducción o datos de la ficha | 16–24 px |
| `--section-heading-gap` | H2 principal → contenido en About | Inicialmente `--intro-gap` |
| `--copy-gap` | Subtítulos de fichas, párrafos y H3 descriptivos | 8–16 px |
| `--related-block-gap` | Listas, grupos relacionados y navegación de cierre | Inicialmente `--intro-gap` |
| `--metadata-gap` | Título → categoría; puesto → empresa/fecha | 4 px |
| `--media-caption-gap` | Imagen/vídeo → pie de foto | Inicialmente `--copy-gap` |
| `--grid-gap` | Retículas y galerías en ambos ejes | 16–32 px |
| `--divider-inset` | Línea divisoria → contenido | Inicialmente `--intro-gap` |
| `--card-media-gap` | Imagen → descripción de tarjeta | 16 px; destacado usa `--intro-gap` |
| `--card-action-gap` | Distancia mínima categoría → texto del enlace | 16 px |
| `--field-label-gap` | Etiqueta → campo y texto de error | 8 px |
| `--form-group-gap` | Entre campos, antes del botón y del estado no vacío | Inicialmente `--intro-gap` |
| `--field-padding` | Interior del campo; excepción óptica conservada | 0.8rem / 12,8 px |
| `--button-padding-block`, `--button-padding-inline` | Interior del botón | 12 / 30 px |
| `--navigation-gap` | Navegación y perfiles | `--grid-gap`; menú móvil mantiene 16 px |
| `--header-content-gap` | Cabecera → contenido | Inicialmente `--section-gap` |
| `--footer-content-gap` | Separación mínima completa contenido → enlaces sociales | 2 × (sección + inset del nombre) |

## Fórmulas fluidas

```css
--page-gutter: clamp(var(--space-8), 2.5vw, 5rem);
--section-gap: clamp(var(--space-8), 1.75rem + 0.5vw, 2.5rem);
--intro-gap: clamp(var(--space-4), 0.75rem + 1vw, var(--space-6));
--copy-gap: clamp(var(--space-2), 0.25rem + 1vw, var(--space-4));
--grid-gap: clamp(var(--space-4), 0.5rem + 1.5vw, var(--space-8));
```

Home conserva dos excepciones por la jerarquía de su titular y destacado:

```css
--home-intro-gap: clamp(var(--space-4), 1.5vw, 2.5rem);
--home-feature-gap: clamp(var(--space-8), 3vw, 5rem);
```

Son medidas continuas por anchura. Los breakpoints de 600 px (controles y proporciones de imágenes), 755 px (navegación y columnas) y 2048 px (cantidad de tarjetas visibles) siguen cumpliendo su función estructural; no redefinen la escala.

## Espacios compuestos y propietarios

- El `body` aporta `--header-content-gap`. El footer resta esa aportación a `--footer-content-gap`; así la variable del footer controla la separación mínima completa. La fila `1fr` puede añadir espacio en páginas cortas y se conserva.
- El H2 de `.about-section` suma al gap editorial solo la diferencia hasta `--section-heading-gap`. Cambiar el espaciado de párrafos no duplica la distancia bajo el título.
- En About, el padding de listas compensa el gap existente hasta alcanzar `--related-block-gap`. El margen `auto` puede añadir espacio para alinear columnas.
- En tarjetas, el padding o margen del enlace compensa `--metadata-gap` hasta alcanzar `--card-action-gap`. Se mantiene la alineación automática; la distancia visible puede superar el mínimo cuando un título ocupa menos líneas.
- El formulario no tiene gap global entre filas. Los grupos consecutivos, el botón y el estado no vacío reciben su margen por función. `#form-message` sigue presente, con `aria-live="polite"` y `display: block`; si está vacío mide cero y no añade espacio. No se ha cambiado el envío ni la validación.
- El rótulo del carrusel conserva 24 px hasta las imágenes: su margen descuenta el padding superior reservado al foco.
- Las líneas divisorias conservan espacios a ambos lados: sección exterior e inset interior. Su borde de 1 px también forma parte de la distancia visible.

## Retículas y excepciones funcionales

Las columnas, el eje derecho, las tres columnas de About y los datos de fichas utilizan todos `--grid-gap`. Hay que modificar estas fórmulas conjuntamente si cambia la retícula. About/Contact mantienen la proporción 55/45; las fichas mantienen 50/50.

Se conservan el bleed medido por JS, el margen negativo del carrusel que compensa su padding de foco, los offsets de contornos, las proporciones de imágenes/vídeos y los huecos debidos a distintas alturas de columna.

La altura del viewport se usa donde tiene función: `100dvh` en el documento, `8dvh` en el menú y `60dvh` en retratos. Las áreas seguras siguen protegidas con `env()`. El cierre del menú utiliza el mismo inset exterior que el header.

About permite partir palabras largas cuando el texto se amplía al 200 % en una pantalla de 320 px. Esto evita que la retícula implícita se ensanche; los tamaños, interlineados y anchos de lectura no cambian.

## Comprobación e inventario

Los resultados y límites de verificación se documentan en:

- [Escritorio y tablet](audits/spacing/escritorio.md).
- [Móvil](audits/spacing/movil.md).
- [Resumen de comprobaciones](audits/spacing/checks.json).
- [Expresiones únicas](audits/spacing/unique-values.csv).
- [Declaraciones y dependencias de tokens](audits/spacing/declarations.json).

Para regenerar el inventario, desde la raíz del repositorio:

```sh
python3 scripts/audit-spacing.py
```

El script usa solo la biblioteca estándar. Incluye tokens referenciados de forma transitiva y guarda el SHA-256 del CSS para detectar si el inventario se ha quedado antiguo. Es un inventario estático, no un validador CSS ni una medición del navegador: cuenta también ceros, aliases, fórmulas y reglas sobrescritas. Más expresiones con nombre no equivalen a más tamaños visuales.

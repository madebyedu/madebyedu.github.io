# Espaciados implementados · Móvil

Verificación: 29 de octubre de 2026. Estado posterior a la propuesta aprobada; referencia de medidas: 390 × 900, raíz de 16 px. Las distancias indicadas no dependen de la altura, salvo el blanco adicional que puede distribuir el body en páginas cortas.

## Diferencias medidas frente a la auditoría inicial

| Relación | Antes | Implementado |
| --- | --- | --- |
| Secciones principales | 32 px | 32 px |
| Home H1 → presentación | 16 px | 16 px |
| About H1 → presentación | 16 px | 16 px |
| Contact H1 → presentación | 8 px | 16 px |
| What I do → primer título de área | 49 px | 33 px |
| Párrafo → enlaces en área, mínimo | 16 px | 16 px |
| Último campo → botón | 16 px | 16 px |
| Botón → legal, estado vacío | 40 px | 32 px |
| Separación mínima antes del footer en contenido largo | 72 px | 72 px |

Se conservan 4 px en metadatos y títulos de tarjetas → categoría, 8 px en etiquetas de campos y subtítulos editoriales, 16 px entre imagen y descripción de tarjetas y los paddings ópticos de los controles.

La tarjeta Natural Light puede seguir mostrando más espacio sobre su acción: el margen `auto` alinea el enlace con los de tarjetas que tienen títulos más altos. Es una excepción funcional conservada.

## Pantallas intermedias

El salto anterior de 32 → 64 → 27 px se elimina. En 599, 600, 754, 755 y 768 px, la separación principal se mantiene en 32 px; las relaciones de introducción, texto y retícula crecen de forma progresiva. Los cambios de columnas, navegación y proporciones de imagen siguen existiendo por su función.

## Menú, carrusel y formulario

- Menú: gap de 16 px; inset superior de 96 px; lateral derivado del gutter; inferior `max(48px, 8dvh, safe-area)`. El cierre usa el mismo inset superior y lateral que la cabecera. Se han comprobado foco, Escape y retorno al botón.
- Carrusel: conserva salida al borde, medición del bleed por JS y compensación −16/16 px para el foco. Su separación de tarjetas utiliza la retícula fluida.
- Formulario: los grupos tienen una separación propia; el estado vacío permanece en el DOM con `aria-live="polite"`, altura cero y margen cero. Cuando hay texto, recibe su separación normal. No se altera el envío.
- Texto ampliado: 36 vistas al 200 %, incluidas las nueve páginas a 320 px. About permite partir palabras largas para impedir que su grid se ensanche.

## Cobertura y límites

Se comprobaron las nueve páginas a 320, 390, 599, 600, 754, 755, 768, 1024, 1440, 1920 y 2560 px con alturas de 600, 900 y 1200 px: 297 combinaciones. Se añadieron vistas de texto ampliado, 16 fixtures de estados del formulario, cuatro comprobaciones de menú y navegación de teclado del carrusel.

La emulación utiliza el navegador integrado del entorno de trabajo. No es una prueba en iPhone/Android físicos, de anuncios con lector de pantalla, de zoom del navegador ni de gestos táctiles sintetizados. Las vistas de texto ampliado y estados de formulario son fixtures temporales sin scripts ni envío; no se publican en la web. La tipografía y JavaScript originales permanecen intactos.

La reserva de barra clásica puede añadir espacio en el extremo derecho del viewport de prueba. No se ha cambiado ese comportamiento ni se considera un padding diferente de una página.

Fuentes: [guía del sistema](../../spacing-system.md), [comprobaciones](checks.json), [inventario único](unique-values.csv), [declaraciones](declarations.json) e [informe de escritorio](escritorio.md).

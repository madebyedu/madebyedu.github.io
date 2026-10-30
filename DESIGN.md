# DESIGN.md
## Portfolio de Eduardo Carrasco · sistema visual

**Versión:** 2.0 · 30 de octubre de 2026.
**Estado:** dirección aprobada e implementada en el trabajo de `dev`; no implica publicación.
**Referencia estructural:** [BMW Style Reference, recopilada por RICOUI](https://design.ricoui.com/brands/bmw).

## 1. Dirección artística

**Precisión editorial. Expresión con criterio.**

El portfolio presenta diseño gráfico, fotografía y trabajo audiovisual desde una mirada personal. Debe transmitir sensibilidad visual, confianza, claridad y atención al detalle. El orden proporciona claridad; la composición aporta personalidad.

BMW es una referencia fuerte para proporciones, jerarquía tipográfica, retículas, espaciado y geometría. Se adapta al portfolio, sin copiar su identidad corporativa, sus fuentes, imágenes, colores de marca o catálogo de componentes.

- Editorial, contemporáneo, sobrio y expresivo.
- Coherencia entre páginas, sin uniformar todos los proyectos.
- Precisión sin rigidez: las asimetrías y los vacíos deben tener intención.
- Imagen y tipografía comparten protagonismo; la interfaz acompaña el trabajo.
- Minimalismo con contenido y personalidad, sin decoración innecesaria.
- Diseñar con intención, no por repetición de una fórmula.

## 2. Tipografía implementada

**General Sans**, alojada en `assets/fonts/general-sans-variable.woff2`. Se mantienen dos pesos efectivos: **400** para lectura, navegación habitual y metadatos; **600** para titulares, énfasis y acciones principales. El rango del archivo variable no autoriza a introducir otros pesos por defecto.

La escala BMW de **64, 48, 32, 24, 20, 18, 16 y 14 px** organiza los roles. Se adapta con `clamp()` y un extremo de 40px para el titular de Home en móvil. No es obligatorio utilizar cada paso en cada página.

Los valores siguientes corresponden al CSS actual con raíz de 16px. Se utiliza `rem` para respetar las preferencias de tamaño de texto del navegador.

| Rol | Token / tamaño implementado | Interlineado | Peso |
|---|---|---|---|
| Display de Home | `--font-size-display`: `clamp(2.5rem, 1.5rem + 4vw, 4rem)` · 40–64px | 1.05 | 600 |
| H1 interior | `--font-size-heading-lg`: `clamp(2rem, 1.5rem + 2vw, 3rem)` · 32–48px | 1.1 | 600 |
| H2 / proyecto destacado | `--font-size-heading-md`: `clamp(1.5rem, 1.25rem + 1vw, 2rem)` · 24–32px | 1.25 | 600 |
| H3 / áreas de práctica | `--font-size-heading-sm`: `clamp(1.125rem, 1rem + 0.4vw, 1.25rem)` · 18–20px | 1.4 | 600 |
| Título de tarjeta secundaria | mismo token de 18–20px | 1.3 | 600 |
| Introducción / lead | `--font-size-lead`, comparte el tamaño de heading-sm · 18–20px | 1.55 | 400 |
| Cuerpo / valores de ficha / campos | `--font-size-body`: `1rem` · 16px | 1.55 | 400 |
| Categorías, etiquetas, fechas, legal y pies | `--font-size-caption`: `0.875rem` · 14px | 1.55 | 400 |
| Navegación de escritorio | 14px | 1.4 | 400; sección actual 600 |
| Botón principal | 16px | 1.25 | 600 |
| Acción «Ver proyecto» / CV | 16px | 1.55 | 600 |
| Enlace a siguiente proyecto | 24–32px | 1.15 | 600 |
| Menú móvil | 24–32px | 1.15 | 400; sección actual 600 |

Tracking habitual normal; énfasis `0.005em`. El display de Home utiliza `-0.02em` para equilibrar General Sans a gran escala. El rótulo del carrusel usa `0.02em`, sin mayúsculas decorativas. La distinción de roles procede primero de tamaño, peso, contraste y proximidad.

El cuerpo se limita a **65ch**; los leads, a **44ch**. Home limita su titular a 18ch; About a 25ch y las fichas a 36ch. No se fuerzan saltos manuales ni se reduce el texto para encajar un título largo.

## 3. Escala espacial y ritmo

Referencia principal: **4, 8, 12, 16, 24, 32, 48 y 80px**. Los tokens `--space-1/2/3/4/6/8/12/20` expresan estos pasos sobre una base de 4px.

| Relación | Implementación |
|---|---|
| Página: margen horizontal | `--page-gutter`: `clamp(1.5rem, 3.333vw, 5rem)` · 24–80px |
| Separación de capítulos | `--section-gap`: `clamp(3rem, 6vw, 5rem)` · 48–80px |
| Titular e introducción | `--intro-gap`: `clamp(1rem, 2vw, 1.5rem)` · 16–24px |
| Párrafos y explicación inmediata | `--copy-gap`: 16px |
| Separación de columnas / medios | `--grid-gap`: `clamp(1.5rem, 3vw, 3rem)` · 24–48px |
| Encabezado de sección y contenido / grupos relacionados | 24px |
| Título de proyecto y categoría / etiqueta y valor | `--metadata-gap`: 8px |
| Imagen y pie | 12px |
| Imagen de tarjeta y texto / categoría y acción | 16px; destacado 16–24px hasta el texto |
| Etiqueta y campo | 8px |
| Grupos del formulario | 24px |
| Cabecera y comienzo del contenido | `clamp(2rem, 4vw, 4rem)` · 32–64px |
| Margen superior e inferior de página | `clamp(1.5rem, 3vw, 3rem)` · 24–48px |
| Distancia mínima al footer | 48–80px, incluyendo el gap de body |

### Cómo decidir una distancia

1. **Agrupar antes de separar.** Una etiqueta y su valor forman una unidad; una imagen y la explicación asociada, una relación intermedia; un nuevo capítulo necesita una pausa mayor.
2. **Combinar proximidad y alineación.** No empujar un enlace al fondo si rompe la pertenencia al texto. El carrusel prioriza proximidad por debajo de 1024px y alinea acciones desde ese ancho.
3. **Evitar acumulaciones accidentales.** Contar conjuntamente `gap`, margen, padding y divisores. El footer y los grupos de About descuentan la separación que ya aporta el contenedor.
4. **Evaluar el resultado óptico.** El blanco dentro de un mockup pertenece a la imagen. No compensarlo automáticamente con CSS ni imponer proporciones matemáticas universales.
5. **Respetar vacíos intencionales.** No llenar columnas con decoración, ni aumentar todos los gaps para simular una estética premium.

Home es una excepción editorial explícita: 16px entre titular y lead, 48–80px hasta el destacado cuando se apilan, 32px antes y después del divisor que precede al carrusel y 24px del rótulo al medio, contando el espacio reservado para el foco. Esta relación diferencia pertenencia y cambio de capítulo sin sumar dos pausas grandes.

## 4. Paleta oscura implementada

| Rol | Valor / token |
|---|---|
| Fondo principal | `--bg-dark`: `#181818` |
| Campos / superficie secundaria | `--bg`: `#242424` |
| Texto principal | `--text`: `#F5F5F3` |
| Texto secundario | `--text-muted`: `#B7B7B2` |
| Acento de marca / navegación actual | `--accent`: `#93AECF` |
| Hover del acento | `--accent-hover`: `#A9BED9` |
| Botón pulsado | `--accent-active`: `#7E9DBC` |
| Texto sobre acento | `--text-on-accent`: `#181818` |
| Borde de controles | `--border-control`: `#737373` |
| Divisores no interactivos | `--border-subtle`: `#424242` |
| Error | `--color-error`: `#E6A19A` |
| Confirmación | `--color-success`: acento de marca; el resultado también se comunica por texto |

Estos valores son decisiones implementadas; los anteriores candidatos exploratorios de fondos y grises no constituyen otra paleta pendiente de aplicar.

El acento se reserva a acciones, navegación activa, foco y selección. No se añaden grandes superficies azules ni se altera el color de los originales. Las fotografías pueden aportar fondos claros y otros colores.

El azul ofrece aproximadamente 7,78:1 sobre el fondo principal y 6,80:1 sobre la superficie de campos. Los botones emplean texto oscuro, no blanco. Revisar al menos 4,5:1 para texto normal y 3:1 para texto grande e indicadores funcionales. Los divisores tenues son estructura, no controles.

Los enlaces independientes parten de texto secundario y cambian al acento; proyectos, CV, siguiente proyecto y enlaces dentro de párrafo parten del acento y aclaran en hover/foco. Los enlaces inline conservan subrayado para identificarse sin depender solo del color. La sección actual añade peso 600 y `aria-current`. Todos los controles conservan un foco de 2px y separación suficiente.

## 5. Geometría y componentes

- **0px** en fotografías, vídeos, tarjetas editoriales y botón principal: bordes rectos, sin cajas flotantes ni sombras decorativas.
- **2px** (`--border-radius-in`) en campos, como suavizado funcional. No se añade redondeo de 4px o más sin una necesidad concreta; los controles nativos de vídeo conservan su forma funcional.
- Bordes y divisores de 1px. Evitar multiplicar líneas cuando el espacio ya comunica separación.
- Botón principal: mínimo 48px de alto, padding vertical 12px e inline 32px. Hover claro y estado pulsado más oscuro; no se desplaza ni escala.
- Campos: texto de 16px, padding 12px/16px y mínimo 48px; la altura efectiva incluye línea y borde. Textarea permite redimensionar verticalmente.
- Logo, navegación, menú y enlaces del footer tienen objetivos de al menos 44px de alto. Las áreas de foco no deben recortarse.
- Flechas de proyecto en SVG de 1em con trazo de 1.5, decorativas y excluidas del árbol accesible.
- Una tarjeta relaciona imagen, título, categoría y acción; no necesita fondo, borde o sombra propios. En móvil mantiene enlace de celda completa; en escritorio imagen y acción siguen siendo accesos separados.

## 6. Composición y responsive

Retícula editorial compartida de **dos mitades iguales**, con el gap fluido de 24–48px. Las columnas organizan el contenido, sin imponerlas cuando el ancho no permite leer con comodidad. No se adopta el máximo de 1200px de BMW: la página conserva márgenes fluidos y límites locales de lectura/medios.

### Home

Desde **1024px**, presentación a la izquierda y proyecto destacado a la derecha, con imagen, título, categoría y acción apilados y alineados al inicio. Por debajo se conserva el orden presentación → destacado → carrusel.

El destacado conserva imagen 2:1 y un máximo de anchura de 88dvh en escritorio, equivalente a 44dvh de altura. El carrusel usa imágenes 2:1 y tarjetas con límite de 74dvh de anchura: la altura disponible restringe medios, no los espaciados de toda la web. Así el destacado mantiene jerarquía en ultrawide sin expulsar toda señal del contenido siguiente.

Se mantienen scroll nativo, arrastre y teclado, sin flechas ni barra decorativa. La pista llega al borde derecho. Fórmula de unas 1,5 tarjetas en móvil, 2,5 desde 755px y 3,5 desde 2048px; el límite de anchura de tarjeta puede permitir ver más en pantallas especialmente amplias. El número visible no es un requisito rígido.

### About

Introducción y retrato, después trayectoria y experiencia, en mitades iguales desde 1024px. Las tres áreas de práctica utilizan tercios iguales en escritorio. Por debajo, flujo de una columna: introducción/retrato → trayectoria → experiencia → áreas. Las descripciones y los proyectos de cada área forman un grupo natural, sin distribución forzada al fondo.

### Contact

Se conserva una columna de lectura para título, introducción, formulario y legal; en escritorio ocupa la mitad izquierda. La derecha vacía es una decisión compositiva, no un hueco que deba llenarse. En tablet y móvil se usa la anchura disponible y se mantiene el orden de teclado.

### Fichas

Título y ficha breve preceden a los medios. Metadatos alineados al inicio: una columna en móvil; desde **600px**, dos columnas y Deliverables en la fila siguiente; desde **1024px**, tres columnas iguales. Se evita el estrechamiento prematuro de My role.

Desde 1024px, reto e imagen comparten mitades; decisiones y resultado permanecen en el eje izquierdo y las galerías mantienen dos columnas. Las galerías ya pueden usar dos columnas desde 600px. Se conservan las proporciones responsive y originales existentes, los recortes aprobados y las pausas de las imágenes impares.

Una galería con un único vídeo ocupa la retícula y se limita a **70rem / 1120px**: la animación de Salud necesita una escala que permita apreciar sus textos. Sus pósters se obtienen del propio material o de miniaturas existentes; no se inventan imágenes ni se modifican los originales.

El cierre mantiene siguiente proyecto/selección a la izquierda e invitación a contactar sobre el eje derecho, alineada abajo. En móvil se apila.

## 7. Movimiento, interacción y accesibilidad

Movimiento discreto y elegante, que no compite con el trabajo. Preset `data-reveal="rise"`: **0,65s**, desplazamiento de **16px**, pasos de **0,1s** con secuencia limitada por JS y curva `cubic-bezier(0.16, 1, 0.3, 1)`. Interacciones de color/brillo: **0,2s**. Las filas del menú conservan su secuencia corta, sin nuevos efectos o librerías.

- `prefers-reduced-motion: reduce` muestra las entradas directamente, elimina desplazamientos del menú y errores y solicita scroll inmediato. Cambiar la preferencia no vuelve a animar contenido ya leído.
- Los vídeos no declaran autoplay directo en HTML: `data-autoplay` permite iniciarlos solo con preferencia normal. Con reduce se pausan, sin loop, conservando controles y reproducción manual. No se reanudan contra la pausa del visitante al restablecer movimiento normal.
- El contenido es visible por defecto sin JS; los vídeos quedan manuales y el formulario conserva validación nativa.
- Mantener labels, restricciones HTML, asociaciones dinámicas de errores, foco al primer campo inválido y mensajes completos mediante región viva. No depender solo de rojo/azul ni borrar prematuramente el resultado.
- Comprobar reflow, teclado y foco visible al cambiar componentes. No sacrificar accesibilidad para compactar una composición.

## 8. Uso del manual y referencias

Este manual describe el sistema aplicado; `assets/css/style.css` es su implementación técnica y `AGENTS.md` define procedimiento, alcance, comprobaciones y Git. Los cambios solicitados se resuelven integralmente y con autonomía dentro de su alcance, conservando contenido y funcionalidad ajenos.

La escala tipográfica y espacial de BMW es la base preferente, no una obligación de copiar todos sus componentes o cada detalle numérico. Las fuentes BMW, pesos 300/700, paleta blanca/corporativa, tamaños 12/13px, mayúsculas y radios mayores siguen siendo referencias conceptuales **no adoptadas**. No son propuestas pendientes de implementación.

Las decisiones nuevas se evalúan por jerarquía, proximidad, alineación, ritmo, equilibrio imagen-tipografía, identidad, responsive, accesibilidad y mantenimiento. Una captura o detector sin advertencias no certifica calidad ni accesibilidad completas.

Verificar de forma proporcionada y representativa, ampliando solo ante un problema o un riesgo. No crear nuevas escalas paralelas, informes extensos o excepciones por página cuando una solución compartida comunica mejor.

**El sistema debe proporcionar consistencia. El criterio debe proporcionar carácter.**

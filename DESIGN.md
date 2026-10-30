# DESIGN.md
## Visual Identity & Design System

**Proyecto:** Portfolio personal de diseño gráfico, fotografía y dirección visual  
**Versión:** 1.0 — Dirección artística aprobada  
**Estado:** Manual de diseño para orientar el desarrollo. No autoriza cambios automáticos en la web.  
**Referencia conceptual:** BMW Style Reference, recopilada por RICOUI.

---

# 01. Design Philosophy

## Precisión editorial. Expresión con criterio.

El portfolio es un espacio para presentar trabajo creativo desde una perspectiva personal. Debe transmitir sensibilidad visual, precisión, confianza y atención al detalle.

Su identidad combina la disciplina de un sistema de diseño bien construido con la expresividad de una publicación editorial contemporánea.

**El orden proporciona claridad. La composición aporta personalidad.**

La interfaz no debe competir con los proyectos ni convertirse en una sucesión de componentes genéricos. Cada decisión de tipografía, color, proporción, alineación o espaciado debe contribuir a la narrativa visual.

### Principios fundamentales

1. **Editorial, no corporativo.** El portfolio puede inspirarse en la precisión de marcas como BMW, pero debe conservar el carácter de un profesional creativo independiente.
2. **Expresivo, no caótico.** Se permiten asimetrías, variaciones de escala y composiciones inesperadas cuando aportan intención visual.
3. **Minimalista, no vacío.** Eliminar lo innecesario sin empobrecer el contenido ni convertir todos los elementos en composiciones excesivamente austeras.
4. **Coherente, no uniforme.** Los componentes deben compartir un lenguaje visual, pero no tienen que repetir siempre las mismas proporciones o separaciones.
5. **Preciso, no mecánico.** Las decisiones deben responder a relaciones perceptivas, no únicamente a una escala numérica.
6. **Contenido protagonista.** Las imágenes, los proyectos y la tipografía comparten la responsabilidad de comunicar.

### Personalidad visual

- Editorial
- Contemporánea
- Sobria
- Expresiva
- Precisa
- Elegante
- Deliberada

La personalidad debe surgir del conjunto, no de añadir elementos decorativos.

---

# 02. Color System

## Una identidad oscura, con un acento reconocible

El portfolio utiliza una dirección predominantemente oscura. Los fondos neutros funcionan como un lienzo que permite destacar fotografías, vídeos, tipografía y composiciones editoriales.

El color se utiliza de forma selectiva.

### Color de acento aprobado

**Azul grisáceo: `#93AECF`**

Este color constituye la dirección cromática elegida para la marca.

Debe transmitir sofisticación, serenidad y contemporaneidad, evitando tanto la intensidad corporativa del azul BMW original como una estética tecnológica excesivamente llamativa.

### Roles cromáticos

| Rol | Dirección de diseño | Estado |
|---|---|---|
| Acento principal | `#93AECF` | Color aprobado |
| Fondo principal | Negro suave o gris muy oscuro | Mantener valor CSS actual hasta validación |
| Superficie secundaria | Tono oscuro diferenciado sutilmente del fondo | Pendiente de validar |
| Texto principal | Blanco suave de alto contraste | Mantener valor CSS actual hasta validación |
| Texto secundario | Gris claro equilibrado | Pendiente de validar |
| Bordes y divisores | Gris discreto, sin excesivo protagonismo | Pendiente de validar |
| Estados de éxito/error | Colores funcionales accesibles | Mantener sistema actual hasta revisión |

Como referencia exploratoria, pueden estudiarse `#10141B` para el fondo, `#1A212B` para superficies, `#F4F6F9` para texto y `#BEC8D6` para texto secundario.

**Estos cuatro valores son candidatos, no colores aprobados ni instrucciones para modificar el CSS.**

### Color usage

**Do**

- Utilizar el azul como acento para enlaces, navegación activa, acciones y detalles relevantes.
- Mantener superficies amplias predominantemente neutras.
- Asegurar contraste suficiente en textos, controles y estados de interacción.
- Conservar la integridad cromática de las fotografías y proyectos.
- Permitir fondos claros puntuales cuando el contenido o la intención editorial lo justifiquen.

**Don't**

- No introducir azul en grandes superficies por simple decoración.
- No convertir cada tarjeta o sección en un bloque de fondo diferente.
- No aplicar degradados sin una intención visual específica.
- No reproducir la identidad cromática de BMW.
- No sustituir todos los colores existentes sin una revisión visual completa.
- No depender exclusivamente del color para comunicar estados o acciones.

### Principio de contraste

El contraste debe facilitar la lectura y reforzar la jerarquía.

Comprobar como mínimo los requisitos WCAG AA aplicables. Para texto normal, buscar una relación de contraste de al menos 4.5:1; para texto grande, al menos 3:1; y para los indicadores visuales de controles que lo requieran, al menos 3:1.

El acento debe resultar reconocible sin dominar la composición.

---

# 03. Typography

## La tipografía como herramienta editorial

**Familia principal: General Sans.**

Conservar la familia tipográfica existente del portfolio.

La tipografía debe expresar claridad, contemporaneidad y precisión, pero también permitir composiciones con personalidad.

### Pesos

| Peso | Uso |
|---|---|
| 400 | Párrafos, información secundaria, categorías y contenidos habituales |
| 600 | Titulares, encabezados, elementos enfatizados y acciones que lo requieran |

Los pesos 300 y 700 presentes en la referencia BMW no se adoptan automáticamente.

Se puede estudiar un peso adicional cuando exista una necesidad real, pero no debe introducirse como recurso estético gratuito.

### Escala tipográfica de referencia

| Rol | Dirección de tamaño | Uso |
|---|---|---|
| Display | Aproximadamente 24–80 px | Titular principal de Home |
| Heading XL | Aproximadamente 24–40 px | H1 de páginas interiores |
| Heading L | Aproximadamente 18–32 px | Títulos de proyectos |
| Heading M | Aproximadamente 18–24 px | Encabezados de secciones |
| Body Lead | Aproximadamente 16–20 px | Textos introductorios |
| Body | 16 px | Texto editorial general |
| Caption | 14 px | Categorías, etiquetas y pies de imagen |

Estos valores reflejan los roles existentes y las escalas que estamos estudiando. **No sustituyen las variables tipográficas actuales ni constituyen nuevos tamaños obligatorios.**

### Typography guidelines

- Crear jerarquía mediante escala, peso, interlineado, longitud de línea y espacio.
- Priorizar diferencias de jerarquía claras frente a pequeñas variaciones arbitrarias.
- Evitar demasiados estilos para funciones equivalentes.
- Usar `clamp()` cuando aporte una transición fluida entre tamaños de pantalla.
- Mantener tamaños estables cuando la fluidez no proporcione una mejora.
- Evitar saltos bruscos entre breakpoints.
- Respetar la legibilidad al ampliar texto o utilizar zoom.
- Mantener un interlineado apropiado: más compacto en titulares grandes y cómodo en párrafos.
- No añadir tracking excesivo ni mayúsculas decorativas por defecto.
- Utilizar el ajuste de líneas de forma editorial, sin forzar composiciones poco naturales.

### Editorial hierarchy

Los titulares deben tener presencia, pero no dominar todos los componentes.

El texto introductorio debe sentirse unido a su titular. Las categorías y los metadatos deben estar claramente subordinados al contenido principal.

La tipografía puede generar tensión visual y carácter mediante cambios de escala, pero siempre debe conservar una lectura natural.

---

# 04. Spacing & Visual Rhythm

## El espacio es una relación, no un número

El espaciado constituye una de las principales herramientas de dirección artística del portfolio.

No debe utilizarse una separación idéntica entre elementos que cumplen funciones diferentes.

La distancia comunica pertenencia, continuidad, pausa y cambio de tema.

### Principio de proximidad

**Los elementos conceptualmente relacionados deben percibirse como un mismo grupo.**

La proximidad se determina mediante la relación semántica y la composición visual, no únicamente por la posición de los elementos en el HTML.

Se distinguen tres niveles:

**Relación inmediata**

Elementos que construyen una sola unidad de información.

Ejemplos:
- Título y descripción.
- Nombre de proyecto y categoría.
- Etiqueta y valor.
- Imagen y pie de foto.

**Relación intermedia**

Elementos relacionados que cumplen funciones visuales diferentes.

Ejemplos:
- Presentación personal y selección de proyectos.
- Descripción de proyecto y acción para acceder a él.
- Texto explicativo y galería relacionada.

**Separación de capítulo**

Elementos que representan una transición narrativa.

Ejemplos:
- La introducción personal y la selección de proyectos.
- Secciones editoriales independientes.
- El final de una galería y el inicio de otro capítulo.

Por norma general, los espacios internos de un grupo deben ser menores que los espacios entre grupos, sin imponer una proporción matemática universal.

### Escala de referencia

La escala inspirada en BMW y compatible con la dirección actual del portfolio es:

| Paso | Valor de referencia |
|---|---|
| 1 | 4 px |
| 2 | 8 px |
| 3 | 12 px |
| 4 | 16 px |
| 5 | 24 px |
| 6 | 32 px |
| 7 | 48 px |
| Especial | 80 px |

El valor de 80 px puede utilizarse para transiciones editoriales amplias cuando la composición lo requiera. No es una separación obligatoria entre todas las secciones.

El sistema CSS existente sigue siendo la fuente técnica de los valores implementados.

### Reglas de ritmo visual

1. **Agrupar antes de separar.** Identificar primero qué elementos pertenecen a la misma unidad.
2. **Crear contraste espacial.** Diferenciar las pausas pequeñas, medias y grandes según el significado del contenido.
3. **Equilibrar proximidad y alineación.** Una alineación perfecta no justifica un vacío excesivo entre elementos relacionados.
4. **Respetar el espacio negativo.** Algunos vacíos aportan intención editorial y no deben eliminarse.
5. **Evitar espacios acumulados accidentalmente.** Revisar las combinaciones de `gap`, `margin`, `padding`, bordes y distribución automática.
6. **No confundir imagen y contenedor.** El blanco dentro de una fotografía o mockup pertenece al contenido visual, no necesariamente al CSS.
7. **Valorar el resultado óptico.** Dos distancias CSS idénticas no siempre se perciben iguales.
8. **No aumentar todos los gaps para crear sensación de diseño premium.** El ritmo depende del contraste entre proximidad y separación.

### Espaciado responsive

El espaciado debe adaptarse con naturalidad entre móvil, tablet y escritorio.

Utilizar `clamp()` cuando permita una progresión razonable y mantener valores fijos donde resulte más apropiado.

Evitar cambios excesivos al cruzar breakpoints, especialmente cuando afectan a espacios estructurales compartidos.

No depender de unidades relacionadas con la altura del viewport para todos los espaciados. Reservarlas para situaciones en las que la altura disponible sea realmente relevante.

### Sistema de tokens

Preferir:

- Una escala base reutilizable.
- Un conjunto reducido de tokens semánticos.
- Excepciones locales justificadas.

No crear una variable nueva para cada elemento si varios componentes comparten realmente una misma relación visual.

Tampoco forzar a compartir una variable a elementos que deban evolucionar de forma independiente.

---

# 05. Geometry & Shapes

## Geometría precisa

La geometría aprobada para el portfolio se basa en bordes rectos, líneas claras y formas contenidas.

Las imágenes y composiciones editoriales deben conservar una apariencia precisa.

### Border radius

| Valor | Criterio |
|---|---|
| 0 px | Opción preferente para imágenes, tarjetas editoriales y contenedores |
| 2–4 px | Suavizado funcional y discreto |
| 8 px | Excepción para controles específicos |
| 12 px o más | Requiere justificación de diseño |
| Pill | Reservado a componentes cuya función lo necesite |

Estos valores son referencias de uso, no una orden de modificar los radios existentes.

### Shape guidelines

**Do**

- Priorizar geometrías limpias y deliberadas.
- Mantener consistencia dentro de una misma familia de componentes.
- Utilizar divisores finos cuando faciliten la estructura.
- Conservar áreas interactivas suficientemente amplias.

**Don't**

- No redondear automáticamente todos los componentes.
- No introducir tarjetas flotantes por defecto.
- No añadir sombras grandes para simular profundidad.
- No multiplicar bordes, fondos o contenedores cuando el espacio ya establece la separación.
- No recortar estados de foco o controles por motivos puramente estéticos.

---

# 06. Layout & Composition

## Orden sin rigidez

La composición del portfolio debe ser **editorial y expresiva**, apoyada en una estructura rigurosa.

Las retículas proporcionan orden. Las asimetrías intencionales aportan carácter.

El objetivo no es crear una interfaz perfectamente simétrica, sino una composición equilibrada donde cada elemento parezca colocado deliberadamente.

### Composition guidelines

- Utilizar retículas claras como estructura de partida.
- Permitir asimetrías cuando refuercen la narrativa visual.
- Respetar alineaciones importantes y ejes compartidos.
- Introducir variaciones de escala de forma consciente.
- Utilizar el espacio negativo para crear ritmo y protagonismo.
- Evitar repetir siempre módulos con idénticas proporciones.
- No centrar automáticamente todos los elementos.
- Evitar columnas vacías que no tengan una intención compositiva.
- Preservar las proporciones de los medios y los contenidos originales.

### Editorial balance

La composición debe poder alternar momentos compactos con espacios más abiertos.

Una sección con mucha información puede necesitar un ritmo diferente al de una fotografía protagonista.

Las composiciones no deben quedar determinadas exclusivamente por una escala de espaciado o por la comodidad de una retícula CSS.

---

# 07. Imagery & Content

## Equilibrio entre imagen y tipografía

La imagen y la palabra comparten protagonismo.

Las fotografías, los vídeos y los mockups deben presentar el trabajo con claridad y sensibilidad. Los textos deben aportar contexto y personalidad sin convertirse en acompañamientos secundarios.

### Imagery guidelines

- Mantener el equilibrio general entre contenidos visuales y tipográficos.
- Permitir imágenes grandes e inmersivas cuando un proyecto lo justifique.
- Respetar los formatos y proporciones originales salvo decisión editorial expresa.
- Evitar recortes que debiliten la intención de una fotografía.
- No introducir fondos decorativos para rellenar espacios innecesariamente.
- Conservar el espacio negativo incorporado a los propios mockups.
- Mantener una continuidad reconocible entre imágenes de una misma serie.
- Permitir variaciones de composición en las fichas sin perder coherencia global.

### Project storytelling

Cada proyecto debe tener una narrativa visual propia dentro de un sistema compartido.

El sistema debe ser suficientemente flexible para presentar trabajos de identidad, fotografía, diseño editorial, vídeo y otras disciplinas sin obligarlos a seguir una plantilla rígida.

---

# 08. Components

## Navigation

La navegación debe ser clara, discreta y funcional.

- Mantener una jerarquía de enlaces sencilla.
- Identificar la página activa con claridad.
- Conservar una navegación accesible mediante teclado.
- Evitar estados de interacción excesivamente llamativos.
- Revisar el menú móvil como una composición propia, no como una mera reducción de la navegación de escritorio.

## Project Cards

Las tarjetas deben comunicar una relación clara entre:

1. Imagen.
2. Título.
3. Categoría.
4. Acción.

Las distancias deben reforzar la pertenencia entre estos elementos.

En composiciones amplias puede priorizarse la alineación de acciones entre tarjetas. En pantallas estrechas debe valorarse especialmente la proximidad de cada enlace al contenido correspondiente.

No debe mantenerse una alineación uniforme si provoca espacios que deshacen la agrupación visual.

Tampoco debe eliminarse una alineación útil sin comparar las consecuencias sobre el conjunto.

## Project Detail Pages

Las fichas deben compartir una estructura reconocible y una jerarquía consistente.

- Agrupar título y metadatos.
- Relacionar claramente explicación e imágenes.
- Diferenciar el espacio dentro de una galería del espacio entre capítulos.
- Utilizar pausas editoriales para señalar cambios de contenido.
- Mantener la continuidad entre proyectos sin perder la personalidad de cada uno.

## Buttons & Links

Las acciones deben ser reconocibles y estar visualmente relacionadas con el contenido al que pertenecen.

- Priorizar simplicidad y claridad.
- Utilizar el azul de acento de forma selectiva cuando se apruebe su implementación.
- Evitar botones de apariencia excesivamente genérica.
- Mantener foco visible y contraste suficiente.
- No reducir las áreas interactivas para conseguir una composición más compacta.

## Forms

Los formularios deben organizar claramente:

- Etiqueta.
- Campo.
- Ayuda o error.
- Acción de envío.
- Estado de respuesta.
- Información legal o complementaria.

La distancia entre estos elementos debe expresar sus relaciones.

Evitar huecos producidos por elementos de estado vacíos, sin comprometer el espacio necesario cuando aparezcan mensajes de error o confirmación.

## Dividers

Los divisores marcan estructura y cambios de capítulo.

Utilizarlos cuando refuercen la lectura, no para decorar bloques que ya se diferencian suficientemente mediante espacio.

La distancia antes y después de una línea puede ser asimétrica cuando ayude a agrupar el título siguiente con su contenido.

---

# 09. Motion & Interaction

## Movimiento con intención

El movimiento debe ser discreto, elegante y fluido.

Su objetivo es acompañar la navegación, mejorar la percepción de calidad y facilitar la comprensión de los cambios de estado.

La animación nunca debe competir con las fotografías o la tipografía.

### Motion guidelines

- Priorizar transiciones suaves y breves.
- Utilizar apariciones sutiles cuando aporten continuidad.
- Mantener coherencia entre componentes semejantes.
- Evitar efectos exagerados o repetitivos.
- Reservar movimientos editoriales expresivos para momentos concretos donde estén justificados.
- Respetar `prefers-reduced-motion`.
- Evitar animaciones que interfieran con el foco, el scroll o la navegación.
- No introducir librerías de animación sin una necesidad real y autorización.

El movimiento debe sentirse cuidado, no demostrativo.

---

# 10. Responsive Design

## Adaptar la composición, no solo reducir sus dimensiones

Móvil, tablet y escritorio son contextos de diseño diferentes.

Cada uno necesita conservar la identidad visual, pero puede requerir una organización específica del contenido.

### Responsive guidelines

- Evaluar la jerarquía visual en cada formato.
- Priorizar la legibilidad y la continuidad de lectura.
- Reorganizar columnas cuando mejore la comprensión del contenido.
- Evitar desbordamientos y cortes accidentales.
- Revisar tamaños de tipografía, saltos de línea y espacios conjuntamente.
- Conservar el protagonismo de las imágenes sin comprometer su visualización.
- No introducir breakpoints arbitrarios si el contenido puede adaptarse de forma más natural.
- Comprobar los estados de navegación, interacción y foco.
- Revisar tanto vistas amplias como los anchos inmediatamente anteriores y posteriores a cada breakpoint relevante.

Los cambios responsive deben responder a necesidades de composición, no únicamente a categorías de dispositivo.

---

# 11. Anti-Patterns

## Qué debe evitar el diseño

El portfolio no debe adoptar patrones visuales genéricos solamente porque sean fáciles de generar.

### Evitar

- Gaps idénticos entre relaciones visuales diferentes.
- Grandes huecos causados accidentalmente por `margin: auto`, columnas o espacios acumulados.
- Alineaciones perfectamente uniformes que debiliten la proximidad.
- Exceso de tarjetas, bordes, sombras y superficies.
- Redondeos decorativos sin criterio.
- Degradados y efectos de brillo innecesarios.
- Uso excesivo del color de acento.
- Titulares grandes sin una jerarquía coherente.
- Diseños que dependen de un único tamaño de pantalla.
- Modificaciones globales para resolver problemas locales.
- Nuevas variables CSS sin necesidad real.
- Uniformidad visual confundida con consistencia.
- Complejidad innecesaria introducida para solucionar problemas pequeños.

### Preferir

- Composición deliberada.
- Agrupaciones claras.
- Ritmo espacial variado pero coherente.
- Tipografía con carácter y buena legibilidad.
- Fotografías protagonistas.
- Alineaciones precisas.
- Geometría contenida.
- Interacciones accesibles.
- Soluciones sencillas y mantenibles.

---

# 12. Design Review Method

## Cómo evaluar una nueva propuesta

Antes de aprobar un cambio de diseño, responder:

**01. Jerarquía**

¿Está claro qué elemento es el más importante y cuál debe leerse después?

**02. Proximidad**

¿Los elementos relacionados parecen pertenecer al mismo grupo?

**03. Alineación**

¿La composición mantiene suficiente orden sin imponer una rigidez innecesaria?

**04. Ritmo**

¿Existe una diferencia clara entre espacios internos, relaciones intermedias y cambios de sección?

**05. Equilibrio**

¿Las imágenes, los textos y el espacio negativo se compensan visualmente?

**06. Identidad**

¿La propuesta parece propia de este portfolio o podría pertenecer a cualquier plantilla genérica?

**07. Responsive**

¿La solución sigue funcionando cuando cambia el ancho, la altura o la longitud del contenido?

**08. Accesibilidad**

¿Se conservan legibilidad, contraste, navegación, foco y estados funcionales?

**09. Mantenimiento**

¿Puede implementarse utilizando el sistema existente, sin añadir complejidad innecesaria?

### Validación

Cuando sea posible:

1. Revisar el diseño actual.
2. Identificar el problema y su causa.
3. Proponer una solución justificada.
4. Comparar antes y después utilizando el mismo viewport y contenido.
5. Verificar móvil, tablet y escritorio.
6. Revisar las páginas que comparten los componentes afectados.
7. Documentar la decisión aprobada.

**Una auditoría automática sin advertencias no constituye una validación estética suficiente.**

---

# 13. Current Portfolio Decisions

## Soluciones recientes de proximidad visual

Las auditorías recientes de Home y About han servido para confirmar los siguientes criterios:

### Home

- El título principal y su introducción forman un mismo grupo al comienzo.
- Los seis proyectos comparten un único carrusel; no existe un proyecto destacado ni una jerarquía de principales y secundarios. Porsche abre la selección, seguido de Antilluvia, Salud, CUPRA, OutletCars y Luz natural.
- Una pausa editorial separa la presentación de la selección. El rótulo «Proyectos» («Selected work» en inglés) queda próximo a las imágenes que introduce, sin divisor entre proyectos.
- Todas las tarjetas comparten fotografía horizontal 2:1, título, categoría y acción, con una escala mayor para dar protagonismo al conjunto.

### Carrusel

- Se muestra aproximadamente una tarjeta y un cuarto en móvil, una y tres cuartos desde 755 px, dos y un cuarto desde 1024 px y dos y media desde 2048 px. La selección continúa hasta el borde derecho y deja ver parte de la siguiente tarjeta.
- No utiliza flechas ni barra visible. Conserva desplazamiento táctil y nativo, arrastre con ratón, navegación por teclado, foco visible y movimiento reducido.
- En móvil, toda la tarjeta permite acceder al proyecto. En escritorio, lo hacen la imagen y la acción.
- Prima la proximidad entre categoría y acción por debajo de 1024 px; desde 1024 px las acciones comparten el eje inferior.

Esta solución responde a la selección actual, **no es una regla universal para todos los carruseles futuros**.

### About

Las descripciones de las áreas de trabajo y los proyectos que las ejemplifican deben formar grupos coherentes.

No deben aparecer distancias muy diferentes entre relaciones equivalentes simplemente porque otras columnas contengan más texto.

### Estado de estas decisiones

Estos ajustes fueron implementados y comprobados por Codex durante la revisión de proximidad de octubre de 2026.

Antes de considerar sus valores CSS como definitivos, comprobar que corresponden a la versión de código efectivamente conservada y aprobada.

Este manual documenta los criterios de diseño, no sustituye el historial Git ni certifica que todos los cambios estén publicados.

---

# 14. External Design References

## Aprender de otras identidades sin reproducirlas

El BMW DESIGN.md recopilado por RICOUI constituye una referencia conceptual de:

- Disciplina de diseño.
- Sistemas de tokens.
- Jerarquía tipográfica.
- Geometría precisa.
- Escalas de espaciado.
- Claridad de componentes.
- Reglas de uso y consistencia.

No constituye una especificación oficial de este portfolio.

### Reglas de adaptación

- Estudiar los principios de una referencia antes de copiar sus valores.
- Conservar General Sans y la identidad editorial propia.
- No reproducir marcas, logotipos, imágenes ni elementos distintivos de terceros.
- No copiar automáticamente paletas completas, componentes o disposiciones.
- Comprobar las condiciones de uso de cualquier recurso externo que vaya a incorporarse.
- Priorizar siempre la coherencia con las decisiones aprobadas del portfolio.

**Las referencias externas inspiran. Este documento define la dirección artística.**

---

# 15. Implementation & Governance

## Relación con el código y las herramientas

### DESIGN.md

Define la intención visual, los principios de dirección artística y las decisiones de diseño aprobadas.

### AGENTS.md

Define cómo debe trabajar Codex: procedimientos, herramientas, permisos, seguridad, comprobaciones y operaciones Git.

### CSS y componentes

Contienen la implementación efectiva de colores, tipografía, espaciados, geometría y comportamiento responsive.

### Impeccable

Sirve para analizar la calidad visual, composición, jerarquía, proximidad y ritmo.

### Frontend Craft

Sirve para desarrollar y mantener correctamente la interfaz.

## Reglas de aplicación

- Consultar este documento antes de proponer o implementar cambios visuales.
- Interpretar los principios en relación con el contenido y la composición real.
- No tratar las escalas orientativas como órdenes para sustituir valores actuales.
- No modificar colores, tipografía o estructura sin autorización cuando el cambio altere decisiones visuales existentes.
- Preferir cambios pequeños, coherentes y verificables.
- Evitar duplicidades entre DESIGN.md, AGENTS.md y CSS.
- Documentar las decisiones de diseño aprobadas que deban mantenerse en futuros trabajos.
- Solicitar aclaración cuando exista una contradicción importante entre las directrices y el diseño existente.

### Prioridad de la información

- Las decisiones y autorizaciones explícitas del usuario determinan el trabajo permitido.
- AGENTS.md rige el procedimiento de trabajo y la seguridad.
- DESIGN.md orienta las decisiones visuales.
- El CSS refleja los valores implementados, que deben verificarse antes de cambiarlos.

Si DESIGN.md describe una dirección todavía no implementada, Codex debe señalar esa diferencia; no debe corregir automáticamente el código para hacerlos coincidir.

## Estado de las decisiones

**Dirección artística aprobada**

- Identidad predominantemente oscura.
- Azul grisáceo `#93AECF` como dirección de acento.
- General Sans como tipografía principal.
- Geometría precisa y bordes preferentemente rectos.
- Composición editorial y expresiva con estructura rigurosa.
- Equilibrio entre imagen y tipografía.
- Home con introducción y un único carrusel de proyectos de igual jerarquía, sin destacado.
- Movimiento discreto y elegante, con excepciones justificadas.
- Proximidad, alineación y ritmo visual como criterios conjuntos.

**Pendiente de validación técnica y visual**

- Valores definitivos de fondos y colores secundarios.
- Estados cromáticos y contraste del nuevo azul.
- Escalas tipográficas y fórmulas `clamp()` definitivas.
- Revisión de tokens existentes y correspondencia con los roles del manual.
- Ajustes de radios o componentes que todavía no hayan sido aprobados.
- Incorporación efectiva del nuevo color de acento al portfolio.

Ninguno de estos puntos pendientes constituye una autorización para modificar la web.

---

# 16. Final Design Principle

**Diseñar con intención, no por repetición.**

El portfolio debe transmitir la sensibilidad de una persona que entiende la tipografía, la fotografía, la composición y el espacio.

Las decisiones de diseño deben ser precisas sin resultar previsibles, expresivas sin convertirse en ruido y coherentes sin perder personalidad.

La calidad visual no se consigue aplicando sistemáticamente más espacio, más tamaño, más contraste o más efectos.

Se consigue entendiendo qué necesita cada elemento y cómo contribuye al conjunto.

**El sistema debe proporcionar consistencia. El criterio debe proporcionar carácter.**
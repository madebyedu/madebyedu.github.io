# Idiomas y edición de textos

- La edición principal está en la raíz y declara `lang="es"`.
- La edición inglesa tiene las mismas páginas dentro de `en/` y declara `lang="en"`.
- Ambas comparten CSS, JavaScript, imágenes, vídeos y documentos de `assets/`.
- `assets/js/language.js` se carga antes del contenido. El primer idioma de `navigator.languages` determina la edición: `es` y todas sus variantes regionales abren castellano; cualquier otro idioma abre inglés. Si no hay una preferencia disponible, se usa castellano.
- La selección se aplica en cada entrada, incluidas las fichas de proyecto. Se conserva el proyecto de destino, los parámetros y el fragmento de la URL. Los proyectos utilizan nombres de archivo propios de cada idioma; sus equivalencias están en language.js y se documentan en docs/project-names.md. No hay selector ni preferencia manual guardada.
- La selección automática requiere JavaScript. Sin JavaScript se muestra la edición solicitada por su URL.

## Contenido

El usuario facilita toda la redacción y las traducciones. Un texto recibido en castellano se aplica a la edición castellana y uno recibido en inglés a la inglesa, atendiendo al contexto de la página y el elemento. No redactar ni traducir textos por iniciativa propia. Señalar los campos relacionados que necesiten contenido o revisión, como SEO, alternativas de imágenes o estados del formulario.

La estructura inglesa se ha creado a partir de las páginas existentes. El contenido todavía no proporcionado conserva la redacción anterior, aunque mezcle idiomas. La declaración del idioma identifica la edición de destino; no acredita que todos sus textos hayan sido revisados.

Los enlaces de navegación ingleses apuntan a `/en/…`; los castellanos a `/…`. Los recursos de `/assets/` son comunes. Los mensajes actuales de `app.js` siguen compartidos hasta que se proporcione contenido específico para ambos idiomas.

## Primera actualización aprobada

Home, título y párrafo de presentación: textos facilitados en castellano e inglés el 29 de octubre de 2026. Los textos SEO de Home y el resto de contenido continúan pendientes de revisión por el usuario. La auditoría de textos anterior es una fotografía histórica y no se regenera sobrescribiendo decisiones posteriores.

## Comprobaciones

Ejecutar `node --test scripts/test-language-routing.cjs` para verificar las rutas automáticas y la conservación de parámetros y fragmentos.

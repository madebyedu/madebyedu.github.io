# Trabajo en el portfolio

## Contexto

- La web está en esta carpeta (`01_live`): HTML, CSS y JavaScript nativos.
- Las páginas principales son `index.html`, `about.html` y `contact.html`; las fichas están en `projects/`.
- Los estilos compartidos están en `assets/css/style.css` y el comportamiento en `assets/js/app.js`.
- Mantén el diseño propio, el sistema visual y las convenciones existentes. No introduzcas Tailwind CSS ni migres el sistema de estilos.
- Usa Frontend Craft para implementar frontend e Impeccable cuando la tarea pida diseño o revisión visual, si están disponibles.

## Forma de trabajar

- Lee el estado de Git y los archivos relevantes antes de editar. Conserva los cambios pendientes que no pertenecen a tu tarea.
- Resuelve detalles rutinarios con criterio propio. Pregunta por decisiones de producto o diseño que cambien sustancialmente el resultado.
- Verifica los flujos afectados en navegador cuando sea posible, incluyendo móvil, escritorio, teclado y consola. No envíes el formulario real de contacto durante una prueba sin autorización.
- Usa las comprobaciones existentes y comprueba el diff. No presentes como ejecutadas pruebas que no has realizado.
- Al entregar, explica brevemente qué cambió, cómo lo comprobaste y qué falta verificar.
- No descargues ni ejecutes instaladores, binarios externos o scripts remotos sin autorización explícita del usuario.
- Antes de modificar permisos o introducir dependencias nuevas, justifica la necesidad y obtén la aprobación explícita del usuario.
- No incluyas contraseñas, tokens, claves API ni archivos de configuración privada en commits o publicaciones.
- Si detectas posibles credenciales expuestas, avisa al usuario y detén el trabajo hasta que indique cómo continuar.

## Delegación proporcionada

- Delega en un subagente solo cuando exista una tarea independiente y suficientemente acotada que justifique la coordinación. Para una edición pequeña, trabaja directamente.
- Para exploración o mantenimiento sencillo y claramente definido, solicita explícitamente `gpt-6.1-sol` con razonamiento `medium`.
- Limita la delegación de mantenimiento a un subagente simultáneo. Dale contexto breve, archivos concretos, objetivo, restricciones y criterio de finalización.
- Prefiere revisiones y exploración sin escritura. Si delegas cambios, asigna archivos distintos de los que edita el agente principal.
- El agente principal conserva las decisiones complejas, revisa el resultado y verifica la integración.
- Si no puedes elegir el modelo o el nivel solicitado en este cliente, indícalo y realiza tú la tarea; no afirmes un ahorro de consumo que no hayas medido.

## Versiones

- La rama de desarrollo es `dev`; `main` corresponde a la web publicada. Trabaja en `dev` salvo que el usuario pida otra rama. Integra cambios en `main` cuando el usuario solicite publicarlos.
- Comprueba el diff antes de guardar una versión.
- Crea commits con un propósito claro cuando guardar versiones forme parte de la tarea autorizada.
- Realiza push, pull con integración, merge o publicación cuando formen parte de la petición. No los ejecutes únicamente por haber terminado una edición local.
- Antes de realizar un push, un merge hacia `main`, una publicación, un borrado de ramas o cualquier operación potencialmente destructiva, solicita la confirmación explícita del usuario para esa operación.
- Nunca utilices force push sin autorización específica del usuario.
- Antes de una integración, revisa los cambios pendientes y resuélvela sin perder trabajo del usuario.

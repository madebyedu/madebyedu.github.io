# Trabajo en el portfolio

## Contexto

- La web está en esta carpeta (`01_live`): HTML, CSS y JavaScript nativos.
- Las páginas principales son `index.html`, `about.html` y `contact.html`; las fichas están en `projects/`.
- Los estilos compartidos están en `assets/css/style.css` y el comportamiento en `assets/js/app.js`.
- Mantén el diseño propio, el sistema visual y las convenciones existentes. No introduzcas Tailwind CSS ni nuevos frameworks, ni migres el sistema de estilos.

## Dirección artística por defecto

- Consulta y aplica proactivamente [DESIGN.md](DESIGN.md) al crear, modificar, mejorar o revisar cualquier parte visual o frontend del portfolio, sin esperar que el usuario lo mencione: HTML, CSS, componentes, responsive, navegación, formularios, tipografía, colores, espaciados, imágenes, composición, animaciones y estados interactivos.
- Utiliza el manual para tomar decisiones de dirección artística, no solo para cotejar valores CSS: composición editorial y expresiva, geometría precisa, proximidad Gestalt y agrupación semántica, jerarquía visual y tipográfica, equilibrio entre imagen y texto, ritmo espacial, alineaciones coherentes, espacio negativo equilibrado, movimiento discreto y elegante, coherencia responsive y accesibilidad.
- Evalúa las relaciones y el resultado visual real; evita soluciones genéricas o mecánicas, distancias idénticas para relaciones diferentes, redondeos arbitrarios y componentes decorativos innecesarios. Combina estos criterios con Frontend Craft e Impeccable según el apartado de skills, sin duplicar procesos ni ampliar revisiones triviales.
- Distingue decisiones artísticas aprobadas, valores técnicos efectivamente implementados, referencias orientativas y propuestas pendientes de validar. El manual no autoriza por sí mismo cambios en la web: no conviertas valores exploratorios ni diferencias con el CSS en órdenes de implementación.
- Dentro de una modificación visual autorizada, resuelve autónomamente los pequeños detalles necesarios siguiendo el manual y conservando el alcance pedido. Si la petición contradice una decisión importante de DESIGN.md, explica brevemente el conflicto y propone una alternativa coherente; antes de cambiar la dirección artística, alterar extensamente la composición o contradecir de forma relevante el diseño existente, presenta una propuesta y espera aprobación.
- Mantén `DESIGN.md` actualizado por iniciativa propia cuando una tarea autorizada cambie una decisión visual duradera, un patrón compartido o un criterio de composición. Documenta el resultado realmente implementado y comprobado, sin pedir un recordatorio ni ampliar el alcance; evita registrar ajustes triviales o propuestas como decisiones aprobadas.
- Aplica los criterios de alcance y responsive de este archivo: comprueba los elementos compartidos en todas las páginas pertinentes, incluidas las seis fichas de proyectos, y conserva la coherencia entre componentes y tamaños. No extiendas cambios específicos ni añadas rediseños ajenos a la petición.

## Skills por defecto

- Aplica estas reglas a las tareas del portfolio salvo indicación expresa del usuario; no es necesario que nombre o invoque Frontend Craft o Impeccable en cada petición.
- Utiliza Frontend Craft por defecto para programación frontend: HTML, CSS, JavaScript, estructura, componentes, funcionalidades, accesibilidad, rendimiento y mantenimiento.
- Utiliza Impeccable por defecto para diseño visual, maquetación, distribución, tipografía, colores, espaciados, jerarquía, responsive y revisión estética.
- Si la tarea combina programación y diseño, utiliza ambas de forma complementaria, repartiendo el trabajo y evitando comprobaciones duplicadas. No actives procedimientos completos innecesarios para cambios triviales.
- Comprueba su disponibilidad, lee las instrucciones pertinentes y utiliza sus capacidades reales. Si alguna no está disponible o no puedes ejecutarla, indícalo y continúa con las capacidades disponibles, sin afirmar que la has ejecutado. Su uso sigue sujeto a las autorizaciones de seguridad de este archivo.

## Alcance, impacto y coherencia

- Antes de editar código, identifica de forma proporcionada los archivos, páginas, componentes y dependencias que pueden verse afectados. No hagas una auditoría completa de la web para un cambio trivial.
- Interpreta los cambios de elementos compartidos como aplicables a todas sus apariciones equivalentes, salvo que el usuario limite su alcance. Busca sus usos en las páginas principales y en las fichas de `projects/` antes de modificar cabecera, navegación, footer, enlaces sociales, tipografías, colores, botones, estados interactivos, contenedores, espaciados, animaciones o comportamientos comunes.
- Para cambios globales, actualiza todas las páginas pertinentes y modifica preferentemente la definición común: variables, reglas CSS o lógica compartida. Evita estilos duplicados y soluciones distintas para elementos equivalentes.
- Para cambios específicos, limita la intervención a la página, sección o elemento solicitado y sus dependencias necesarias. Cambiar la estructura de Home no autoriza a reestructurar About o Contact ni a rediseñar toda la web.
- Conserva las diferencias intencionadas y los elementos y comportamientos ajenos a la tarea; no propagues cambios a páginas que no correspondan.

## Diseño responsive

- Toda modificación visual debe contemplar escritorio y móvil, salvo que el usuario la limite expresamente a un dispositivo o tamaño. Respeta los breakpoints y convenciones responsive existentes.
- Revisa tablets y tamaños intermedios cuando corresponda. Evita desbordamientos horizontales, superposiciones, espacios vacíos innecesarios y textos cortados; conserva la jerarquía visual entre tamaños.
- Comprueba menús, botones, enlaces, formularios y navegación cuando puedan verse afectados. Respeta la accesibilidad y las preferencias de movimiento reducido.

## Forma de trabajar

- Lee el estado de Git y los archivos relevantes antes de editar. Conserva los cambios pendientes que no pertenecen a tu tarea.
- Resuelve detalles rutinarios con criterio propio y las convenciones existentes. Realiza directamente los cambios pequeños, claros y reversibles cuando la petición autorice la modificación.
- Para rediseños importantes, cambios de arquitectura, decisiones que afecten a varias funcionalidades o ambigüedades importantes de producto, diseño o alcance, presenta una propuesta breve y espera la aprobación antes de editar.
- Verifica los flujos afectados en navegador cuando sea posible, incluyendo móvil, escritorio, teclado y consola. No envíes el formulario real de contacto durante una prueba sin autorización.
- Usa las comprobaciones existentes y comprueba el diff. No presentes como ejecutadas pruebas que no has realizado.
- Comprueba los archivos modificados y sus dependencias relevantes, y verifica la coherencia visual y funcional de los elementos compartidos en las páginas afectadas.
- Al entregar, explica brevemente qué archivos cambiaste, qué páginas se vieron afectadas, qué pruebas realizaste y qué falta verificar. No presentes una revisión de código como prueba visual o funcional ejecutada.
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
- Comprueba el diff antes de guardar una versión y verifica que el commit incluya exclusivamente los cambios autorizados.
- Crea commits con un propósito claro cuando el usuario los solicite o se aplique la autorización permanente para cambios de `AGENTS.md` descrita a continuación. La solicitud de un commit no autoriza un push, que requiere su propia solicitud y las confirmaciones existentes.
- Cuando `AGENTS.md` tenga cambios pendientes, revisa su diff y guárdalos automáticamente en un commit independiente en `dev`, incluyendo únicamente ese archivo. Esta regla constituye autorización permanente para ese commit, sin pedir una confirmación adicional.
- Si la misma tarea también modifica otros archivos, guarda sus cambios autorizados en uno o más commits separados del de `AGENTS.md`. No dejes ninguno de estos ajustes pendientes; conserva fuera de los commits los cambios ajenos a la tarea. Estos commits no autorizan un push ni una publicación.
- Cuando el usuario solicite crear un commit, redacta automáticamente un mensaje profesional en inglés siguiendo Conventional Commits. Selecciona el tipo apropiado según los cambios reales y utiliza un resumen breve y descriptivo. No pidas al usuario que redacte el mensaje. Respeta todas las restricciones de seguridad y publicación de este archivo.
- Realiza push, pull con integración, merge o publicación cuando formen parte de la petición. No los ejecutes únicamente por haber terminado una edición local.
- Antes de realizar un push, un merge hacia `main`, una publicación, un borrado de ramas o cualquier operación potencialmente destructiva, solicita la confirmación explícita del usuario para esa operación.
- Nunca utilices force push sin autorización específica del usuario.
- Antes de una integración, revisa los cambios pendientes y resuélvela sin perder trabajo del usuario.

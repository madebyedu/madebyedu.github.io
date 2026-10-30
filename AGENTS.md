# Trabajo en el portfolio

## Contexto

- La web está en esta carpeta (`01_live`): HTML, CSS y JavaScript nativos.
- Las páginas principales son `index.html`, `about.html` y `contact.html`; las fichas están en `projects/`.
- Los estilos compartidos están en `assets/css/style.css` y el comportamiento en `assets/js/app.js`.
- Mantén el diseño propio, el sistema visual y las convenciones existentes. No introduzcas Tailwind CSS ni nuevos frameworks, ni migres el sistema de estilos.

## Dirección artística y autonomía

- Aplica automáticamente [DESIGN.md](DESIGN.md) al trabajar en diseño visual, HTML, CSS, componentes o responsive. Úsalo para decidir jerarquía, composición, proporciones, proximidad Gestalt, ritmo, geometría, color, movimiento y accesibilidad; no solo para cotejar variables.
- BMW es una referencia estructural fuerte, adaptada a la identidad propia del portfolio. Distingue los valores implementados y aprobados de las referencias conceptuales; no copies su marca, fuentes o recursos.
- Cuando el usuario solicite una mejora o actualización, impleméntala de manera integral dentro del alcance autorizado. Resuelve conjuntamente tipografía, espaciados, color, retículas y componentes cuando dependan entre sí; prioriza estilos compartidos frente a parches locales.
- No te limites a analizar o proponer si se ha pedido implementar. No dividas artificialmente el trabajo en fases ni solicites confirmación para tamaños, gaps, radios u otras decisiones menores autorizadas.
- Consulta únicamente ante una ambigüedad importante, una contradicción sustancial no resuelta por la petición o un riesgo fuera del alcance autorizado. Las autorizaciones expresas del usuario prevalecen sobre las direcciones anteriores del manual; actualízalo cuando se solicite.

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
- Ejecuta las modificaciones autorizadas con criterio propio, conservando cambios ajenos y contratos existentes. No amplíes el alcance por iniciativa propia.
- Verifica de forma proporcionada: revisión visual breve de los elementos afectados para cambios de diseño, pruebas específicas para funcionalidad y comprobaciones relevantes para accesibilidad. Para publicación o cambios de alto riesgo, realiza una verificación más completa.
- Usa las comprobaciones existentes y revisa el diff. No generes capturas masivas, auditorías exhaustivas, informes largos ni pruebas repetidas por defecto; amplía la cobertura solo cuando el riesgo o un problema observado lo justifiquen. No envíes el formulario real durante pruebas sin autorización.
- Comprueba móvil, tamaños intermedios y escritorio cuando sean pertinentes, además de los componentes compartidos afectados. No confundas una revisión estática o automática con una prueba visual o con una certificación de accesibilidad.
- Entrega una respuesta concisa con cambios y decisiones importantes, archivos modificados, comprobaciones realizadas y problemas relevantes. Evita informes extensos salvo petición expresa.
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

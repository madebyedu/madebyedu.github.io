# Sistema de color

Dirección vigente: fondo oscuro neutro y acento azul.

## Distribución 60/30/10

La proporción orienta el peso visual de la interfaz, no constituye un recuento
literal de píxeles. Las fotografías, mockups y vídeos conservan su propia paleta.

| Peso aproximado | Rol | Colores | Aplicación |
|---|---|---|---|
| 60 % | Base dominante | `#181818`, `#242424` | Fondo, menú móvil y campos |
| 30 % | Neutros de apoyo | `#F5F5F3`, `#B7B7B2`, `#737373`, `#363636` | Texto, metadatos, bordes de campo y divisores |
| 10 % | Acento | `#8AB4F8`, hover `#B0CEFF` | Acción principal, enlaces a proyectos, CV, siguiente proyecto, enlaces dentro del texto, navegación actual, foco y selección |

El texto sobre el acento usa `#181818`. El azul principal contrasta 8,43:1 con
ese carbón; la variante hover, 11,09:1. Los errores conservan `#E6A19A` como
excepción funcional acompañada de texto. La confirmación de éxito reutiliza
el acento y se identifica mediante su mensaje.

## Imágenes enlazadas

- Escritorio con ratón, desde 755 px: brillo al 90 % en reposo y al 100 % al
  pasar el cursor o recibir foco de teclado. El 100 % es el brillo original,
  sin sobreexposición, capa blanca ni borde decorativo de hover.
- Móvil y dispositivos sin hover: brillo original permanente.
- Transición de 0,3 segundos, desactivada con movimiento reducido.
- El indicador de foco por teclado sigue visible para identificar el enlace.
- El efecto se aplica a miniaturas enlazadas; las imágenes de las fichas de
  proyecto mantienen su presentación original.

Los tokens y las reglas se definen en `assets/css/style.css`. El manifest usa
el mismo fondo carbón. El inventario de la auditoría del 29 de octubre de 2026
documenta el estado anterior y las propuestas previas.

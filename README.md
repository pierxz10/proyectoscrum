# Requerimientos y Gantt · Makro Chincha

## Estructura

- `Requerimientos y Gantt · Scrum Adaptativo · Makro Chincha.html`: página principal.
- `assets/css/styles.css`: estilos, colores y temas claro/oscuro.
- `assets/js/app.js`: Gantt, checks, calendario y registro diario de asistencia.

Abre el archivo HTML en un navegador. Los recursos CSS y JavaScript usan rutas relativas, así que deben mantenerse dentro de esta estructura.

## Asistencia

Selecciona el nombre y rol de quien registra su entrada. Se guarda una asistencia por persona y día, con la fecha local de Lima y la marca de tiempo exacta en formato ISO; el calendario muestra el historial ordenado por hora.

Sin un backend, las asistencias y los checks se guardan en el `localStorage` del navegador y no se comparten con otros dispositivos.

## Sincronización compartida

La página conserva el punto de integración `window.claude`: el servicio debe exponer `claude.use("db")` con una interfaz compatible con Firestore (`doc(...).set(...)` y `collection(...).onSnapshot(...)`). Los registros de asistencia se escriben en `asist/{AAAA-MM-DD}_u{rol}` y los cambios de checks en `marks/{id}`.

El servicio, la autenticación y sus reglas de acceso todavía deben configurarse antes de habilitar la sincronización entre dispositivos. No guardes credenciales privadas ni reglas que permitan escrituras públicas sin autorización en este repositorio.

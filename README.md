# Requerimientos y Gantt · Makro Chincha

## Estructura

- `Requerimientos y Gantt · Scrum Adaptativo · Makro Chincha.html`: página principal.
- `assets/css/styles.css`: estilos, colores y temas claro/oscuro.
- `assets/js/app.js`: Gantt, checks, calendario y registro diario de asistencia.
- `assets/js/firebase-config.js`: configuración pública del SDK web de Firebase.
- `firestore.rules`: reglas de acceso que deben publicarse en Firestore.

## Configuración de Firebase y sincronización

La aplicación ya está enlazada al proyecto Firebase `proyectoscrum-ffd53` y a su base Firestore Standard `(default)` en `northamerica-northeast1`. Con una sesión de equipo autorizada, Firestore comparte en tiempo real los checks, tareas por rol y asistencias entre todos los integrantes, independientemente de su rol.

1. En Firebase Authentication, habilita el proveedor **Correo/contraseña** y crea una cuenta para cada integrante. El inicio de sesión está habilitado en la página, pero no se permite el registro libre de cuentas.
2. Publica las reglas seguras de Firestore desde la raíz del proyecto:

   ```sh
   npx -y firebase-tools@latest deploy --only firestore:rules --project proyectoscrum-ffd53
   ```

3. Para cada cuenta del equipo, copia su UID de Authentication y crea `members/{UID}` desde la consola de Firestore con estos campos:

   | Integrante | `name` | `displayRole` | `role` |
   |---|---|---|---|
   | Piero | `Piero` | `Scrum Master` | `sm` |
   | María | `María` | `Product Owner` | `po` |
   | Airton | `Airton` | `Developer 1 · Front End` | `fe` |
   | Dayron | `Dayron` | `Developer 2 · Back End` | `be` |
   | Patricia | `Patricia` | `Stakeholder · QA` | `qa` |

   Agrega también `active` con valor booleano `true`. Solo las cuentas cuyo UID esté habilitado en `members` pueden iniciar sesión en el tablero.
4. En GitHub, activa **Settings → Pages → Source: GitHub Actions**. El workflow `.github/workflows/pages.yml` publicará el sitio al hacer push a `main`; la entrada es `index.html`. Agrega `pierxz10.github.io` en **Authentication → Settings → Authorized domains**. Mantén el archivo HTML, `assets/` y los scripts de Firebase juntos, con sus rutas relativas.

La configuración del SDK web en `assets/js/firebase-config.js` es pública y necesaria en el sitio estático. No agregues contraseñas, claves de cuentas de servicio ni otros secretos al repositorio.

## Uso y datos

- Cada cuenta queda asociada a su nombre y rol por el documento `members` verificado al iniciar sesión.
- Los checks de RF/RNF, Gantt, ceremonias, tareas y mejoras se pueden alternar: vuelve a pulsar el mismo control para quitarlo. El calendario registra quién cambió la marca y cuándo.
- La asistencia se guarda una vez por día y rol en `asist/{AAAA-MM-DD}_u{índice}`. Incluye hora de Lima y marca ISO para mostrar las entradas del día en orden.
- Cada sesión válida escucha las mismas colecciones de Firestore: todos los roles pueden ver los checks y tareas que marque cualquier integrante.
- Si Firebase no carga, la página usa almacenamiento local del navegador; esos cambios locales no se comparten con otros navegadores, perfiles ni dispositivos. Comprueba el estado de conexión en el panel antes de marcar checks.

No publiques reglas abiertas a usuarios no autenticados. Las reglas de `firestore.rules` limitan la lectura a los miembros habilitados, validan la identidad/rol al escribir y prohíben alterar o eliminar asistencias registradas.

# Requerimientos y Gantt · Makro Chincha

## Estructura

- `Requerimientos y Gantt · Scrum Adaptativo · Makro Chincha.html`: página principal.
- `assets/css/styles.css`: estilos, colores y temas claro/oscuro.
- `assets/js/app.js`: Gantt, checks, calendario y registro diario de asistencia.
- `assets/js/firebase-config.js`: configuración pública del SDK web de Firebase.
- `firestore.rules`: reglas de acceso que deben publicarse en Firestore.

## Configuración de Firebase y sincronización

Firebase todavía debe configurarse en la consola antes de tener sincronización entre dispositivos. Cuando esté configurado, los cambios de checks, tareas de rol y asistencia se propagan en tiempo real mediante los listeners de Firestore. La página muestra cuándo está conectada y no presenta los cambios locales como sincronizados.

1. Crea un proyecto Firebase, registra una aplicación web y copia su objeto de configuración pública en `assets/js/firebase-config.js`, reemplazando `null`:

   ```js
   window.FIREBASE_CONFIG = {
     apiKey: "TU_API_KEY_WEB",
     authDomain: "TU_PROYECTO.firebaseapp.com",
     projectId: "TU_PROJECT_ID",
     appId: "TU_APP_ID"
   };
   ```

   La configuración del SDK web es pública; no incluyas contraseñas, claves de cuentas de servicio ni otros secretos en JavaScript.
2. En Firebase Authentication, habilita **Correo/contraseña** y crea una cuenta para cada integrante. El inicio de sesión está habilitado en la página, pero no se permite el registro libre de cuentas.
3. Crea la base de datos de Firestore y publica `firestore.rules` en la pestaña **Reglas**.
4. Para cada cuenta del equipo, copia su UID de Authentication y crea `members/{UID}` desde la consola con estos campos:

   | Integrante | `name` | `displayRole` | `role` |
   |---|---|---|---|
   | Piero | `Piero` | `Scrum Master` | `sm` |
   | María | `María` | `Product Owner` | `po` |
   | Airton | `Airton` | `Developer 1 · Front End` | `fe` |
   | Dayron | `Dayron` | `Developer 2 · Back End` | `be` |
   | Patricia | `Patricia` | `Stakeholder · QA` | `qa` |

   Agrega también `active` con valor booleano `true`. El inicio de sesión solo da acceso a una cuenta cuyo UID esté habilitado en `members`.
5. En GitHub, activa **Settings → Pages → Source: GitHub Actions**. El workflow `.github/workflows/pages.yml` publicará el sitio al hacer push a `main`; la entrada es `index.html`. Agrega `pierxz10.github.io` en **Authentication → Settings → Authorized domains**. Mantén el archivo HTML, `assets/` y los scripts de Firebase juntos, con sus rutas relativas.

## Uso y datos

- Cada cuenta queda asociada a su nombre y rol por el documento `members` verificado al iniciar sesión.
- Los checks de RF/RNF, Gantt, ceremonias, tareas y mejoras se pueden alternar: vuelve a pulsar el mismo control para quitarlo. El calendario registra quién cambió la marca y cuándo.
- La asistencia se guarda una vez por día y rol en `asist/{AAAA-MM-DD}_u{índice}`. Incluye hora de Lima y marca ISO para mostrar las entradas del día en orden.
- Sin configuración de Firebase, los datos se guardan en el almacenamiento local del navegador. Las pestañas abiertas del mismo sitio en el mismo navegador reciben las actualizaciones mediante el evento `storage`, pero otros navegadores, perfiles y dispositivos no comparten esos datos.
- Para que cada integrante vea los checks de los demás desde su propio dispositivo se necesita un servicio compartido (por ejemplo, Firebase/Firestore) con autenticación y reglas configuradas. Una página estática de GitHub Pages, sin backend, no puede transmitir las escrituras a otros dispositivos.

No publiques reglas abiertas a usuarios no autenticados. Las reglas de `firestore.rules` limitan la lectura a los miembros habilitados, validan la identidad/rol al escribir y prohíben alterar o eliminar asistencias registradas.

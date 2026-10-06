# Requerimientos y Gantt · Makro Chincha

## Estructura

- `Requerimientos y Gantt · Scrum Adaptativo · Makro Chincha.html`: página principal.
- `assets/css/styles.css`: estilos, colores y temas claro/oscuro.
- `assets/js/app.js`: Gantt, checks, calendario y registro diario de asistencia.
- `assets/js/firebase-config.js`: configuración pública del SDK web de Firebase.
- `firestore.rules`: reglas de acceso que deben publicarse en Firestore.

## Configuración de Firebase y sincronización

La aplicación está enlazada al proyecto Firebase `proyectoscrum-ffd53` y a su base Firestore Standard `(default)` en `northamerica-northeast1`. Firebase puede compartir en tiempo real los checks, tareas por rol y asistencias cuando Authentication y las reglas de Firestore estén habilitadas.

1. El ingreso visual pide integrante y un PIN numérico de cinco dígitos:

   | Integrante | Rol | PIN de demostración |
   |---|---|---:|
   | Piero | Scrum Master | `48216` |
   | María | Product Owner | `73105` |
   | Airton | Developer 1 · Front End | `29047` |
   | Dayron | Developer 2 · Back End | `86423` |
   | Patricia | Stakeholder · QA | `51698` |

   **Estos PIN están en el JavaScript público del sitio; cualquiera puede verlos o saltarse el formulario. No son contraseñas reales, no verifican identidad ni protegen los datos.** No uses este acceso para información sensible ni para atribuir cambios de forma confiable.
2. Para habilitar la sincronización, en Firebase Console → **Authentication → Sign-in method**, habilita **Anónimo**.
3. Publica las reglas de prototipo de Firestore desde la raíz del proyecto:

   ```sh
   npx -y firebase-tools@latest deploy --only firestore:rules --project proyectoscrum-ffd53
   ```

4. En GitHub, activa **Settings → Pages → Source: GitHub Actions**. El workflow `.github/workflows/pages.yml` publicará el sitio al hacer push a `main`; la entrada es `index.html`. Agrega `pierxz10.github.io` en **Authentication → Settings → Authorized domains**. Mantén el archivo HTML, `assets/` y los scripts de Firebase juntos, con sus rutas relativas.

La configuración del SDK web en `assets/js/firebase-config.js` es pública y necesaria en el sitio estático. No agregues credenciales reales ni claves de cuentas de servicio al repositorio.

## Uso y datos

- El PIN es únicamente un selector visual; las reglas de Firestore aceptan perfiles anónimos y no verifican esos PIN. Firebase conserva una sesión anónima en el navegador para asociar las marcas con el perfil elegido.
- Los checks de RF/RNF, Gantt, ceremonias, tareas y mejoras se pueden alternar: vuelve a pulsar el mismo control para quitarlo. El calendario registra quién cambió la marca y cuándo.
- La asistencia se guarda una vez por día y rol en `asist/{AAAA-MM-DD}_u{índice}`. Incluye hora de Lima y marca ISO para mostrar las entradas del día en orden.
- Cada sesión válida escucha las mismas colecciones de Firestore: todos los roles pueden ver los checks y tareas que marque cualquier integrante.
- Si Firebase no está disponible, el ingreso puede continuar en modo local con un aviso, pero esos cambios solo se comparten entre pestañas del mismo navegador, no con otros usuarios o dispositivos. Comprueba el estado de conexión en el panel antes de marcar checks.

No publiques reglas abiertas a usuarios no autenticados. Las reglas de `firestore.rules` solo permiten registrar un perfil propio por sesión anónima y limitan el acceso a sesiones que hayan elegido un rol; los perfiles no se pueden modificar y las asistencias no se pueden alterar ni eliminar. El registro de rol sigue abierto: cualquiera puede reclamar cualquiera de los roles y acceder a los datos compartidos. Estas reglas son un prototipo: revísalas antes de compartir ampliamente el sitio.

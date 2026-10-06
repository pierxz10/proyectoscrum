# Requerimientos y Gantt · Makro Chincha

## Estructura

- `Requerimientos y Gantt · Scrum Adaptativo · Makro Chincha.html`: página principal.
- `assets/css/styles.css`: estilos, colores y temas claro/oscuro.
- `assets/js/app.js`: Gantt, checks, calendario y registro diario de asistencia.
- `assets/js/firebase-config.js`: configuración pública del SDK web de Firebase.
- `firestore.rules`: reglas de acceso que deben publicarse en Firestore.

## Configuración de Firebase y sincronización

La aplicación ya está enlazada al proyecto Firebase `proyectoscrum-ffd53` y a su base Firestore Standard `(default)` en `northamerica-northeast1`. Firestore comparte en tiempo real los checks, tareas por rol y asistencias entre las sesiones registradas.

1. En Firebase Console → **Authentication → Sign-in method**, habilita el proveedor **Anónimo**. La página crea una sesión anónima automáticamente; no solicita correo ni contraseña.
2. Al abrir la página, cada navegador elige un nombre y rol para crear su perfil. El registro es abierto y no comprueba la identidad: cualquier persona puede elegir cualquier rol e incluso registrar el mismo rol desde distintos navegadores. No uses este modo para información sensible ni para confiar en que las acciones provienen del integrante indicado.
3. Publica las reglas de prototipo de Firestore desde la raíz del proyecto:

   ```sh
   npx -y firebase-tools@latest deploy --only firestore:rules --project proyectoscrum-ffd53
   ```

4. En GitHub, activa **Settings → Pages → Source: GitHub Actions**. El workflow `.github/workflows/pages.yml` publicará el sitio al hacer push a `main`; la entrada es `index.html`. Agrega `pierxz10.github.io` en **Authentication → Settings → Authorized domains**. Mantén el archivo HTML, `assets/` y los scripts de Firebase juntos, con sus rutas relativas.

La configuración del SDK web en `assets/js/firebase-config.js` es pública y necesaria en el sitio estático. No agregues contraseñas, claves de cuentas de servicio ni otros secretos al repositorio.

## Uso y datos

- Cada sesión anónima queda asociada al nombre y rol escogidos en su documento `members`. El cambio de integrante cierra la sesión y crea una nueva sesión anónima; los perfiles ya registrados no se pueden editar desde la página.
- Los checks de RF/RNF, Gantt, ceremonias, tareas y mejoras se pueden alternar: vuelve a pulsar el mismo control para quitarlo. El calendario registra quién cambió la marca y cuándo.
- La asistencia se guarda una vez por día y rol en `asist/{AAAA-MM-DD}_u{índice}`. Incluye hora de Lima y marca ISO para mostrar las entradas del día en orden.
- Cada sesión válida escucha las mismas colecciones de Firestore: todos los roles pueden ver los checks y tareas que marque cualquier integrante.
- Si Firebase no carga, la página usa almacenamiento local del navegador; esos cambios locales no se comparten con otros navegadores, perfiles ni dispositivos. Comprueba el estado de conexión en el panel antes de marcar checks.

No publiques reglas abiertas a usuarios no autenticados. Las reglas de `firestore.rules` solo permiten registrar un perfil propio por sesión anónima y limitan el acceso a sesiones que hayan elegido un rol; los perfiles no se pueden modificar y las asistencias no se pueden alterar ni eliminar. Sin embargo, como el registro es abierto, cualquiera puede reclamar cualquiera de los roles y acceder a los datos compartidos. Estas reglas son un prototipo: revísalas antes de compartir ampliamente el sitio.

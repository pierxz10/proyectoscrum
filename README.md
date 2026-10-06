# Requerimientos y Gantt · Makro Chincha

## Datos compartidos en la nube

Los checks de RF/RNF, Gantt, ceremonias, tareas por rol, mejoras y asistencias se leen y guardan en Cloud Firestore. Los cambios aparecen en tiempo real en los navegadores y dispositivos conectados al mismo proyecto Firebase. La hora de los cambios se registra en Firestore; la página la muestra en hora de Lima.

La configuración del cliente está en `assets/js/firebase-config.js` y apunta al proyecto `proyectoscrum-ffd53`. Para que la sincronización funcione:

1. En Firebase Console, habilita **Authentication → Sign-in method → Anonymous**.
2. Crea/habilita Cloud Firestore en ese proyecto.
3. Publica las reglas de `firestore.rules` en el proyecto:

   ```sh
   firebase deploy --only firestore:rules --project proyectoscrum-ffd53
   ```

4. Abre la página con conexión a Internet e inicia sesión con el integrante correspondiente. Si la página indica un error de Firebase, no se guardará el cambio localmente como si se hubiera sincronizado.

La primera vez que se marca un check, ese registro pasa a ser el compartido. Los checks históricos que existan solo en el `localStorage` de un navegador no se migran automáticamente: su autoría no se puede verificar.

## Seguridad y atribución

El acceso actual usa autenticación anónima y PIN de demostración que está incluido en el código público del sitio. **El nombre y el PIN no comprueban quién es la persona**; cualquier visitante puede leer y modificar los checks del equipo eligiendo un integrante. Las reglas limitan la escritura al proyecto y al formato de datos esperado, pero no hacen confiable la identidad indicada por el cliente. No guardes datos personales, secretos ni uses esta versión como auditoría formal.

Para identificar realmente quién cambió cada check, cada integrante debe tener una cuenta Firebase verificada (por ejemplo, correo institucional) y las reglas deben asociar de forma fija cada cuenta con su rol. Eso requiere recopilar las direcciones institucionales del equipo y habilitar/configurar el proveedor de autenticación correspondiente en Firebase.

## Publicación de la página

El workflow `.github/workflows/pages.yml` publica los archivos estáticos en GitHub Pages al subir cambios a `main`, si está habilitada la opción **Settings → Pages → Source: GitHub Actions**. La URL de este proyecto es `https://pierxz10.github.io/proyectoscrum/`; confirma que el workflow termine correctamente y que Pages esté activado en la configuración del repositorio.

## Estructura

- `Requerimientos y Gantt · Scrum Adaptativo · Makro Chincha.html`: página principal.
- `assets/css/styles.css`: estilos y diseño adaptable.
- `assets/js/app.js`: tablero, checks, asistencia y sincronización en tiempo real.
- `assets/js/firebase-config.js`: configuración del proyecto Firebase.
- `firestore.rules`: permisos de Firestore.

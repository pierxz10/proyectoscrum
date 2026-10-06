# Requerimientos y Gantt · Makro Chincha

## Estructura

- `Requerimientos y Gantt · Scrum Adaptativo · Makro Chincha.html`: página principal.
- `assets/css/styles.css`: estilos, colores y temas claro/oscuro.
- `assets/js/app.js`: Gantt, checks, calendario y registro diario de asistencia.

## Ingreso local

El sitio usa ingreso local con integrante y PIN numérico de cinco dígitos:

| Integrante | Rol | PIN de demostración |
|---|---|---:|
| Piero | Scrum Master | `48216` |
| María | Product Owner | `73105` |
| Airton | Developer 1 · Front End | `29047` |
| Dayron | Developer 2 · Back End | `86423` |
| Patricia | Stakeholder · QA | `51698` |

**Estos PIN están en el JavaScript público del sitio; cualquiera puede verlos o saltarse el formulario. No son contraseñas reales, no verifican identidad ni protegen datos.** No uses este acceso para información sensible ni para atribuir cambios de forma confiable.

## Uso y datos

- Los checks, tareas y asistencias se guardan en el almacenamiento local y se sincronizan entre pestañas del mismo navegador. No se comparten entre navegadores, perfiles ni dispositivos.
- Los checks de RF/RNF, Gantt, ceremonias, tareas y mejoras se pueden alternar: vuelve a pulsar el mismo control para quitarlo. El calendario registra quién cambió la marca y cuándo.
- La asistencia se registra una vez por día y rol en el almacenamiento local. Incluye la hora de Lima.
- En GitHub, **Settings → Pages → Source: GitHub Actions** publica el sitio al hacer push a `main`.

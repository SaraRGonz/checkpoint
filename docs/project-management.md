# Organización y gestión del proyecto 

## Metodología de trabajo

El proyecto se organiza siguiendo un enfoque **Kanban**, usando un tablero visual en *Trello.com* que enseña el estado de cada tarea en todo momento. Como el desarrollo avanza por fases las tareas principales se van haciendo de forma ordenada, de forma que cada una de estas fases construye la base para la siguiente.

---

## Tablero visual: Trello

El tablero de Trello es centro de organización. Tiene en él varias tarjetas y cada una representa una fase completa de desarrollo o una funcionalidad concreta, y dentro de cada tarjeta hay un checklist con las subtareas técnicas necesarias para completarla. Así se puede ver cuánto le queda a cada fase para poder completarse desde la vista general del tablero *(Ej: checklist 5/8)*.

El tablero tiene cinco columnas por las que cada tarea se va moviendo a medida que se avanza en ella:

### Backlog
Es el tintero de ideas y funcionalidades opcionales que se pueden hacer si el desarrollo lo permite. Tiene tareas como el tablero Kanban interactivo con drag & drop, animaciones avanzadas de UI, testing automatizado y documentación con Swagger.

### Todo
En esta columna están las fases que necesitan estar sí o sí en el proyecto y se ordenan prioridad y secuencia lógica para que puedan ir sucediéndose unas a otras. Tiene tareas como la arquitectura de la aplicación, el desarrollo de componentes, la gestión de estado y el desarrollo del backend y la API.

### In Progress
Aquí se colocan las tareas en las que se está trabajando actualmente. Hay que intentar mantener el número de tarjetas a la vez en esta columna al mínimo para evitar cuellos de botella. Por ejemplo, ahora mismo la tarjeta de *Setup inicial* está en progreso con 6 de 8 subtareas ya hechas.

### Review
Cuando se finaliza una tarea se pasa a esta columna antes de darse oficialmente por terminada. Así se realizan pruebas manuales, revisión del código, verificación del diseño, comprobación de posibles errores... Para comprobar que todo funcione correctamente.

### Done
Esta ya es la columna final donde se dejan las tareas que se han revisado *(y corregido si era necesario)*, se han integrado y son totalmente funcionales.

---

## Estructura de las tarjetas

Todas las tarjetas tienen la misma estructura para mantener un orden:

- **Título descriptivo:** Deja saber sobre qué puede tratar la tarea de forma rápida en la visión general del tablero *(por ejemplo, Rutas y navegación)*.
- **Checklist de subtareas:** Es una lista con subtareas técnicas que tienen que ver con el título de la tarjeta. En vez de ser algo tan general como el título, son tareas pequeñas *(por ejemplo, Crear página 404)* que ayudan a ir midiendo cuanto falta para cumplir con la tarjeta de una forma un poco más precisa.

---

## Flujo de trabajo

El ciclo de vida de las tareas que se van a seguir será el siguiente:

1. Se concreta una tarea y se coloca en **Todo** *(o en **Backlog** si es opcional)*.
2. Cuando se empieza a trabajar en ella, se mueve a **In Progress**.
3. Las subtareas que hay en el checklist se van marcando a medida que se van realizando.
4. Una vez se marca todo el checklist, la tarjeta pasa a **Review** para revisarla y hacer las pruebas necesarias.
5. Una vez que se comprueba que todo funciona bien y que la documentación está actualizada, la tarjeta se mueve a **Done**.
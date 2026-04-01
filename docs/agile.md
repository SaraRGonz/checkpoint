# Agile, Scrum y Kanban

## 1. Agile

Agile es una filosofía de trabajo, no una metodología con pasos fijos. 
Nace en 2001 con la publicación del Manifiesto Ágil, un manifiesto que fue creado por desarrolladores que consideraban que el modelo tradicional de desarrollo (que consistía en planificar todo primero durante meses antes de construir nada) generaba proyectos que no se adaptaban a los cambios del cliente ni del mercado.

El objetivo principal de Agile es entregar valor continuamente, creando software en partes pequeñas y funcionales que el cliente puede ir revisando e ir dando feedback. De esta forma en vez de esperar a tener el proyecto completo el cliente puede ir viendo los avances reales desde el principio.

---

## 2. Scrum 

Scrum es el framework más extendido dentro de Agile. En Scrum se organiza el trabajo en ciclos cortos y predecibles que se llaman Sprints, esto tiene como objetivo de reducir la incertidumbre y mantener al equipo enfocado en el trabajo.

Las reglas de Scrum se dividen en tres partes: Roles, artefactos (documentos o listas) y eventos (reuniones).

### Roles

- **Product Owner:** Gestiona el valor y el producto. Define qué se construye, en qué orden y con qué prioridad. Es quien acepta o rechaza el trabajo finalizado.
- **Scrum Master:** Facilita el proceso, elimina bloqueos e interrupciones externas y se asegura de que el equipo aplique Scrum correctamente.
- **Developers:** Es el equipo que construye el producto y crea un incremento funcional al final de cada sprint. Se autoorganiza para decidir cómo abordarel trabajo, planifica el Sprint Backlog y garantiza la calidad del producto.


### Artefactos

- **Product Backlog:** Es una lista completa de todo lo que necesita el producto y se ordena por prioridad. La gestiona el Product Owner.
- **Sprint Backlog:** Es el subconjunto del Product Backlog que el equipo se compromete a completar durante cada uno de los Sprint.
- **Incremento:** Es el resultado final de cada uno de los Sprint, es una pieza de software totalmente funcional y demostrable.

### Eventos

- **Sprint:** Es un ciclo de trabajo de duración fija (entre 1 y 4 semanas). Una vez que se inicia, sus objetivos no se modifican.
- **Sprint Planning:** Es la reunión inicial donde el equipo elige las tareas que va a tener el Sprint.
- **Daily Scrum:** Es una reunión diaria de 15 minutos que sirve para sincronizar el trabajo y detectar posibles bloqueos.
- **Sprint Review:** Es la presentación del incremento al cliente al final de cada uno de los Sprint para tener su feedback.
- **Sprint Retrospective:** Es una reunión interna que hace el equipo para analizar cómo mejorar el proceso para el siguiente Sprint.

---

## 3. Kanban 

En el caso de Kanban (que viene del japonés y significa tarjeta visual) no se trabaja con ciclos fijos sino que se trabaja con un flujo de trabajo continuo. 
Cada tarea se representa en forma de una tarjeta que avanza por las columnas de un tablero a medida que se trabaja y se avanza en ella. Estas columnas suelen ser: Pendiente, En progreso y Completado.

La regla base de Kanban son los límites de trabajo en progreso o los límites WIP (Work In Progress). 
Estos consisten en que se fija un máximo de tareas que pueden estar a la vez en la columna de "En progreso". Esto sirve para obligar al equipo a terminar lo que está haciendo antes de empezar algo nuevo y así poder evitar que se acumulen muchas tareas a medias.

Aunque Kanban no prescribe roles, a veces surgen dos para mejorar el flujo de trabajo:
- **Service Request Manager:** Gestiona las demandas y prioridades del cliente.
- **Service Delivery Manager:** Optimiza el flujo de trabajo y elimina cuellos de botella que pueda tener el equipo. 

---

## 4. Diferencias entre Scrum y Kanban 

| Característica | Scrum | Kanban |
|---|---|---|
| **Ritmo de trabajo** | Ciclos fijos llamados Sprints (1–4 semanas). El equipo trabaja en un objetivo concreto durante ese tiempo. | Flujo continuo. Las tareas entran y salen del tablero de una forma más continua y sin fechas límite. |
| **Planificación** | Se planifica al inicio de cada Sprint qué tareas se van a realizar. Una vez se empieza, ese plan no debería cambiar. | No tiene planificación por ciclos, las tareas se van priorizando en el momento. |
| **Flexibilidad ante cambios** | Baja durante el Sprint. Cuando aparece algo urgente de normal se esperaría al siguiente ciclo. | Alta en cualquier momento ya que se pueden reordenar o añadir tareas sin interrumpir nada. |
| **Roles** | Tiene roles obligatorios con responsabilidades concretas cada uno: Product Owner, Scrum Master y Developers. | No tiene roles específicos ni obligatorios. |
| **Tablero** | Se reinicia con cada Sprint. Refleja únicamente las tareas que se van a hacer en ese ciclo. | Es permanente. Las tareas avanzan por él de forma continua. |
| **Límites de trabajo simultáneo** | El equipo solo trabaja en las tareas del Sprint actual. No hay un límite numérico como tal por columna. | Se establece en los límites WIP. Cada columna tiene un máximo de tareas permitidas al mismo tiempo. |
| **Reuniones** | Tiene cinco eventos ya estructurados y obligatorios: Planning, Daily, Review, Retrospective y el Sprint. | No hay reuniones preestablecidas, el equipo se reúne cuando lo necesita. |
| **Métrica principal** | Velocidad: Cuántas tareas completa el equipo por Sprint. Se usa para estimar Sprints futuros. | Lead Time / Cycle Time: Cuánto tiempo tarda una tarea desde que se solicita hasta que se completa. |
| **Mejora del proceso** | Se valora en la Sprint Retrospective al final de cada Sprint. | Se ve de forma continua observando el flujo del tablero y los cuellos de botella. |
| **Facilidad de adopción** | Necesita que el equipo aprenda y respete los roles, artefactos y eventos desde el principio. | Es fácil de introducir en un equipo existente porque que no obliga a cambiar la estructura actual. |

---

## 5. Cuándo usar cada metodología

**Utilizaría Scrum:**
- Se está desarrollando un producto nuevo desde cero.
- El proyecto necesita planificación a corto plazo y objetivos claros.
- El equipo necesita una estructura más estricta para organizarse y no perder el foco.
- El cliente quiere entregas periódicas para ver como avanza el trabajo.

**Utilizaría Kanban:**
- El trabajo es de mantenimiento, soporte o para corregir errores.
- Las tareas del proyecto cambian muy a menudo y no se pueden planificar con semanas de antelación.
- El desarrollo necesita un flujo constante de tareas completadas.
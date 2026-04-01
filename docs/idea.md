## 1. Descripción general de la idea
**Checkpoint** es una plataforma web fullstack para gestión de colecciones de videojuegos. La aplicación actúa como un organizador personal multiplataforma que permite a los usuarios organizar sus juegos físicos y digitales, llevar un seguimiento de su progreso y gestionar compras futuras . 

A nivel técnico, el proyecto implementa una arquitectura cliente-servidor: 
* **Frontend:** Desarrollado con React, TypeScript y Tailwind CSS. Con interfaz de usuario fluida, reactiva y tipada.
* **Backend / Capa de Red:** Un servidor Node.js + Express que gestiona una API REST para interactuar con los datos del usuario y se comunicará con la API externa de **RAWG** (rawg.io) para completar la base de datos con información real de videojuegos.

## 2. ¿Qué problema intenta resolver?
Actualmente, en el mundo de los videojuegos, podemos observar mucha fragmentación. Los usuarios normalmente se enfrentan a varios problemas cotidianos:
* **Backlog Anxiety:** Acumulación masiva de juegos comprados en ofertas (Ofertas de Steam , juegos gratuitios de Epic Games, etc.) que quedan normalmente olvidados y generan una sensación de desorganización.
* **Descontrol multiplataforma:** Al acumular muchos juegos, es un problema cada vez más normal el no acordarse de si un juego se tiene en Nintendo Switch de forma física, en PlayStation digital o si se reclamó gratis en alguna plataforma para PC. Esto puede terminar causando que se hagan compras de juegos que ya se tienen, o que se añada un juego a la wishlist que ya se posee en otra plataforma.
* **Falta de un historial personal:** Las plataformas oficiales limitan las reseñas y puntuaciones a sus propios ecosistemas (por ejemplo, las reseñas de Steam). Cuando un usuario abandona un juego o lo termina no tiene un diario centralizado donde anotar su opinión, qué nota le da o cuánto tiempo le ha costado terminarlo.

## 3. Público Objetivo
* **El Coleccionista Multiplataforma:** Tiene consolas de varias generaciones y un PC. Busca etiquetar meticulosamente si sus juegos son físicos, digitales, ediciones de coleccionista, etc.
* **El "Completionist":** Jugador que orienta su experiencia a terminar los juegos al 100%. Necesita marcar estados específicos y dejar notas sobre logros o guías.
* **El Comprador Compulsivo:** Suele comprar guiado por las ofertas y aprovecha los juegos gratuitos a menudo, acumula juegos sin llegar a jugarlos realmente. Su principal uso será la herramienta de *Wishlist* para planificar futuras compras y el *Backlog* para decidir a qué puede jugar.

## 4. Funcionalidades Principales
Las funcionalidades mínimas que debe cubrir la primera versión del proyecto son:

- **Buscador integrado con RAWG:** El frontend consulta la API de RAWG a través del backend y muestra resultados con portada, título, año de lanzamiento y géneros. Desde cada resultado se puede añadir el juego a la biblioteca en un solo clic.
- **Registro manual (CRUD):** Formulario validado para añadir juegos que no existan en RAWG, como títulos retro, indies, romhacks...
- **Sistema de estados:** Cada juego puede transitar entre cinco estados: *Wishlist*, *Backlog*, *Playing*, *Completed* y *Dropped* para reflejar en qué punto se encuentra el usuario con cada título.
- **Reseñas personales:** Puntuación de 1 a 5 estrellas y un campo de texto para notas sobre el título.
- **Etiquetado de plataforma:** Cada juego puede etiquetarse con la plataforma en la que se posee (PC, Switch, PS5, Xbox, Retro..).

## 5. Funcionalidades Opcionales
Si el desarrollo lo permite, se añadirán las siguientes mejoras:

- **Tablero Kanban con drag & drop:** Vista visual donde se puedan arrastrar las tarjetas de juegos entre columnas para actualizar su estado.
- **Dashboard de estadísticas:** Panel con gráficos simples que resuman el estado de la colección: completados, pendientes, abandonados, etc.
- **Infinite scroll:** Carga progresiva de resultados en el buscador para no bloquear el rendimiento con respuestas grandes de la API.
- **Toggle Dark mode/Light mode:** Implementado con Tailwind CSS y Context API.

## 6. Posibles Mejoras Futuras
- **Persistencia Real en Base de Datos:** Migración del almacenamiento actual (LocalStorage) a una base de datos relacional.
- **Autenticación:** sistema de cuentas con JWT para que cada usuario tenga su biblioteca privada.
- **Alertas de precio:** integración con *IsThereAnyDeal* para notificar bajadas de precio en losjuegos de la Wishlist.
- **Perfil público:** enlace de solo lectura para compartir la colección con otras personas.
# Capas de la arquitectura

- Frontend -> React, TypeScript y Tailwind
- Backend -> Node.js y Express (con conexion a API RAWG)
- Persistencia -> Localstorage

El frontend no llama nunca directamente a la API de RAWG. Todas las peticiones externas pasan por el backend para proteger la API Key y normalizar los datos.

---

# Estructura de componentes principales

La interfaz tiene tres niveles: El layout, las páginas y los componentes.

## Nivel 1: Layout - src/components/layout/

- Layout.tsx -> Base donde se encuentra la Navbar + Outlet de React Router
- Navbar.tsx -> Navegación principal por la página. Está el logo, los links y el toggle del tema
- Footer.tsx -> Créditos y links a documentación

## Nivel 2: Pages - src/pages/

- HomePage.tsx -> Página principal con resumen de de estadísticas y accesos directos
- SearchPage.tsx -> Buscador integrado con RAWG. Tiene un input y la lista de resultados
- LibraryPage.tsx -> Biblioteca personal con filtros y la lista de juegos
- WishlistPage.tsx -> Colección de juegos añadidos a la wishlist
- GameDetailPage.tsx -> Detalles específicos de un juego: Datos, estado, reseña, plataforma
- AddGamePage.tsx -> Formulario para añadir juegos de forma manual cuando no se encuentran en RAWG
- NorFoundPage.tsx -> Error 404 

## Nivel 3: Componentes reutilizables - src/components/

|Componente|Donde se usa|
|---|---|
|GameCard|SearchPage, LibraryPage|
|Button|En toda la APP|
|Badge|GameCard (Estado, plataforma..)|
|StarRating|GameDetailPAge, GameCard|
|SearchInput|SearchPage|
|FilterBar|LibraryPage|
|StatusSelector|GameDetailPage, GameCard|
|Modal|Confirmaciones, formularios rápidos|
|Spinner|Estados de carga en la APP|
|EmptyState|LibraryPage cuando está vacía|
|ErrorMessage|Mostrar errores|

---

# Gestión del estado de la aplicación

Se hace una estrategia por capas usando el principio de colocación del estado. Es decir, cada pieza del estado está en el nivel más bajo posible que la necesite.

|Tipo de estado|Herramienta|Ejemplo|
|---|---|---|---|
|Local de componente|userState/userReducer|inputs de formularios, abrir y cerrar modales|
|Estado global de la UI|ThemeContext (Context API)|toggle de dark/light mode, si se añaden idiomas|
|Biblioteca del usuario|LibraryContext (Context API)|Lista de juegos, CRUD local|
|Caché de servidor|Custom hooks + fetch|Resultados RAWG, detalles de juegos|
|URL/navegación|ReactRouter (userSearchParams)|Términos de búsqueda, filtros activos|

**LibraryContext** es el contexto principal de la app. En ella van a estar:
- games: Game[] -> Lista de los juegos en la biblioteca
- addGame(game) -> Llama a POST /api/v1/library y actualiza el estado local
- updateGame(id, changes) -> Llama a PUT /api/v1/library/:id
- deleteGame(id) -> Llama a DELETE /api/v1/library/:id
- isLoading, error -> Estados de red globales de la biblioteca

**ThemeContext** gestiona el toggle de dark/light mode. La preferencia se queda en el localStorage del navegador y es el único dato que solo está en cliente.

---

# Diseño del Backend/API

Base URL y versión : ``/api/v1/``

## Recurso Library: La biblioteca personal

|Método|Endpoint|Descripción|HTTP Status|
|---|---|---|---|
|GET|/library|Obtiene todos los juegos de la biblioteca|200|
|GET|/library/:id|Obtiene un juego por ID|200/404|
|POST|/library|Añade un juego a la biblioteca|201/400|
|PUT|/library/:id|Actualiza estado, plataforma, reseña..|200/404|
|DELETE|/library/:id|Elimina un juego de la biblioteca|204/404|

### Contrato de datos: Game object


    GET /api/v1/library → 200
    {
        "data": [
            {
            "id": "1234",
            "rawgId": 3498,
            "title": "Red Dead Redemption 2",
            "coverUrl": "https://media.rawg.io/...",
            "platform": "PS5",
            "status": "Completed",
            "rating": 5,
            "review": "Obra maestra. 120h de pura inmersión.",
            "genres": ["Action", "Adventure"],
            "releaseYear": 2018,
            "addedAt": "2024-03-15T10:30:00Z",
            "updatedAt": "2024-04-01T08:00:00Z"
            }
        ],
        "total": 1
    }


### Contrato de datos: POST /library (body)

    {
        "rawgId": 3498,
        "title": "Red Dead Redemption 2",
        "coverUrl": "https://...",
        "platform": "PS5",
        "status": "Backlog",
        "genres": ["Action"],
        "releaseYear": 2018
    }

### Contrato de datos: PUT /library/:id (body parcial)

    {
        "status": "Completed",
        "rating": 5,
        "review": "Texto de la reseña",
        "platform": "PC"
    }

## Recurso RAWG Proxy: Búsqueda de juegos

|Método|Endpoint|Descripción|HTTP Status|
|---|---|---|---|
|GET|/games/search?q={term}&page={n}|Busca juegos en RAWG por nombre|200/502|
|GET|/games/:rawgId|Obtiene datos de un juego de RAWG|200/400/502|

## Contrato de respuesta:  GET /games/search?q=zelda

    {
        "results": [
            {
                "rawgId": 5679,
                "title": "The Legend of Zelda: Breath of the Wild",
                "coverUrl": "https://media.rawg.io/...",
                "releaseYear": 2017,
                "genres": ["Action", "RPG"],
                "rating": 4.4
            }
        ],
        "count": 1,
        "next": "/api/v1/games/search?q=zelda&page=2"
    }

### Manejo de errores

Todos los endpoints devuelven errores conn el mismo formato para facilitar el manejo de errores en cliente.

    {
        "error": {
            "code": "GAME_NOT_FOUND",
            "message": "No se encontró el juego con id 999"
        }
    }

|Codigo HTTP|Significado|Cuándo se devuelve|
|---|---|---|
|200|Ok|Petición exitosa con cuerpo de respuesta|
|201|Created|Recurso creado correctamente (POST)|
|204|No content|Eliminación exitosa (DELETE)|
|400|Bad request|Validación fallida, faltan campos requeridos|
|404|Not found|Recurso no existente en la BD o RAWG|
|500|Internal server error|Error inesperado del servidor|
|502|Bad gateway|RAWG no responde o devuelve error|

---

# Persistencia de datos

## Datos en el servidor

|Dato|Donde|Porqué|
|---|---|---|
|Colección de juegos (Game[])|Server/BD|Datos de usuario que deben sobrevivir al borrado de caché|
|Estado del juego (status)|Server/BD|Estado de negocio, es parte del modelo de datos|
|Reseñas y puntuaciones|Server/BD|Contenido generado por el usuario|
|Plataformas asignadas|Server/BD|Metadato de propiedad del usuario|

## Datos en el cliente

|Dato|Donde|Porqué|
|---|---|---|
|Preferencia de dark/light mode|localStorage|Preferencia de UI, no de contenido|
|Término de búsqueda activo|useState / URL param|No necesita persistir porque es efímero|
|Filtros activos|useSearchParams (URL)|Estado de navegación, compartible por URL|
|Caché de resultados RAWG|React state (useEffect)|Datos de terceros se hace fetch según necesidad|

---

# Diagrama de flujo de datos

![Diagrama de flujo](https://i.gyazo.com/51662a184f01adfad745c866beabb8f1.png)

El proyecto sigue una arquitectura cliente-servidor clásica, dividida en cuatro bloques que se comunican de forma ordenada. Esta separación permite que el código sea más fácil de mantener y de ampliar a medida que el proyecto crece.

## Frontend 

Está desarrollado con React y TypeScript. Se compone de páginas principales (como el buscador o la biblioteca) construidas a partir de componentes reutilizables, como las tarjetas de juegos o el sistema de valoración por estrellas.

Para gestionar la información en el navegador se utiliza un Estado Global mediante Context API. Esto permite que distintas partes de la aplicación compartan datos en tiempo real sin necesidad de pasarlos manualmente entre componentes:

- `LibraryContext`: Mantiene actualizados los juegos que el usuario va añadiendo a su colección.
- `ThemeContext`: Gestiona las preferencias visuales como el modo oscuro, que se persiste directamente en el navegador.

## Capa de comunicación 

El archivo `src/api/client.ts` actúa como puente entre el frontend y el servidor. Su función es capturar las interacciones del usuario y traducirlas en peticiones HTTP estandarizadas que el backend pueda procesar. Centralizar esta lógica en un único módulo evita duplicar código de conexión en distintas partes de la aplicación.

## Backend 

El servidor está construido con Node.js y Express, y se organiza en tres capas con responsabilidades diferenciadas:

- **Rutas (Routes):** Punto de entrada de cada petición HTTP. Definen qué URLs escucha el servidor y hacia dónde dirigen el tráfico.
- **Controladores (Controllers):** Reciben la petición, validan que los datos sean correctos y preparan la respuesta que se devolverá al cliente.
- **Servicios (Services):** Ejecutan la lógica de negocio real, es decir, el trabajo concreto que hay que hacer con los datos.

Dentro del servidor hay dos flujos operativos independientes: Uno para gestionar la colección privada del usuario y otro para consultar información pública de videojuegos.

## Almacenamiento y APIs externas 

En el extremo final del flujo se encuentran las dos fuentes de datos de la aplicación:

- **API de RAWG:** Para alimentar el buscador, el servidor consulta esta API externa, que funciona como una enciclopedia de videojuegos. Devuelve la información solicitada en formato JSON, que el backend procesa y envía al frontend.
- **Almacenamiento local del servidor:** Cuando el usuario guarda un juego en su biblioteca o lo añade a la Wishlist, esos datos se persisten en el sistema de almacenamiento propio de la aplicación, completamente independiente de cualquier servicio externo.

Así la aplicación combina datos de terceros para el buscador con una gestión de colecciones propia y cnetralizada.

---

# Estructura del proyecto

## Frontend: src/

```
src/
├── api/
│   ├── client.ts          # fetch wrapper tipado, base URL, interceptores
│   ├── library.ts         # funciones para /api/v1/library
│   └── games.ts           # funciones para /api/v1/games (RAWG proxy)
├── components/
│   ├── layout/            # Layout, Navbar, Footer
│   ├── game/              # GameCard, StatusSelector, StarRating
│   └── ui/                # Button, Badge, Modal, Spinner, EmptyState, ErrorMessage
├── context/
│   ├── LibraryContext.tsx
│   └── ThemeContext.tsx
├── hooks/
│   ├── useLibrary.ts      # Consume LibraryContext
│   ├── useSearch.ts       # Búsqueda RAWG con debounce
│   └── useFilters.ts      # Filtrado y ordenación de la biblioteca
├── pages/
│   ├── HomePage.tsx
│   ├── SearchPage.tsx
│   ├── LibraryPage.tsx
|   ├── WishlistPage.tsx
│   ├── GameDetailPage.tsx
│   ├── AddGamePage.tsx
│   └── NotFoundPage.tsx
├── types/
│   ├── game.ts            # interface Game, GameStatus, Platform
│   └── rawg.ts            # interfaces para respuestas de RAWG
└── utils/
    ├── constants.ts       # STATUS_LIST, PLATFORM_LIST
    └── formatters.ts      # formatDate, formatRating
```

## Backend - server/

```
server/
├── config/
│   └── env.ts             # Variables de entorno (RAWG_API_KEY, PORT)
├── routes/
│   ├── library.routes.ts  # /api/v1/library
│   └── games.routes.ts    # /api/v1/games
├── controllers/
│   ├── library.controller.ts
│   └── games.controller.ts
├── services/
│   ├── library.service.ts # CRUD sobre la BD / fichero JSON
│   └── rawg.service.ts    # Llamadas a RAWG, normalización
├── middleware/
│   ├── errorHandler.ts    # Middleware global de errores
│   └── validate.ts        # Validación de body con Zod
└── index.ts               # CORS, middleware
```
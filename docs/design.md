# Capas de la arquitectura

- Frontend -> React, TypeScript y Tailwind
- Backend -> Node.js y Express (con conexion a API RAWG)
- Persistencia -> Localstorage

El frontend no llama nunca directamente a la API de RAWG. Todas las peticiones externas pasan por el backend para proteger la API Key y normalizar los datos.

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

# Diagrama de flujo de datos


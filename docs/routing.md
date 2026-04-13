# Enrutamiento y Navegación

Se usa `react-router-dom` para gestionar la navegación en el cliente. De esta forma al cambiar de página no se hace una petición nueva al servidor ni se recarga el navegador de nuevo, en vez de esto React intercambia el componente visible según la URL. Esto hace que se preserve el estado global (Context) durante toda la sesión.

---

## Cómo está estructurada la navegación

Todo el sistema de rutas está centralizado en `App.tsx` y se organiza en dos niveles:

- **`BrowserRouter`:** Es el enrutador principal. Usa la API de History del navegador para mantener la URL sincronizada con lo que se está enseñando en pantalla.
- **Rutas anidadas con Layout:** Todas las páginas están anidadas dentro de un componente `<Layout />` que contiene elementos persistentes como el `Navbar`. Dentro del Layout hay un `<Outlet />`, que es el sitio donde `react-router-dom` renderiza la página que corresponde según la URL actual.

---

## Mapa de rutas

| Ruta | Página | Descripción |
|:---|:---|:---|
| `/` | `HomePage` | Pantalla principal con estadísticas y accesos directos. |
| `/search` | `SearchPage` | Buscador conectado a la API de RAWG. |
| `/library` | `LibraryPage` | Colección personal del usuario. |
|`/wishlist`| `WishlistPage`| Colección de juegos con el estado 'Wishlist'|
| `/library/add` | `AddGamePage` | Formulario para añadir un juego manualmente. |
| `/game/:id` | `GameDetailPage` | Vista de detalle de un juego, cargada según el `id` de la URL. |
| `*` | `NotFoundPage` | Página 404 para cualquier URL que no coincida con las anteriores. |

---

## Cómo se navega entre páginas

Dentro de la aplicación no se usan las etiquetas `<a>` estándar para los enlaces internos porque esto haría que el navegador se recargue y destruiría el estado global. En vez de esto se usan las herramientas que nos da `react-router-dom`:

- **`<Link to="...">`:** Para los enlaces que se ven en la interfaz como los del `Navbar`.
- **`useNavigate()`:** Para cuando haya que redirigir al usuario por código. Por ejemplo, después de añadir un juego llevarlo automáticamente a la biblioteca.
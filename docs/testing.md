# Plan de pruebas manuales

Para realizar las pruebas, se va ha seguido la siguiente checklist:

## 1. Diseño responsive y navegación Base 
- [x] **Navbar (Desktop):** Enlaces centrados, indicador activo animado, botón de modo oscuro funcional.
- [x] **Navbar (Mobile):** Menú hamburguesa funcional (abre/cierra correctamente), se cierra automáticamente al hacer clic en un enlace.
- [x] **Theme toggle:** El cambio claro/oscuro persiste al recargar la página (revisar LocalStorage).
- [x] **Layout general:** El footer se mantiene siempre abajo aunque la página tenga poco contenido (ej. Error 404).
- [x] **Página 404:** Intentar acceder a una ruta inventada (ej. `/ruta-falsa`) muestra el estado vacío/404 y permite volver a la Home.

## 2. Flujo de búsqueda y RAWG API 
- [x] **Búsqueda:** Escribir en el buscador devuelve resultados coherentes (o un Empty State si no hay coincidencias).
- [x] **Estados de carga:** El spinner aparece mientras se espera la respuesta de RAWG.
- [x] **Manejo de errores:** Simular una caída de red (o API Key inválida temporalmente) muestra el componente `ErrorMessage` en lugar de romper la app.
- [x] **Añadir desde RAWG:** Pulsar "Add to Library" o "Wishlist" en un resultado lo guarda correctamente en el backend y actualiza el estado.

## 3. Gestión de la biblioteca (CRUD) 
- [x] **Añadir guego manual (`/library/add`):**
  - [x] El formulario valida campos obligatorios (ej. Título sin rellenar).
  - [x] El selector de estado y plataforma (`ActionMenu` / `StatusSelector`) funcionan correctamente.
  - [x] Añadir etiquetas (géneros) funciona (Enter añade, el botón de la 'X' borra).
  - [x] Al guardar, redirige correctamente a la biblioteca o muestra toast/mensaje de éxito.
- [x] **Vista de detalle (`/game/:id`):**
  - [x] Muestra la información correcta del juego.
  - [x] **Modo edición:** Cambiar el rating (estrellas), notas, plataforma y estado funciona y se guarda.
  - [x] **Descartar cambios:** Pulsar "Discard" revierte la información al estado previo a la edición sin guardar en base de datos.
  - [x] **Borrar:** Pulsar "Delete" abre el modal de confirmación y borra efectivamente el juego.
- [x] **Filtros y ordenación (`/library`):**
  - [x] El buscador local filtra por título correctamente.
  - [x] Los selectores de ordenación (fecha, título) organizan la cuadrícula.
  - [x] Filtrar por estado/plataforma/género oculta los juegos que no coinciden.
  - [x] El botón "Respawn Filters" (Reset) limpia todo y muestra la biblioteca completa.

## 4. Dashboards (Home y Wishlist) 
- [x] **Home - Stats:** Los cálculos de porcentajes son exactos según la cantidad de juegos. No hay error de división por cero si la biblioteca está vacía.
- [x] **Home - Columnas:** Las listas de "Playing" y "Wishlist" muestran un máximo de 3 juegos ordenados correctamente. Los enlaces a las tarjetas funcionan.
- [x] **Wishlist page:** Solo muestra juegos con estado "Wishlist". Mover un juego de Wishlist a otro estado (ej. "Backlog") lo desaparece de esta página y lo manda a Library.

## 5. Revisión técnica en consola 
- [x] No hay advertencias de React sobre `keys` únicas faltantes en las listas (`.map()`).
- [x] No hay advertencias sobre cambios de estado en componentes desmontados (*memory leaks*).
- [x] Todas las peticiones de red devuelven códigos HTTP correctos (200, 201, 204).

---

# Bugs resueltos y mejoras

Durante la fase de testing se descubireron y corrigieron los siguientes problemas:

## Bugs

### 1. Parpadeo del empty state al cargar

**Problema:** Al entrar en Library o Wishlist el EmptyState de "biblioteca vacía" aparecía un segundo antes de que se viesen los juegos.

**Solución:** Se integró el estado `isLoading` del `LibraryContext`. Ahora las páginas tienen un `Spinner` mientras la petición está en curso y el componente `EmptyState` no se pone antes de tiempo.

---

### 2. Parpadeo del spinner en mutaciones

**Problema:** Al editar o borrar un juego la app bloqueaba la interfaz con un spinner e interrumpía el flujo del usuario.

**Solución:** Se eliminó el `setIsLoading(true)` en las funciones de escritura (`add`, `update`, `delete`). Ahora las mutaciones pasan en segundo plano y se ven en la interfaz al momento sin bloquear nada.

---

### 3. Recargas de página fantasma (Vite / Nodemon)

**Problema:** El navegador se recargaba por completo cada vez que el backend escribía datos en `library.json`.

**Solución:** Se configuró el ignorador de archivos en `vite.config.ts` con `ignored: ['**/server/**']` y se añadió `--ignore data/` al script de Nodemon. Así hay persistencia de datos sin reiniciar el entorno de desarrollo.

---

### 4. Error de validación Zod con placeholder local

**Problema:** Al usar la ruta local del placeholder `/assets/placeholder.jpg` el backend lanzaba un `VALIDATION_ERROR` porque esperaba una URL con protocolo `http`.

**Solución:** Se cambió el esquema de Zod en `library.routes.ts` de `z.url()` a `z.string().optional()` y se ajustó el frontend para enviar `undefined` en campos numéricos vacíos y evitar conflictos de tipos.

---

### 5. Vulnerabilidad de URL falsa

**Problema:** Como se dejaron strings libres se podía intentar guardar un texto cualquiera como si fuera una URL de imagen.

**Solución:** Se añadió una validación en `AddGamePage.tsx` usando el constructor `new URL()`. Así el sistema comprueba que el valor introducido sea una URL válida y si no lo es deja usar el asset local interno como imagen por defecto.

---

### 6. Fallo en el filtro de rating

**Problema:** El selector de estrellas en la biblioteca no filtraba los resultados.

**Solución:** Se añadió la lógica que faltaba en `useFilters.ts` y se aplicó `parseInt()` al valor del selector que los datos se comparen correctamente.

---

## Mejora adicional

No era un bug como tal pero durante el testeo se dedició implementarla para mejorar la calidad:

- **Normalización de géneros:** `TagInput.tsx` formatea automáticamente las etiquetas a sentence case (por ejemplo, `"rpg"` a `"Rpg"`) para evitar duplicados visuales en la biblioteca. Así en el filtro de géneros ya no van a aparecer cosas como "Action", "action" o "ACTION" a la vez.
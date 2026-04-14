# Cliente API y Capa de Red

Para comunicar el frontend con el backend se ha construido un cliente HTTP tipado en `src/api/client.ts`. 
Este módulo reemplaza el `localStorage` como fuente de datos así que a partir de ahora el servidor es la única fuente de verdad de la biblioteca.

---

## La función `fetchApi<T>`

`fetchApi` es una función genérica que envuelve todas las llamadas a `fetch` de la aplicación. En vez de escribir la lógica de cada petición en cada componente todas pasan por aquí.

Esto da tres ventajas:

- **URL base centralizada:** La dirección `http://localhost:3000/api/v1` solo se define una vez así que si cambia solo hay que actualizarla en un sitio.
- **Tipado estricto:** El genérico `<T>` permite indicar qué forma tiene la respuesta esperada por ejemplo `fetchApi<{ data: Game[] }>('/library')`, y TypeScript se encarga del resto.
- **Manejo de errores global:** Si la respuesta no es correcta (cualquier código fuera del rango 200-299) la función lee el mensaje de error del servidor y lanza una excepción que los componentes pueden capturar.

```ts
const result = await fetchApi<{ data: Game[] }>('/library');
```

---

## Estados de red en la interfaz

Cualquier petición asíncrona puede tardar o fallar así que el `LibraryContext` tiene dos variables para gestionarlo

- **`isLoading (boolean)`:** Se activa justo antes de lanzar la petición y se desactiva en el bloque `finally` tanto si la petición tiene éxito como si la petición llega a fallar. En los componentes se usa para enseñar un `Spinner` o bloquear el botón de envío mientras espera.
- **`error (string | null)`:** Guarda el mensaje de error si algo sale mal. Si tiene valor los componentes renderizan el componente `<ErrorMessage />` para avisar al usuario de lo que ha pasado.

---

## De `localStorage` al servidor

El cambio más importante respecto a la versión anterior es que los datos ya no se persisten en el navegador sino que ahora están en el backend

- **Carga inicial:** El `useEffect` de `LibraryContext` ya no lee de `localStorage`. Ahora ejecuta una función asíncrona (`loadGames`) al montarse que hace un `GET /library` al servidor para poder obetener la lista de juegos que tiene guardados el usuario.
- **Mutaciones:** `addGame`, `updateGame` y `deleteGame` emiten peticiones `POST`, `PUT` y `DELETE`. El estado local de React solo se actualiza si el servidor confirma
  el que la operación ha ido bien (código `2XX`). Esto asegura que la UI siempre refleja lo que hay realmente en el servidor.
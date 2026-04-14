# Documentación de la API 

Esta API actúa como intermediaria entre el frontend y los datos. Se encarga de gestionar la biblioteca personal del usuario guardada en un archivo JSON local y de comunicarse con la API de RAWG para el buscador de juegos.

**Base URL:** `http://localhost:3000/api/v1`

---

## 1. Biblioteca personal `/library`

Endpoints para el CRUD de los juegos que ha guardado el usuario.

---

### `GET /library`
Devuelve todos los juegos que se han guardadado en la biblioteca.

**Respuesta `200 OK`:**
```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "Super Mario Odyssey",
      "platform": "Switch",
      "status": "Completed",
      "coverUrl": "https://...",
      "addedAt": "2024-04-14T10:00:00Z"
    }
  ],
  "total": 1
}
```

---

### `POST /library`
Añade un juego nuevo a la biblioteca del usuario . El servidor genera el `id` y el `addedAt` de forma automática.

**Body:**
```json
{
  "title": "Super Mario Odyssey",
  "platform": "Switch",
  "status": "Backlog",
  "coverUrl": "https://..."
}
```

**Respuesta `201 Created`:** Devuelve el objeto completo del juego recién que se acaba de crear incluyendo su `id` y `addedAt`.

---

### `PUT /library/:id`
Actualiza uno o varios campos de un juego que ya está en la biblioteca. No hace falta enviar el objeto completo, solo hace falta enviar los campos que cambian.

**Body (parcial):**
```json
{
  "status": "Playing",
  "rating": 5
}
```

**Respuesta `200 OK`:** Devuelve el objeto del juego con los cambios que se han hecho y `updatedAt` actualizado.

---

### `DELETE /library/:id`
Elimina un juego de la biblioteca permanentemente.

**Respuesta `204 No Content`:** Sin cuerpo de respuesta. Si el `id` no existe devuelve un `404`.

---

## 2. Buscador RAWG — `/games`

Endpoints que se comunican con RAWG de forma segura. La API Key nunca sale del servidor y las respuestas se normalizan antes de enviarse al frontend para que siempre tengan todas el mismo formato.

---

### `GET /games/search?q={termino}`
Busca juegos por título en RAWG según el input que se haya escrito en el buscador y devuelve hasta 12 resultados por búsqueda.

**Parámetros:**

| Parámetro | Tipo | Obligatorio | Descripción |
|:---|:---|:---:|:---|
| `q` | `string` | Sí | El texto a buscar. |

**Respuesta `200 OK`:**
```json
{
  "results": [
    {
      "rawgId": 24919,
      "title": "Mario Bros.",
      "coverUrl": "https://...",
      "releaseYear": 2006,
      "genres": ["Platformer", "Action"]
    }
  ],
  "count": 12
}
```

---

### `GET /games/:id`
Consigue los detalles completos de un juego usando su ID de RAWG, incluída la descripción en texto limpio (`description_raw`) sin etiquetas HTML.

**Respuesta `200 OK`:** Devuelve el objeto normalizado del juego.

---

## 3. Manejo de errores

Todos los errores que pueda devolver la API se devuelven siempre en el mismo formato independientemente de su origen.

```json
{
  "error": {
    "code": "BAD_REQUEST",
    "message": "El parámetro de búsqueda 'q' es obligatorio"
  }
}
```

| Código HTTP | Cuándo se devuelve |
|:---|:---|
| `400 Bad Request` | Faltan campos obligatorios o el body está mal formado. |
| `404 Not Found` | El recurso solicitado no existe en la biblioteca. |
| `500 Internal Server Error` | Fallo al leer o escribir el archivo JSON local. |
| `502 Bad Gateway` | RAWG no responde o devuelve un error. |
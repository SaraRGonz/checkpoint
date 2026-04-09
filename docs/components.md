# Componentes UI

Para los componentes de esta librería sigue la metodología Atomic Design, que organiza de menor a mayor complejidad: Desde piezas pequeñas e independientes hasta componentes que combinan varias piezas entre sí.

Todos están construidos con React y TypeScript y se estilizan con clases de Tailwind CSS.

---

## 1. Átomos: Componentes básicos

### `Badge.tsx`

Etiqueta visual para mostrar la plataforma de un juego o su estado en la biblioteca. Los colores se definen en un diccionario interno y se aplican según la variante que se le pase.

```tsx
<Badge variant="playing">Playing</Badge>
<Badge variant="completed">Completed</Badge>
```

| Propiedad | Tipo | Requerido | Por defecto | Descripción |
|:---|:---|:---:|:---|:---|
| `children` | `ReactNode` | Sí | — | El texto que aparece dentro del badge. |
| `variant` | `string` | No | `'default'` | El color del badge. Opciones: `'default'`, `'wishlist'`, `'backlog'`, `'playing'`, `'completed'`, `'dropped'`. |

---

### `Button.tsx`

Botón reutilizable con tres variantes visuales diferentes y soporte para distintos comportamientos HTML. Los estilos base se combinan con los colores de cada variante uniendo las clases.

```tsx
<Button variant="primary" onClick={handleSave}>Guardar</Button>
<Button variant="danger" type="submit">Eliminar</Button>
```

| Propiedad | Tipo | Requerido | Por defecto | Descripción |
|:---|:---|:---:|:---|:---|
| `children` | `ReactNode` | Sí | — | El texto o contenido del botón. |
| `variant` | `string` | No | `'primary'` | El estilo visual. Opciones: `'primary'`, `'secondary'`, `'danger'`. |
| `onClick` | `() => void` | No | — | Función que se ejecuta al hacer clic. |
| `type` | `string` | No | `'button'` | Comportamiento en el DOM. Opciones: `'button'`, `'submit'`, `'reset'`. |

---

### `SearchInput.tsx`

Campo de texto con un icono de lupa. Es un componente que no gestiona su propio estado sino que recibe el valor actual desde el componente padre y le avisa de cada cambio mediante `onChange`. El icono lleva `pointer-events-none` para que los clics sobre él activen siempre el input en vez de seleccionar el SVG.

```tsx
<SearchInput
  value={query}
  onChange={(newValue) => setQuery(newValue)}
  placeholder="Buscar juego..."
/>
```

| Propiedad | Tipo | Requerido | Por defecto | Descripción |
|:---|:---|:---:|:---|:---|
| `value` | `string` | Sí | — | El texto actual del input, controlado desde el padre. |
| `onChange` | `(newValue: string) => void` | Sí | — | Función que recibe el texto actualizado cada vez que el usuario teclea algo. |
| `placeholder` | `string` | No | `'Search game...'` | Texto de sugerencia cuando el campo está vacío. |

---

### `Spinner.tsx`

Indicador de carga que aparece mientras la aplicación espera respuesta de la API. Es un SVG animado con la clase `animate-spin` de Tailwind. No recibe ningun prop simplemente se renderiza cuando hace falta.

```tsx
{isLoading && <Spinner />}
```

| Propiedad | Tipo | Requerido | Por defecto | Descripción |
|:---|:---|:---:|:---|:---|
| — | — | — | — | Este componente no recibe props. |

---

### `StarRating.tsx`

Muestra una puntuación en forma de estrellas. Crea un array del tamaño de `maxStars` y compara cada posición con el valor de `rating` para decidir si cada estrella se rellena o se queda vacia. El array empieza desde 1 en vez de desde 0 para que no se renderice una estrella de más.

```tsx
<StarRating rating={4} />
<StarRating rating={3} maxStars={10} />
```

| Propiedad | Tipo | Requerido | Por defecto | Descripción |
|:---|:---|:---:|:---|:---|
| `rating` | `number` | Sí | — | La puntuación a mostrar (por ejemplo, `4`). |
| `maxStars` | `number` | No | `5` | El número total de estrellas de la escala. |

---

## 2. Moléculas y organismos: Componentes compuestos

### `EmptyState.tsx`

Pantalla que aparece cuando la biblioteca no tiene ningún juego añadido aún. Tiene una ilustración SVG de un fantasma, un título, un mensaje de contexto y un botón de llamada a la acción que usa el componente `Button` para ir a la página de búsqueda. Todos los textos tienen valores por defecto aunque se pueden personalizar según el contexto.

```tsx
<EmptyState
  onClick={() => navigate('/search')}
  title="Tu biblioteca está vacía"
  clickText="Buscar juegos"
/>
```

| Propiedad | Tipo | Requerido | Por defecto | Descripción |
|:---|:---|:---:|:---|:---|
| `onClick` | `() => void` | Sí | — | Función que se ejecuta al pulsar el botón. |
| `title` | `string` | No | `'Your library is looking a bit empty'` | El título principal. |
| `message` | `string` | No | Mensaje de contexto por defecto | El texto descriptivo bajo el título. |
| `clickText` | `string` | No | `'Search Games'` | El texto que aparece dentro del botón. |

---

### `ErrorMessage.tsx`

Alerta para mostrar errores al usuario como fallos de red o problemas con la API. Incluye un icono de advertencia, el mensaje y, opcionalmente, un código en negrita. El campo `code` acepta tanto números (`404`) como cadenas de texto (`'ERR_NETWORK'`) por si tiene que soportar strings en vez de números.

```tsx
<ErrorMessage message="No se pudo conectar con el servidor." code={503} />
<ErrorMessage message="Recurso no encontrado." code="ERR_NOT_FOUND" />
```

| Propiedad | Tipo | Requerido | Por defecto | Descripción |
|:---|:---|:---:|:---|:---|
| `message` | `string` | Sí | — | El mensaje de error que ve el usuario. |
| `code` | `string \| number` | No | — | Código técnico del error, en negrita antes del mensaje. |

---

### `GameCard.tsx`

La tarjeta principal de cada juego. Une la portada, el título, el `Badge` con la plataforma y el `StarRating` con la puntuación a partir de un único objeto de tipo `Game`. Al recibir todos los datos en un solo objeto, el componente es fácil de reutilizar en cualquier parte de la aplicación.

```tsx
<GameCard game={gameObject} />
```

| Propiedad | Tipo | Requerido | Por defecto | Descripción |
|:---|:---|:---:|:---|:---|
| `game` | `Game` | Sí | — | Objeto con todos los datos del juego: `id`, `title`, `platform`, `rating`, `coverUrl`, etc. |
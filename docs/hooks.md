# Documentación de Hooks

Para esta arquitectura se busca la separación de responsabilidades. La lógica de negocio se saca de los componentes visuales y se encapsula en Custom Hooks para que los componentes solo se ocupen de renderizar la interfaz mientras que todo lo relacionado con filtros, estado global o persistencia está en su propio módulo reutilizable.

---

## Custom Hooks

### `useLibrary`

Es el punto de acceso para interactuar con la biblioteca del usuario. En vez de que cada componente importe `LibraryContext` y llame a `useContext` directamente, el custom hook lo centraliza y también añade una comprobación de seguridad por si se intenta usar fuera de `LibraryProvider`, que en ese caso lanza un error en consola para avisar del fallo.

```ts
const { games, addGame, deleteGame } = useLibrary();
```

---

### `useFilters`

Gestiona la lógica de filtrado y búsqueda de la colección de juegos recibiendo la lista completa de juegos y manteniendo los estados internos del filtro y el texto de búsqueda. 
Al componente que lo use le devuelve la lista ya filtrada y procesada y lista para renderizar.

```ts
const { filteredGames, searchQuery, setSearchQuery, clearFilters } = useFilters(games);
```

| Retorno | Tipo | Descripción |
|:---|:---|:---|
| `statusFilter` | `string` | El filtro activo en ese momento (`'all'`, `'completed'`, etc.). |
| `setStatusFilter` | `function` | Actualiza el filtro de estado. |
| `searchQuery` | `string` | El texto escrito en la búsqueda. |
| `setSearchQuery` | `function` | Actualiza el texto de búsqueda. |
| `filteredGames` | `Game[]` | La lista de juegos filtrada y lista para mostrar. |
| `clearFilters` | `function` | Resetea todos los filtros a valores por defecto. |

### `useTheme`

Gestiona el toggle de dark/light mode. Abstrae la lógica de consumir `ThemeContext` y devuelve el tema que está actualmente seleccionado y la función para poder alternarlo. También tiene una comprobación de seguridad por si se invoca fuera de `ThemeProvider` prevenir errores silenciosos.

```ts
const { theme, toggleTheme } = useTheme();
```

| Retorno | Tipo | Descripción |
|:---|:---|:---|
|`theme`|`string`|Tema activo (dark o light)|
|`toggleTheme`|`function`|Función que alterna entre el modo oscuro y el modo claro con persistencia de preferencia.|

---

## Hooks nativos de React utilizados

### `useState`: Estado local

Instancia variables en la memoria de React que cuando cambian hacen que el componente se vuelva a renderizar con los valores nuevos.

Se usa tanto en `LibraryContext` para almacenar el array de juegos (`games`) y los estados de red (`isLoading`, `error`) como en `useFilters` para guardar el texto de búsqueda y el filtro activo.

---

### `useEffect`; Efectos secundarios

Hacen que se pueda sincronizar el estado de React con sistemas externos como el `localStorage` del navegador.

En `LibraryContext` se usan dos efectos de dos formas distintas:

- El primero se ejecuta solo una vez cuando se monta el componente (array vacío `[]`) y lee los juegos guardados en `localStorage` para cargarlos en el estado
- El segundo vigila el array de `games[]` y cada vez que cambia actualiza `localStorage` para mantener los datos persistidos

---

### `useMemo`: Optimización de cálculos

`useMemo` memoriza el resultado de una función y solo lo vuelve a calcular cuando cambia alguna de sus dependencia. Así se pueden evitar cálculos innecesarios en cada vez que se renderiza.

Se usa en `useFilters` para generar `filteredGames`. 
Gracias a `useMemo` el algoritmo de filtrado no tiene que recorrer toda la colección cada vez que se renderiza. Solo lo hace cuando se han cambiado los juegos o los parámetros de búsqueda.

---

### `useCallback`: Estabilidad referencial de funciones

`useCallback` memoriza la definición de una función para que no tenga que crearse una nueva instancia cada vez que se renderiza. 
Esto es importante cuando una función se pasa como prop a un componente hijo porque React compara referencias. Si se crea una instancia nueva en cada render es como si la función fuese siempre nueva aunque no se haya cambiado nada, y el hijo se va a re-renderizar aunque no haga falta.

Se usa en `useFilters` para `clearFilters`. Como ahí el array de dependencias está vacío `[]` la función se crea solo una vez al montar el hook y su referencia permanece estable.
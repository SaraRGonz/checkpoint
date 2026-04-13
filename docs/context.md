# Context y Estado Global

Se usa la Context API de React para gestionar el estado global y poder compartir información entre componentes que están en ramas distintas del árbol sin tener que pasarla manualmente por capas intermedias que no la necesitan, es decir, sin tener **Prop Drilling**.

---

## Cuándo usar Context

El uso de Context es para datos que sean necesarios en componentes que no tienen un padre directo en común y que no cambien con demasiada frecuencia, porque cada cambio en el contexto hace que haya un re-renderizado en todos los componentes que lo consumen.

En la aplicación hay dos contextos:

- **`LibraryContext`:** Gestiona la colección de juegos del usuario. Hace que tanto el `SearchInput` como la `LibraryPage` accedan a la lista de juegos sin necesidad de un componente padre que los conecte.
- **`ThemeContext`:** Gestiona la preferencia de tema dark/light mode. Necesita ser accesible desde cualquier parte de la interfaz, incluyendo el `Navbar` que es donde está el toggle.

---

## Cómo están implementados

Los dos contextos siguen el mismo patrón de tres capas:

### 1. Interfaz y creación del contexto

Primero se define con TypeScript qué datos y funciones va a exponer el contexto y después se instancia con `createContext`. El valor inicial es `undefined` porque los datos reales se inyectan en tiempo de ejecución desde el Provider.

```ts
export const LibraryContext = createContext<LibraryContextType | undefined>(undefined);
```

### 2. Componente Provider

Es lo que envuelve la aplicación y hace de contenedor del estado. Usa `useState` para mantener los datos en memoria y `useEffect` para sincronizarlos con `localStorage`. Todo lo que esté dentro del Provider puede acceder al estado a través de la propiedad `value`.

```tsx
<LibraryContext.Provider value={{ games, addGame, updateGame, deleteGame, isLoading, error }}>
    {children}
</LibraryContext.Provider>
```

### 3. Custom Hook de acceso

En vez de llamar a `useContext` directamente desde cada componente el acceso al contexto se agrupa en un Custom Hook (`useLibrary` o `useTheme`). Simplifican el consumo e incluyen una comprobación de seguridad porque si se llaman desde fuera de su Provider correspondiente lanzan un error explícito en lugar de fallar en silencio.

```ts
export function useLibrary() {
    const context = useContext(LibraryContext);
    if (context === undefined) {
        throw new Error('useLibrary must be used within a LibraryProvider');
    }
    return context;
}
```

---

## Qué expone cada contexto

### `LibraryContext`

| Propiedad | Tipo | Descripción |
|:---|:---|:---|
| `games` | `Game[]` | Lista completa de juegos guardados por el usuario. |
| `addGame` | `(game: Omit<Game, 'id'>) => void` | Añade un juego nuevo generando su `id` automáticamente. |
| `updateGame` | `(id: string, updates: Partial<Game>) => void` | Actualiza solo los campos que se le pasen, sin necesidad de enviar el objeto completo. |
| `deleteGame` | `(id: string) => void` | Elimina el juego que coincida con el `id` recibido. |
| `isLoading` | `boolean` | Indica si la app está cargando datos. |
| `error` | `string \| null` | Contiene el mensaje de error si algo ha fallado, o `null` si todo va bien. |

### `ThemeContext`

| Propiedad | Tipo | Descripción |
|:---|:---|:---|
| `theme` | `'dark' \| 'light'` | El tema activo en ese momento. |
| `toggleTheme` | `() => void` | Cambia entre dark y light mode y persiste la preferencia en `localStorage`. |
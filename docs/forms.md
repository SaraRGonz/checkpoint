# Formularios e Interacción

Los formularios de la app siguen el patrón de **Componentes Controlados** de React. Esto en lo que consiste es en que el estado de React es siempre la "fuente de verdad" de lo que aparece en pantalla. De esta forma se evita que el valor que se ve en un input y el valor guardado en el estado puedan llegar a desincronizarse.

---

## Componentes controlados

Este patrón tiene tres partes que siempre van juntas:

1. Cada campo del formulario tiene su propia variable de estado con `useState`.
2. El valor del input se fuerza a ser exactamente esa variable (`value={miEstado}`).
3. Cuando el usuario escribe algo, el evento `onChange` actualiza el estado y React vuelve a renderizar el campo con el valor nuevo.

```tsx
// 1. Estado
const [title, setTitle] = useState('');

// 2 y 3. Binding y actualización
<input
    type="text"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
/>
```

---

## Validación de datos

Para que no haya problemas con la integridad de los datos la aplicación tiene una doble verificación.

### Validación en el cliente
- **`e.preventDefault()`:** Siempre se llama al inicio del `onSubmit` para que el navegador no recargue la página al enviar el formulario.
- **Comprobaciones básicas:** Se comprueba que los campos obligatorios no estén vacíos (por ejemplo, con `title.trim() === ''`) para no hacer llamadas al servidor innecesarias.
- **Feedback visual:** Si algo falla se interrumpe la ejecución y se actualiza un estado de error que renderiza el componente `ErrorMessage` para avisar al usuario del error.

### Validación en el servidor con Zod
El frontend tiene su propia validación pero la API backend es la fuente de verdad. 
El middleware `validate.ts` comprueba el body con un esquema de reglas estrictas y si alguien intenta saltarse la validación que hay en el frontend, el backend responderá con un error `400 VALIDATION_ERROR` detallado.
---

## Componentes UI utilizados en formularios

- **`Button`:** Se usa para las acciones principales (guardar, enviar) y secundarias (cancelar). Acepta `type="submit"` para integrarse de forma nativa con el elemento `<form>`.
- **`ErrorMessage`:** Enseña un aviso visual estandarizado cuando la validación falla o hay un error de red.
- **`SearchInput`:** Aunque principalmente se usa en la `SearchPage` sigue el mismo patrón de componente controlado, delegando su estado al componente padre que lo usa.
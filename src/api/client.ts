const BASE_URL = 'http://localhost:3000/api/v1';

// función genérica tipada (<T>) para hacer peticiones
export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
    });

    // si la respuesta no es OK (400, 404, 500...) captura el error estandarizado
    if (!response.ok) {
        // en peticiones DELETE (204 No Content) no hay body así que evita hacer json()
        if (response.status !== 204) {
            const data = await response.json();
            throw new Error(data.error?.message || 'Error en la petición a la API');
        }
        throw new Error(`Error HTTP: ${response.status}`);
    }

    // para el 204 (DELETE) no hay JSON que devolver
    if (response.status === 204) {
        return {} as T;
    }

    // convierte la respuesta a JSON y le asigna el tipo que se le ha pasado (<T>)
    const data = await response.json();
    return data as T;
}